// src/backend/controllers/notificationController.js
const Notification = require('../models/notificationModel');

// Send a notification
exports.sendNotification = async (req, res) => {
    const { userId, message } = req.body;

    // Validate input
    if (!userId || !message) {
        return res.status(400).send({ message: 'User  ID and message are required.' });
    }

    try {
        // Create a new notification
        const newNotification = new Notification({ userId, message });
        await newNotification.save();

        // Respond with success
        res.status(201).send({ message: 'Notification sent successfully', notification: newNotification });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send({ message: 'Failed to send notification', error });
    }
};

// Get notifications for a specific user
exports.getUser Notifications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Retrieve notifications for the user
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Sort by most recent
        res.status(200).send(notifications);
    } catch (error) {
        console.error('Error retrieving user notifications:', error);
        res.status(500).send({ message: 'Failed to retrieve notifications', error });
    }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).send({ message: 'Notification not found' });
        }

        res.status(200).send({ message: 'Notification marked as read', notification: updatedNotification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).send({ message: 'Failed to mark notification as read', error });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);
        if (!deletedNotification) {
            return res.status(404).send({ message: 'Notification not found' });
        }
        res.status(200).send({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).send({ message: 'Failed to delete notification', error });
    }
};
