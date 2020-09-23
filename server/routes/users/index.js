const router = require('express').Router()

const { users } = require('../../controllers')
const me = require('./me')

router.use('/me', me)
router.get('/:id', users.userProfile)
router.post('/:id/follow', users.followUser)
router.post('/:id/unfollow', users.unfollowUser)

module.exports = router
