const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const readRecipe = async (req, res) => {
  try {
    const { db, params } = req

    const recipe = await db.Recipe.findOne({ _id: ObjectId(params.id) })

    if (!recipe) {
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
          message: 'Internal server error'
        })
    )
  }
}

module.exports = readRecipe
