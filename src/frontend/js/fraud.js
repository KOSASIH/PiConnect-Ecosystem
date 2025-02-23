// fraud.js

const { FraudModel } = require('../models/fraudModel'); // Model for storing fraud reports
const { TransactionModel } = require('../models/transactionModel'); // Model for transactions
const { UserModel } = require('../models/userModel'); // Model for users

// Function to log a fraud report
const logFraudReport = async (userId, transactionId, reason) => {
    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
        throw new Error('Transaction not found');
    }

    const fraudReport = new FraudModel({
        userId,
        transactionId,
        reportedBy: userId,
        reason,
        status: 'pending',
    });

    await fraudReport.save();
    return fraudReport;
};

// Function to analyze recent transactions for potential fraud
const analyzeRecentTransactions = async () => {
    const transactions = await TransactionModel.find().sort({ createdAt: -1 }).limit(100); // Get the last 100 transactions
    const fraudAlerts = [];

    for (const transaction of transactions) {
        const isFraudulent = await isTransactionFraudulent(transaction);
        if (isFraudulent) {
            fraudAlerts.push(transaction);
            await createFraudAlert(transaction); // Create a fraud alert if detected
        }
    }

    return fraudAlerts;
};

// Function to check if a transaction is fraudulent
const isTransactionFraudulent = async (transaction) => {
    // Implement your fraud detection logic here (e.g., anomaly detection, rule-based checks)
    const threshold = 10000; // Example threshold for fraud detection
    return transaction.amount > threshold; // Placeholder condition
};

// Function to create a fraud alert
const createFraudAlert = async (transaction) => {
    const fraudAlert = new FraudModel({
        transactionId: transaction._id,
        userId: transaction.userId,
        reason: 'Suspicious transaction amount',
        status: 'investigating',
    });

    await fraudAlert.save();
};

// Function to get fraud reports by user
const getFraudReportsByUser  = async (userId) => {
    return await FraudModel.find({ userId }).populate('transactionId').populate('reportedBy', 'username');
};

// Function to take action on a fraud alert
const takeActionOnFraudAlert = async (alertId, action) => {
    const fraudAlert = await FraudModel.findById(alertId);
    if (!fraudAlert) {
        throw new Error('Fraud alert not found');
    }

    // Update the status based on the action taken
    if (action === 'investigate') {
        fraudAlert.status = 'investigating';
    } else if (action === 'dismiss') {
        fraudAlert.status = 'dismissed';
    } else if (action === 'resolve') {
        fraudAlert.status = 'resolved';
    }

    await fraudAlert.save();
    return fraudAlert;
};

// Function to get all fraud alerts (admin only)
const getAllFraudAlerts = async () => {
    return await FraudModel.find().populate('transactionId').populate('reportedBy', 'username');
};

// Function to generate fraud statistics
const generateFraudStatistics = async () => {
    const totalReports = await FraudModel.countDocuments();
    const resolvedReports = await FraudModel.countDocuments({ status: 'resolved' });
    const pendingReports = await FraudModel.countDocuments({ status: 'pending' });
    const dismissedReports = await FraudModel.countDocuments({ status: 'dismissed' });

    return {
        totalReports,
        resolvedReports,
        pendingReports,
        dismissedReports,
    };
};

module.exports = {
    logFraudReport,
    analyzeRecentTransactions,
    isTransactionFraudulent,
    createFraudAlert,
    getFraudReportsByUser ,
    takeActionOnFraudAlert,
    getAllFraudAlerts,
    generateFraudStatistics,
};
