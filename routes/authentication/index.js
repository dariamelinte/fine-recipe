const router = require('express').Router()

const { authentication } = require('../../controllers')

router.post('/register', authentication.register)
router.post('/login', authentication.login)

module.exports = router
