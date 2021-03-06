const { App, uid } = require('./')

// 获取角色详细信息
App.getUserRoles().then(
  data => {
    console.log(data)
  },
  err => {
    console.error('error', err)
  }
)
