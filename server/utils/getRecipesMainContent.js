const getRecipesMainContent = (recipes) => (
  recipes.map(({ title, preparationSteps, description, ingredients, comments, image}) => ({
    title, description, preparationSteps, ingredients, comments, image
  }))
)

module.exports = getRecipesMainContent
