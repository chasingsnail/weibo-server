/**
 * @description 用户 API 测试
 */

const server = require('../server')

let cookie = ''

//  const { User }
const username = `c_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
	username,
	password,
	nickname: username,
	gender: 2
}

test('注册新用户', async () => {
	const res = await server.post('/api/user/register').send(testUser)
	expect(res.body.errno).toBe(0)
})

test('重复注册用户', async () => {
	const res = await server.post('/api/user/isExist').send({
		username
	})
	expect(res.body.errno).toBe(0)
})

test('json schema 注册提交数据格式校验', async () => {
	const res = await server.post('/api/user/register').send({
		username: '123',
		password: 'a',
		gender: 'b'
	})
	expect(res.body.errno).toBe(-1)
})

test('登录', async () => {
	const res = await server.post('/api/user/login').send({
		username,
		password
	})
	expect(res.body.errno).toBe(0)
	console.log('set cookie ', res.headers['set-cookie'])
	const resCookie = res.headers['set-cookie'][0]

	const str1 = resCookie.match(/weibo.sid=(\S*);\s/)[0]

	const str2 = resCookie.match(/weibo.sid.sig=(\S*);\s/)[0]

	cookie = str1 + str2
})

test('删除用户', async () => {
	const res = await server.post('/api/user/delete').set('Cookie', cookie)
	expect(res.body.errno).toBe(0)
})

// 修改基本信息
// test('修改基本信息应该成功', async () => {
// 	const res = await server
// 			.patch('/api/user/changeInfo')
// 			.send({
// 					nickname: '测试昵称',
// 					city: '测试城市',
// 					picture: '/test.png'
// 			})
// 			.set('cookie', cookie)
// 	expect(res.body.errno).toBe(0)
// })

// test('删除后用户名不存在', async () => {
// 	const res = await server.post('/api/user/isExist').send({
// 		username
// 	})
// 	expect(res.body.errno).toBe(0)
// })
