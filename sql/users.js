module.exports = {
    insert: "INSERT INTO users (name, password, email) VALUES (?)",
    select: {
        id: "SELECT id FROM users WHERE name = ?",
        name: "SELECT name FROM users WHERE name = (?)",
        like: "SELECT name FROM users WHERE name LIKE ?",
        all: "SELECT * FROM users WHERE name = (?)",
        all2: "SELECT * FROM users WHERE id = (?)",
    },
    update: {
        main: "UPDATE users SET password = ? WHERE id = ?",
        second: "UPDATE users SET password = ? WHERE email = ?"
    },
    delete: {

    }
}