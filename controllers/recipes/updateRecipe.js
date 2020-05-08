const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const { schemaErrorHandler } = require('../../utils')

const updateRecipe = async (req, res) => {
  const { db, params, body, user } = req
  const recipeId = params.id

  const updates = Object.keys(body)
  const allowedUpdates = ['title', 'description', 'ingredients', 'preparationSteps']

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res
      .status(httpStatusCode.NOT_ACCEPTABLE)
      .json({
        success: false,
        message: 'Payload has fields that cannot be modified'
      })
  }

  try {
    const recipe = await db.Recipe.findOne({ _id: ObjectId(recipeId), userId: user._id })

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

    await db.Recipe.updateOne({ _id: ObjectId(recipeId) }, body, { runValidators: true });

    const newRecipe = await db.Recipe.findOne({ _id: ObjectId(recipeId) })

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: newRecipe
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

module.exports = updateRecipe
