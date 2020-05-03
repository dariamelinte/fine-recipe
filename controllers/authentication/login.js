const httpStatusCode = require('http-status-codes')
const bcrypt = require('bcrypt')

const loginController = async (req, res) => {
  try {
    const { db, body } = req

    const emptyEmail = !(body.email && body.email.trim().length)
    const emptyPassword = !(body.password && body.password.trim().length)

    if (emptyEmail || emptyPassword) {
      return (
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({
            success: false,
            message: 'Please provide a valid password and email.'
          })
      )
    }

    const existingUser = await db.User.findOne({
      email: body.email
    })

    if (!existingUser) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'User not found. If you did not create an account yet please go to register.'
          })
      )
    }

    const validPassword = await bcrypt.compare(body.password, existingUser.password)

    if (!validPassword) {
      return (
        res
          .status(httpStatusCode.UNAUTHORIZED)
          .json({
            success: false,
            message: 'The email or the password are incorrect.'
          })
      )
    }

    const token = await existingUser.generateAuthToken()

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: 'Authentication completed.',
          token
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

module.exports = loginController
