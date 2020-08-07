const me = require('./me')
const logout = require('./logout')
const seeFavorites = require('./seeFavorites')
const editProfile = require('./editProfile')
const deleteAccount = require('./deleteAccount')
const changePassword = require('./changePassword')
const userProfile = require('./userProfile')
const followUser = require('./followUser')
const unfollowUser = require('./unfollowUser')

module.exports = {
  me,
  logout,
  seeFavorites,
  editProfile,
  deleteAccount,
  changePassword,
  userProfile,
  followUser,
  unfollowUser
}
