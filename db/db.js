var mysql = require('mysql');
const util = require('util')

var connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

// connection.connect();

connection.query = util.promisify(connection.query)

module.exports = connection