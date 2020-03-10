/**
 * @description 登录验证中间件
 */

const { ErrorModel } = require('../model/ResModel')

/**
 * API 登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
const loginCheck = async (ctx, next) => {
  if (ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  ctx.body = new ErrorModel('未登录')
}

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
const loginRedirect = async(ctx, next) => {
  if (ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  const curURL = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(curURL)}`)
} 

module.exports = {
  loginCheck,
  loginRedirect
}