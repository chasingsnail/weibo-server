/**
 * user API
 */

const router = require('koa-router')()

const {
  checkUserExist,
  registerUser,
  login,
  deleteCurUser,
  changeUserInfo,
  changePasswrod,
  logout
} = require('../../controller/user')
const { loginCheck } = require('../../middleware/loginCheck')
const { isTest } = require('../../utils/env')
const genValidator = require('../../middleware/validator')
const validateUser = require('../../validator/user')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(validateUser), async (ctx, next) => {
  const { username, password, gender } = ctx.request.body
  ctx.body = await registerUser({ username, password, gender })
})

// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { username } = ctx.request.body
  const res = await checkUserExist(username)
  ctx.body = res
})

// 登录
router.post('/login', async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body
    const res = await login(username, password, ctx)
    ctx.body = res
  } catch (error) {
    console.log('router error: ', error)
  }
})

// 删除用户(for test)
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下删除自身
    const { username } = ctx.session.userInfo
    ctx.body = await deleteCurUser(username)
  }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(validateUser), async (ctx, next) => {
  const { nickname, city, picture } = ctx.request.body
  ctx.body = await changeUserInfo(ctx, { nickname, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(validateUser), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { username } = ctx.session.userInfo
  ctx.body = await changePasswrod(username, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router
