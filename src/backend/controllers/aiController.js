// aiController.js

const UserService = require('../services/userService');
const RecommendationService = require('../services/aiService');
const SentimentAnalysisService = require('../services/sentimentAnalysisService');
const { validateUser Input } = require('../middleware/inputValidationMiddleware');

// AI Controller for handling AI-driven features and recommendations

class AIController {
    // Get personalized recommendations for a user
    async getPersonalizedRecommendations(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in the request
            const userPreferences = await UserService.getUser Preferences(userId);
            const recommendations = await RecommendationService.generateRecommendations(userPreferences);
            return res.status(200).json({ success: true, recommendations });
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Analyze user feedback for sentiment
    async analyzeUser Feedback(req, res) {
        try {
            const { feedback } = req.body;
            validateUser Input(feedback); // Validate input
            const sentimentScore = await SentimentAnalysisService.analyzeSentiment(feedback);
            return res.status(200).json({ success: true, sentimentScore });
        } catch (error) {
            console.error('Error analyzing feedback:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get user behavior analysis
    async getUser BehaviorAnalysis(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in the request
            const behaviorData = await UserService.getUser BehaviorData(userId);
            const analysisResults = await RecommendationService.analyzeUser Behavior(behaviorData);
            return res.status(200).json({ success: true, analysisResults });
        } catch (error) {
            console.error('Error fetching user behavior analysis:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Get community engagement analysis
    async getCommunityEngagementAnalysis(req, res) {
        try {
            const communityId = req.params.communityId; // Get community ID from request parameters
            const engagementData = await UserService.getCommunityEngagementData(communityId);
            const analysisResults = await RecommendationService.analyzeCommunityEngagement(engagementData);
            return res.status(200).json({ success: true, analysisResults });
        } catch (error) {
            console.error('Error fetching community engagement analysis:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

module.exports = new AIController();
