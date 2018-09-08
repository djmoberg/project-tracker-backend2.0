var express = require('express');
var router = express.Router();

var { workTimersSelect, workTimersInsert, workTimersDeleteSecond } = require('../db/query')
var { isAuthenticated } = require('../utils')

router.get('/', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id, req.session.selectedProject]
    let rows = await workTimersSelect(data)

    if (rows.length !== 0) {
        res.json(rows[0])
    } else {
        res.send({ startTime: 0 })
    }
})

router.post('/new', isAuthenticated, async (req, res, next) => {
    let data = [[req.user._id, req.session.selectedProject, req.body.startTime]]
    let rows = await workTimersInsert(data)

    res.send("Timer added")
})

router.delete('/', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id, req.session.selectedProject]
    let rows = await workTimersDeleteSecond(data)

    res.json({ msg: "Timer deleted" })
})

module.exports = router;