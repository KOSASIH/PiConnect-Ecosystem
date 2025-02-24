// aiRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Import your Express app
const { UserModel } = require('../models/userModel'); // Mock User model
const { TransactionModel } = require('../models/transactionModel'); // Mock Transaction model

// Mocking the UserModel and TransactionModel
jest.mock('../models/userModel');
jest.mock('../models/transactionModel');

describe('AI Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /api/recommendations', () => {
        it('should return recommendations for a user', async () => {
            // Arrange
            const userId = 'user123';
            const mockRecommendations = [
                { itemId: 'item1', score: 0.9 },
                { itemId: 'item2', score: 0.8 },
            ];
            UserModel.findById.mockResolvedValue({ interactions: [] }); // Mock user interactions
            jest.spyOn(global, 'fetch').mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(mockRecommendations),
            });

            // Act
            const response = await request(app)
                .post('/api/recommendations')
                .send({ userId });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRecommendations);
        });

        it('should return 404 if user not found', async () => {
            // Arrange
            const userId = 'user123';
            UserModel.findById.mockResolvedValue(null); // Simulate user not found

            // Act
            const response = await request(app)
                .post('/api/recommendations')
                .send({ userId });

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User  not found');
        });
    });

    describe('POST /api/sentiment', () => {
        it('should return sentiment score for a given text', async () => {
            // Arrange
            const text = 'I love this product!';
            const expectedScore = 3; // Example sentiment score

            // Act
            const response = await request(app)
                .post('/api/sentiment')
                .send({ text });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.score).toBe(expectedScore);
        });
    });

    describe('POST /api/fraud-detection', () => {
        it('should detect fraudulent transactions based on amount', async () => {
            // Arrange
            const transactionId = 'txn123';
            const mockTransaction = { amount: 15000 }; // Amount exceeds threshold
            TransactionModel.findById.mockResolvedValue(mockTransaction);

            // Act
            const response = await request(app)
                .post('/api/fraud-detection')
                .send({ transactionId });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                isFraudulent: true,
                message: 'Transaction amount exceeds threshold.',
            });
        });

        it('should not detect fraud for normal transactions', async () => {
            // Arrange
            const transactionId = 'txn456';
            const mockTransaction = { amount: 5000 }; // Amount is normal
            TransactionModel.findById.mockResolvedValue(mockTransaction);

            // Act
            const response = await request(app)
                .post('/api/fraud-detection')
                .send({ transactionId });

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                isFraudulent: false,
                message: 'Transaction is normal.',
            });
        });
    });
});
