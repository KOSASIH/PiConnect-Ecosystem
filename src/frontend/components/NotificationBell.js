// src/frontend/components/NotificationBell.js

import React, { useEffect, useState } from 'react';
import { fetchUser Notifications } from '../js/notification'; // Import the notification fetching function
import PropTypes from 'prop-types';

const NotificationBell = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Function to fetch notifications for the user
    const loadNotifications = async () => {
        try {
            const data = await fetchUser Notifications(userId);
            setNotifications(data);
            setUnreadCount(data.filter(notification => !notification.read).length);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, [userId]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const markAsRead = (notificationId) => {
        // Logic to mark notification as read (could be an API call)
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === notificationId ? { ...notification, read: true } : notification
            )
        );
        setUnreadCount(prevCount => prevCount - 1);
    };

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="position-relative">
            <button className="btn btn-light" onClick={toggleDropdown}>
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
            </button>
            {showDropdown && (
                <div className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
                    <h6 className="dropdown-header">Notifications</h6>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification.id} className="dropdown-item" onClick={() => markAsRead(notification.id)}>
                                <span className={notification.read ? '' : 'font-weight-bold'}>
                                    {notification.message}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item text-muted">No notifications</div>
                    )}
                </div>
            )}
        </div>
    );
};

NotificationBell.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default NotificationBell;
