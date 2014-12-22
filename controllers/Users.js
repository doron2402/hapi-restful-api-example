'use strict';

var Boom = require('boom');
var UsersModel = OT.Models.users;

function UsersController(database) {
    this.usersModel = new UsersModel(database);
};

// [GET] /users
UsersController.prototype.index = function(request, reply) {
    var start = request.query.start;
    var limit = request.query.limit;

    if (start == null) {
        start = 0
    }

    if (limit == null) {
        limit = start + 9
    }

    reply(this.usersModel.getUsers(start, limit));
};

// [GET] /users/{id}
UsersController.prototype.profile = function(request, reply) {
    try {
        var id = request.params.id;
        reply(this.usersModel.getUserById(id));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

UsersController.prototype.destroy = function(request, reply) {
     try {
        var id = parseInt(request.params.id);
        this.usersModel.deleteUserById(id);
        reply().code(204);

    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = UsersController;
