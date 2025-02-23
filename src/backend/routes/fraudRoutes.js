// fraudRoutes.js

const express = require('express');
const router = express.Router();
const FraudDetectionController = require('../controllers/fraudDetectionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateFraudReportInput } = require('../middleware/inputValidationMiddleware');

// Route to report potential fraud
router.post('/report', authMiddleware, validateFraudReportInput, async (req, res) => {
    try {
        await FraudDetectionController.reportFraud(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error reporting fraud' });
    }
});

// Route to analyze recent transactions for potential fraud
router.get('/analyze', authMiddleware, async (req, res) => {
    try {
        await FraudDetectionController.analyzeTransactions(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error analyzing transactions' });
    }
});

// Route to get fraud reports for a user
router.get('/reports', authMiddleware, async (req, res) => {
    try {
        await FraudDetectionController.getUser FraudReports(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching fraud reports' });
    }
});

// Route to review and take action on a fraud alert
router.put('/alerts/:alertId', authMiddleware, async (req, res) => {
    try {
        await FraudDetectionController.reviewFraudAlert(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error reviewing fraud alert' });
    }
});

// Route to get all fraud alerts (admin only)
router.get('/alerts', authMiddleware, async (req, res) => {
    try {
        // Assuming there's an admin check in the middleware
        await FraudDetectionController.getAllFraudAlerts(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching fraud alerts' });
    }
});

module.exports = router;
