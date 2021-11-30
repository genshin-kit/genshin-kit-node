const { App, uid } = require('.')

// 获取用户基础信息
App.getUserInfo(uid).then(console.log, console.error)
