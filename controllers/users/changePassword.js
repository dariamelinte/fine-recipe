const httpStatusCode = require('http-status-codes')
const bcrypt = require('bcrypt')

const { schemaErrorHandler } = require('../../utils')

const changePassword = async (req, res) => {
  try {
    const { body, user } = req

    const validPassword = await bcrypt.compare(body.oldPassword, user.password)

    if (!validPassword) {
      return (
        res
          .status(httpStatusCode.UNAUTHORIZED)
          .json({
            success: false,
            message: 'The password provided is incorrect.'
          })
      )
    }

    user.password = body.newPassword

    if (body.logoutFromAllAccounts) {
      user.tokens = []
    }

    const updatedUser =  await user.save()

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

module.exports = changePassword
