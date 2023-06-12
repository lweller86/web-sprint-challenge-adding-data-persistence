// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/:resource_id', (req, res, next) => {
    Resource.getResourceById(req.params.resource_id)
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
})

router.use('*', (req, res, ) => {
    res.json({api: 'up'})
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: ' Something went wrong in the resource router',
        message: err.message,
        stack: err.stack,
    })
})


module.exports = router