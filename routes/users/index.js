const router = require('express').Router()

const { users } = require('../../controllers')
const me = require('./me')

router.use('/me', me)
router.post('/logout', users.logout)

module.exports = router
