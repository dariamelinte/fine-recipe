const router = require('express').Router()

const { recipes } = require('../../controllers')

router.post('/', recipes.createRecipe)
router.get('/:id', recipes.readRecipe)
router.get('/', recipes.readRecipes)
router.patch('/:id', recipes.updateRecipe)
router.delete('/:id', recipes.deleteRecipe)

router.post('/:id/add-to-favorite', recipes.addToFavorite)

module.exports = router
