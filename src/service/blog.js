/**
 * @description blog service
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

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

/**
 * 按用户获取微博
 * @param {Object} param0 查询参数
 */
const getBlogByUser = async ({ username, pageIndex = 0, pageSize = 10 }) => {
  const whereOpts = {}
  if (username) {
    whereOpts.username = username
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['username', 'nickname', 'picture'],
        where: whereOpts
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果
  let blogList = result.rows.map(row => row.dataValues).map(item => {
    item.user = formatUser(item.user.dataValues)
    return item
  })
  console.log('blogList', blogList)
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogByUser
}