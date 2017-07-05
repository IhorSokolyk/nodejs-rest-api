const express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('./utils/logger'),
    userRouter = require('./routers/UserRouter');

router.get('/api', (req, res) => {
    res.send('Welcome to NodeJS app!');
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);
app.use('/user', userRouter);

app.listen(8080);

db.on('error', logger.error);
db.once('open', () => {
    logger.info('Server was successfully connected to database \'portfolio\'!');
});
mongoose.connect('mongodb://localhost:27017/portfolio');


