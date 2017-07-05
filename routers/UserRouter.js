const express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserService');

router.post('/save', (req, res) => {
    UserService.save(req, (user) => {
        res.json(user);
    })
});
router.post('/get', (req, res) => {
    UserService.get(req, (user) => {
        res.json(user);
    })
});
router.post('/login', (req, res) => {
    UserService.login(req, (user) => {
        res.json(user);
    })
});

module.exports = router;
