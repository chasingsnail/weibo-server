/**
 * user API
 */

const router = require('koa-router')()

const { checkUserExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body

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