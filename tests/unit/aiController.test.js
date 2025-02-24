// aiController.test.js

const aiController = require('./aiController'); // Import the AI controller
const { UserModel } = require('../models/userModel'); // Mock User model
const { TransactionModel } = require('../models/transactionModel'); // Mock Transaction model

// Mocking the UserModel and TransactionModel
jest.mock('../models/userModel');
jest.mock('../models/transactionModel');

describe('AI Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('generateRecommendations', () => {
        it('should return recommendations for a user', async () => {
            // Arrange
            const userId = '12345';
            const mockInteractions = [
                { features: [1, 2, 3], label: 1, itemId: 'item1' },
                { features: [4, 5, 6], label: 0, itemId: 'item2' },
            ];
            UserModel.findById.mockResolvedValue({ interactions: mockInteractions });

            // Act
            const recommendations = await aiController.generateRecommendations(userId);

            // Assert
            expect(recommendations).toBeDefined();
            expect(recommendations.length).toBe(2); // Assuming we expect 2 recommendations
            expect(recommendations[0]).toHaveProperty('itemId');
            expect(recommendations[0]).toHaveProperty('score');
        });
    });

    describe('analyzeSentiment', () => {
        it('should return a sentiment score for a given text', () => {
            // Arrange
            const text = 'I love this product!';
            const expectedScore = 3; // Assuming a positive sentiment score

            // Act
            const score = aiController.analyzeSentiment(text);

            // Assert
            expect(score).toBe(expectedScore);
        });
    });

    describe('detectFraud', () => {
        it('should detect fraudulent transactions based on amount', async () => {
            // Arrange
            const transactionId = 'txn123';
            const mockTransaction = { amount: 15000 }; // Amount exceeds threshold
            TransactionModel.findById.mockResolvedValue(mockTransaction);

            // Act
            const result = await aiController.detectFraud(transactionId);

            // Assert
            expect(result).toEqual({
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
            const result = await aiController.detectFraud(transactionId);

            // Assert
            expect(result).toEqual({
                isFraudulent: false,
                message: 'Transaction is normal.',
            });
        });
    });
});
