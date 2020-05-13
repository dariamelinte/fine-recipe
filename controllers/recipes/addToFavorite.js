const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const addToFavorite = async (req, res) => {
  try {
    const { db, params, user } = req

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

    const alreadyAdded = user.favoriteIds.find(id => id == recipe._id)

    if (alreadyAdded) {
      return (
        res
          .status(httpStatusCode.NOT_ACCEPTABLE)
          .json({
            success: false,
            message: 'The recipe is already added to Favoriter'
          })
      )
    }

    user.favoriteIds = [...user.favoriteIds, recipe._id]
    await user.save()

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: user.favoriteIds
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

module.exports = addToFavorite
