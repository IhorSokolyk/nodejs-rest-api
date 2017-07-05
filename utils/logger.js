let winston = require('winston');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({level: 'debug', handleExceptions: true}),

        new (winston.transports.File)({
            filename: 'server_logs.log',
            level: 'debug',
            handleExceptions: true
        })
    ]
});

module.exports = logger;