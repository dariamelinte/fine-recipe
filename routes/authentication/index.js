const router = require('express').Router()

const { authentication } = require('../../controllers')

router.post('/register', authentication.register)

module.exports = router
