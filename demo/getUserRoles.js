const { App, uid } = require('./')

// 获取角色详细信息
App.getUserRoles(uid).then(console.log, console.error)
