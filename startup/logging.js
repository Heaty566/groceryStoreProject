const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = () => {
    process.on('unhandledRejection', (err) => {
        winston.error(err);
    });
    
    process.on('uncaughtException', (err) => {
        winston.error(err);
    });
    
    
    winston.add( new (winston.transports.File)({filename: "logfile.log", level: "info"}));
    winston.add( new (winston.transports.MongoDB)({db: "mongodb://localhost/grocery"}));    
};