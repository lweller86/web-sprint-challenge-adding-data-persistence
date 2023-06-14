// build your `/api/tasks` router here
const Task = require('./model')
const router = require('express').Router()
const db = require('../../data/dbConfig')



router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { task_description, task_notes, task_completed, project_id } = req.body
    
    if(!task_description){
      return res.status(409).json({
        error: 'Tasks descriptions is required'
      })
     }
    const task = await Task.postTask(task_description, task_notes, task_completed, project_id)
    res.status(200).json(task)

  } catch (err) {
    next(err)
  }
})


module.exports = router