/**
 * @description 用户关系 单元测试
 */

const server = require('../server')
const {
	COOKIE_1,
	USERNAME_1,
	ID_1,
	COOKIE_2,
	USERNAME_2,
	ID_2
} = require('../userInfo')

const {
	getUserFollowers,
	getFollowerList
} = require('../../src/controller/user-relation')

test('重置关注关系，张三取关张梅', async () => {
	await server
		.post('/api/profile/unFollow')
		.send({ userId: ID_2 })
		.set('cookie', COOKIE_1)
})

//  添加关注
test('张三关注张梅', async () => {
	const res = await server
		.post('/api/profile/follow')
		.send({ userId: ID_2 })
		.set('cookie', COOKIE_1)
	expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('张梅粉丝列表有张三', async () => {
	const { count, list } = (await getUserFollowers(ID_2)).data
	const hasTargetName = list.some(fans => fans.username === USERNAME_1)
	expect(count > 0).toBe(true)
	expect(hasTargetName).toBe(true)
})

// 获取关注人
test('张三关注人列表中含有张梅', async () => {
	const { count, list } = (await getFollowerList(ID_1)).data
	const hasTargetName = list.some(fans => fans.username === USERNAME_2)
	expect(count > 0).toBe(true)
	expect(hasTargetName).toBe(true)
})

// 取消关注
test('张三取消关注张梅', async () => {
	const res = await server
		.post('/api/profile/unFollow')
		.send({ userId: ID_2 })
    .set('cookie', COOKIE_1)
  expect(res.body.errno).toBe(0)
})
