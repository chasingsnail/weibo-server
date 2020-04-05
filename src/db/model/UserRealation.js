/**
 * 用户关系模型
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('./types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注人 ID'
  }
})

module.exports = UserRelation
