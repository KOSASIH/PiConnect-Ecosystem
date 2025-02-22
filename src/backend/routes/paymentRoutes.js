// src/backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to process a payment
router.post('/process', paymentController.processPayment);

// Route to get payment history for a specific user
router.get('/history/:userId', paymentController.getPaymentHistory);

// Export the payment routes
module.exports = router;
