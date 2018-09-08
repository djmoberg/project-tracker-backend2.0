var express = require('express');
var router = express.Router();

var auth = require('../auth')

router.post('/login', auth.authenticate('login'), (req, res, next) => {
    res.send("Logged in")
})

router.get('/logout', (req, res) => {
    req.logout();
    res.send("Logged out")
})

router.get('/loggedIn', (req, res, next) => {
    if (req.user) {
        res.json({ "loggedIn": true, "user": { "username": req.user.username, "isAdmin": req.user.isAdmin } })
    } else {
        res.json({ "loggedIn": false })
    }
})

module.exports = router;