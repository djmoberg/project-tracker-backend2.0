module.exports = {
    insert: "INSERT INTO projects (name, description) VALUES (?)",
    select: {
        all: "SELECT * FROM projects WHERE id = (?)",
        like: "SELECT id, name, description FROM projects WHERE name LIKE ?",
    },
    update: {
        main: "UPDATE projects SET name = ?, description = ? WHERE id = ?",
    },
    delete: {
        main: "DELETE FROM projects WHERE id = ?",
    }

}