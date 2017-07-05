const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('./utils/logger'),
    userRouter = require('./routers/UserRouter');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.listen(8080);

mongoose.connect('mongodb://localhost:27017/portfolio');


