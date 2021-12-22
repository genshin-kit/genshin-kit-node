const { App, uid } = require('.')

// 获取用户基础信息
App.userInfo(uid).then(console.log, console.error)
