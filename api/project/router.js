
const router = require('express').Router()
const Project = require('./model')

router.get('/:project_id', (req, res, next) => {
    Project.getProjectById(req.params.project_id)
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(next)
})

router.use('*', (req, res) => {
    res.json({api: 'up'})
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: ' Something went wrong in the project router',
        message: err.message,
        stack: err.stack,
    })
})


module.exports = router