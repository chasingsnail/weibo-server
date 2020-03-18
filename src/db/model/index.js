/**
 * @description 数据模型入门
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
