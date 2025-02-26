import { useEffect, useState } from "react";
import * as notificationService from "../services/notificationService";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await notificationService.fetchNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
                setNotifications([]);
            }
        };
        loadNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markNotificationAsRead(id);
            setNotifications(prev => prev.filter(notification => notification.id !== id));
        } catch (error) {
            console.error("❌ Error marking notification as read:", error);
        }
    };

    return (
        <div>
            <button onClick={() => setShowDropdown(!showDropdown)}>
                🔔 {notifications.length > 0 && <span>({notifications.length})</span>}
            </button>
            {showDropdown && (
                <ul>
                    {notifications.length === 0 ? (
                        <li>No notifications</li>
                    ) : (
                        notifications.map(notification => (
                            <li key={notification.id}>
                                {notification.message}
                                <button onClick={() => handleMarkAsRead(n.id)}>✔</button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default NotificationBell;
