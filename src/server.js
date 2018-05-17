import Knex from './knex';

const Hapi = require('hapi');

// create our server
const server = new Hapi.Server();

// configure the port
server.connection({  
    port: 8000,
    host: 'localhost'
});

// basic routes
server.route({  
    method: 'GET',
    path: '/',
    handler: (request, response) => response('Welcome to Pet Shelter API')
});

server.route({  
    method: 'GET',
    path: '/welcome/{name}',
    handler: (request, response) => response(`Welcome ${request.params.name} to Pet Shelter API`)
});

server.route( {
    path: '/pets',
    method: 'GET',
    handler: (request, response) => {
        const getOperation = Knex('pets').where({status: true})
            .select('name','type','breed','location', 'longitude', 'latitude','picture_url' )
            .then(results => {
                if(!results || results.length === 0) {
                    response({
                        error: true,
                        errMessage: 'No pets found!',
                    });
                }
                response({
                    dataCount: results.length,
                    data: results,
                });

            })
            .catch(error => {
                reply('Server-Side Error >> '+error);
            });

}
} );

// start the server
server.start((err) => {  
    if (err) {
        console.error(err);
    }

    console.log('App running on port 8000...');
});