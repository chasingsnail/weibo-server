const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// // 线上环境
// conf.pool = {
//   max: 5, // 连接池允许最大连接数量
//   min: 0,
//   idle: 10000 // 10s 之内没有被使用则释放
// }

const seq = new Sequelize('koa_weibo', 'root', 'Azure2576', conf)

// seq.authenticate().then(() => {
//   console.log('seq ok');
// }).catch(err => {
//   console.log('err: ', err);
// })

module.exports = seq