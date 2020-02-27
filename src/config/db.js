/**
 * @description 数据存储相关配置
 */

const REDIS_CONF = {
  host: '127.0.0.1',
  port: '6379'
}

const MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'Azure2576',
  port: '3306',
  database: 'koa_weibo'
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}