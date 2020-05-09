const router = require('express').Router()

const { users } = require('../../controllers')
const me = require('./me')

router.use('/me', me)
router.get('/:id', users.userProfile)

module.exports = router
