const { genshinKit } = require('../')

const genshin = new genshinKit()

genshin.loginWithCookie(require('./secret.cookie'))

genshin.getUserInfo(101257635).then(console.log)
