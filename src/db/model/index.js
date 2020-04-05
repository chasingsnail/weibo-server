/**
 * @description 数据模型入门
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRealation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 通过 followerId 查询 userId，即查询粉丝
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

// 按 userId 查询到 followerId，即查询关注的人
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}
