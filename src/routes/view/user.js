/**
 * @description user
 */

const router = require('koa-router')()

router.get('/login', async(ctx, next) => {
  await ctx.render('login', {})
})

router.get('/register', async(ctx, next) => {
  await ctx.render('register', {})
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
