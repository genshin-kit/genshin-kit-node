const crypto = require('crypto')

/**
 * @function _getDS
 */
module.exports = function() {
  // 生成随机字符串
  function randomString(e) {
    let t = '0123456789abcdefghijklmnopqrstuvwxyz',
      a = t.length,
      n = ''
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
  }

  let n = 'pbcfcvnfsm5s2w4x3lsq8caor7v8nlqm'

  let i = Math.round(new Date().getTime() / 1000).toString()

  let r = randomString(6)
  let c = crypto
    .createHash('md5')
    .update('salt=' + n + '&t=' + i + '&r=' + r)
    .digest('hex')
  return i + ',' + r + ',' + c
}
