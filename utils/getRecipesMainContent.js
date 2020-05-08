const getRecipesMainContent = (recipes) => (
  recipes.map(({ title, preparationSteps, description, ingredients}) => ({
    title, description, preparationSteps, ingredients
  }))
)

module.exports = getRecipesMainContent
