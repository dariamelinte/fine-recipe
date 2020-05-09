const getRecipesMainContent = (recipes) => (
  recipes.map(({ title, preparationSteps, description, ingredients, comments}) => ({
    title, description, preparationSteps, ingredients, comments
  }))
)

module.exports = getRecipesMainContent
