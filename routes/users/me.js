const router = require('express').Router()

const { users } = require('../../controllers')

router.get('/', users.me)
router.patch('/', users.editProfile)
router.delete('/', users.deleteAccount)
router.get('/favorite-recipes', users.seeFavorites)

module.exports = router
