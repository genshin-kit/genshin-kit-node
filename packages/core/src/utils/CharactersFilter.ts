/**
 * @method CharactersFilter
 * @param {Object} avatars UserRoles.data.avatars
 */
import { CharacterNickname } from '.'
import { Character } from '../types/Character'

export class CharactersFilter {
  #list: Character[] = []
  nicknameFilter: CharacterNickname

  constructor(avatars: Character[]) {
    this.#list = avatars
    this.nicknameFilter = new CharacterNickname()
  }

  /**
   * 通过名字获取玩家指定角色的信息
   * 支持部分昵称，可以通过实例上的 `nicknameFilter` 方法配置昵称过滤器
   */
  name(nameFind: string): Character | undefined {
    const id = this.nicknameFilter.getIdByNickname(nameFind)
    if (id) {
      return this.id(id)
    }

    return this.#list.find(({ name }) => name === nameFind)
  }

  id(idFind: number) {
    return this.#list.find(({ id }) => id === idFind)
  }

  /**
   * 通过指定元素筛选玩家的角色
   * 可以使用中文名例如 `火`
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

    return this.#list.filter(({ element }) => element.toLowerCase() === el)
  }

  /**
   * @param rarity 4 或 5 或 [4, 5]
   */
  rarity(rarity: number | number[]): Character[] {
    // 缓存
    let queryRarity: number[] = []
    if (typeof rarity === 'number') {
      queryRarity = [rarity]
    } else if (rarity.constructor !== Array) {
      return []
    }

    return this.#list.filter(({ rarity }) => queryRarity.includes(rarity))
  }

  all(): Character[] {
    return this.#list
  }
}
