/**
 * @description user controller
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')

/**
 * 检查用户名是否存在
 * @param {string} username 用户名
 */
const checkUserExist = async (username) => {
  const res = await getUserInfo(username)
  if (res) {
    return new ErrorModel('用户名已存在')
  }
  return new SuccessModel(res)
}

module.exports = {
  checkUserExist
}
