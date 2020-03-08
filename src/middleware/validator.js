/**
 * @description schema 校验中间件
 */

const { ErrorModel } = require('../model/ResModel')

/**
 * 
 * @param {Function} fn 校验函数中间件
 */
const genValidator = fn => {
  return async (ctx, next) => {
    const data = ctx.request.body
    const errRes = fn(data)
    // errRes 格式
    //   { 
    //      keyword: 'minLength',
    //      dataPath: '.username',
    //      schemaPath: '#/properties/username/minLength',
    //      params: { limit: 2 },
    //      message: 'should NOT be shorter than 2 characters' 
    //   }
    // 验证失败
    if (errRes) {
      console.log('errRes: ', errRes)
      ctx.body = new ErrorModel('数据格式错误')
      return
    }
    await next()
  }
}

module.exports = genValidator