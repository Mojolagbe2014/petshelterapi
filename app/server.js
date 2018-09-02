'use strict';

// ---------------------
// import required files
// ----------------------
var config = require('../config/config');
var Knex = require('./knex');
const routes = require('./routes');
const Hapi = require('hapi');       // create an instance of hapi
const Joi = require('joi');
const server = new Hapi.Server();   // create our server

// ----------------
// api author info
// ----------------
const author    = require('../config/author');

// -------------------------
// set connection parameters
// -------------------------
var connecParams = (config.env === 'production')  ?   { port: process.env.PORT, routes: { cors: true } }
                : {port: config.port, host:config.host, routes: { cors: true }};

// ------------------
// configure the port
// ------------------
server.connection(connecParams);

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