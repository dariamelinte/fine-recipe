const router = require('express').Router()

const { authMiddleware, urlStringParserMiddleware } = require('../middlewares')

const authentication = require('./authentication')
const recipes = require('./recipes')
const search = require('./search')
const users = require('./users')

router.use('/auth', authentication)

router.use(authMiddleware)
router.use('/search', urlStringParserMiddleware)

router.use('/recipes', recipes)
router.use('/search', search)
router.use('/users', users)

module.exports = router