const httpStatusCode = require('http-status-codes')

const { getRecipesMainContent } = require('../../utils')

const readRecipes = async (req, res) => {
  try {
    const { db, } = req

    const recipes = await db.Recipe.find({
      status: 'public'
    })

    const shownData = getRecipesMainContent(recipes)

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: shownData
        })
    )
  } catch (error) {
    console.error(error)
    return (
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'Internal server error'
        })
    )
  }
}

module.exports = readRecipes
