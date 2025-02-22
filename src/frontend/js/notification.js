// src/frontend/js/notification.js

// Function to fetch notifications for a specific user
const fetchUser Notifications = async (userId) => {
    try {
        const response = await fetch(`/api/notifications/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const notifications = await response.json();
        return notifications; // Return the list of notifications
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw new Error('Failed to load notifications. Please try again later.');
    }
};

// Function to send a notification
const sendNotification = async (userId, message) => {
    try {
        const response = await fetch(`/api/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        const result = await response.json();
        return result; // Return the sent notification
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Failed to send notification. Please try again later.');
    }
};

// Function to mark a notification as read
const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await fetch(`/api/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to mark notification as read');
        }

        const updatedNotification = await response.json();
        return updatedNotification; // Return the updated notification
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw new Error('Failed to mark notification as read. Please try again later.');
    }
};

// Function to delete a notification
const deleteNotification = async (notificationId) => {
    try {
        const response = await fetch(`/api/notifications/${notificationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete notification');
        }

        return true; // Return true if deletion was successful
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw new Error('Failed to delete notification. Please try again later.');
    }
};

// Exporting the notification functions
export {
    fetchUser Notifications,
    sendNotification,
    markNotificationAsRead,
    deleteNotification,
};
