const { App } = require('.')
const { getCharacterIds } = require('../lib/util/getItemIds')

getCharacterIds('zh-cn').then(console.log)
