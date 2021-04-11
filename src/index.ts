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
import { Method } from 'axios'

// Types
import { Abyss } from './types/Abyss'
import { Character } from './types/Character'
import { UserInfo } from './types/UserInfo'

export class GenshinKit {
  cookie!: string
  getAbyss!: (uid: number, type?: number) => Promise<Abyss>
  getCharacters!: (uid: number) => Promise<Character[]>
  getCurAbyss!: (uid: number) => Promise<Abyss>
  getPrevAbyss!: (uid: number) => Promise<Abyss>
  gerUserRoles!: (uid: number) => Promise<Character[]>

  constractor() {
    // Variables
    this.cookie = ''

    // Alias
    this.getAbyss = this.getSpiralAbyss
    this.getCharacters = this.getAllCharacters
    this.getCurAbyss = this.getCurrentAbyss
    this.getPrevAbyss = this.getPreviousAbyss
    this.gerUserRoles = this.getAllCharacters
  }

  // Internal methods
  // _mhyVersion = _mhyVersion

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
   * @returns {Promise<object>}
   */
  async getUserInfo(uid: number): Promise<UserInfo> {
    let server = _getServer(uid)

    const data = await request(
      'get',
      'https://api-takumi.mihoyo.com/game_record/genshin/api/index',
      {
        server,
        role_id: uid,
      }
    )
    // console.log(data.data)
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    return data.data
  }

  async getCharacterDetails(id: number) {}

  /**
   * @function getAllCharacters
   * @param {Number} uid
   * @returns {Promise<object>}
   */
  async getAllCharacters(uid: number): Promise<Character[]> {
    const server = _getServer(uid)
    const userInfo = await this.getUserInfo(uid)
    const character_ids = userInfo.avatars.map((item) => {
      return item.id
    })

    const data = await request(
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

  /**
   * @function getSpiralAbyss
   * @param {Numver} uid
   * @param {Number<1|2>} type 1 cur, 2 prev
   * @returns {Promise<object>}
   */
  async getSpiralAbyss(uid: number, type: number = 1): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw { code: -1, message: 'Invalid abyss type' }
    }
    const server = _getServer(uid)

    const data = await request(
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