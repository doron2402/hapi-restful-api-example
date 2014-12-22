'use strict';
var is_prod = false;
var env = 'dev';
if (process.env.NODE_ENV && process.env.NODE_ENV.indexOf('prod') !== -1) {
    is_prod = true;
    env = 'prod';
}

if (!global.OT) {
    global.OT = {};
}

OT.Settings = require('./settings').getSettings(env);

var Database = require('./database');
var Hapi = require('hapi');

var database = new Database();
var server = new Hapi.Server({debug: {request: ['info', 'error']}});

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// Create server
server.connection(OT.Settings.server);

// Add routes
var plugins = [
    {
        register: require('./routes/tasks.js'),
        options: {
            database: database
        }
    },{
        register: require('./routes/users.js'),
        options: {
            database: database
        }
    }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        server.start(function(err) {
            if (err) { throw err; }

            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
