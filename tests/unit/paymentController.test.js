// tests/unit/paymentController.test.js

const paymentController = require('../../backend/controllers/paymentController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Payment Controller', () => {
    it('should process a payment successfully', async () => {
        const req = mockRequest({
            body: {
                amount: 100,
                charityId: 'charity123',
                userId: 'user123',
            },
        });
        const res = mockResponse();

        await paymentController.processPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Payment processed successfully',
            transactionId: expect.any(String),
        });
    });

    it('should return an error for invalid payment amount', async () => {
        const req = mockRequest({
            body: {
                amount: -50,
                charityId: 'charity123',
                userId: 'user123',
            },
        });
        const res = mockResponse();

        await paymentController.processPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid payment amount',
        });
    });
});
