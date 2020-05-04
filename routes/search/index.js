const router = require('express').Router()

const { search } = require('../../controllers')

router.get('/recipes', search.recipes)

module.exports = router
