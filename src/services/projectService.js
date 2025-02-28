import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = `${import.meta.env.VITE_DJANGO_API_URL}`;

const token = localStorage.getItem("access_token");
const userId = token ? jwtDecode(token).user_id : null;

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        console.error("No access token found.");
        return {};
    }
    return { headers: { Authorization: `Bearer ${token}` } };
};

const fetchProjects = async () => {
    try {
        const headers = getAuthHeaders();
        if (!headers.headers) return [];

        const response = await axios.get(`${API_URL}projects/`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        return [];
    }
};

const fetchProjectById = async id => {
    try {
        const headers = getAuthHeaders();
        if (!headers.headers) return [];

        const response = await axios.get(
            `${API_URL}projects/${id}`,
            headers,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error.response?.data || error.message);
        return [];
    }
};

const getProjectName = async id => {
    try {
        const headers = getAuthHeaders();
        if (!headers.headers) return [];

        const response = await axios.get(
            `${API_URL}projects/${id}`,
            headers,
        );
        return response.data.name;
    } catch (error) {
        console.error("Error fetching project name:", error.response?.data || error.message);
        return [];
    }
};

const createProject = async projectData => {
    try {
        const headers = getAuthHeaders();
        if (!headers.headers) return null;

        if (!userId) {
            console.error("User ID not found. Cannot create project.");
            return null;
        }
        const response = await axios.post(
            `${API_URL}projects/`,
            { ...projectData, owner: userId },
            headers,
        );
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error.response?.data || error.message);
        return null;
    }
};

const updateProject = async (projectData, id) => {
    try {
        const headers = getAuthHeaders();
        if (!headers.headers) return null;
        console.log(projectData)

        const response = await axios.patch(
            `${API_URL}projects/${id}/`,
            projectData,
            headers,
        );
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error.response?.data || error.message);
        return null;
    }
};

export { fetchProjects, fetchProjectById, getProjectName, createProject, updateProject };
