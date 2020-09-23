const { mongo: { ObjectId } } = require('mongoose')
const httpStatusCode = require('http-status-codes')

const logout = async (req, res) => {
  try {
    const { token: storedToken, user: storedUser, db } = req

    const user = await db.User.findOne({ _id: ObjectId(storedUser._id)})

    user.tokens = user.tokens.filter(token => token.token !== storedToken)
    await user.save()

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: 'Logged out successfully'
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

module.exports = logout
