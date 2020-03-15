/**
 * @description user
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginCheck')

/**
 * 已登录状态判断
 * @param {Object} ctx koa2 ctx
 */
const checkLoginStatus = ctx => {
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    return {
      isLogin: true,
      ...userInfo
    }
  } else {
    return {
      isLogin: false
    }
  }
}

router.get('/login', async(ctx, next) => {
  await ctx.render('login', checkLoginStatus(ctx))
})

router.get('/register', async(ctx, next) => {
  await ctx.render('register', {})
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', checkLoginStatus(ctx))
})

module.exports = router
