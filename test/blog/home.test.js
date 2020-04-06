/**
 * 个人主页微博测试
 */

const server = require('../server')
const { USERNAME, COOKIE } = require('../userInfo')

test('个人主页，第一页数据请求', async () => {
	const res = await server
		.get(`/api/profile/loadMore/${USERNAME}/0`)
		.set('cookie', COOKIE)
	expect(res.body.errno).toBe(0)
})

test('微博首页列表加载', async () => {
	const res = await server
			.get(`/api/blog/loadMore/0`)
			.set('cookie', COOKIE)
	expect(res.body.errno).toBe(0)

	const data = res.body.data
	expect(data).toHaveProperty('isEmpty')
	expect(data).toHaveProperty('blogList')
	expect(data).toHaveProperty('pageSize')
	expect(data).toHaveProperty('pageIndex')
	expect(data).toHaveProperty('count')
})