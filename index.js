const axios = require('axios').default
const crypto = require('crypto')

function genshinKit() {
  // Variables
  this.cookie = ''
  this.mhyVersion = '2.2.1'
  this.userInfo = {}

  /**
   * @method loginWithCookie
   * @param {String} cookie
   */
  this.loginWithCookie = function(cookie) {
    if (cookie && typeof cookie === 'string') this.cookie = cookie
    return this
  }

  /**
   * @method getServer
   * @param {Number} uid
   */
  this.getServer = function(uid) {
    uid = String(uid)
    if (uid[0] === '1') return 'cn_gf01'
    if (uid[0] === '5') return 'cn_qd01'
    return null
  }

  /**
   * @function getDS
   */
  this.getDS = function() {
    // 生成随机字符串
    function randomString(e) {
      let t = '0123456789abcdefghijklmnopqrstuvwxyz',
        a = t.length,
        n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    }

    let n
    if (this.mhyVersion === '2.1.0') {
      n = crypto
        .createHash('md5')
        .update(mhyVersion)
        .digest('hex')
    } else if (this.mhyVersion == '2.2.1') {
      n = 'cx2y9z9a29tfqvr1qsq6c7yz99b5jsqt'
    } else {
      mhyVersion = '2.2.1'
      n = 'cx2y9z9a29tfqvr1qsq6c7yz99b5jsqt'
    }
    let i = Math.round(new Date().getTime() / 1000).toString()

    let r = randomString(6)
    let c = crypto
      .createHash('md5')
      .update('salt=' + n + '&t=' + i + '&r=' + r)
      .digest('hex')
    // console.log(i + "," + r + "," + c)
    return i + ',' + r + ',' + c
  }

  /**
   * @function getUserInfo
   * @param {Number} uid
   */
  this.getUserInfo = async function(uid, force = false) {
    // 是否有缓存信息
    if (this.userInfo[uid] && !force) return this.userInfo[uid]

    // 处理 UID
    if (!uid) return new Error('Invalid uid', uid)

    let DS = this.getDS()
    let server = this.getServer(uid)
    if (!server) return new Error('Invalid uid', uid)

    try {
      const { data } = await axios({
        method: 'get',
        url: `https://api-takumi.mihoyo.com/game_record/genshin/api/index?server=${server}&role_id=${uid}`,
        headers: {
          DS,
          Origin: 'https://webstatic.mihoyo.com',
          'x-rpc-app_version': '2.2.1',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/2.2.0',
          'x-rpc-client_type': '4',
          Referer:
            'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,en-US;q=0.8',
          'X-Requested-With': 'com.mihoyo.hyperion',
          Accept: 'pplication/json, text/plain, */*',
          Cookie: this.cookie,
        },
      })
      // console.log(data)
      this.userInfo[uid] = data
      return data
    } catch (err) {
      return err
    }
  }

  /**
   * @method getAllCharacters 获取玩家全部角色信息
   * @param {Number} uid
   * @return {Promise}
   */
  this.getAllCharacters = this.getCharacters = async function(uid) {
    // 尝试读缓存
    let userInfo = this.userInfo[uid]

    // 无缓存，尝试获取
    if (!userInfo && uid) {
      userInfo = await this.getUserInfo(uid)
    }

    // 处理信息
    if (userInfo.data && userInfo.data.avatars) {
      return new Characters(userInfo.data.avatars)
    } else {
      return null
    }
  }
}

/**
 * @method characters
 * @param {Object} data
 */
function Characters(data) {
  this.allCharacters = data

  /**
   * @function id/name 通过名称或id获取玩家指定角色的信息
   * @param {Number} uid
   * @param {String|Number} filter 角色名称或 id
   * @return {Object|null} 角色信息或null
   */
  this.id = this.name = function(filter) {
    // 解析查询的方式
    let type = ''
    if (typeof filter === 'number' || /^[0-9]$/g.test(filter)) {
      type = 'byId'
      filter = Number(filter)
    } else if (typeof filter === 'string') {
      type = 'byName'
    } else {
      return {}
    }

    switch (type) {
      case 'byId':
        for (item of this.allCharacters) {
          if (item.id === filter) return item
        }
        break
      case 'byName':
        for (item of this.allCharacters) {
          if (item.name === filter) return item
        }
        break
    }

    return null
  }

  /**
   * @function element 通过指定元素筛选玩家的角色
   */
  this.element = function(element) {
    if (!element || typeof element !== 'string') return []
    element = element.toLocaleLowerCase()

    // 中文名转换
    let zhName = {
      火: 'pyro',
      水: 'hydro',
      风: 'anemo',
      雷: 'electro',
      冰: 'cryo',
      岩: 'geo',
      草: '',
    }
    element = zhName[element] || element

    let list = []
    for (item of this.allCharacters) {
      if (item.element.toLocaleLowerCase() === element) list.push(item)
    }
    return list
  }

  /**
   * @function rarity
   * @param {Array|Number} 4 或 5 或 [4, 5]
   */
  this.rarity = function(rarity) {
    // 缓存
    let queryRarity = []
    let list = []

    if (typeof rarity === 'number') {
      queryRarity = [rarity]
    } else if (rarity.constructor !== Array) {
      return []
    }

    this.allCharacters.forEach(item => {
      if (queryRarity.includes(item.rarity)) list.push(item)
    })

    return list
  }

  /**
   * @function all
   */
  this.all = function() {
    return this.allCharacters
  }
}

module.exports = { name: 'genshin-kit', genshinKit }
