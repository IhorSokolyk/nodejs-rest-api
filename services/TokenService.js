const Token = require('../models/Token'),
    logger = require('../utils/logger');

let defaultErrorMessage = {error: 'Something went wrong'};

module.exports = {

    get(token, done) {
        Token.findOne({'accessToken': token}).then((token) => {
            done(null, token);
        }, (err) => {
            logger.error(err);
            done(defaultErrorMessage, null);
        });
    },
    save(req, done) {
        let token = new Token(req);
        token.save().then((token) => {
            token._id = undefined;
            done(null, token);
        }, (err) => {
            logger.error(err);
            done(defaultErrorMessage, null);
        });
    },
    delete(req, done) {
        Token.remove({'accessToken': req.headers['authorization']}).then((success) => {
            done(null, {status: 'success', message: 'Successfully logged out'});
        }, (err) => {
            logger.error(err);
            done(defaultErrorMessage, null);
        })
    }

};