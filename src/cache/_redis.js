/**
 * @description 连接 redis get 与 set
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log('err: ', err)
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
const set = (key, val, timeout = 3600) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
const get = key => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        return reject(err)
      }
      if (val === null) {
        return resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  get,
  set
}
