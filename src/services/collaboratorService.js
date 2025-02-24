import axios from "axios";

const API_URL = "http://localhost:8000/api/projects/";

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No access token found.");
        return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
};

const addCollaborator = async (projectId, userData) => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        const response = await axios.post(`${API_URL}${projectId}/collaborators/`, userData, headers);
        return response.data;
    } catch (error) {
        console.error("Error adding collaborator:", error.response?.data || error.message);
        return null;
    }
};

const removeCollaborator = async (projectId, userId) => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        await axios.delete(`${API_URL}${projectId}/collaborators/${userId}/`, headers);
        return true;
    } catch (error) {
        console.error("Error removing collaborator:", error.response?.data || error.message);
        return false;
    }
};

const getCollaborators = async projectId => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        const response = await axios.get(`${API_URL}${projectId}/collaborators/`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching collaborators:", error.response?.data || error.message);
        return [];
    }
};

export {
    addCollaborator,
    removeCollaborator,
    getCollaborators,
}