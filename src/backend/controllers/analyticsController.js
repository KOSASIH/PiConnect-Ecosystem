// src/backend/controllers/analyticsController.js
const Payment = require('../models/transactionModel');
const User = require('../models/userModel');
const Charity = require('../models/charityModel');

// Get overall analytics data
exports.getAnalyticsData = async (req, res) => {
    try {
        // Count total users
        const totalUsers = await User.countDocuments();

        // Count total payments
        const totalPayments = await Payment.countDocuments();

        // Calculate total amount of payments
        const totalPaymentAmount = await Payment.aggregate([
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);

        // Count total charities
        const totalCharities = await Charity.countDocuments();

        // Prepare analytics data
        const analyticsData = {
            totalUsers,
            totalPayments,
            totalPaymentAmount: totalPaymentAmount[0] ? totalPaymentAmount[0].totalAmount : 0,
            totalCharities
        };

        // Respond with analytics data
        res.status(200).send(analyticsData);
    } catch (error) {
        console.error('Error retrieving analytics data:', error);
        res.status(500).send({ message: 'Failed to retrieve analytics data', error });
    }
};

// Get payment analytics for a specific user
exports.getUser PaymentAnalytics = async (req, res) => {
    const { userId } = req.params;

    try {
        // Retrieve payment history for the user
        const payments = await Payment.find({ userId });

        // Calculate total payments and total amount
        const totalPayments = payments.length;
        const totalPaymentAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);

        // Prepare user payment analytics data
        const userPaymentAnalytics = {
            userId,
            totalPayments,
            totalPaymentAmount
        };

        // Respond with user payment analytics data
        res.status(200).send(userPaymentAnalytics);
    } catch (error) {
        console.error('Error retrieving user payment analytics:', error);
        res.status(500).send({ message: 'Failed to retrieve user payment analytics', error });
    }
};

// Get charity analytics
exports.getCharityAnalytics = async (req, res) => {
    try {
        // Count total charities
        const totalCharities = await Charity.countDocuments();

        // Prepare charity analytics data
        const charityAnalytics = {
            totalCharities
        };

        // Respond with charity analytics data
        res.status(200).send(charityAnalytics);
    } catch (error) {
        console.error('Error retrieving charity analytics:', error);
        res.status(500).send({ message: 'Failed to retrieve charity analytics', error });
    }
};
