const router = require('express').Router()

const { users } = require('../../controllers')

router.get('/', users.me)
router.patch('/', users.editProfile)
router.delete('/', users.deleteAccount)
router.post('/logout', users.logout)
router.get('/favorite-recipes', users.seeFavorites)
router.post('/change-password', users.changePassword)

module.exports = router
