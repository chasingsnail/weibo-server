/**
 * 微博广场 controller
 */

const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getCacheBlogList } = require('../cache/blog')
const { PAGE_SIZE } = require('../config/constant')

/**
 *
 * @param {number} pageIndex 页数
 */
const getSquareBlogList = async (pageIndex = 0) => {
  const result = await getCacheBlogList(pageIndex, PAGE_SIZE)
  const { blogList, count } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    count,
    pageSize: PAGE_SIZE,
    pageIndex
  })
}

module.exports = {
  getSquareBlogList
}
