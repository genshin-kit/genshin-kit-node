const { GenshinKit } = require('../')
const App = new GenshinKit()
const { cookie, uid } = require('./secret')

// 登录
App.loginWithCookie(cookie)

module.exports = {
  App,
  uid,
}
