/**
 * @description blog controller
 */

const xss = require('xss')
const { createBlog, getBlogByFollower } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constant')

/**
 *
 * @param {NumberConstructor} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片地址
 */
const sendBlog = async (userId, content, image) => {
  const res = await createBlog(userId, xss(content), image)
  if (res) {
    return new SuccessModel('发布成功')
  }
  return new ErrorModel('发布失败')
}

const getHomeBlogList = async (userId, pageIndex, pageSize = PAGE_SIZE) => {
  const result = await getBlogByFollower({ userId, pageIndex, pageSize})
  const { blogList, count } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    count,
    pageSize,
    pageIndex
  })
}


module.exports = {
  sendBlog,
  getHomeBlogList
}
