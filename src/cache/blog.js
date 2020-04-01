/**
 * 获取微博列表缓存
 */

const { get, set } = require('./_redis')
const { getBlogByUser } = require('../service/blog')

const KEY_PREFIX = 'weibo:square'

/**
 *
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
const getCacheBlogList = async (pageIndex, pageSize) => {
  const key = `${KEY_PREFIX}_${pageIndex}_${pageSize}`

  // 尝试获取缓存
  const cacheRes = await get(key)

  if (cacheRes) {
    return cacheRes
  }

  // 无缓存则读取数据库
  const result = await getBlogByUser({ pageIndex, pageSize })
  // 缓存 redis
  set(key, result, 60)
  return result
}

module.exports = {
  getCacheBlogList
}
