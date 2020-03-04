const { Blog, User } = require('./model')

!(async () => {
  // // 单条记录
  // const zhangsan = await User.findOne({
  //   where: {
  //     username: 'zhangsan'
  //   }
  // })
  // console.log('zhangsan: ', zhangsan.dataValues)

  // // 查询特定列
  // const zhangsanName = await User.findOne({
  //   attributes: ['username', 'nickname'],
  //   where: {
  //     username: 'zhangsan'
  //   }
  // })

  // console.log('zhangsanName', zhangsanName.dataValues);

  // // 查询列表
  // const zhangsanBlog = await Blog.findAll({
  //   // 分页
  //   limit: 2, // 限制条数
  //   offset: 0,
  //   where: {
  //     userId: 1
  //   },
  //   order: [
  //     ['id', 'desc']
  //   ]
  // })

  // // 查询总数
  // const blogCount = await Blog.findAndCountAll({
  //   order: [
  //     ['id', 'desc']
  //   ]
  // })

  // console.log('blogCount', blogCount)

  // // 联表查询1 关联 model.js 中 belongsTo
  // const blogListWithUser = await Blog.findAndCountAll({
  // 	order: [['id', 'desc']],
  // 	include: [
  // 		{
  // 			model: User,
  // 			attributes: ['username', 'nickname'],
  // 			where: {
  // 				username: 'zhangsan'
  // 			}
  // 		}
  // 	]
  // })

  // console.log(
  // 	'blogListWithUser: ',
  // 	blogListWithUser.rows.map(blog => {
  // 		const blogV = blog.dataValues
  // 		blogV.user = blogV.user.dataValues // 多对一
  // 		return blogV
  // 	})
  // )

  // 联表查询2
  const userListWithBlog = await User.findAndCountAll({
    include: [
      {
        model: Blog
      }
    ]
  })
  console.log(
    'blogListWithUser: ',
    userListWithBlog.rows.map(user => {
      const userV = user.dataValues
      userV.blogs = userV.blogs.map(blog => blog.dataValues) // 一对多
      return userV
    })
    // userListWithBlog.rows[0].blogs
  )
})()
