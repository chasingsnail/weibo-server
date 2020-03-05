/**
 * @description schema 校验中间件
 */

const { ErrorModel } = require('../model/ResModel')

const genValidator = fn => {
  return async (ctx, next) => {
    const data = ctx.request.body
    const errRes = fn(data)

    // 验证失败
    if (errRes) {
      ctx.body = new ErrorModel('数据格式错误')
      return
    }
    await next()
  }
}

module.exports = genValidator