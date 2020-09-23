const router = require('express').Router()
const multer = require('multer')

const cloudinary = require('cloudinary').v2

const { recipes } = require('../../controllers')
const { RECIPE_IMAGE } = require('../../enums')
const { fileFilter } = require('../../utils')
const { imageUploadHandler } = require('../../middlewares')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000
  },
  fileFilter,
})

router.post('/', recipes.createRecipe)
router.get('/:id', recipes.readRecipe)
router.get('/', recipes.readRecipes)
router.patch('/:id', upload.single(RECIPE_IMAGE), recipes.updateRecipe, imageUploadHandler)
router.delete('/:id', recipes.deleteRecipe)

router.post('/:id/add-to-favorite', recipes.addToFavorite)
router.post('/:id/add-comment', recipes.addComment)
router.post('/:id/download', recipes.downloadRecipe)

module.exports = router
