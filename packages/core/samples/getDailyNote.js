const { App, uid } = require('.')

App.getDailyNote(uid).then(console.log, console.error)
