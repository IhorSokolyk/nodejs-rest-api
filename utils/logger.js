let winston = require('winston');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            colorize: true}),

        new (winston.transports.File)({
            filename: 'server_logs.log',
            level: 'debug',
            handleExceptions: true,
            maxsize: 10000,
            maxFiles: 10
        })
    ]
});

module.exports = logger;