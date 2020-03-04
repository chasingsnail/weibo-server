/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../config/constant')

/**
  * 设置用户默认头像
  * @param {Object} obj 用户对象
  */
const _formatUserPicture = obj => {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 
 * @param {Array|Object} list 用户列表或单个用户对象
 */
const formatUser = list => {
  if (!list) return list
  
  // 数组
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  // 单个对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}
