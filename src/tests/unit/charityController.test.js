// src/tests/unit/charityController.test.js

const charityController = require('../../backend/controllers/charityController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Charity Controller', () => {
    it('should create a new charity successfully', async () => {
        const req = mockRequest({
            body: {
                name: 'Charity Name',
                description: 'Charity Description',
            },
        });
        const res = mockResponse();

        await charityController.createCharity(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            charity: {
                id: expect.any(String),
                name: 'Charity Name',
                description: 'Charity Description',
            },
        });
    });

    it('should return an error for missing charity name', async () => {
        const req = mockRequest({
            body: {
                description: 'Charity Description',
            },
        });
        const res = mockResponse();

        await charityController.createCharity(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Charity name is required',
        });
    });
});
