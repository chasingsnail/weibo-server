/**
 * @description 微博首页 API
 */

const router = require('koa-router')()
const { sendBlog } = require('../../controller/blog')
const { loginCheck } = require('../../middleware/loginCheck')
const genValidator = require('../../middleware/validator')
const validateBlog = require('../../validator/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(validateBlog), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await sendBlog(userId, content, image)
})

module.exports = router
