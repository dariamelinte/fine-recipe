const httpStatusCode = require('http-status-codes')

const { schemaErrorHandler } = require('../../utils')

const createRecipe = async (req, res) => {
  try {
    const { db, body, user } = req

    console.log(user)

    const recipe = await db.Recipe.create({ ...body, userId: user._id })

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: recipe
        })
    )
  } catch (error) {
    console.error(error)
    return (
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: schemaErrorHandler(error) || 'Internal server error'
        })
    )
  }
}

module.exports = createRecipe
