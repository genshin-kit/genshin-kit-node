const { App, uid } = require('.')
const { util } = require('..')

// 使用角色过滤器
App.getAllCharacters(uid).then(
  data => {
    const Filter = new util.CharactersFilter(data)
    // 全部角色
    console.log(`玩家 ${uid} 的全部角色`, Filter.all())

    // 用角色名称查询详情
    const diluke1 = Filter.name('迪卢克')
    if (diluke1) {
      console.log('byId', `玩家 ${uid} 的迪卢克`, diluke1)
    } else {
      console.log(`玩家 ${uid} 没有迪卢克`)
    }

    // 也可以用角色 id 查询
    const diluke2 = Filter.id(10000016)
    if (diluke2) {
      console.log('byId', `玩家 ${uid} 的 ${diluke2.name}`, diluke2)
    } else {
      console.log(`玩家 ${uid} 没有 id 为 10000016 的角色`)
    }

    // 用星级查询
    const byRarity = Filter.rarity(5)
    if (byRarity) {
      console.log(`玩家 ${uid} 的五星角色`, byRarity)
    } else {
      console.log(`玩家没有五星角色`)
    }

    // 用元素查询
    const pyroCharacters = Filter.element('火') // 或 pyro，中英文皆可
    console.log(`玩家 ${uid} 的全部火系角色`, pyroCharacters)
  },
  err => {
    console.error(err)
  },
  err => console.error
)
