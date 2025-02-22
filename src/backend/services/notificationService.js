// src/backend/services/notificationService.js
const Notification = require('../models/notificationModel');

// Send a notification
const sendNotification = async (userId, message) => {
    // Validate input
    if (!userId || !message) {
        throw new Error('User  ID and message are required.');
    }

    // Create a new notification
    const notification = new Notification({
        userId,
        message,
    });

    // Save the notification to the database
    await notification.save();

    return notification;
};

// Get notifications for a specific user
const getUser Notifications = async (userId) => {
    // Validate input
    if (!userId) {
        throw new Error('User  ID is required.');
    }

    // Retrieve notifications for the user
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return notifications;
};

// Mark a notification as read
const markNotificationAsRead = async (notificationId) => {
    // Validate input
    if (!notificationId) {
        throw new Error('Notification ID is required.');
    }

    // Find the notification and mark it as read
    const notification = await Notification.findById(notificationId);
    if (!notification) {
        throw new Error('Notification not found.');
    }

    notification.markAsRead(); // Call the method defined in the model
    return notification;
};

// Delete a notification
const deleteNotification = async (notificationId) => {
    // Validate input
    if (!notificationId) {
        throw new Error('Notification ID is required.');
    }

    // Delete the notification
    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
        throw new Error('Notification not found.');
    }

    return notification;
};

// Export the notification service functions
module.exports = {
    sendNotification,
    getUser Notifications,
    markNotificationAsRead,
    deleteNotification,
};
