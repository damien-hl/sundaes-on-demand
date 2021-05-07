const fastify = require('fastify');
const path = require('path');
const fs = require('fs');

/**
 * @param {import('fastify').FastifyServerOptions} options
 * @returns {import('fastify').FastifyInstance}
 */
const createApp = (options) => {
    /** @type {import('fastify').FastifyInstance} */
    const app = fastify(options);

    app.register(require('fastify-cors'), {
        origin: 'http://localhost:3000',
        credentials: true
    });

    app.register(require('fastify-static'), {
        root: path.join(__dirname, 'public')
    });

    const sundaeOptionsRaw = fs.readFileSync('./sundae-options.json', 'utf-8');
    const sundaeOptions = JSON.parse(sundaeOptionsRaw);

    app.get('/scoops', (req, res) => {
        res.code(200).send(sundaeOptions.iceCreamFlavors)
    });

    app.get('/toppings', (req, res) => {
        res.code(200).send(sundaeOptions.toppings)
    });

    app.post('/order', (req, res) => {
        const orderNumber = Math.floor(Math.random() * 10000000000);

        res.code(201).send({ orderNumber });
    });

    return app;
}

module.exports = createApp;
