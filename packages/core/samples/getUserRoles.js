const { App, uid } = require('.')

// 获取角色详细信息
App.userRoles(uid).then((data) => {
  console.log(data[0])
}, console.error)
