const { genshinKit } = require('../')
const genshin = new genshinKit()

/** 可以这样写 */
// 登录
genshin.loginWithCookie(require('./secret.cookie'))
// 获取用户信息
genshin.getUserInfo(100000001).then(console.log)

/** 也可以这样写，偷懒.jpg */
genshin
  .loginWithCookie(require('./secret.cookie'))
  .getUserInfo(100000001)
  .then(console.log)