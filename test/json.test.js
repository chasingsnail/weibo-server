/**
 * @description json testc
 */

const server = require('./server')

test('json feedback is correct', async () => {
  // get 请求
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  // post req
  const res = await server.post('/login').send({
    username: 'zhangsan',
    password: '123'
  })
})