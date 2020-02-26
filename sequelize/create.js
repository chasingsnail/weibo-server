const { Blog, User } = require('./model')

!(async () => {

  // 创建用户
  const zhangsan = await User.create({
    username: 'zhangsan',
    password: '123',
    nickname: '张三'
  })

  const lisi = await User.create({
    username: 'lisi',
    password: '123',
    nickname: '李四'
  })

  // 创建博客
  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsan.dataValues.id
  })

  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: lisi.dataValues.id
  })

})()
