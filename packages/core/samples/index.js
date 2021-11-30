const { GenshinKit } = require('../lib/index')
const App = new GenshinKit()
const secret = require('./secret')

// 登录
App.loginWithCookie(secret.cookie)

module.exports = {
  App,
  ...secret,
}
