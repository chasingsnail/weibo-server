/**
 * @description 加密
 */

const crypto = require('crypto')

// 密钥
const SECRECT_KEY = 'weDJ_12#'

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 生成密码
function genPassword(pwd) {
  let str = `password=${pwd}&key=${SECRECT_KEY}`
  return _md5(str)
}

module.exports = {
  genPassword
}