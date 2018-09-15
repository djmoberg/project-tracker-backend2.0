var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

var email = require('../email')
var { usersSelectName, usersInsert, usersUpdateMain, usersUpdateSecond, request_projectSelectProjects, request_projectDelete } = require('../db/query')
var { isAuthenticated } = require('../utils')

router.post('/register', async (req, res, next) => {
    email.send({
        from: '"Project Tracker" <noreply@facelex.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Welcome', // Subject line
        text: 'Welcome to Project Tracker!', // plain text body
    })

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        let data = [[req.body.username, hash, req.body.email]]
        let rows = await usersInsert(data)

        res.send("User added")
    })
})

router.get('/exists/:username', async (req, res, next) => {
    let data = [req.params.username]
    let rows = await usersSelectName(data)

    res.send(rows.length !== 0)
})

router.put('/newPassword', isAuthenticated, async (req, res, next) => {
    bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
        let data = [hash, req.user._id]
        let rows = await usersUpdateMain(data)

        res.send("New password")
    })
})

router.post('/sendNewPassword', async (req, res, next) => {
    require('crypto').randomBytes(4, (err, buffer) => {
        let newPass = buffer.toString('hex')

        email.send({
            from: '"Project Tracker" <noreply@facelex.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'New password for Project Tracker', // Subject line
            text: 'Your new password is: ' + newPass, // plain text body
        })

        bcrypt.hash(newPass, 10, async (err, hash) => {
            let data = [hash, req.body.email]
            let rows = await usersUpdateSecond(data)

            res.send("New password sent")
        })
    })
})

router.get('/pendingJoinRequests', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id]
    let rows = await request_projectSelectProjects(data)

    res.json(rows)
})

router.delete('/pendingJoinRequest/:projectId', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id, req.params.projectId]
    let rows = await request_projectDelete(data)

    res.send("Request deleted")
})

module.exports = router;