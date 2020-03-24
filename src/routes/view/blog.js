/**
 * @description blog 页面
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const { getProfileBlogList } = require('../../controller/blog')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { username } = ctx.session.userInfo
  ctx.redirect(`/profile/${username}`)
})
router.get('/profile/:userName/', loginRedirect, async (ctx, next) => {
  // 初始化获取微博第一页数据 
  const { userName } = ctx.params
  const { data } = await getProfileBlogList(userName, 0)
  await ctx.render('profile', {
    blogData: data,
    userData: {}
  })
})

module.exports = router