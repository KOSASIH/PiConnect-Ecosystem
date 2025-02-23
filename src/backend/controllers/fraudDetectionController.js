// fraudDetectionController.js

const FraudDetectionService = require('../services/fraudService');
const UserService = require('../services/userService');
const { validateFraudReport } = require('../middleware/inputValidationMiddleware');

// Fraud Detection Controller for handling fraudulent activities

class FraudDetectionController {
    // Report potential fraud
    async reportFraud(req, res) {
        try {
            const { userId, transactionId, reason } = req.body;
            validateFraudReport(req.body); // Validate input

            // Log the fraud report
            const report = await FraudDetectionService.logFraudReport(userId, transactionId, reason);
            return res.status(201).json({ success: true, report });
        } catch (error) {
            console.error('Error reporting fraud:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Analyze transactions for potential fraud
    async analyzeTransactions(req, res) {
        try {
            const transactions = await FraudDetectionService.getRecentTransactions();
            const fraudAlerts = await FraudDetectionService.detectFraud(transactions);
            return res.status(200).json({ success: true, fraudAlerts });
        } catch (error) {
            console.error('Error analyzing transactions:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get fraud reports for a user
    async getUser FraudReports(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in the request
            const reports = await FraudDetectionService.getFraudReportsByUser (userId);
            return res.status(200).json({ success: true, reports });
        } catch (error) {
            console.error('Error fetching user fraud reports:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Review and take action on fraud alerts
    async reviewFraudAlert(req, res) {
        try {
            const { alertId, action } = req.body; // Action could be 'investigate', 'dismiss', etc.
            const result = await FraudDetectionService.takeActionOnFraudAlert(alertId, action);
            return res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error reviewing fraud alert:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new FraudDetectionController();
