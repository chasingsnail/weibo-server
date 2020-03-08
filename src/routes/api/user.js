/**
 * user API
 */

const router = require('koa-router')()

const { checkUserExist, registerUser, login } = require('../../controller/user')
const genValidator = require('../../middleware/validator')
const validateUser = require('../../validator/user')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(validateUser), async (ctx, next) => {
  const { username, password, gender } = ctx.request.body
  console.log('username, password, gender', username, password, gender)
  ctx.body = await registerUser({username, password, gender})
})

// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  const res = await checkUserExist(userName)
  ctx.body = res
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const res = await login(userName, password)
  ctx.body = res
})

module.exports = router