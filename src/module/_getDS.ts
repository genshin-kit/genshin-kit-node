import crypto from 'crypto'

/**
 * @function _getDS
 */
export function _getDS(this: any): string {
  switch (this.serverType) {
    case 'sea':
      return sea()
    case 'cn':
    default:
      return cn()
  }
}

// 生成随机字符串
function randomString(e: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyz'
  const len = str.length
  let final = ''
  for (let i = 0; i < e; i++)
    final += str.charAt(Math.floor(Math.random() * len))
  return final
}

function cn() {
  const salt = '14bmu1mz0yuljprsfgpvjh3ju2ni468r'
  const time = Math.round(new Date().getTime() / 1000).toString()
  const random = randomString(6)

  const c = crypto
    .createHash('md5')
    .update('salt=' + salt + '&t=' + time + '&r=' + random)
    .digest('hex')
  return time + ',' + random + ',' + c
}

function sea() {
  return ''
}
