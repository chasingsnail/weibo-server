/**
 * @description sequelize 实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isPrd, isTest } = require('../utils/env')

const { host, database, user, password } = MYSQL_CONF

const conf = {
	host: host,
	dialect: 'mysql'
}

if (isTest) {
  // 测试环境 - 不打印SQL语句
  conf.logging = () => {}
} 

if (isPrd) {
	// 线上环境 - 连接池配置
	conf.pool = {
		max: 5, // 连接池允许最大连接数量
		min: 0,
		idle: 10000 // 10s 之内没有被使用则释放
	}
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
 