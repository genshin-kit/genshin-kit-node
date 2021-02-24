const { genshinKit } = require('../')
const genshin = new genshinKit()

// Login
genshin.loginWithCookie(require('./secret.cookie'))
// Get user info
genshin.getUserInfo(100000001).then(console.log)
