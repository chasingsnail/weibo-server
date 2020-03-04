/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')

/**
 * 注册用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string}} gender 性别（1 男，2 女，3 保密）
 */
const registerUser = async ({username, password, gender}) => {
  const userInfo = await getUserInfo(username)
  if (userInfo) {
    return new ErrorModel('用户名已存在')
  }
  try {
    await createUser({username, password, gender})
    return new SuccessModel('注册成功')
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel('注册失败')
  }
}
 
/**
 * 检查用户名是否存在
 * @param {string} username 用户名
 */
const checkUserExist = async (username) => {
  const res = await getUserInfo(username)
  if (res) {
    return new SuccessModel('用户名已存在')
  }
  return new ErrorModel('用户名未存在')
}

module.exports = {
  checkUserExist,
  registerUser
}
