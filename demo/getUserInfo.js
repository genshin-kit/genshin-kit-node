const { genshinKit } = require('../')
const App = new genshinKit()
const cookie = require('./secret.cookie') || ''
const uid = require('./secret.uid') || 100000001

/** 可以这样写 */
// 登录
App.loginWithCookie(cookie)
// 获取用户信息
App.getUserInfo(uid).then(console.log)

/** 也可以这样写，偷懒.jpg */
App
  .loginWithCookie(cookie)
  .getUserInfo(uid)
  .then(console.log)
