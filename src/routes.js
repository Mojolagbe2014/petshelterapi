import Knex from './knex';

const routes = [
    {  
        method: 'GET',
        path: '/',
        handler: (request, response) => response('Welcome to Pet Shelter API')
    },
    {  
        method: 'GET',
        path: '/welcome/{name}',
        handler: (request, response) => response(`Welcome ${request.params.name} to Pet Shelter API`)
    },
    {
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
                        count: results.length,
                        pets: results,
                    });

                })
                .catch(error => {
                    reply('Server-Side Error >> '+error);
                });

        }
    },
    {
        method: "POST",
        path: "/pets",
        handler: (request, response) => {
            const {pet} = request.payload;
        }
    },
];
export default routes;