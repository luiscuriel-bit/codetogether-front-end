import axios from "axios";

const API_URL = "http://localhost:8000/api/notifications/";

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error("No access token found.");
        return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
};

const fetchNotifications = async () => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        const response = await axios.get(API_URL, headers);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || 'Notifications fetch failed');
    }
};

const deleteNotification = async (notificationId) => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        await axios.delete(`${API_URL}${notificationId}/`, headers);
        return true;
    } catch (error) {
        console.error("Error deleting notification:", error.response?.data || error.message);
        return false;
    }
};

const markNotificationAsRead = async notificationId => {
    try {
        const headers = getAuthHeaders();
        if (!headers) return null;

        const response = await axios.patch(`${API_URL}${notificationId}/`, { status: "read" }, headers);
        return response.data;
    } catch (error) {
        console.error("Error updating notification:", error.response?.data || error.message);
        return null;
    }
};

export {
    fetchNotifications,
    deleteNotification,
    markNotificationAsRead,
};