const { Blog } = require('../../src/db/model/index')

test('User 模型是否符合预期', () => {
  const blog = Blog.build({
    userId: 1,
    content: '内容',
    image: './test.png'
  })

  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('内容')
  expect(blog.image).toBe('./test.png')
  // ...
})