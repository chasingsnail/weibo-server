/**
 * user API
 */

const router = require('koa-router')()

const { checkUserExist, registerUser } = require('../../controller/user')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {
  const { username, password, gender } = ctx.request.body
  console.log('username, password, gender', username, password, gender)
  ctx.body = await registerUser({username, password, gender})
})

// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  const res = await checkUserExist(userName)
  console.log('res: ', res)
  ctx.body = res
  // if (res.errno == -1) {
  //   ctx.throw('用户名一存在')
  // } else {
  //   ctx.body = 'ok'
  // }
})


module.exports = router