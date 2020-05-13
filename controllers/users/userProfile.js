const httpStatusCode = require('http-status-codes')
const { mongo : { ObjectId } } = require('mongoose')

const userProfile = async (req, res) => {
  try {
    const { params, db } = req

    const user = await db.User.findOne({ _id: ObjectId(params.id) })

    if (!user) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'User not found!'
          })
      )
    }

    const recipes = await db.Recipe.find({ userId: user._id, status: 'public' })

    const { firstName, lastName, email, skills, followsUserIds, followedByUserIds, favoriteIds } = user

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: { firstName, lastName, email, skills, recipes, followsUserIds, followedByUserIds, favoriteIds }
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

module.exports = userProfile
