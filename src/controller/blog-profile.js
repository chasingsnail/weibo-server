/**
 * @description blog-profile controller
 */

const { getBlogByUser } = require('../service/blog')
const { addFollower, deleteFollower } = require('../service/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constant')

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

/**
 * 关注
 * @param {number} myUserId 当前登录用户 id
 * @param {number} curUserId 被关注人 id
 */
const follow = async (myUserId, curUserId) => {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel('关注失败')
  }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录用户 id
 * @param {number} curUserId 被关注人 id
 */
const unFollow = async (myUserId, curUserId) => {
  try {
    await deleteFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log('error', error)
    return new ErrorModel('取消关注失败')
  }
}


module.exports = {
  getProfileBlogList,
  follow,
  unFollow
}
