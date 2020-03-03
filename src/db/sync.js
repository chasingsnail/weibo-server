/**
 * @description 同步数据库
 */
const seq = require('./seq')

require('./model')

seq
  .authenticate()
  .then(() => {
    console.log('seq ok')
  })
  .catch(err => {
    console.log('err: ', err)
  })

// 清空已有数据重建
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
