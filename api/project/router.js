// build your `/api/projects` router here
const router = require('express').Router()

router.use('*', (req, res, next) => {
    res.json({api: 'up'})
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: ' Something went wrong in the project router',
        message: err.message,
        stack: err.stack.
    })
})


module.exports = router