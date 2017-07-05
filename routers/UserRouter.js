const express = require('express'),
    router = express.Router(),
    UserService = require('../services/UserService');

router.post('/save', (req, res) => {
    UserService.save(req, (user) => {
        res.json(user);
    })
});

module.exports = router;
