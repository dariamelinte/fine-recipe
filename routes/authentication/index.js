const router = require('express').Router()

const { authentication } = require('../../controllers')

router.post('/register', authentication.register)
router.post('/login', authentication.login)
router.post('/forgot-password', authentication.forgotPassword)

module.exports = router
