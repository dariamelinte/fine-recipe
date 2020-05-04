const httpStatusCode = require('http-status-codes')

const searchRecipes = async (req, res) => {
  try {
    const { db, parsedUrl } = req

    const searchedTitle = parsedUrl && parsedUrl.title

    const recipes = await db.Recipe.find({
      title: {
        $regex: new RegExp(searchedTitle),
        $options: 'i'
      }
    })

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

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: recipes
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
