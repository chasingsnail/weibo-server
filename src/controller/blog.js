/**
 * @description blog controller
 */

const { createBlog } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 
 * @param {NumberConstructor} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片地址
 */
const sendBlog = async (userId, content, image) => {
  const res = await createBlog(userId, content, image)
  if (res) {
    return new SuccessModel('发布成功')
  }
  return new ErrorModel('发布失败')
}

module.exports = {
  sendBlog
}