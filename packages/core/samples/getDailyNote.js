const { App, uid } = require('.')

App.dailyNote(uid).then(console.log, console.error)
