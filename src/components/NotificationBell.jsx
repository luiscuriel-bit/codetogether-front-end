import { useEffect, useState } from "react";
import * as notificationService from "../services/notificationService";

function NotificationBell() {
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
        const interval = setInterval(loadNotifications, 5000);
        return () => clearInterval(interval);
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
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 hover:bg-gray-100 rounded"
            >
                🔔
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg">
                    <div className="p-2 max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-2 text-gray-500">No notifications</div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className="p-2 hover:bg-gray-50 flex justify-between items-center"
                                >
                                    <span>{notification.message}</span>
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="text-green-500 hover:text-green-600"
                                    >
                                        ✓
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
