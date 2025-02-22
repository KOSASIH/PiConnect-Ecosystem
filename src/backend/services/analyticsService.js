// src/backend/services/analyticsService.js
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Charity = require('../models/charityModel');
const Analytics = require('../models/analyticsModel');

// Get overall analytics data
const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalPayments = await Transaction.countDocuments();
    const totalPaymentAmount = await Transaction.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalCharities = await Charity.countDocuments();

    return {
        totalUsers,
        totalPayments,
        totalPaymentAmount: totalPaymentAmount[0]?.total || 0,
        totalCharities,
    };
};

// Get payment analytics for a specific user
const getUser PaymentAnalytics = async (userId) => {
    // Validate input
    if (!userId) {
        throw new Error('User  ID is required.');
    }

    const totalPayments = await Transaction.countDocuments({ userId });
    const totalPaymentAmount = await Transaction.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    return {
        totalPayments,
        totalPaymentAmount: totalPaymentAmount[0]?.total || 0,
    };
};

// Get charity analytics
const getCharityAnalytics = async () => {
    const totalCharities = await Charity.countDocuments();
    const totalDonations = await Transaction.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    return {
        totalCharities,
        totalDonations: totalDonations[0]?.total || 0,
    };
};

// Export the analytics service functions
module.exports = {
    getAnalyticsData,
    getUser PaymentAnalytics,
    getCharityAnalytics,
};
