module.exports = {
    insert: "INSERT INTO image_project (image_url, project_id) VALUES (?)",
    select: {
        image_url: "SELECT image_url FROM image_project WHERE project_id = ?"
    },
    update: {

    },
    delete: {

    }
}