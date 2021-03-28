const axios = require('axios').default

function GenshinKit() {
  // Variables
  this.cookie = ''
  this.mhyVersion = require('./module/_mhyVersion')

  // Internal modules
  this._getServer = require('./module/_getServer')
  this._getDS = require('./module/_getDS')
  this._getHttpHeaders = require('./module/_getHttpHeaders')

  /**
   * @method loginWithCookie
   * @param {String} cookie
   */
  this.loginWithCookie = function(cookie) {
    if (cookie && typeof cookie === 'string') {
      this.cookie = cookie
      return this
    } else {
      throw { message: 'Invalid cookie' }
    }
  }

  /**
   * @function getUserInfo
   * @param {Number} uid
   * @returns {Promise<object>}
   */
  this.getUserInfo = async function(uid) {
    let server = this._getServer(uid)

    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://api-takumi.mihoyo.com/game_record/genshin/api/index',
        headers: this._getHttpHeaders(),
        data: {
          server,
          role_id: uid,
        },
      })
      // console.log(data.data)
      if (data.retcode !== 0 || !data.data) {
        throw {
          code: data.retcode,
          message: data.message,
        }
      }
      return data.data
    } catch (err) {
      throw err
    }
  }

  /**
   * @function getAllCharacters
   * @param {Number} uid
   * @returns {Promise<object>}
   */
  this.getAllCharacters = this.getCharacters = this.getUserRoles = async function(
    uid
  ) {
    const server = this._getServer(uid)
    const userInfo = await this.getUserInfo(uid)
    let character_ids = userInfo?.avatars || []
    // if (character_ids.length < 1) return []
    character_ids = character_ids.map((item) => {
      return item.id
    })
    const { data } = await axios({
      method: 'post',
      url: 'https://api-takumi.mihoyo.com/game_record/genshin/api/character',
      headers: this._getHttpHeaders(),
      data: {
        server,
        role_id: uid,
        character_ids,
      },
    })
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
   *
   * @param {Numver} uid
   * @param {Number<1|2>} type 1 cur, 2 prev
   * @returns {Promise<object>}
   */
  this.getAbyss = async function(uid, type = 1) {
    if (type !== 1 && type !== 2) throw { message: 'Invalid abyss type' }
    const server = this._getServer(uid)
    const { data } = await axios({
      method: 'get',
      url: 'https://api-takumi.mihoyo.com/game_record/genshin/api/spiralAbyss',
      headers: this._getHttpHeaders(),
      data: {
        server,
        role_id: uid,
        schedule_type: type,
      },
    })
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    }
    return data.data
  }

  /**
   * @function getCurrentAbyss
   */
  this.getCurrentAbyss = this.getCurAbyss = async function(uid) {
    return this.getAbyss(uid, 1)
  }

  /**
   * @function getPreviousAbyss
   */
  this.getPreviousAbyss = this.getPrevAbyss = async function(uid) {
    return this.getAbyss(uid, 2)
  }
}

module.exports = {
  name: 'genshin-kit',
  GenshinKit,
  util: {
    CharactersFilter: require('./util/CharactersFilter'),
    isValidCnUid: require('./util/isValidCnUid'),
  },
}
