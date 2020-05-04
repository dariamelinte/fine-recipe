const httpStatusCode = require('http-status-codes')

const readRecipes = async (req, res) => {
  try {
    const recipes = await req.db.Recipe.find({})

    console.log('idkbsad')

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

module.exports = readRecipes
