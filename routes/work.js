var express = require('express');
var router = express.Router();

var { workInsert, workSelect, workUpdate, workDeleteSecond, deletedWorkInsert, deletedWorkAll, deletedWorkDeleteById } = require('../db/query')
var { isAuthenticated } = require('../utils')

router.post('/add', isAuthenticated, async (req, res, next) => {
    let data = [[req.user._id, req.session.selectedProject, req.body.workDate, req.body.workFrom, req.body.workTo, req.body.comment]]
    let rows = await workInsert(data)
    req.body.addedUsers.every(async (user) => {
        let userData = [[user, req.session.selectedProject, req.body.workDate, req.body.workFrom, req.body.workTo, req.body.comment]]
        try {
            let rows2 = await workInsert(userData)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    })
    let data2 = [req.session.selectedProject]
    let rows3 = await workSelect(data2)

    res.json({ status: "Work added", overview: rows3 })
})

router.put('/edit', isAuthenticated, async (req, res, next) => { //TODO sjekke om arbeidet tilhører brukeren?
    let data = [req.body.workDate, req.body.workFrom, req.body.workTo, req.body.comment, req.body.id, req.session.selectedProject]
    let rows = await workUpdate(data)
    let data2 = [req.session.selectedProject]
    let rows2 = await workSelect(data2)

    res.json({ status: "Work edited", overview: rows2 })
})

router.delete('/delete/:id', isAuthenticated, async (req, res, next) => { //TODO sjekke om arbeidet tilhører brukeren?
    let data = [req.params.id, req.session.selectedProject]
    let rows = await workDeleteSecond(data)
    let data2 = [req.session.selectedProject]
    let rows2 = await workSelect(data2)

    res.json({ status: "Work deleted", overview: rows2 })
})

router.post('/trash', isAuthenticated, async (req, res, next) => {
    let data = [[req.body.id, req.user._id, req.session.selectedProject, req.body.workDate, req.body.workFrom, req.body.workTo, req.body.comment]]
    let rows = await deletedWorkInsert(data)

    res.send("Work moved")
})

router.get('/deleted', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id, req.session.selectedProject]
    let rows = await deletedWorkAll(data)

    res.json(rows)
})

router.delete('/trash/:id', isAuthenticated, async (req, res, next) => {
    let data = [req.params.id]
    let rows = await deletedWorkDeleteById(data)

    res.send("Work deleted")
})

module.exports = router;