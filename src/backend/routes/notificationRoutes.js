// src/backend/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to send a notification
router.post('/', notificationController.sendNotification);

// Route to get notifications for a specific user
router.get('/user/:userId', notificationController.getUser Notifications);

// Route to mark a notification as read
router.put('/read/:notificationId', notificationController.markNotificationAsRead);

// Route to delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

// Export the notification routes
module.exports = router;
