const httpStatusCode = require('http-status-codes')
const { mongo: { ObjectId } } = require('mongoose')

const { schemaErrorHandler } = require('../../utils')

const editProfile = async (req, res) => {
  const { db, body, user } = req
  const userId = user._id

  const updates = Object.keys(body)
  const allowedUpdates = ['email', 'skills', 'firstName', 'lastName']

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
    const sameEmailUser = await db.User.findOne({
      email: body.email
    })

    if (sameEmailUser) {
      res
        .status(httpStatusCode.OK)
        .json({
          success: false,
          message: 'The user provided is already in use'
        })
    }

    await db.User.updateOne({ _id: ObjectId(userId) }, body, { runValidators: true });

    const updatedUser = await db.User.findOne({ _id: ObjectId(userId) })

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: updatedUser
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

module.exports = editProfile
