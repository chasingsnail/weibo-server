/**
 * @description blog controller
 */

const xss = require('xss')
const { createBlog, getBlogByUser } = require('../service/blog')
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

/**
 * 获取个人主页微博
 * @param {string} username 用户名
 * @param {number} pageIndex 当前页面
 */
const getProfileBlogList = async (username, pageIndex = 0) => {
  const res = await getBlogByUser({
    username,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const { blogList, count } = res
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    count,
    pageSize: PAGE_SIZE,
    pageIndex
  })
}

module.exports = {
  sendBlog,
  getProfileBlogList
}
