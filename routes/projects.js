var express = require('express');
var router = express.Router();

var { user_projectSelectProjects, projectsLike, request_projectInsert } = require('../db/query')
var { isAuthenticated } = require('../utils')

router.get('/', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id]
    let rows = await user_projectSelectProjects(data)

    res.json(rows)
})

router.get('/find/:input', isAuthenticated, async (req, res, next) => {
    let data = req.params.input + '%'
    let rows = await projectsLike(data)
    res.json(rows)
})

router.post('/joinRequest', isAuthenticated, async (req, res, next) => {
    let data = [[req.user._id, req.body.projectId]]
    let rows = await request_projectInsert(data)
    res.send("Request sent")
})

module.exports = router;