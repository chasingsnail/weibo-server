const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
const seq = new Sequelize('koa_weibo', 'root', 'Azure2576', conf)

// seq.authenticate().then(() => {
//   console.log('seq ok');
// }).catch(err => {
//   console.log('err: ', err);
// })

module.exports = seq