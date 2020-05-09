const httpStatusCode = require('http-status-codes')

const unfollowUser = async (req, res) => {
  try {
    const { user, params, db } = req

    if (user._id === params.id) {
      return (
        res
          .status(httpStatusCode.NOT_ACCEPTABLE)
          .json({
            success: false,
            message: 'You can\'t unfollow your own account.'
          })
      )
    }

    const userId = user.followsUserIds.find(id => id === params.id)

    if (!userId) {
      return (
        res
          .status(httpStatusCode.NOT_ACCEPTABLE)
          .json({
            success: false,
            message: 'You don\'t follow this user.'
          })
      )
    }

    const unfollowedUser = await db.User.findOne({ _id: params.id })

    if (!unfollowedUser) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'You we could not find the user.'
          })
      )
    }

    user.followsUserIds = user.followsUserIds.filter(id => id !== userId)
    unfollowedUser.followedByUserIds = unfollowedUser.followedByUserIds.filter(id => id === user._id)
    await user.save()
    await unfollowedUser.save()

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          message: { user, unfollowedUser }
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

module.exports = unfollowUser
