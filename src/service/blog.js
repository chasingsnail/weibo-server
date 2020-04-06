/**
 * @description blog service
 */

const { Blog, User, UserRelation } = require('../db/model/index')
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
 * 获取关注人微博（包含自己）
 * @param {number} userId 当前登录用户 id
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
const getBlogByFollower = async ({ userId, pageIndex, pageSize}) => {
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
      },
      {
        model: UserRelation,
        where: {
          userId
        }
      }
    ]
  })
  const blogList = result.rows.map(row => row.dataValues).map(item => {
    item.user = formatUser(item.user.dataValues)
    return item
  })
  console.log(blogList)
  return {
    count: result.count,
    blogList
  }
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
  console.log('page', pageIndex, pageSize)
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
  // console.log('blogList', blogList)
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogByUser,
  getBlogByFollower
}