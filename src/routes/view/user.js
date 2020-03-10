/**
 * @description user
 */

const router = require('koa-router')()

/**
 * 
 * @param {Object} ctx koa2 ctx
 */
const checkLoginStatus = ctx => {
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    return {
      isLogin: true,
      userName: userInfo.username
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

module.exports = router
