/**
 * @description 用户数据模型
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('./types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickname: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男性，2 女性， 3保密）'
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User