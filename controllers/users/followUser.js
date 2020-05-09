const httpStatusCode = require('http-status-codes')

const followUser = async (req, res) => {
  try {
    const { user, params, db } = req

    if (user._id === params.id) {
      return (
        res
          .status(httpStatusCode.NOT_ACCEPTABLE)
          .json({
            success: false,
            message: 'You can\'t follow your own account.'
          })
      )
    }

    const userId = user.followsUserIds.find(id => id === params.id)

    if (userId) {
      return (
        res
          .status(httpStatusCode.NOT_ACCEPTABLE)
          .json({
            success: false,
            message: 'You already follow this user.'
          })
      )
    }

    const followedUser = await db.User.findOne({ _id: params.id })

    if (!followedUser) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'You we could not find the user.'
          })
      )
    }

    user.followsUserIds = [...user.followsUserIds, params.id]
    followedUser.followedByUserIds = [...followedUser.followedByUserIds, user._id]
    await user.save()
    await followedUser.save()


    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: { user, followedUser }
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

module.exports = followUser
