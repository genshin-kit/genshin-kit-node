import crypto from 'crypto'

/**
 * @function _getDS
 */
export default function() {
  // 生成随机字符串
  function randomString(e: number) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyz',
      len = str.length,
      final = ''
    for (let i = 0; i < e; i++)
      final += str.charAt(Math.floor(Math.random() * len))
    return final
  }

  let salt = 'h8w582wxwgqvahcdkpvdhbh2w9casgfl'
  let time = Math.round(new Date().getTime() / 1000).toString()
  let random = randomString(6)

  let c = crypto
    .createHash('md5')
    .update('salt=' + salt + '&t=' + time + '&r=' + random)
    .digest('hex')
  return time + ',' + random + ',' + c
}
