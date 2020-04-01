const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./config/db')

// const index = require('./routes/index')
const blogView = require('./routes/view/blog')
const blogAPI = require('./routes/api/blog')
const blogProfileAPI = require('./routes/api/blog-profile')
const blogSquareAPI = require('./routes/api/blog-square')
const userView = require('./routes/view/user')
const userAPI = require('./routes/api/user')
const utilsAPI = require('./routes/api/utils')

// error handler
// const onerrorConf = {
//   redirect: '/error'
// }
// onerror(app, onerrorConf) // 跳转到 error 页
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadFiles')))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// session 配置
app.keys = ['Wypdate_123#'] // 密匙
app.use(
  session({
    key: 'weibo.sid', // cookie name，默认为 koa.sid
    prefix: 'weibo:sess', // redis key 前缀。默认为 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // ms
    },
    // ttl: 24 * 60 * 60 * 1000, // redis 过期时间，默认于cookie.maxAge相同
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
// app.use(index.routes(), index.allowedMethods())
// view
app.use(userView.routes(), userView.allowedMethods())
app.use(blogView.routes(), blogView.allowedMethods())
// api
app.use(blogAPI.routes(), blogAPI.allowedMethods())
app.use(blogProfileAPI.routes(), blogProfileAPI.allowedMethods())
app.use(blogSquareAPI.routes(), blogSquareAPI.allowedMethods())
app.use(userAPI.routes(), userAPI.allowedMethods())
app.use(utilsAPI.routes(), utilsAPI.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
