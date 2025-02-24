import axios from "axios";

const API_URL = `${import.meta.env.VITE_DJANGO_BACKEND_URL}/api`;

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
});

const fetchProjects = async () => {
    const response = await axios.get(`${API_URL}/projects/`, getAuthHeaders());
    return response.data;
};

const createProject = async projectData => {
    const response = await axios.post(API_URL, projectData, getAuthHeaders());
    return response.data
};

export {
    fetchProjects,
    createProject,
};