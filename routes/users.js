'use strict';

// Tasks routes
var Joi = require('joi');
var UsersController = require('../controllers/Users');

exports.register = function(server, options, next) {
    // Setup the controller
    var usersController = new UsersController(options.database);

    server.bind(usersController);

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/users',
            config: {
                handler: usersController.index,
                validate: {
                    query: Joi.object().keys({
                        start: Joi.number().min(0),
                        limit: Joi.number().min(1)
                    })
                }
            }
        },
        {
            method: 'GET',
            path: '/users/{id}',
            config: {
                handler: usersController.profile,
                validate: {
                    params: {
                        id: Joi.number().required()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/users/{id}',
            config: {
                handler: usersController.destroy,
                validate: {
                    params: {
                        id: Joi.number().required()
                    }
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes-users',
    version: '1.0.1'
};
