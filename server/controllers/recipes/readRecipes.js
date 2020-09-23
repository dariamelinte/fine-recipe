const httpStatusCode = require('http-status-codes')

const { getRecipesMainContent } = require('../../utils')
const { PER_PAGE } = require('../../enums')

const readRecipes = async (req, res) => {
  try {
    const { db, parsedUrl } = req
    const page = parsedUrl.page

    const recipes = await db.Recipe.find({
      status: 'public'
    }).limit(PER_PAGE).skip(PER_PAGE * (page - 1))

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
