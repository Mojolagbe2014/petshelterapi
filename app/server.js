'use strict';

import config from '../config/config';
import Knex from './knex';          
import routes from './routes';

const Hapi = require('hapi');       // create an instance of hapi
const Joi = require('joi');
const server = new Hapi.Server();   // create our server

// ------------------
// configure the port
// ------------------
server.connection({  
    port: config.port,
    host: config.host,
    routes: { cors: true }
});

// --------------
// Load Routes
// -------------- 
routes.forEach(route => {
    console.log(`attaching ${route.path}`);
    server.route(route);
});

// ------------------
// Start The Server
// ------------------
server.start(error => {  
    if (error) {
        console.error(error);
    }
    console.log(`Server started at ${server.info.uri }`);
    console.log(`App running on port ${config.port}...`);
});