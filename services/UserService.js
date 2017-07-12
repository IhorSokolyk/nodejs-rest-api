const User = require('../models/User'),
    logger = require('../utils/logger'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

let defaultErrorMessage = {error: 'Something went wrong. Try again later.'};
module.exports = {
    get(req, res, done){
        User.findById(req.params.id, '-password -__v').then((user) => {
            if (user) {
                done(null, user);
            } else {
                res.status(404);
                done({error: 'User not found'}, null);
            }
        }, (err) => {
            logger.error(err) && done(defaultErrorMessage, null);
        });
    },
    save(req, res, done) {
        this.getByEmail(req, (err, dbUser) => {
            if (dbUser && dbUser._id) {
                logger.error('User with email: ' + req.body.email + ' already exists');
                res.status(202);
                done({status: 'Failed', message: 'User already exists'}, null);
            } else {
                let user = new User(req.body);
                let salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
                user.save().then((savedUser) => {
                    logger.info('Added new user to database -> ' + user.email);
                    savedUser.password = undefined;
                    done(null, savedUser);
                }, (err) => {
                    logger.error(err) && done(defaultErrorMessage, null);
                });
            }
        });
    },
    update(req, res, done) {
        User.findById(req.body.userId).then((user) => {
            req.body.updatedAt = Date.now();
            Object.assign(user, req.body).save().then((updatedUser) => {
                res.status(200);
                done(null, updatedUser);
            }, (err) => {
                logger.error(err) && done(defaultErrorMessage, null);
            })
        }, (err)=> {
            logger.error(err) && done(defaultErrorMessage, null);
        })
    },
    getByEmail(req, done) {
        User.findOne({'email': req.body.email}, '-password -__v').then((user) => {
            if (user) {
                done(null, user);
            } else {
                done({error: 'User not found'}, null);
            }
        }, (err) => {
            logger.error(err) && done(defaultErrorMessage, null);
        });
    },
    login(req, res, done) {
        User.findOne({email: req.body.email}, 'password email _id').then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                    if (isSame) {
                        user.password = undefined;
                        let token = jwt.sign({email: user.email, id: user._id}, config.secret);
                        done(null, {userId: user._id, accessToken: token});
                    } else {
                        res.status(401);
                        done({error: 'Not authorized'}, null);
                    }
                });
            } else {
                res.status(401);
                done({error: 'User not found'}, null);
            }
        }, (err) => {
            logger.error(err) && done(defaultErrorMessage, null);
        });
    }
};
