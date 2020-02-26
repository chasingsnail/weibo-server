const { User } = require('./model')

!(async () => {
  const updateRes = await User.update({
    nickname: '张三'
  }, {
    where: {
      username: 'zhangsan'
    }
  })
  
  console.log('updateRes: ', updateRes[0] > 0) // [ 1 ]
})()