// fraudController.test.js

const fraudController = require('./fraudController'); // Import the fraud controller
const { FraudModel } = require('../models/fraudModel'); // Mock Fraud model
const { TransactionModel } = require('../models/transactionModel'); // Mock Transaction model

// Mocking the FraudModel and TransactionModel
jest.mock('../models/fraudModel');
jest.mock('../models/transactionModel');

describe('Fraud Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('logFraudReport', () => {
        it('should log a fraud report successfully', async () => {
            // Arrange
            const userId = 'user123';
            const transactionId = 'txn123';
            const reason = 'Suspicious activity';
            TransactionModel.findById.mockResolvedValue({ _id: transactionId });

            // Act
            const result = await fraudController.logFraudReport(userId, transactionId, reason);

            // Assert
            expect(FraudModel).toHaveBeenCalledWith({
                userId,
                transactionId,
                reportedBy: userId,
                reason,
                status: 'pending',
            });
            expect(result).toBeDefined();
        });

        it('should throw an error if the transaction is not found', async () => {
            // Arrange
            const userId = 'user123';
            const transactionId = 'txn123';
            const reason = 'Suspicious activity';
            TransactionModel.findById.mockResolvedValue(null); // Simulate transaction not found

            // Act & Assert
            await expect(fraudController.logFraudReport(userId, transactionId, reason)).rejects.toThrow('Transaction not found');
        });
    });

    describe('analyzeRecentTransactions', () => {
        it('should analyze recent transactions and create fraud alerts', async () => {
            // Arrange
            const mockTransactions = [
                { _id: 'txn1', amount: 15000 },
                { _id: 'txn2', amount: 5000 },
            ];
            TransactionModel.find.mockResolvedValue(mockTransactions);
            jest.spyOn(fraudController, 'isTransactionFraudulent').mockResolvedValue(true); // Mock fraud detection

            // Act
            const alerts = await fraudController.analyzeRecentTransactions();

            // Assert
            expect(alerts).toHaveLength(1); // Only one transaction should trigger a fraud alert
            expect(FraudModel).toHaveBeenCalledWith(expect.objectContaining({
                transactionId: 'txn1',
                status: 'investigating',
            }));
        });
    });

    describe('isTransactionFraudulent', () => {
        it('should return true for fraudulent transactions', async () => {
            // Arrange
            const transaction = { amount: 20000 }; // Amount exceeds threshold

            // Act
            const result = await fraudController.isTransactionFraudulent(transaction);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false for normal transactions', async () => {
            // Arrange
            const transaction = { amount: 5000 }; // Amount is normal

            // Act
            const result = await fraudController.isTransactionFraudulent(transaction);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('getFraudReportsByUser ', () => {
        it('should return fraud reports for a specific user', async () => {
            // Arrange
            const userId = 'user123';
            const mockReports = [{ _id: 'report1' }, { _id: 'report2' }];
            FraudModel.find.mockResolvedValue(mockReports);

            // Act
            const reports = await fraudController.getFraudReportsByUser (userId);

            // Assert
            expect(reports).toEqual(mockReports);
            expect(FraudModel.find).toHaveBeenCalledWith({ userId });
        });
    });
});
