/**
 * 用户关系 service
 */

const { UserRelation, User } = require('../db/model/index')

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
          followerId
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

module.exports = {
  getUserByFollower
}