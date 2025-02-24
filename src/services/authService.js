import axios from 'axios';

const API_URL = `${import.meta.env.VITE_DJANGO_BACKEND_URL}/api`;

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            const newToken = await refreshToken();
            if (newToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);  
            }
        }
        return Promise.reject(error);
    }
);


const getAuthHeaders = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error("No access token found.");
        return null;
    }

    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) return null;

        const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Error refreshing token:', error.response?.data || error.message);
        logout();
        return null;
    }
};

const login = async credentials => {
    try {
        const response = await axios.post(`${API_URL}/token/`, credentials);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'Login failed');
    }
};


const signup = async formData => {
    try {
        const response = await axios.post(`${API_URL}/users/`, formData);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'Signup failed');
    }
};


const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const getUser = async userId => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;
        const response = await axios.get(`${API_URL}/users/${userId}/`, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'User fetch failed');
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const updatedUser = await axios.patch(`${API_URL}/users/${userId}/`, updatedData, getAuthHeaders());
        return updatedUser.data;
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'User update failed');
    }
};




export {
    signup,
    login,
    logout,
    getUser,
    updateUser,
};