/**
 * @description 微博首页 API
 */

const router = require('koa-router')()
const { sendBlog, getHomeBlogList } = require('../../controller/blog')
const { loginCheck } = require('../../middleware/loginCheck')
const genValidator = require('../../middleware/validator')
const validateBlog = require('../../validator/blog')
const { getBLogListString } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(validateBlog), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await sendBlog(userId, content, image)
})

// 微博列表
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  const { id: userId } = ctx.session.userInfo
  pageIndex = parseInt(pageIndex)
  let result = await getHomeBlogList(userId, pageIndex)
  result.data.blogListTpl = getBLogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router
