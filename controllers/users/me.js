const httpStatusCode = require('http-status-codes')

const me = async (req, res) => {
  try {
    const { user, db } = req
    const recipes = await db.Recipe.find({ userId: user._id })
    const { firstName, lastName, email, skills, followsUserIds, followedByUserIds } = user

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: { firstName, lastName, email, skills, recipes, followsUserIds, followedByUserIds }
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

module.exports = me
