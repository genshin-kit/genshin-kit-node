const { genshinKit } = require('..')
const App = new genshinKit()
const cookie = require('./secret.cookie') || ''
const uid = require('./secret.uid') || 100000001

// 登录
App.loginWithCookie(cookie)

// 获取用户全部角色
App.getAllCharacters(uid).then(allCharacters => {
  if (!allCharacters) return console.warn('发生未知错误')

  // 全部角色
  console.log(`玩家 ${uid} 的全部角色`, allCharacters.all())

  // 用角色名称查询详情
  const diluke1 = allCharacters.name('迪卢克')
  if (diluke1) {
    console.log('byId', `玩家 ${uid} 的迪卢克`, diluke1)
  } else {
    console.log(`玩家 ${uid} 没有迪卢克`)
  }

  // 也可以用角色 id 查询
  const diluke2 = allCharacters.id(10000016)
  if (diluke2) {
    console.log('byId', `玩家 ${uid} 的 ${diluke2.name}`, diluke2)
  } else {
    console.log(`玩家 ${uid} 没有 id 为 10000016 的角色`)
  }

  // 用星级查询
  const byRarity = allCharacters.rarity(5)
  if (byRarity) {
    console.log(`玩家 ${uid} 的五星角色`, byRarity)
  } else {
    console.log(`玩家没有五星角色`)
  }

  // 用元素查询
  const pyroCharacters = allCharacters.element('火') // 或 pyro，中英文皆可
  console.log(`玩家 ${uid} 的全部火系角色`, pyroCharacters)
})
