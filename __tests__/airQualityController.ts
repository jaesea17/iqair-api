import 'dotenv/config';
import app from '../src/app';

import supertest from 'supertest';

import db from '../src/config/database.config';
import { requestCron } from '../src/controller/airQualityController';

const request = supertest(app);

beforeAll(async () => {
    await db.sync({ force: true }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Database connected successfully to test');
    });
});

describe('it should test the APIs', () => {
    it('should get result using IP', async () => {
        const response = await request.get('/api/air-quality/ip')
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successful Retrieval');
        expect(response.body).toHaveProperty('details');
    });

    it('should get result using GPS', async () => {
        const response = await request.get('/api/air-quality/gps')
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successful Retrieval');
        expect(response.body).toHaveProperty('details');
    });
    requestCron.stop();
})