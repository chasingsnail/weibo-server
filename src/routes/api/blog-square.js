/**
 * 微博广场 API
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middleware/loginCheck')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBLogListString } = require('../../utils/blog')

router.prefix('/api/square')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  // 渲染 html 模板
  result.data.blogListTpl = getBLogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router