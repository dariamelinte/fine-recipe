const router = require('express').Router()

const { users } = require('../../controllers')

router.get('/', users.me)
router.get('/favorite-recipes', users.seeFavorites)

module.exports = router
