const httpStatusCode = require('http-status-codes')

const imageUploadHandler = async (error, req, res, next) => {
  if (error) {
    res.status(httpStatusCode.BAD_REQUEST).send({
      success: false,
      message: error.message
    })
  }

  next()
}

module.exports = imageUploadHandler
