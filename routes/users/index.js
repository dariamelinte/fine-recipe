const router = require('express').Router()

const { users } = require('../../controllers')

router.get('/me', users.me)
router.post('/logout', users.logout)

module.exports = router
