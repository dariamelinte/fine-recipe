const router = require('express').Router()

const { authMiddleware, urlStringParserMiddleware } = require('../middlewares')

const authentication = require('./authentication')
const recipes = require('./recipes')
const search = require('./search')

router.use('/auth', authentication)
router.use('/recipes', authMiddleware, recipes)
router.use('/search', urlStringParserMiddleware, search)

module.exports = router