/**
 * 个人首页 API
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middleware/loginCheck')
const { getProfileBlogList } = require('../../controller/blog')
const { follow, unFollow } = require('../../controller/blog-profile')
const { getBLogListString } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:username/:pageIndex', loginCheck, async (ctx, next) => {
  let { username, pageIndex } = ctx.params
  pageIndex = Number(pageIndex)
  const result = await getProfileBlogList(username, pageIndex)
  // 渲染 html 模板
  result.data.blogListTpl = getBLogListString(result.data.blogList)
  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myId, curUserId)
})

module.exports = router