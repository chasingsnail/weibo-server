const seq = require('./seq')

require('./model')

seq.authenticate().then(() => {
  console.log('seq ok');
}).catch(err => {
  console.log('err: ', err);
})

// 同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})