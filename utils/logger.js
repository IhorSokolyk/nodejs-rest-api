let winston = require('winston');
require('winston-daily-rotate-file');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            colorize: true
        }),

        new (winston.transports.DailyRotateFile)({
            filename: './log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: 'debug',
            handleExceptions: true
        })
    ]
});

module.exports = logger;