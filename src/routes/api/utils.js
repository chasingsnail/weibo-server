/**
 * @description utils API
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middleware/loginCheck')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 图片上传
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  
  ctx.body = await saveFile({
    size,
    name,
    type,
    filePath: path
  })
})

module.exports = router