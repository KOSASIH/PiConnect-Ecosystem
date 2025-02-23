// src/tests/unit/analyticsController.test.js

const analyticsController = require('../../backend/controllers/analyticsController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Analytics Controller', () => {
    it('should return overall analytics data', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await analyticsController.getOverallAnalytics(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            totalUsers: expect.any(Number),
            totalDonations: expect.any(Number),
            totalCharities: expect.any(Number),
        });
    });
});
