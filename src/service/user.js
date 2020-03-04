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
const getUserInfo = async (username, password) => {
  let whereOpt = {
    username
  }
  if (password) {
    whereOpt = { ...whereOpt, password }
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

/**
 * 创建用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string}} gender 性别（1 男，2 女，3 保密）
 */
const createUser = async ({ username, password, gender, nickname }) => {
  console.log('createUser', username, password, gender, nickname)
  const result = await User.create({
    username,
    password,
    gender,
    nickname: nickname || username
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}
