module.exports = {
    insert: "INSERT INTO request_project (user_id, project_id) VALUES (?)",
    select: {
        users: "SELECT users.id, users.name FROM request_project INNER JOIN users ON request_project.user_id = users.id WHERE request_project.project_id = ?",
        projects: "SELECT projects.id, projects.name FROM request_project INNER JOIN projects ON request_project.project_id = projects.id WHERE request_project.user_id = ?"
    },
    update: {

    },
    delete: {
        main: "DELETE FROM request_project WHERE user_id = ? AND project_id = ?"
    }
}