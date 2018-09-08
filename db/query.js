var db = require('./db');

var admin_projectSql = require('../sql/admin_project')
var deletedWorkSql = require('../sql/deletedWork')
var image_projectSql = require('../sql/image_project')
var projectsSql = require('../sql/projects')
var request_projectSql = require('../sql/request_project')
var user_projectSql = require('../sql/user_project')
var usersSql = require('../sql/users')
var workSql = require('../sql/work')
var workTimersSql = require('../sql/workTimers')

const query = async (sql, data) => {
    try {
        var result = await db.query(sql, data)
        return result
    } catch (error) {
        console.log(error)
    }

}

//admin_project
module.exports.admin_projectInsert = async (data) => await query(admin_projectSql.insert, data)

module.exports.admin_projectSelectByProjectId = async (data) => await query(admin_projectSql.select.user_id, data)

module.exports.admin_projectAllByUserId = async (data) => await query(admin_projectSql.select.all, data)

module.exports.admin_projectDelete = async (data) => await query(admin_projectSql.delete.main, data)

//deletedWork
module.exports.deletedWorkInsert = async (data) => await query(deletedWorkSql.insert, data)

module.exports.deletedWorkAll = async (data) => await query(deletedWorkSql.select.all, data)

module.exports.deletedWorkDeleteByProject = async (data) => await query(deletedWorkSql.delete.main, data)

module.exports.deletedWorkDeleteById = async (data) => await query(deletedWorkSql.delete.second, data)

//image_project
module.exports.image_projectInsert = async (data) => await query(image_projectSql.insert, data)

module.exports.image_projectSelect = async (data) => await query(image_projectSql.select.image_url, data)

//projects
module.exports.projectsInsert = async (data) => await query(projectsSql.insert, data)

module.exports.projectsAllById = async (data) => await query(projectsSql.select.all, data)

module.exports.projectsLike = async (data) => await query(projectsSql.select.like, data)

module.exports.projectsUpdate = async (data) => await query(projectsSql.update.main, data)

module.exports.projectsDelete = async (data) => await query(projectsSql.delete.main, data)

//request_project
module.exports.request_projectInsert = async (data) => await query(request_projectSql.insert, data)

module.exports.request_projectSelectUsers = async (data) => await query(request_projectSql.select.users, data)

module.exports.request_projectSelectProjects = async (data) => await query(request_projectSql.select.projects, data)

module.exports.request_projectDelete = async (data) => await query(request_projectSql.delete.main, data)

//user_project
module.exports.user_projectInsert = async (data) => await query(user_projectSql.insert, data)

module.exports.user_projectAll = async (data) => await query(user_projectSql.select.all, data)

module.exports.user_projectSelectUsers = async (data) => await query(user_projectSql.select.users, data)

module.exports.user_projectSelectProjects = async (data) => await query(user_projectSql.select.projects, data)

module.exports.user_projectDeleteMain = async (data) => await query(user_projectSql.delete.main, data)

module.exports.user_projectDeleteSecond = async (data) => await query(user_projectSql.delete.second, data)

//users
module.exports.usersInsert = async (data) => await query(usersSql.insert, data)

module.exports.usersSelectId = async (data) => await query(usersSql.select.id, data)

module.exports.usersSelectName = async (data) => await query(usersSql.select.name, data)

module.exports.usersLike = async (data) => await query(usersSql.select.like, data)

module.exports.usersAll = async (data) => await query(usersSql.select.all, data)

module.exports.usersAll2 = async (data) => await query(usersSql.select.all2, data)

module.exports.usersUpdateMain = async (data) => await query(usersSql.update.main, data)

module.exports.usersUpdateSecond = async (data) => await query(usersSql.update.second, data)

//work
module.exports.workInsert = async (data) => await query(workSql.insert, data)

module.exports.workSelect = async (data) => await query(workSql.select.work, data)

module.exports.workUpdate = async (data) => await query(workSql.update.main, data)

module.exports.workDeleteMain = async (data) => await query(workSql.delete.main, data)

module.exports.workDeleteSecond = async (data) => await query(workSql.delete.second, data)

//workTimers
module.exports.workTimersInsert = async (data) => await query(workTimersSql.insert, data)

module.exports.workTimersSelect = async (data) => await query(workTimersSql.select.startTime, data)

module.exports.workTimersDeleteMain = async (data) => await query(workTimersSql.delete.main, data)

module.exports.workTimersDeleteSecond = async (data) => await query(workTimersSql.delete.second, data)

