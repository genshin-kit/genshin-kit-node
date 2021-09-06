/**
 * @method CharactersFilter
 * @param {Object} avatars UserRoles.data.avatars
 */
import { CharacterNickname } from '.'
import { Character } from '../types/Character'

export class CharactersFilter {
  _list: Character[] = []
  nicknameFilter: CharacterNickname

  constructor(avatars: Character[]) {
    this._list = avatars
    this.nicknameFilter = new CharacterNickname()
  }

  /**
   * @function name 通过名称或id获取玩家指定角色的信息
   */
  name(nameFind: string): Character | undefined {
    const id = this.nicknameFilter.getIdByNickname(nameFind)
    if (id) {
      return this.id(id)
    }

    return this._list.find(({ name }) => name === nameFind)
  }

  id(idFind: number) {
    return this._list.find(({ id }) => id === idFind)
  }

  /**
   * @function element 通过指定元素筛选玩家的角色
   */
  element(el: string): Character[] {
    el = el.toLocaleLowerCase()

    // 中文名转换
    const elAlias: Record<string, string> = {
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
      草: 'dendro',
      grass: 'dendro',
    }
    el = elAlias[el] || el

    return this._list.filter(({ element }) => element.toLowerCase() === el)
  }

  /**
   * @function rarity
   * @param {Array|Number} 4 或 5 或 [4, 5]
   */
  rarity(rarity: number | number[]): Character[] {
    // 缓存
    let queryRarity: number[] = []
    if (typeof rarity === 'number') {
      queryRarity = [rarity]
    } else if (rarity.constructor !== Array) {
      return []
    }

    return this._list.filter(({ rarity }) => queryRarity.includes(rarity))
  }

  /**
   * @function all
   */
  all(): Character[] {
    return this._list
  }
}
