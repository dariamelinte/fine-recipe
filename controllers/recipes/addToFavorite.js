const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId }} = require('mongoose')

const addToFavorite = async (req, res) => {
  try {
    const { db, params, user } = req

    console.log(params)

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
