const { App } = require('.')

// CN server
App.request(
  'get',
  'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
).then((data) => console.log(data.data.list), console.error)
