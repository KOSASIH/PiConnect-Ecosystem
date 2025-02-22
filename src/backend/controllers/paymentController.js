// src/backend/controllers/paymentController.js
const Payment = require('../models/transactionModel');
const User = require('../models/userModel'); // Assuming you have a User model for user validation

// Process a payment
exports.processPayment = async (req, res) => {
    const { userId, amount } = req.body;

    // Validate input
    if (!userId || !amount) {
        return res.status(400).send({ message: 'User  ID and amount are required.' });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User  not found.' });
        }

        // Create a new payment transaction
        const newPayment = new Payment({ userId, amount });
        await newPayment.save();

        // Respond with success
        res.status(201).send({ message: 'Payment processed successfully', payment: newPayment });
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).send({ message: 'Payment processing failed', error });
    }
};

// Get payment history for a user
exports.getPaymentHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        // Retrieve payment history for the user
        const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Sort by most recent
        res.status(200).send(payments);
    } catch (error) {
        console.error('Error retrieving payment history:', error);
        res.status(500).send({ message: 'Failed to retrieve payment history', error });
    }
};
