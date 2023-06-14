// build your `Project` model here


const db = require('../../data/dbConfig')

async function getProjects(){
  const res = db('projects')
  return res
}

async function getProjectById(project_id) {
   const project = await db('projects').where('project_ID', project_id).first();
   return project
}

async function postProject(project) {
  return await db('projects')
    .insert(project)
    .then(id => {
      return getProjectById(id[0])
    })
  }

module.exports = {
    getProjectById,
    getProjects,
    postProject,
}