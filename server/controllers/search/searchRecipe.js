const httpStatusCode = require('http-status-codes')

const { getRecipesMainContent } = require('../../utils')
const { PER_PAGE } = require('../../enums')

const searchRecipes = async (req, res) => {
  try {
    const { db, parsedUrl } = req
    const title = parsedUrl.title
    const page = parsedUrl.page

    const recipes = await db.Recipe.find({
      title: {
        $regex: new RegExp(title),
        $options: 'i'
      }
    }).limit(PER_PAGE).skip(PER_PAGE * (page - 1))

    if (!recipes.length) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: true,
            message: 'We could not find the recipe that you were looking for'
          })
      )
    }

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

module.exports = searchRecipes
