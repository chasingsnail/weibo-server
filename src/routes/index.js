const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (!session.viewCount) {
  //   session.viewCount = 0
  // }
  // session.viewCount++
  ctx.body = {
    title: 'koa2 json',
    // count: ctx.session.viewCount
  }
})

module.exports = router
