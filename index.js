const axios = require('axios').default
const crypto = require('crypto')

function genshinKit() {
  // Variables
  this.cookie = ''
  this.mhyVersion = '2.2.1'

  /**
   * @method loginWithCookie
   * @param {String} cookie
   */
  this.loginWithCookie = function(cookie) {
    if (cookie && typeof cookie === 'string') this.cookie = cookie
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
   * @method getInfo
   * @param {Number} uid
   */
  this.getUserInfo = async function(uid) {
    // 处理 UID
    if (!uid) return 'Invalid uid'

    let DS = this.getDS()
    let server = this.getServer(uid)
    if (!server) return 'Invalid uid'

    console.log({ uid, server, DS, cookie: this.cookie })

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
      return data
    } catch (err) {
      return err
    }
  }
}

module.exports = { name: 'genshin-kit', genshinKit }
