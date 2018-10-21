var express = require('express');
var router = express.Router();

var {
    projectsInsert,
    user_projectInsert,
    admin_projectInsert,
    user_projectSelectUsers,
    admin_projectSelectByProjectId,
    usersSelectId,
    user_projectDeleteMain,
    request_projectSelectUsers,
    request_projectDelete,
    image_projectInsert,
    image_projectSelect,
    projectsUpdate,
    admin_projectDelete,
    deletedWorkDeleteByProject,
    user_projectDeleteSecond,
    workDeleteMain,
    workTimersDeleteMain,
    projectsDelete,
    user_projectAll,
    projectsAllById,
    workSelect
} = require('../db/query')
var { isAuthenticated, isAdmin } = require('../utils')

router.post('/register', isAuthenticated, async (req, res, next) => {
    let data = [[req.body.name, req.body.description]]
    let rows = await projectsInsert(data)
    let data2 = [[req.user._id, rows.insertId]]
    let rows2 = await user_projectInsert(data2)
    let rows3 = await admin_projectInsert(data2)
    res.json({ msg: "Project added", projectId: rows.insertId })
})

router.get('/users', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.session.selectedProject]
    let rows = await user_projectSelectUsers(data)
    let rows2 = await admin_projectSelectByProjectId(data)
    let users = []

    rows.forEach(user => {
        let isAdmin2 = rows2.some(row => {
            return parseInt(user.id, 10) === parseInt(row.user_id, 10)
        })
        users.push({ name: user.name, isAdmin: isAdmin2 })
    });

    res.json(users)
})

router.get('/allUsers', isAuthenticated, async (req, res, next) => {
    let data = [req.session.selectedProject]
    let rows = await user_projectSelectUsers(data)
    res.json(rows)
})

router.post('/addUser', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.body.username]
    let rows = await usersSelectId(data)
    let data2 = [[rows[0].id, req.session.selectedProject]]
    let rows2 = await user_projectInsert(data2)
    res.send("User added")
})

router.delete('/removeUser/:username', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.params.username]
    let rows = await usersSelectId(data)
    let data2 = [rows[0].id, req.session.selectedProject]
    let rows2 = await user_projectDeleteMain(data2)
    res.send("User removed")
})

router.post('/makeAdmin', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.body.username]
    let rows = await usersSelectId(data)
    let data2 = [[rows[0].id, req.session.selectedProject]]
    let rows2 = await admin_projectInsert(data2)
    res.send("New admin")
})

router.get('/joinRequests', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.session.selectedProject]
    let rows = await request_projectSelectUsers(data)
    res.json(rows)
})

router.delete('/joinRequests/:userId', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.params.userId, req.session.selectedProject]
    let rows = await request_projectDelete(data)
    res.send("Request deleted")
})

router.post('/image', isAuthenticated, async (req, res, next) => {
    let data = [[req.body.imageUrl, req.session.selectedProject]]
    let rows = await image_projectInsert(data)
    res.send("Image added")
})

router.get('/images', isAuthenticated, async (req, res, next) => {
    let data = [req.session.selectedProject]
    let rows = await image_projectSelect(data)
    res.json(rows)
})

router.put('/', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.body.newName, req.body.newDescription, req.session.selectedProject]
    let rows = await projectsUpdate(data)
    res.send("Project updated")
})

router.delete('/', [isAuthenticated, isAdmin], async (req, res, next) => {
    let data = [req.session.selectedProject]
    let rows = await admin_projectDelete(data)
    let rows2 = await deletedWorkDeleteByProject(data)
    let rows3 = await user_projectDeleteSecond(data)
    let rows4 = await workDeleteMain(data)
    let rows5 = await workTimersDeleteMain(data)
    let rows6 = await projectsDelete(data)
    res.send("Project deleted")
})

router.get('/:id', isAuthenticated, async (req, res, next) => {
    let data = [req.user._id, req.params.id]
    let rows = await user_projectAll(data)
    if (rows.length !== 0) {
        let data2 = [[req.params.id]]
        let rows2 = await projectsAllById(data2)
        let project = rows2[0]
        let data3 = [req.params.id]
        let rows3 = await workSelect(data3)
        req.session.selectedProject = req.params.id
        res.json({ name: project.name, description: project.description, overview: rows3 })
    } else {
        console.log("unauthorized")
        res.sendStatus(403)
    }
})

module.exports = router;