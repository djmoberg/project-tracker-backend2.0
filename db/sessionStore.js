var pg = require('pg')
pg.defaults.ssl = true
pg.defaults.parseInt8 = true

const Sequelize = require('sequelize');
const uri = process.env.DBURI

const sequelize = new Sequelize(uri, {
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

module.exports = sequelize