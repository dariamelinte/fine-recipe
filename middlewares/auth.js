const jwt = require('jsonwebtoken')
const httpStatusCodes = require('http-status-codes')
const { mongo: { ObjectId } } = require('mongoose')

const authMiddleware = async (req, res, next) => {
  try {
    const { db, headers } = req
    const token = headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN)

    const user = await db.User.findOne({
      _id: ObjectId(decoded.id),
      'tokens.token': token
    })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (error) {
    console.log(error)

    return (
      res
        .status(httpStatusCodes.UNAUTHORIZED)
        .send({
          success: false,
          message: 'Please authenticate.'
        })
    )
  }
}

module.exports = authMiddleware
