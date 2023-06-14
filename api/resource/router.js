// build your `/api/resources` router here
const resourceProject = require('express').Router()
const Resource = require('./model')
const db = require('../../data/dbConfig')


resourceProject.get('/', async (req, res, next) => {
    try {
        const all = await Resource.getAll()
        res.status(200).json(all)
    } catch (err) {
        next(err)
    }
})

resourceProject.get('/:resource_id', (req, res, next) => {
    Resource.getResourceById(req.params.resource_id)
        .then(resourceData => {
            res.status(200).json({ resourceData })
        })
        .catch(next)
})


resourceProject.post('/', async (req, res, next) => {
    try {
      const { resource_name, resource_description } = req.body;
      const existingResource = await db('resources')
        .where('resource_name', resource_name)
        .first();
      
      if (existingResource) {
        return res.status(409).json({
          error: 'Resource with the same name already exists.'
        });
      }
      const insertedResource = await Resource.postResource(resource_name, resource_description);
  
      res.status(200).json(insertedResource);
    } catch (error) {
      next(error);
    }
  });
  


resourceProject.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: 'Something Wrong',
        err: err.message
    })
})

module.exports = resourceProject