const router = require('express').Router()

const authentication = require('./authentication')

router.use('/authentication', authentication)

module.exports = router