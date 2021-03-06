/**
 * 微博广场 测试
 */

const server = require('../server')
const { COOKIE } = require('../userInfo')

test('个人主页，加载第一页数据，应该成功', async () => {
    const res = await server
        .get(`/api/square/loadMore/0`)
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})