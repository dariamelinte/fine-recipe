const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')
const cloudinary = require('cloudinary').v2

const { schemaErrorHandler } = require('../../utils')

const updateRecipe = async (req, res) => {
  const { db, params, body, user, files } = req
  const recipeId = params.id

  const updates = Object.keys(body)
  const allowedUpdates = ['title', 'description', 'ingredients', 'preparationSteps', 'image']

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
    let imageUrl = recipe.image

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

    if (files && files.recipeImage) {
      await cloudinary.uploader.upload(`${files.recipeImage.tempFilePath}`, (error, response) => {
        if (error) {
          console.log(error);
        }

        if (response) {
          imageUrl = response.url
        }
      });
    }

    await db.Recipe.updateOne({ 
      _id: ObjectId(recipeId)
    }, {
      ...body,
      image: imageUrl
    }, {
      runValidators: true
    });

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
