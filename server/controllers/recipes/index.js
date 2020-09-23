const createRecipe = require('./createRecipe')
const readRecipe = require('./readRecipe')
const readRecipes = require('./readRecipes')
const updateRecipe = require('./updateRecipe')
const deleteRecipe = require('./deleteRecipe')
const addToFavorite = require('./addToFavorite')
const addComment = require('./addComment')
const downloadRecipe = require('./downloadRecipe')

module.exports = {
  createRecipe,
  readRecipe,
  readRecipes,
  updateRecipe,
  deleteRecipe,
  addToFavorite,
  addComment,
  downloadRecipe
}
