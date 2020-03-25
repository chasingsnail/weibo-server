/**
 * blog 相关工具方法
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 文件
const BLOG_LIST_FILE = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 按bloglist渲染对应字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 */
const getBLogListString = (blogList = [], canReply = false) => {
  return ejs.render(BLOG_LIST_FILE, {
    blogList,
    canReply
  })
}

module.exports = {
  getBLogListString
}