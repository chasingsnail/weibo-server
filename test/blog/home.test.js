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
