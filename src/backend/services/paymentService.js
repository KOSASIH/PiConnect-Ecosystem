// src/backend/services/paymentService.js
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Charity = require('../models/charityModel');

// Process a payment
const processPayment = async (userId, amount, charityId) => {
    // Validate input
    if (!userId || !amount || !charityId) {
        throw new Error('User  ID, amount, and charity ID are required.');
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User  not found.');
    }

    // Check if charity exists
    const charity = await Charity.findById(charityId);
    if (!charity) {
        throw new Error('Charity not found.');
    }

    // Create a new transaction
    const transaction = new Transaction({
        userId,
        amount,
        status: 'completed', // Assuming the payment is successful
        description: `Donation to ${charity.name}`
    });

    // Save the transaction
    await transaction.save();

    // Update the charity's total donations
    await charity.updateTotalDonations(amount);

    return transaction;
};

// Get payment history for a user
const getPaymentHistory = async (userId) => {
    // Validate input
    if (!userId) {
        throw new Error('User  ID is required.');
    }

    // Retrieve payment history for the user
    const payments = await Transaction.find({ userId }).sort({ createdAt: -1 });
    return payments;
};

// Export the payment service functions
module.exports = {
    processPayment,
    getPaymentHistory
};
