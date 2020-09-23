const { mongo: { ObjectId } } = require('mongoose')
const httpStatusCode = require('http-status-codes')

const deleteAccount = async (req, res) => {
  try {
    const { user, db } = req

    await db.User.deleteOne({ _id: ObjectId(user._id)})

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: 'Deleted the account successfully'
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

module.exports = deleteAccount
