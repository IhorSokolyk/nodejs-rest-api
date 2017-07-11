const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    UserService = require('../services/UserService'),
    TokenService = require('../services/TokenService'),
    config = require('../config');

router.post('/save', (req, res) => {
    UserService.save(req, res, (err, user) => {
        if (user) {
            res.json(user);
        } else {
            res.json(err);
        }
    })
});
router.post('/login', (req, res) => {
    UserService.login(req, res, (err, token) => {
        if (token) {
            TokenService.save(token, (err, savedToken) => {
                if (savedToken) {
                    res.json(token);
                } else {
                    res.json(err);
                }
            });
        } else {
            res.json(err);
        }
    });
});

//Token validation middleware
//All routers that require TOKEN should be written after this function
router.use(validateToken);

router.get('/get/:id', (req, res) => {
    UserService.get(req, res, (err, user) => {
        if (err) {
            res.json({error: err});
        } else {
            res.json(user);
        }
    });
});

router.post('/logout', (req, res) => {
    TokenService.delete(req, (err, success) => {
        if (err) {
            res.json(err);
        } else {
            res.json(success);
        }
    })
});

let authFailed = {status: 'Failed', message: 'Authentication failed'};
function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        TokenService.get(token, (err, foundToken) => {
            if (foundToken) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    console.log(decoded);
                    if (decoded && (decoded.id === foundToken.userId)) {
                        next();
                    } else {
                        return res.status(401).send(authFailed);
                    }
                });
            } else {
                return res.status(401).send(authFailed);
            }
        });
    } else {
        return res.status(401).send(authFailed);
    }
}

module.exports = router;