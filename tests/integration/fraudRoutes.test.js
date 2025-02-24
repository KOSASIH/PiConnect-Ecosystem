// fraudRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Import your Express app
const { FraudModel } = require('../models/fraudModel'); // Mock Fraud model
const { TransactionModel } = require('../models/transactionModel'); // Mock Transaction model

// Mocking the FraudModel and TransactionModel
jest.mock('../models/fraudModel');
jest.mock('../models/transactionModel');

describe('Fraud Detection Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /api/fraud-report', () => {
        it('should log a fraud report successfully', async () => {
            // Arrange
            const userId = 'user123';
            const transactionId = 'txn123';
            const reason = 'Suspicious activity';
            TransactionModel.findById.mockResolvedValue({ _id: transactionId }); // Mock transaction found
            FraudModel.prototype.save = jest.fn().mockResolvedValue({ userId, transactionId, reason, status: 'pending' });

            // Act
            const response = await request(app)
                .post('/api/fraud-report')
                .send({ userId, transactionId, reason });

            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ userId, transactionId, reason, status: 'pending' });
        });

        it('should return 404 if the transaction is not found', async () => {
            // Arrange
            const userId = 'user123';
            const transactionId = 'txn123';
            const reason = 'Suspicious activity';
            TransactionModel.findById.mockResolvedValue(null); // Simulate transaction not found

            // Act
            const response = await request(app)
                .post('/api/fraud-report')
                .send({ userId, transactionId, reason });

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Transaction not found');
        });
    });

    describe('GET /api/fraud-reports/:userId', () => {
        it('should return fraud reports for a specific user', async () => {
            // Arrange
            const userId = 'user123';
            const mockReports = [{ _id: 'report1', userId }, { _id: 'report2', userId }];
            FraudModel.find.mockResolvedValue(mockReports);

            // Act
            const response = await request(app)
                .get(`/api/fraud-reports/${userId}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockReports);
        });

        it('should return 404 if no reports are found for the user', async () => {
            // Arrange
            const userId = 'user123';
            FraudModel.find.mockResolvedValue([]); // Simulate no reports found

            // Act
            const response = await request(app)
                .get(`/api/fraud-reports/${userId}`);

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No fraud reports found for this user');
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
