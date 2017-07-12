const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('./utils/logger'),
    morgan = require('morgan'),
    userRouter = require('./routers/UserRouter'),
    config = require('./config');
let User = require('./models/User');

app.set('superSecret', config.secret);
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use('/user', userRouter);

app.listen(8080);

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});

module.exports = app;
