const { App, uid } = require('.')
const { CharactersFilter, activedConstellations } = require('..').util

// 使用角色过滤器
App.getAllCharacters(uid).then((data) => {
  const Filter = new CharactersFilter(data)
  console.log(`玩家 ${uid} 的角色信息：`)

  // 全部角色
  console.log('# 全部角色：')
  console.log(
    Filter.all()
      .map((item) => {
        return `${item.name} (${item.element} ${item.rarity}星)`
      })
      .join('、')
  )

  // 用角色名称查询详情
  const byName = Filter.name('迪卢克')
  console.log('# 名称查询：迪卢克')
  if (byName) {
    console.log(
      byName.name,
      `${byName.level}级 好感${byName.fetter} 命座${activedConstellations(
        byName
      )}`
    )
  } else {
    console.log(`玩家没有名为“迪卢克”的角色`)
  }

  // 甚至可以用别称
  const byNick = Filter.name('女仆')
  console.log('# 别名查询：女仆')
  if (byNick) {
    console.log(
      `${byNick.name}`,
      `${byNick.level}级 好感${byNick.fetter} 命座${activedConstellations(
        byNick
      )}`
    )
  } else {
    console.log('玩家没有别名为“女仆”的角色')
  }

  // 也可以用角色 id 查询
  const byId = Filter.id(10000020)
  console.log('# ID 查询：10000020')
  if (byId) {
    console.log(
      `${byId.name}`,
      `${byId.level}级 好感${byId.fetter} 命座${activedConstellations(byId)}`
    )
  } else {
    console.log(`玩家没有 ID 为“10000020”的角色`)
  }

  // 用星级查询
  const byRarity = Filter.rarity(5)
  console.log('# 五星角色：')
  if (byRarity) {
    console.log(
      byRarity
        .map((item) => {
          return item.name
        })
        .join('、')
    )
  } else {
    // 这里显然是不可能的，因为旅行者就是 5 星
    console.log(`玩家没有五星角色`)
  }

  // 用元素查询
  const byElement = Filter.element('火') // 或 pyro，中英文皆可
  console.log('# 元素查询：火')
  console.log(
    byElement
      .map((item) => {
        return item.name
      })
      .join('、')
  )
}, console.error)
