// aiRoutes.js

const express = require('express');
const router = express.Router();
const AIController = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateRecommendationInput, validateFeedbackInput } = require('../middleware/inputValidationMiddleware');

// Route to get personalized recommendations for a user
router.get('/recommendations', authMiddleware, async (req, res) => {
    try {
        await AIController.getPersonalizedRecommendations(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching recommendations' });
    }
});

// Route to analyze user feedback for sentiment
router.post('/feedback/analyze', authMiddleware, validateFeedbackInput, async (req, res) => {
    try {
        await AIController.analyzeUser Feedback(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error analyzing feedback' });
    }
});

// Route to get user behavior analysis
router.get('/behavior/analysis', authMiddleware, async (req, res) => {
    try {
        await AIController.getUser BehaviorAnalysis(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user behavior analysis' });
    }
});

// Route to get community engagement analysis
router.get('/community/engagement/:communityId', authMiddleware, async (req, res) => {
    try {
        await AIController.getCommunityEngagementAnalysis(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching community engagement analysis' });
    }
});

// Route to get AI-driven insights
router.get('/insights', authMiddleware, async (req, res) => {
    try {
        const insights = await AIController.getAIInsights(req.user.id); // Assuming user ID is available
        res.status(200).json({ success: true, insights });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching AI insights' });
    }
});

// Route to update user preferences for recommendations
router.put('/preferences', authMiddleware, validateRecommendationInput, async (req, res) => {
    try {
        const updatedPreferences = await AIController.updateUser Preferences(req.user.id, req.body);
        res.status(200).json({ success: true, updatedPreferences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating preferences' });
    }
});

module.exports = router;
