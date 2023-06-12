// build your `Task` model here
function getTaskById(task_id) {
    return Promise.resolve(`task id ${task_id}`)
}


module.exports = {
    getTaskById
}