const User = require('../models/UserModel'),
    logger = require('../utils/logger'),
    bcrypt = require('bcryptjs');

let defaultErrorMessage = {error: 'Something went wrong'};
module.exports = {
    get(req, callback){
        User.findById(req.body.id, (err, user) =>{
            if(err) {
                logger.error(err);
                callback(defaultErrorMessage);
            } else {
                callback(user);
            }
        });
    },
    save(req, callback) {
        this.getByEmail(req, (dbUser) => {
            if (dbUser && dbUser._id) {
                logger.error('User with email: ' + req.body.email + ' already exists');
                callback({status: 202, message: 'User already exists'}); //means user already exist
            } else {
                let user = new User(req.body);
                let salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
                user.save((err, savedUser) => {
                    if (err) {
                        logger.error(err);
                        callback(defaultErrorMessage);
                    } else {
                        logger.info('Added new user to database -> ' + user.email);
                        delete savedUser.password;
                        callback(savedUser);
                    }
                });
            }
        });
    },
    getByEmail(req, callback) {
        User.findOne({'email': req.body.email}, (err, user) => {
            err && callback(defaultErrorMessage);
            callback(user);
        })
    },
    update(req, callback) {
        if (req.body.password && req.body.password.length < 30) {
            let salt = bcrypt.genSaltSync(10);
            req.body.Password = bcrypt.hashSync(req.body.Password, salt);
        }
        User.update({'_id': req.body._id}, {$set: req.body}, (err, user) => {
            err && callback(defaultErrorMessage);
            callback(user);
        });
    },
    login(req, callback) {
        User.findOne({email: req.body.email}, (err, user) => {
            err && callback(defaultErrorMessage);
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                    (isSame && callback(user)) || callback({error: 401});
                });
            } else {
                callback({error: 401});
            }
        });
    }
};
