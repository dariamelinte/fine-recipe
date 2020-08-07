const httpStatusCode = require('http-status-codes')

const seeFavorites = async (req, res) => {
  try {
    const { db, user } = req

    const recipes = await db.Recipe.find({
      _id: user.favoriteIds
    })

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: false,
          message: (recipes.length && recipes) || 'You don\'t have any recipe added to the list.'
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

module.exports = seeFavorites
