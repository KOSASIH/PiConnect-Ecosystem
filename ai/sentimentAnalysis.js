const axios = require('axios');
const { SentimentAnalyzer } = require('natural');
const { PorterStemmer } = require('natural');

class SentimentAnalysis {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    }

    // Function to fetch user feedback data
    async fetchUser Feedback() {
        try {
            const response = await axios.get(this.apiUrl);
            return response.data.feedback; // Assuming the API returns an array of feedback
        } catch (error) {
            console.error('Error fetching user feedback:', error.message);
            return [];
        }
    }

    // Function to analyze sentiment of feedback
    analyzeSentiment(feedback) {
        return feedback.map(item => {
            const score = this.analyzer.getSentiment(item.text.split(' '));
            let sentiment = 'neutral';
            if (score > 0) {
                sentiment = 'positive';
            } else if (score < 0) {
                sentiment = 'negative';
            }
            return {
                text: item.text,
                score: score,
                sentiment: sentiment,
            };
        });
    }

    // Function to generate sentiment report
    generateReport(sentimentResults) {
        const report = {
            totalFeedback: sentimentResults.length,
            positive: sentimentResults.filter(result => result.sentiment === 'positive').length,
            negative: sentimentResults.filter(result => result.sentiment === 'negative').length,
            neutral: sentimentResults.filter(result => result.sentiment === 'neutral').length,
        };
        console.log('Sentiment Report:', report);
        return report;
    }

    // Main function to execute sentiment analysis
    async run() {
        const feedback = await this.fetchUser Feedback();
        const sentimentResults = this.analyzeSentiment(feedback);
        this.generateReport(sentimentResults);
    }
}

// Example usage
const apiUrl = 'https://api.example.com/user-feedback'; // Replace with actual API
const sentimentAnalysis = new SentimentAnalysis(apiUrl);
sentimentAnalysis.run()
    .catch(error => {
        console.error('Error in sentiment analysis process:', error);
    });

// Export the SentimentAnalysis class
module.exports = SentimentAnalysis;
