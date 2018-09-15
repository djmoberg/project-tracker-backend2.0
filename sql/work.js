module.exports = {
    insert: "INSERT INTO work (user, project, workDate, workFrom, workTo, comment) VALUES (?)",
    select: {
        work: "SELECT work.id, users.name, work.workDate, work.workFrom, work.workTo, work.comment FROM work INNER JOIN users ON users.id = work.user WHERE work.project = ? ORDER BY work.workDate DESC, work.workFrom DESC"
    },
    update: {
        main: "UPDATE work SET workDate = ?, workFrom = ?, workTo = ?, comment = ? WHERE id = ? AND project = ?",
    },
    delete: {
        main: "DELETE FROM work WHERE project = ?",
        second: "DELETE FROM work WHERE id = ? AND project = ?",
    }
}