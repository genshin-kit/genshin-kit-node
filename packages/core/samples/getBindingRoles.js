const { App } = require('.')

// CN server
App.selfBindingRoles().then((data) => console.log(data.data.list), console.error)
