/**
 * @name GenshinKit
 * @desc An API wrapper for fetching player data of Genshin Impact
 *
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @license Apache-2.0
 */

// Name
export const name = 'genshin-kit'

// Modules
import { _getApiEndpoint } from './modules/_getApiEndpoint'
import { _getDS } from './modules/_getDS'
import { _getHttpHeaders } from './modules/_getHttpHeaders'
import { _getServer } from './modules/_getServer'
import { _hoyolabVersion } from './modules/_hoyolabVersion'
import { request } from './modules/request'
import { cookieToObj } from './modules/cookieToObj'
export * as util from './utils'

// Types
import {
  Abyss,
  Activities,
  AppCache,
  Character,
  AppServerLocale,
  AppServerType,
  UserInfo,
  DailyNote,
  BindingGameRoles,
} from './types'

export class GenshinKit {
  #cache: AppCache
  #cookie: string
  serverType: AppServerType
  serverLocale: AppServerLocale
  _getApiEndpoint: typeof _getApiEndpoint
  _hoyolabVersion!: typeof _hoyolabVersion
  _getHttpHeaders!: typeof _getHttpHeaders
  _getDS: typeof _getDS
  _getServer: typeof _getServer
  request: typeof request
  characters: (uid: number, noCache?: boolean) => Promise<Character[]>
  userRoles: (uid: number, noCache?: boolean) => Promise<Character[]>
  abyss: (uid: number, type?: 1 | 2, noCache?: boolean) => Promise<Abyss>
  curAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>
  prevAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>

  constructor() {
    // Cache
    this.#cache = {}

    // Init variables
    this.#cookie = ''
    this._getApiEndpoint = _getApiEndpoint
    this._getDS = _getDS
    this._getHttpHeaders = _getHttpHeaders
    this._getServer = _getServer
    this._hoyolabVersion = _hoyolabVersion
    this.request = request
    this.serverType = 'cn'
    this.serverLocale = 'zh-cn'

    // Set alias
    this.characters = this.allCharacters
    this.userRoles = this.allCharacters
    this.abyss = this.spiralAbyss
    this.curAbyss = this.currentAbyss
    this.prevAbyss = this.previousAbyss
  }

  // Cookie validator
  set cookie(val: string) {
    const o = cookieToObj(val)
    if (!o.ltoken && !o.ltuid) throw { code: -1, message: 'Invalid cookie' }
    this.#cookie = val
  }
  get cookie() {
    const o = cookieToObj(this.#cookie)
    return `ltoken=${o.ltoken}; ltuid=${o.ltuid}`
  }

  async selfBindingRoles(): Promise<BindingGameRoles[]> {
    const res = await this.request(
      'get',
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    return res.data.list.find((item: any) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
  }

  clearCache(): this {
    this.#cache = {}
    return this
  }

  async userInfo(uid: number, noCache = false): Promise<UserInfo> {
    const temp = this.#cache?.[uid]?.info
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)

    const data = await this.request('get', 'index', {
      role_id: uid,
      server,
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    this.#cache[uid] = {
      ...this.#cache[uid],
      info: data.data,
    }
    return data.data
  }

  async allCharacters(uid: number, noCache = false): Promise<Character[]> {
    const temp = this.#cache?.[uid]?.roles
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)
    const userInfo = await this.userInfo(uid)
    const character_ids = userInfo.avatars.map((item) => {
      return item.id
    })

    const data = await this.request('post', 'character', {
      character_ids,
      role_id: uid,
      server,
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    } else {
      this.#cache[uid] = {
        ...this.#cache[uid],
        roles: data?.data?.avatars,
      }
      return data?.data?.avatars || []
    }
  }

  /**
   * @param {1|2} type 1 cur, 2 prev
   */
  async spiralAbyss(
    uid: number,
    type: 1 | 2 = 1,
    noCache = false
  ): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw { code: -1, message: 'Invalid abyss type' }
    }

    const temp = this.#cache?.[uid]?.abyss?.[type]
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)

    const data = await this.request('get', 'spiralAbyss', {
      role_id: uid,
      schedule_type: type,
      server,
    })
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    } else {
      this.#cache[uid] = this.#cache[uid] || {}
      this.#cache[uid].abyss = {
        ...this.#cache[uid].abyss,
        [type]: data.data,
      }
      return data.data
    }
  }

  async currentAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.spiralAbyss(uid, 1, noCache)
  }

  async previousAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.spiralAbyss(uid, 2, noCache)
  }

  async activities(uid: number): Promise<Activities> {
    const server = this._getServer(uid)
    const data = await this.request('get', 'activities', {
      role_id: uid,
      server,
    })
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    } else {
      return data.data
    }
  }

  async dailyNote(uid: number, noCache = false): Promise<DailyNote> {
    const temp = this.#cache?.[uid]?.dailyNote
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)

    const data = await this.request('get', 'dailyNote', {
      role_id: uid,
      server,
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    this.#cache[uid] = {
      ...this.#cache[uid],
      dailyNote: data.data,
    }
    return data.data
  }
}
