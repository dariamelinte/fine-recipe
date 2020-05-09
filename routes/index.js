const router = require('express').Router()

const { authMiddleware, urlStringParserMiddleware } = require('../middlewares')

const authentication = require('./authentication')
const recipes = require('./recipes')
const search = require('./search')
const users = require('./users')

router.use('/auth', authentication)

router.use('/search', urlStringParserMiddleware)

router.use('/recipes', authMiddleware, recipes)
router.use('/search', authMiddleware, search)
router.use('/users', authMiddleware, users)

module.exports = router