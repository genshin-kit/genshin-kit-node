const { App, uid } = require('.')

const url = App.getCharacterDetailsUrl(uid, 10000016) // 迪卢克
console.log(url)
