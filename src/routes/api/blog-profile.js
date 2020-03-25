/**
 * 个人首页 API
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middleware/loginCheck')
const { getProfileBlogList } = require('../../controller/blog')
const { getBLogListString } = require('../../utils/blog')

router.prefix('/api/profile')

router.get('/loadMore/:username/:pageIndex', loginCheck, async (ctx, next) => {
  let { username, pageIndex } = ctx.params
  pageIndex = Number(pageIndex)
  const result = await getProfileBlogList(username, pageIndex)
  // 渲染 html 模板
  result.data.blogListTpl = getBLogListString(result.data.blogList)

  ctx.body = result
})

module.exports = router