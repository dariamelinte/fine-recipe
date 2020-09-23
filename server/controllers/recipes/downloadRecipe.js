const fs = require('fs')
const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')
const downloadsFolder = require('downloads-folder')

const downloadRecipe = async (req, res) => {
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

    const { title, description, ingredients, preparationSteps, image } = recipe

    const data = { title, description, ingredients, preparationSteps, image }

    const file = JSON.stringify(data)

    fs.writeFile(`${downloadsFolder()}/${title}.json`, file, (err) => {
      if (err) {
        console.log(err)
        return (
          res
            .status(httpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
              success: false,
              message: 'Could not download the recipe'
            })
        )
      }

      return (
        res
          .status(httpStatusCode.OK)
          .json({
            success: true,
            message: 'Recipe saved successfully'
          })
      )
    })
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

module.exports = downloadRecipe
