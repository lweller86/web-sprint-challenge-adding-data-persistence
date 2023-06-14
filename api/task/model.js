// build your `Task` model here
const db = require('../../data/dbConfig')


async function getAllTasks() {
  const tasks = await db('tasks').select().join('projects', 'tasks.project_id', 'projects.project_id')
  const transformedTasks = tasks.map(task => {
    return {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: task.task_completed === 1, // Convert to boolean
      project_id: task.project_id,
      project_name: task.project_name,
      project_description: task.project_description,


    };
  });
 return transformedTasks;
}


async function postTask(task_description, task_notes, task_completed, project_id){
  const completed = task_completed !== undefined ? task_completed : false;
  
  const insertedTask = await db('tasks')
  .insert({
    task_description: task_description,
    task_notes: task_notes,
    task_completed: completed,
    project_id: project_id
  })
  const taskId = insertedTask[0];

  const createdTask = await db('tasks')
  .where('task_id', taskId)
  .first()

  createdTask.task_completed = Boolean(createdTask.task_completed)

  return createdTask;


}



module.exports = {
  getAllTasks,
  postTask
}