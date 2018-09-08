module.exports = (req, res, next) => {
    let isAdmin = req.user.isAdmin.some(id => {
        return parseInt(id, 10) === parseInt(req.session.selectedProject, 10)
    })
    if (isAdmin)
        return next()
    else
        res.send("unauthorized")
}