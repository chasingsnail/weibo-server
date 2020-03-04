/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('../service/_format')

/**
 * 获取用户信息
 * @param {string} username 用户名
 * @param {string} password 密码
 */
const getUserInfo = async(username, password) => {
  let whereOpt = {
    username
  }
  if (password) {
    whereOpt = {...whereOpt, password}
  }
  const result = await User.findOne({
    attributes: ['id', 'username', 'nickname', 'picture', 'city'],
    where: whereOpt
  })
  if (!result) {
    return result
  }
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

module.exports = {
  getUserInfo
}