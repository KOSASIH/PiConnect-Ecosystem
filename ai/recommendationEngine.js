const { createClient } = require('redis');
const axios = require('axios');

class RecommendationEngine {
    constructor(redisUrl, apiUrl) {
        this.redisClient = createClient({ url: redisUrl });
        this.apiUrl = apiUrl;
        this.init();
    }

    // Initialize the Redis client
    async init() {
        await this.redisClient.connect();
        console.log('Connected to Redis');
    }

    // Function to get user preferences from Redis
    async getUser Preferences(userId) {
        const preferences = await this.redisClient.hGetAll(`user:${userId}:preferences`);
        return preferences;
    }

    // Function to fetch items from the API
    async fetchItems() {
        try {
            const response = await axios.get(this.apiUrl);
            return response.data.items; // Assuming the API returns an array of items
        } catch (error) {
            console.error('Error fetching items:', error.message);
            return [];
        }
    }

    // Function to generate recommendations based on user preferences
    async generateRecommendations(userId) {
        const preferences = await this.getUser Preferences(userId);
        const items = await this.fetchItems();

        // Simple recommendation logic based on preferences
        const recommendations = items.filter(item => {
            return preferences.categories.includes(item.category);
        });

        return recommendations;
    }

    // Function to save user preferences
    async saveUser Preferences(userId, preferences) {
        await this.redisClient.hSet(`user:${userId}:preferences`, preferences);
        console.log(`Preferences saved for user ${userId}`);
    }

    // Function to close the Redis connection
    async close() {
        await this.redisClient.quit();
        console.log('Disconnected from Redis');
    }
}

// Example usage
const redisUrl = 'redis://localhost:6379';
const apiUrl = 'https://api.example.com/items';
const recommendationEngine = new RecommendationEngine(redisUrl, apiUrl);

// Generate recommendations for a user
const userId = 'user123';
recommendationEngine.generateRecommendations(userId)
    .then(recommendations => {
        console.log('Recommendations:', recommendations);
    })
    .catch(error => {
        console.error('Error generating recommendations:', error);
    });

// Export the RecommendationEngine class
module.exports = RecommendationEngine;
