const httpStatusCode = require('http-status-codes')
const nodemailer = require('nodemailer')

const { createRandomString } = require('../../utils')

const forgotPassword = async (req, res) => {
  const { body, db } = req
  const password = createRandomString(6)

  if (!body.email) {
    return (
      res
        .status(httpStatusCode.NOT_ACCEPTABLE)
        .json({
          success: false,
          message: 'Please provide your email'
        })
    )
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to: body.email,
    subject: 'Reset your password !',
    text: 'Your new password is ' + password
  }
  
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error)
      return (
        res
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            message: 'Internal server error'
          })
      )
    } else {
      try {
        const user = await db.User.findOne({ email: body.email })
        user.password = password
        await user.save()

        return (
          res
            .status(httpStatusCode.OK)
            .json({
              success: true,
              message: 'Email sent: ' + info.response
            })
        )
      } catch (error) {
        console.log(error)
        return (
          res
            .status(httpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
              success: true,
              message: 'Internal server error'
            })
        )
      }
    }
  })
  
}

module.exports = forgotPassword
