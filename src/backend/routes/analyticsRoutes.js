// src/backend/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Route to get overall analytics data
router.get('/', analyticsController.getAnalyticsData);

// Route to get payment analytics for a specific user
router.get('/user/:userId', analyticsController.getUser PaymentAnalytics);

// Route to get charity analytics
router.get('/charity', analyticsController.getCharityAnalytics);

// Export the analytics routes
module.exports = router;
