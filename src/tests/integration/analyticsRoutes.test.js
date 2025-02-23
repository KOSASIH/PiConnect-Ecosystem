// src/tests/integration/analyticsRoutes.test.js

const request = require('supertest');
const app = require('../../backend/app'); // Import your Express app

describe('Analytics Routes', () => {
    it('should return overall analytics data', async () => {
        const response = await request(app)
            .get('/api/analytics/overview');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            totalUsers: expect.any(Number),
            totalDonations: expect.any(Number),
            totalCharities: expect.any(Number),
        });
    });
});
