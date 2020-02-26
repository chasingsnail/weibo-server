const Sequelize = require('sequelize')
const seq = require('./seq')

// Model User
const User = seq.define('user', {
  // id自增，并设为主键

  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING
  }
  // 自动创建 createdAt 和 updatedAt
})

// Model Blog
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键
Blog.belongsTo(User, {
  // Blog.userId -> User.id
  foreignKey: 'userId'
})
User.hasMany(Blog, {
  // Blog.userId -> User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}