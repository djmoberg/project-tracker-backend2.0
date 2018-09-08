module.exports = {
    insert: "INSERT INTO deletedWork (id, user, project, workDate, workFrom, workTo, comment) VALUES (?)",
    select: {
        all: "SELECT * FROM deletedWork WHERE user = ? AND project = ?",
    },
    update: {

    },
    delete: {
        main: "DELETE FROM deletedWork WHERE project = ?",
        second: "DELETE FROM deletedWork WHERE id = ?",
    }
}