import { useEffect, useState } from 'react';
import * as notificationService from '../services/notificationService';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const loadNotifications = async () => {
            const data = await notificationService.fetchNotifications();
            setNotifications(data);
        };
        loadNotifications();
    }, []);

    const handleMarkAsRead = async id => {
        await notificationService.markNotificationAsRead(id);
        setNotifications(notifications.filter(n => n.id !== id));
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
                        notifications.map(n => (
                            <li key={n.id}>
                                {n.message}
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