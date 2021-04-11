/**
 * @name GenshinKit
 * @desc An API wrapper for fetching player data of Genshin-Impact CN server
 *
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @license Apache-2.0
 */

// Modules
import _mhyVersion from './module/_mhyVersion'
import _getHttpHeaders from './module/_getHttpHeaders'
import _getDS from './module/_getDS'
import _getServer from './module/_getServer'
import request from './module/request'
import CharactersFilter from './util/CharactersFilter'
import isValidCnUid from './util/isValidCnUid'
import { stringify } from 'querystring'

// Types
import { Abyss } from './types/Abyss'
import { Character } from './types/Character'
import { UserInfo } from './types/UserInfo'

export class GenshinKit {
  cookie!: string
  getAbyss!: (uid: number, type?: number) => Promise<Abyss>
  getCharacters!: (uid: number) => Promise<Character[]>
  getUserRoles: (uid: number) => Promise<Character[]>
  getCurAbyss!: (uid: number) => Promise<Abyss>
  getPrevAbyss!: (uid: number) => Promise<Abyss>
  _mhyVersion!: string
  _getHttpHeaders!: (this: any) => any
  _getDS!: () => string
  _getServer!: (uid: number) => string
  request!: (this: any, method: Method, url: string, data: any) => Promise<any>

  constructor() {
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
  async getUserInfo(uid: number): Promise<UserInfo> {
    let server = this._getServer(uid)

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
    return data.data
  }

  /**
   * @function getAllCharacters
   * @param {Number} uid
   * @returns {Promise<Character[]>}
   */
  async getAllCharacters(uid: number): Promise<Character[]> {
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
  async getSpiralAbyss(uid: number, type: number = 1): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw { code: -1, message: 'Invalid abyss type' }
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
      return data.data
    }
  }

  /**
   * @function getCurrentAbyss
   */
  async getCurrentAbyss(uid: number) {
    return this.getSpiralAbyss(uid, 1)
  }

  /**
   * @function getPreviousAbyss
   */
  async getPreviousAbyss(uid: number) {
    return this.getSpiralAbyss(uid, 2)
  }
}

export const name = 'genshin-kit'
export const util = {
  CharactersFilter,
  isValidCnUid,
}
