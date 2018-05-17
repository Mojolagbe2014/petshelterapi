import Knex from './knex';
const Joi = require('joi');

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
        
        path: '/pets',
        method: 'POST',
        handler: (request, response) => {
            const pet = request.payload;  // formdata or json
            const create = Knex('pets').insert({
                name: pet.name,
                type: pet.type,
                breed: pet.breed,
                location: pet.location,
                latitude: pet.latitude,
                longitude: pet.longitude,
                picture_url: pet.picture_url,
                status: true
            }).then(result => {
                response({
                    message: `Pet (${pet.name}) successfully added.`
                });
            }).catch(error => {
                reply(`Server-Side Error >> ${error}`);
            });
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().alphanum().min(3).max(100).required(),
                    type: Joi.string().min(3).max(100).required(),
                    breed: Joi.string().min(3).max(100).required(),
                    location: Joi.string().min(3).max(100).required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    picture_url: Joi.string().uri().trim().required()
                }
            }
        }
    }
];
export default routes;