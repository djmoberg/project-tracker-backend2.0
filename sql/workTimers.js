module.exports = {
    insert: "INSERT INTO workTimers (user_id, project_id, startTime) VALUES (?)",
    select: {
        startTime: "SELECT startTime FROM workTimers WHERE user_id = ? AND project_id = ?",
    },
    update: {

    },
    delete: {
        main: "DELETE FROM workTimers WHERE project_id = ?",
        second: "DELETE FROM workTimers WHERE user_id = ? AND project_id = ?"
    }
}