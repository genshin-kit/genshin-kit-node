const { App, uid } = require('.')
const { CharactersFilter, activedConstellations } = require('..').util

// 使用角色过滤器
App.getAllCharacters(uid).then((data) => {
  const Filter = new CharactersFilter(data)
  // 全部角色
  console.log(
    `玩家 ${uid} 的全部角色`,
    Filter.all()
      .map((item) => {
        return `${item.name} (${item.rarity}星)`
      })
      .join('、')
  )

  // 用角色名称查询详情
  const diluke = Filter.name('迪卢克')
  if (diluke) {
    console.log(
      'byName',
      `玩家 ${uid} 的迪卢克`,
      `${diluke.level}级 好感${diluke.fetter} 命座${activedConstellations(
        diluke
      )}`
    )
  } else {
    console.log(`玩家 ${uid} 没有迪卢克`)
  }

  // 也可以用角色 id 查询
  const razor = Filter.id(10000020)
  if (razor) {
    console.log(
      'byId',
      `玩家 ${uid} 的 ${razor.name}`,
      `${razor.level}级 好感${razor.fetter} 命座${activedConstellations(razor)}`
    )
  } else {
    console.log(`玩家 ${uid} 没有 id 为 10000020 的角色`)
  }

  // 用星级查询
  const byRarity = Filter.rarity(5)
  if (byRarity) {
    console.log(
      `玩家 ${uid} 的五星角色`,
      byRarity
        .map((item) => {
          return item.name
        })
        .join('、')
    )
  } else {
    // 这里显然是不可能的，因为旅行者就是 5 星
    console.log(`玩家 ${uid} 没有五星角色`)
  }

  // 用元素查询
  const pyroCharacters = Filter.element('火') // 或 pyro，中英文皆可
  console.log(
    `玩家 ${uid} 的全部火系角色`,
    pyroCharacters
      .map((item) => {
        return item.name
      })
      .join('、')
  )
}, console.error)
