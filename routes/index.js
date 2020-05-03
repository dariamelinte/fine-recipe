const router = require('express').Router()

const authentication = require('./authentication')

router.use('/auth', authentication)

module.exports = router