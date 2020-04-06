/**
 * @description blog 页面
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { checkUserExist } = require('../../controller/user')
const { getHomeBlogList } = require('../../controller/blog')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getUserFollowers, getFollowerList } = require('../../controller/user-relation')

router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { data } = await getHomeBlogList(userInfo.id, 0)

  // 获取粉丝数
  const { data: fansData } = await getUserFollowers(userInfo.id)

  // 获取关注列表
  const { data: followersData } = await getFollowerList(userInfo.id)

  await ctx.render('index', {
    blogData: data,
    userData: {
      userInfo,
      fansData,
      followersData
    },
  })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { username } = ctx.session.userInfo
  ctx.redirect(`/profile/${username}`)
})
router.get('/profile/:username/', loginRedirect, async (ctx, next) => {
  // 初始化获取微博第一页数据
  const { username } = ctx.params
  const { username: myUserName } = ctx.session.userInfo
  let curUserInfo = {}
  const isMe = myUserName === username
  if (isMe) {
    // 是当前登录用户
    curUserInfo = ctx.session.userInfo
  } else {
    // 不是当前登录用户
    const existResult = await checkUserExist(username)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }
  const { data } = await getProfileBlogList(username, 0)
  // 获取粉丝数
  const { data: fansData } = await getUserFollowers(curUserInfo.id)

  // 我是否关注了此人
  const amIFollowed = fansData.list.some(fans => fans.username === myUserName)

  // 获取关注列表
  const { data: followersData } = await getFollowerList(curUserInfo.id)

  await ctx.render('profile', {
    blogData: data,
    userData: {
      userInfo: curUserInfo,
      fansData,
      followersData,
      isMe,
      amIFollowed
    },
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 初始化获取微博第一页数据
  const { data } = await getSquareBlogList(0)
  await ctx.render('square', {
    blogData: data,
    userData: {
      userInfo: ctx.session.userInfo
    }
  })
})

module.exports = router
