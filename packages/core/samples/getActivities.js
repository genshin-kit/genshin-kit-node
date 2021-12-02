const { App, uid } = require('.')

App.activities(uid).then(console.log, console.error)
