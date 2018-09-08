var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var bcrypt = require('bcrypt')

// var usersSql = require('./sql/users')
// var admin_projectSql = require('./sql/admin_project')

// Register a login strategy
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        var { usersAll, admin_projectAllByUserId } = require('./db/query')

        let rows = await usersAll(username)

        if (rows.length !== 0) {
            bcrypt.compare(password, rows[0].password, async (err, res) => {
                if (res) {
                    let data = [rows[0].id]
                    let rows2 = await admin_projectAllByUserId(data)

                    if (rows2.length !== 0) {
                        let isAdmin = rows2.map((row) => {
                            return row.project_id
                        })
                        return done(null, { _id: rows[0].id, username, password, isAdmin });
                    } else {
                        return done(null, { _id: rows[0].id, username, password, isAdmin: [] });
                    }
                } else {
                    done(null, false, { message: 'Invalid username and password.' });
                }
            });
        } else {
            done(null, false, { message: 'Invalid username and password.' });
        }
    }
));

// Required for storing user info into session 
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// Required for retrieving user from session
passport.deserializeUser(async (id, done) => {
    // The user should be queried against db using the id
    var { usersAll2, admin_projectAllByUserId } = require('./db/query')

    let rows = await usersAll2(id)

    if (rows.length !== 0) {
        let data = [id]
        let rows2 = await admin_projectAllByUserId(data)

        if (rows2.length !== 0) {
            let isAdmin = rows2.map((row) => {
                return row.project_id
            })
            done(null, { _id: id, username: rows[0].name, password: rows[0].password, isAdmin });
        } else {
            done(null, { _id: id, username: rows[0].name, password: rows[0].password, isAdmin: [] });
        }
    } else {
        console.log("No user");
    }
});

module.exports = passport;