'use strict';

var crypto = require('crypto');

function UsersModel(database) {
    this.db = database;
};

UsersModel.prototype.getAllUsers = function() {
    return this.db.get('users') || [];
};

UsersModel.prototype.findUserByProperty = function(prop, value) {
    var user, i, len;
    var users = this.getAllUsers();

    for (i = 0, len = users.length; i < len; i++) {
        user = users[i];
        if (user[prop] === value) {
            return user;
        }
    }

    return null;
};

UsersModel.prototype.getUsers = function(start, limit) {
    var users = this.getAllUsers();
    return users.slice(start, limit + 1);
};

UsersModel.prototype.getUserById = function(id) {
    var task = this.findUserByProperty('id', id);

    if (!task) {
        throw new Error('User doesn\'t exists.');
    }

    return task;
};


module.exports = UsersModel;
