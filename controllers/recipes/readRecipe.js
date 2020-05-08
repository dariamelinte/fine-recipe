const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const readRecipe = async (req, res) => {
  try {
    const { db, params, user } = req

    const recipe = await db.Recipe.findOne({
      _id: ObjectId(params.id),
      $or: [{ status: 'public' }, { userId: user._id}]
    })

    if (!recipe) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'We could not find the recipe that you were looking for'
          })
      )
    }

    const { title, description, ingredients, preparationSteps } = recipe

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: { title, description, ingredients, preparationSteps }
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
