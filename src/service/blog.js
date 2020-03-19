/**
 * @description blog service
 */

const { Blog, User } = require('../db/model/index')

/**
 * 创建微博
 * @param {number} userId 微博内容
 * @param {string} content 微博内容
 * @param {string} image 图片url
 */
const createBlog = async (userId, content, image) => {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}