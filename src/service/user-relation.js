/**
 * 用户关系 service
 */

const { UserRelation, User } = require('../db/model/index')
const Sequelize = require('sequelize')

/**
 * 查询用户粉丝数
 * @param {number} id 用户 id
 */
const getUserByFollower = async followerId => {
  const result = await User.findAndCountAll({
    attributes: ['id', 'username', 'nickname', 'picture'],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })
  const fansData = result.rows.map(row => row.dataValues)
  return {
    count: result.count,
    fansData
  }
}

const getFollwersByUser = async userId => {
  const result = await UserRelation.findAndCountAll({
    // attributes: ['id', 'username', 'nickname', 'picture'],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'nickname', 'picture'],
      }
    ]
  })
  const userList = result.rows.map(row => row.dataValues).map(row => {
    row = {...row, ...row.user.dataValues}
    return row
  })
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注者 id
 */
const addFollower = async (userId, followerId) => {
  const res = await UserRelation.create({
    userId,
    followerId
  })
  return res.dataValues
}

/**
 * 取消关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注者 id
 */
const deleteFollower = async (userId, followerId) => {
  const res = await UserRelation.destroy({
    where: {
      userId, followerId
    }
  })
  return res > 0
}


module.exports = {
  getUserByFollower,
  getFollwersByUser,
  addFollower,
  deleteFollower
}