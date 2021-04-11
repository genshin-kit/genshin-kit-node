/**
 * @method CharactersFilter
 * @param {Object} avatars UserRoles.data.avatars
 */
import { Character } from '../types/Character'

export default class {
  allCharacters: Character[] = []
  id: ((filter: number | string) => any) | undefined

  constractor(avatars: Character[]) {
    this.allCharacters = avatars
    this.id = this.name
  }

  /**
   * @function id/name 通过名称或id获取玩家指定角色的信息
   * @param {Number} uid
   * @param {String|Number} filter 角色名称或 id
   * @return {Object|null} 角色信息或null
   */
  name(filter: number | string): Character | null {
    // 解析查询的方式
    let type = ''
    if (typeof filter === 'number' || /^[0-9]$/g.test(filter)) {
      type = 'byId'
      filter = Number(filter)
    } else if (typeof filter === 'string') {
      type = 'byName'
    } else {
      return null
    }

    switch (type) {
      case 'byId':
        for (const item of this.allCharacters) {
          if (item.id === filter) return item
        }
        break
      case 'byName':
        for (const item of this.allCharacters) {
          if (item.name === filter) return item
        }
        break
    }

    return null
  }

  /**
   * @function element 通过指定元素筛选玩家的角色
   */
  element(el: string): Character[] {
    el = el.toLocaleLowerCase()

    // 中文名转换
    let elAlias: any = {
      火: 'pyro',
      fire: 'pyro',
      水: 'hydro',
      water: 'hydro',
      风: 'anemo',
      wind: 'anemo',
      雷: 'electro',
      thunder: 'electro',
      冰: 'cryo',
      ice: 'cryo',
      岩: 'geo',
      rock: 'geo',
      草: '',
      grass: '',
    }
    el = elAlias[el] || el

    let list = []
    for (const item of this.allCharacters) {
      if (item.element.toLocaleLowerCase() === el) list.push(item)
    }
    return list
  }

  /**
   * @function rarity
   * @param {Array|Number} 4 或 5 或 [4, 5]
   */
  rarity(rarity: number | number[]): Character[] {
    // 缓存
    let queryRarity: number[] = []
    let list: Character[] = []

    if (typeof rarity === 'number') {
      queryRarity = [rarity]
    } else if (rarity.constructor !== Array) {
      return []
    }

    this.allCharacters.forEach((item) => {
      if (queryRarity.includes(item.rarity)) list.push(item)
    })

    return list
  }

  /**
   * @function all
   */
  all() {
    return this.allCharacters
  }
}
