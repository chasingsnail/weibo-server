/**
 * @description 数据模型入门
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRealation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 通过 userId 查询关注人
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

// 按 followerId 查询粉丝用户
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}
