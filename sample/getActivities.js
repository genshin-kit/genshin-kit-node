const { App, uid } = require('.')

App.getActivities(uid).then(console.log, console.error)
