'use strict';

const PORT = 3030;

/**
 * @type {import('fastify').FastifyInstance}
 */
const server = require('./app')({
    logger: {
        level: 'info'
    }
});

server.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
});
