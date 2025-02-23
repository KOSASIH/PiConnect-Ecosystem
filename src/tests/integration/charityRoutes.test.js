// src/tests/integration/charityRoutes.test.js

const request = require('supertest');
const app = require('../../backend/app'); // Import your Express app

describe('Charity Routes', () => {
    it('should create a new charity successfully', async () => {
        const response = await request(app)
            .post('/api/charities')
            .send({
                name: 'Charity Name',
                description: 'Charity Description',
            });

        expect(response.status).toBe(201);
        expect(response.body.charity).toEqual({
            id: expect.any(String),
            name: 'Charity Name',
            description: 'Charity Description',
        });
    });

    it('should return an error for missing charity name', async () => {
        const response = await request(app)
            .post('/api/charities')
            .send({
                description: 'Charity Description',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'Charity name is required',
        });
    });
});
