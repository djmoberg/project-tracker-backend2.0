module.exports = {
    insert: "INSERT INTO user_project (user_id, project_id) VALUES (?)",
    select: {
        all: "SELECT * FROM user_project WHERE user_id = ? AND project_id = ?",
        users: "SELECT users.id, users.name FROM user_project INNER JOIN users ON user_project.user_id = users.id WHERE user_project.project_id = ?",
        projects: "SELECT projects.id, projects.name, projects.description FROM user_project INNER JOIN projects ON projects.id = user_project.project_id WHERE user_project.user_id = (?)",
    },
    update: {

    },
    delete: {
        main: "DELETE FROM user_project WHERE user_id = ? AND project_id = ?",
        second: "DELETE FROM user_project WHERE project_id = ?",
    }
}