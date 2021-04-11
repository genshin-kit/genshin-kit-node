const { App, uid } = require('.')

const url = App.getCharacterDetails(uid, 10000016)
console.log(url)
