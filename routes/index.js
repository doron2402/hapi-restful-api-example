module.exports = [
    {
        register: require('./tasks'),
        options: {
            database: OT.database
        }
    },{
        register: require('./users'),
        options: {
            database: OT.database
        }
    }
];