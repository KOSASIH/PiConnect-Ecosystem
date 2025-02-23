// fraudService.js

const FraudModel = require('../models/fraudModel');
const TransactionModel = require('../models/transactionModel');
const UserModel = require('../models/userModel');

class FraudService {
    // Log a fraud report
    async logFraudReport(userId, transactionId, reason) {
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
    }

    // Analyze recent transactions for potential fraud
    async analyzeTransactions() {
        const transactions = await TransactionModel.find().sort({ createdAt: -1 }).limit(100); // Get the last 100 transactions
        const fraudAlerts = [];

        for (const transaction of transactions) {
            const isFraudulent = this.isTransactionFraudulent(transaction);
            if (isFraudulent) {
                fraudAlerts.push(transaction);
                await this.createFraudAlert(transaction); // Create a fraud alert if detected
            }
        }

        return fraudAlerts;
    }

    // Check if a transaction is fraudulent (placeholder logic)
    isTransactionFraudulent(transaction) {
        // Implement your fraud detection logic here (e.g., anomaly detection, rule-based checks)
        // Example: Check if the transaction amount exceeds a certain threshold
        return transaction.amount > 10000; // Placeholder condition
    }

    // Create a fraud alert
    async createFraudAlert(transaction) {
        const fraudAlert = new FraudModel({
            transactionId: transaction._id,
            userId: transaction.userId,
            reason: 'Suspicious transaction amount',
            status: 'investigating',
        });

        await fraudAlert.save();
    }

    // Get fraud reports by user
    async getFraudReportsByUser (userId) {
        return await FraudModel.find({ userId }).populate('transactionId').populate('reportedBy', 'username');
    }

    // Take action on a fraud alert
    async takeActionOnFraudAlert(alertId, action) {
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
    }

    // Get all fraud alerts (admin only)
    async getAllFraudAlerts() {
        return await FraudModel.find().populate('transactionId').populate('reportedBy', 'username');
    }
}

module.exports = new FraudService();
