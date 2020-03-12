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
  cookie = res.headers['set-cookie'].join(';')
})

test('删除用户', async() => {
  const res = await server.post('/api/user/delete').set('cookie', cookie)
  console.log('del', res.body.errno)
  expect(res.body.errno).toBe(0)
})

test('删除后用户名不存在', async () => {
	const res = await server.post('/api/user/isExist').send({
		username
	})
	expect(res.body.errno).toBe(0)
})
