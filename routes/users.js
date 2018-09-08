var express = require('express');
var router = express.Router();

var { usersLike } = require('../db/query')
var { isAuthenticated } = require('../utils')

router.get('/find/:input', isAuthenticated, async (req, res, next) => {
	let data = req.params.input + '%'
	let rows = await usersLike(data)

	res.json(rows)
})

module.exports = router;
