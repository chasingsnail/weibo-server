const { User } = require('../../src/db/model/index')

test('User 模型是否符合预期', () => {
  const user = User.build({
    username: 'zhangsan',
    password: '123',
    nickname: '张三',
    gender: '2'
  })

  expect(user.username).toBe('zhangsan')
  // ...
})