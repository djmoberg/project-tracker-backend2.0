module.exports = {
    insert: "INSERT INTO admin_project (user_id, project_id) VALUES (?)",
    select: {
        user_id: "SELECT user_id FROM admin_project WHERE project_id = ?",
        all: "SELECT * FROM admin_project WHERE user_id = ?"
    },
    update: {

    },
    delete: {
        main: "DELETE FROM admin_project WHERE project_id = ?",
    }
}