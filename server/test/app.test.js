const request = require('supertest');
const createApp = require('../app.js');

let fastify;

describe('Test server', () => {
    beforeEach(async () => {
        fastify = createApp();
        await fastify.ready();
        global.agent = request.agent(fastify.server);
    });

    afterEach(async () => {
        await fastify.close();
    });

    describe('ice cream flavors', () => {
        test('responds with status 200 the GET method', async () => {
            const response = await request(fastify.server)
                .get('/scoops');

            expect(response.statusCode).toBe(200);
        });

        test('response has expected number of ice cream flavors, and each has a name and image', async () => {
            const response = await request(fastify.server)
                .get('/scoops');

            expect(response.body.length).toBe(4);

            response.body.forEach(flavor => {
                expect(typeof flavor.name).toBe('string');
                expect(typeof flavor.imagePath).toBe('string');
            });
        });
    });

    describe('toppings', () => {
        test('responds with status 200 the GET method', async () => {
            const response = await request(fastify.server)
                .get('/toppings');

            expect(response.statusCode).toBe(200);
        });

        test('response has expected number of ice cream toppings, and each has a name and image', async () => {
            const response = await request(fastify.server)
                .get('/toppings');

            expect(response.body.length).toBe(6);

            response.body.forEach(flavor => {
                expect(typeof flavor.name).toBe('string');
                expect(typeof flavor.imagePath).toBe('string');
            });
        });
    });

    describe('order number generator', () => {
        test('returns 201 for POST', async () => {
            const response = await request(fastify.server)
                .post('/order');

            expect(response.statusCode).toBe(201);
        });

        test('returns random "order number" for POST', async () => {
            const response = await request(fastify.server)
                .post('/order');

            const orderNumber = response.body.orderNumber;

            expect(orderNumber).toBeLessThan(10000000000);
            expect(orderNumber).toBeGreaterThan(0);
        });
    });
});