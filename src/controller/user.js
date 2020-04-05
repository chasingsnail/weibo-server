/**
 * @description user controller
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUserInfo
} = require('../service/user')
const { genPassword } = require('../utils/crpy')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 注册用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string}} gender 性别（1 男，2 女，3 保密）
 */
const registerUser = async ({ username, password, gender }) => {
  const userInfo = await getUserInfo(username)
  if (userInfo) {
    return new ErrorModel('用户名已存在')
  }
  try {
    await createUser({ username, password: genPassword(password), gender })
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
const checkUserExist = async username => {
  const res = await getUserInfo(username)
  if (res) {
    return new SuccessModel(res)
  }
  return new ErrorModel('用户名未存在')
}

/**
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {Object} ctx koa2 ctx
 */
const login = async (username, password, ctx) => {
  try {
    const userInfo = await getUserInfo(username, genPassword(password))
    if (userInfo) {
      ctx.session.userInfo = userInfo
      return new SuccessModel(userInfo)
    } else {
      return new ErrorModel('用户名或密码错误')
    }
  } catch (error) {
    console.log('controller error: ', error)
  }
}

/**
 * 删除用户
 * @param {string} username 用户名
 */
const deleteCurUser = async username => {
  const res = await deleteUser(username)
  console.log(deleteCurUser, res)
  if (res) {
    return new SuccessModel('删除成功')
  }
  return new ErrorModel('删除失败')
}

/**
 * 修改用户信息
 * @param {Object} ctx ctx
 * @param {string} nickname 昵称
 * @param {string} city 城市
 * @param {string} pictrue 用户头像
 */
const changeUserInfo = async (ctx, { nickname, city, picture }) => {
  const { username } = ctx.session.userInfo
  const res = await updateUserInfo(
    { newNickname: nickname, newCity: city, newPicture: picture },
    { username }
  )
  if (res) {
    Object.assign(ctx.session.userInfo, {
      nickname,
      city,
      picture
    })
    return new SuccessModel('修改成功')
  }
  return new ErrorModel('修改失败')
}

/**
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
const changePasswrod = async (username, password, newPassword) => {
  const res = await updateUserInfo({ newPassword: genPassword(newPassword) }, { username, password: genPassword(password) })
  console.log('changePasswrod', res)
  if (res) {
    return new SuccessModel('修改成功')
  }
  return new ErrorModel('修改失败')
}

/**
 * 
 * @param {Object} ctx ctx
 */
const logout = async (ctx) => {
  delete ctx.session.userInfo
  return new SuccessModel('退出成功')
}

module.exports = {
  checkUserExist,
  registerUser,
  login,
  deleteCurUser,
  changeUserInfo,
  changePasswrod,
  logout
}
