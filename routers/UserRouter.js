const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    UserService = require('../services/UserService'),
    config = require('../config');

router.post('/save', (req, res) => {
    UserService.save(req, (user) => {
        res.json(user);
    })
});
router.post('/login', (req, res) => {
    UserService.login(req, res, (user) => {
        res.json(user);
    })
});

//Token validation middleware
router.use(function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ error: true, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            error: true,
            message: 'No token provided.'
        });
    }
});

router.post('/get', (req, res) => {
    UserService.get(req, (user) => {
        res.json(user);
    })
});

module.exports = router;
