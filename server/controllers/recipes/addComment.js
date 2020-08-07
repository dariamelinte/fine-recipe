const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const { schemaErrorHandler } = require('../../utils')

const addComment = async (req, res) => {
  try {
    const { db, params, user, body } = req

    const recipe = await db.Recipe.findOne({ _id: ObjectId(params.id) })

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

    recipe.comments = [...recipe.comments, {
      userId: user._id,
      content: body.content
    }]

    const updatedRecipe = await recipe.save()

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: updatedRecipe
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

module.exports = addComment
