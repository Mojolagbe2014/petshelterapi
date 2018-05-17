import Knex from './knex';
import GUID from 'node-uuid';  // uuid module can be used instead

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
            const read = Knex('pets').where({status: true})
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
            const guid = GUID.v4();
            const create = Knex('pets').insert({
                name: pet.name,
                species: pet.species,
                picture_url: pet.picture_url,
                guid,
            }).then(res => {
                response({
                    data: guid,
                    message: `Pet (${pet.name}) successfully added.`
                });
            }).catch(error => {
                reply(`Server-Side Error >> ${error}`);
            });
        }
    },
];
export default routes;