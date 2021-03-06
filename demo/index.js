const { GenshinKit } = require('../')
const App = new GenshinKit()
const cookie = require('./secret.cookie') || ''
const uid = require('./secret.uid') || 100000001

// 登录
App.loginWithCookie(cookie)

module.exports = {
  App,
  uid,
}
