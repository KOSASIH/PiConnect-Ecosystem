// tests/integration/paymentRoutes.test.js

const request = require('supertest');
const app = require('../../backend/app'); // Import your Express app

describe('Payment Routes', () => {
    it('should process a payment successfully', async () => {
        const response = await request(app)
            .post('/api/payments')
            .send({
                amount: 100,
                charityId: 'charity123',
                userId: 'user123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Payment processed successfully',
            transactionId: expect.any(String),
        });
    });

    it('should return an error for invalid payment amount', async () => {
        const response = await request(app)
            .post('/api/payments')
            .send({
                amount: -50,
                charityId: 'charity123',
                userId: 'user123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'Invalid payment amount',
        });
    });
});
