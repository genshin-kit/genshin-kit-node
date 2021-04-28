/**
 * @name GenshinKit
 * @desc An API wrapper for fetching player data of Genshin-Impact CN server
 *
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @license Apache-2.0
 */

// Name
export const name = 'genshin-kit'

// Modules
import _mhyVersion from './module/_mhyVersion'
import _getHttpHeaders from './module/_getHttpHeaders'
import _getDS from './module/_getDS'
import _getServer from './module/_getServer'
import request from './module/request'
export * as util from './util'
import { stringify } from 'querystring'

// Types
import { Abyss, Character, UserInfo } from './types'
export type AppCache = {
  [K in number]: {
    abyss?: { 1?: Abyss; 2?: Abyss }
    avatars?: Character[]
    info?: UserInfo
    roles?: Character[]
  }
}

export class GenshinKit {
  _cache!: AppCache
  cookie!: string
  getCharacters: (uid: number, noCache?: boolean) => Promise<Character[]>
  getUserRoles: (uid: number, noCache?: boolean) => Promise<Character[]>
  getAbyss: (uid: number, type?: 1 | 2, noCache?: boolean) => Promise<Abyss>
  getCurAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>
  getPrevAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>
  _mhyVersion!: typeof _mhyVersion
  _getHttpHeaders!: typeof _getHttpHeaders
  _getDS!: typeof _getDS
  _getServer!: typeof _getServer
  request!: typeof request

  constructor() {
    // Cache
    this._cache = {}

    // Variables
    this.cookie = ''
    this._mhyVersion = _mhyVersion
    this._getHttpHeaders = _getHttpHeaders
    this._getDS = _getDS
    this._getServer = _getServer
    this.request = request

    // Alias
    this.getCharacters = this.getAllCharacters
    this.getUserRoles = this.getAllCharacters
    this.getAbyss = this.getSpiralAbyss
    this.getCurAbyss = this.getCurrentAbyss
    this.getPrevAbyss = this.getPreviousAbyss
  }

  /**
   * @method loginWithCookie
   * @param {String} cookie
   */
  loginWithCookie(cookie: string): this {
    this.cookie = cookie
    return this
  }

  /**
   * @function getUserInfo
   * @param {Number} uid
   * @returns {Promise<UserInfo>}
   */
  async getUserInfo(uid: number, noCache = false): Promise<UserInfo> {
    const temp = this._cache?.[uid]?.info
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)

    const data = await this.request(
      'get',
      'https://api-takumi.mihoyo.com/game_record/genshin/api/index',
      {
        server,
        role_id: uid,
      }
    )
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    this._cache[uid] = {
      ...this._cache[uid],
      info: data.data,
    }
    return data.data
  }

  /**
   * @function getAllCharacters
   * @param {Number} uid
   * @returns {Promise<Character[]>}
   */
  async getAllCharacters(uid: number, noCache = false): Promise<Character[]> {
    const temp = this._cache?.[uid]?.roles
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)
    const userInfo = await this.getUserInfo(uid)
    const character_ids = userInfo.avatars.map((item) => {
      return item.id
    })

    const data = await this.request(
      'post',
      'https://api-takumi.mihoyo.com/game_record/genshin/api/character',
      {
        server,
        role_id: uid,
        character_ids,
      }
    )
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    } else {
      this._cache[uid] = {
        ...this._cache[uid],
        roles: data?.data?.avatars,
      }
      return data?.data?.avatars || []
    }
  }

  getCharacterDetailsUrl(uid: number, id: number): string {
    const server = this._getServer(uid)
    return `https://webstatic.mihoyo.com/app/community-game-records/index.html?${stringify(
      { bbs_presentation_style: 'fullscreen' }
    )}#/ys/role?${stringify({
      role_id: uid,
      server: server,
      id: id,
    })}`
  }
  /**
   * @function getSpiralAbyss
   * @param {Number} uid
   * @param {1|2} type 1 cur, 2 prev
   * @returns {Promise<Abyss>}
   */
  async getSpiralAbyss(
    uid: number,
    type: 1 | 2 = 1,
    noCache = false
  ): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw { code: -1, message: 'Invalid abyss type' }
    }

    const temp = this._cache?.[uid]?.abyss?.[type]
    if (temp && !noCache) {
      return temp
    }

    const server = this._getServer(uid)

    const data = await this.request(
      'get',
      'https://api-takumi.mihoyo.com/game_record/genshin/api/spiralAbyss',
      {
        server,
        role_id: uid,
        schedule_type: type,
      }
    )
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    } else {
      this._cache[uid] = this._cache[uid] || {}
      this._cache[uid].abyss = {
        ...this._cache[uid].abyss,
        [type]: data.data,
      }
      return data.data
    }
  }

  /**
   * @function getCurrentAbyss
   */
  async getCurrentAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.getSpiralAbyss(uid, 1, noCache)
  }

  /**
   * @function getPreviousAbyss
   */
  async getPreviousAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.getSpiralAbyss(uid, 2, noCache)
  }
}
