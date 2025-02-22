// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Payment processing route
router.post('/process', paymentController.processPayment);

// Get payment history
router.get('/history/:userId', paymentController.getPaymentHistory);

module.exports = router;
