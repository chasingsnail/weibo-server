/**
 * @description 用户关系 controller
 */

const { getUserByFollower } = require('../service/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 查询粉丝数
 * @param {number} userId 用户 id
 */
const getUserFollowers = async userId => {
  const { count, fansData: list} = await getUserByFollower(userId)
  return new SuccessModel({
    count,
    list
  })
}

module.exports = {
  getUserFollowers
}