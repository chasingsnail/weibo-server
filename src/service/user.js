/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { addFollower } = require('../service/user-relation')
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
  try {
    const result = await User.findOne({
      attributes: ['id', 'username', 'nickname', 'picture', 'city'],
      where: whereOpt
    })
    if (!result) {
      return result
    }
    const formatRes = formatUser(result.dataValues)
    return formatRes
  } catch (error) {
    console.log('service error', error)
  }
}

/**
 * 创建用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string}} gender 性别（1 男，2 女，3 保密）
 */
const createUser = async ({ username, password, gender, nickname }) => {
  const result = await User.create({
    username,
    password,
    gender,
    nickname: nickname || username
  })
  const data = result.dataValues

  // 关注自己
  await addFollower(data.id, data.id)

  return data
}

/**
 * 删除用户
 * @param {string} username 用户名
 */
const deleteUser = async username => {
  console.log('deleteUser', username)
  const res = await User.destroy({
    where: {
      username
    }
  })
  console.log('deleteUser', res)
  return res > 0
}

/**
 * 
 * @param {Object} param0 修改内容
 * @param {Object} param1 查询条件
 */
const updateUserInfo = async (
  { newNickname, newCity, newPicture, newPassword },
  { username, password }
) => {
  const updateData = {}
  if (newNickname) {
    updateData.nickname = newNickname
  }
  if (newCity) {
    updateData.city = newCity
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (password) {
    updateData.password = newPassword
  }
  const whereOpt = {
    username
  }
  if (password) {
    password
  }
  try {
    const result = await User.update(updateData, {
      where: whereOpt
    })
    return result[0] > 0
  } catch (error) {}
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUserInfo
}
