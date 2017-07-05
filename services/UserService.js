const User = require('../models/UserModel'),
    logger = require('../utils/logger'),
    bcrypt = require('bcryptjs');

let defaultErrorMessage = {error: 'Something went wrong'};
module.exports = {
    get(req, callback){
        User.findById(req.body.id, '-password -__v', (err, user) => {
            err && (logger.error(err) && callback(defaultErrorMessage));
            callback(user);
        });
    },
    save(req, callback) {
        this.getByEmail(req, (dbUser) => {
            if (dbUser && dbUser._id) {
                logger.error('User with email: ' + req.body.email + ' already exists');
                callback({status: 202, message: 'User already exists'});
            } else {
                let user = new User(req.body);
                let salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
                user.createdAt = new Date();
                user.updatedAt = new Date();
                user.save((err, savedUser) => {
                    err && (logger.error(err) && callback(defaultErrorMessage));
                    logger.info('Added new user to database -> ' + user.email);
                    savedUser.password = undefined;
                    callback(savedUser);
                });
            }
        });
    },
    getByEmail(req, callback) {
        User.findOne({'email': req.body.email}, '-password -__v', (err, user) => {
            err && (logger.error(err) && callback(defaultErrorMessage));
            callback(user);
        })
    },
    update(req, callback) {
        if (req.body.password && req.body.password.length < 30) {
            let salt = bcrypt.genSaltSync(10);
            req.body.Password = bcrypt.hashSync(req.body.Password, salt);
        }
        User.update({'_id': req.body._id}, {$set: req.body}, (err, user) => {
            err && (logger.error(err) && callback(defaultErrorMessage));
            callback(user);
        });
    },
    login(req, callback) {
        User.findOne({email: req.body.email}, '-__v', (err, user) => {
            err && (logger.error(err) && callback(defaultErrorMessage));
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                    if (isSame) {
                        user.password = undefined;
                        callback(user);
                    } else {
                        callback({error: 401, message: 'Not authorized'});
                    }
                });
            } else {
                callback({error: 401, message: 'Not authorized'});
            }
        });
    }
};
