const { User, Blog } = require('./model')

!(async () => {
  // 删除博客
  const blogRes = await Blog.destroy({
    where: {
      id: 1
    }
  })
  console.log('blogRes', blogRes > 0) // 1
})()