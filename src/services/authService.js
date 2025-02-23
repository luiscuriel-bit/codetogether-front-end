import axios from 'axios';

const API_URL = `${import.meta.env.VITE_DJANGO_BACKEND_URL}/api`;

const login = async credentials => {
    try {
        const response = await axios.post(`${API_URL}/token/`, credentials);
        return response.data;
    }
    catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
};


export {
    login,
};