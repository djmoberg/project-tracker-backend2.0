module.exports = (req, res, next) => {
    if (req.user)
        return next()
    else
        res.send("unauthorized")
}