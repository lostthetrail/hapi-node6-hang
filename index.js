'use strict';

const Hapi = require('hapi');
const hoek = require('hoek');

const server = new Hapi.Server();

// Configure server connection properties
server.connection({
    port: process.env.NODE_PORT || 8080,
    host: process.env.HOSTNAME || '0.0.0.0'
});

server.register({
    register: require('good'),
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', connection: '*', request: '*'}]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, function registerPlugins(err) {
    hoek.assert(!err, err);

    server.route({
        method: 'GET',
        path: '/',
        handler: function handleBad(request, reply) {
            request.example.poor.coding(); // Force an exception by writing poor code.
            reply('OK');
        }
    });

    server.start(function serverInit(serr) {
        hoek.assert(!serr, serr);
        server.log('info', `Access the server at: ${server.info.uri}`);
        server.log('info', `Once loaded, refresh and enjoy the request hang.`);
    });
});
