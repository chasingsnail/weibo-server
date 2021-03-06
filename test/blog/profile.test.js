/**
 * 我的微博测试
 */
const server = require('../server')
const { COOKIE, USERNAME } = require('../userInfo')

test('个人主页，加载第一页数据，应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${USERNAME}/0`)
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})