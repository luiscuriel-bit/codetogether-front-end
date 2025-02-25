import axios from "axios";
import { logout } from "./authService";

const API_URL = `http://${import.meta.env.VITE_DJANGO_BACKEND_URL}/api`;


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

const getAuthHeaders = () => {
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

const fetchProjects = async () => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await axios.get(`${API_URL}/projects/`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        return null;
    }
};

const fetchProjectById = async id => {
    const response = await axios.get(`${API_URL}/projects/${id}`, getAuthHeaders());
    return response.data;
};

const createProject = async projectData => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await axios.post(`${API_URL}/projects/`, projectData, headers);
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error.response?.data || error.message);
        return null;
    }
};

const updateProject = async (projectId, updatedData) => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await axios.patch(`${API_URL}/projects/${projectId}/`, updatedData, headers);
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error.response?.data || error.message);
        return null;
    }
};

const deleteProject = async projectId => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        await axios.delete(`${API_URL}/projects/${projectId}/`, headers);
        return true;
    } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
        return null;
    }
};

const fetchProjectById = async (projectId) => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await axios.get(`${API_URL}/projects/${projectId}/`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error.response?.data || error.message);
        return null;
    }
};


export {
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    fetchProjectById,
};