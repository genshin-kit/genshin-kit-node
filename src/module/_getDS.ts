import crypto from 'crypto'

/**
 * @function _getDS
 */
export function _getDS(this: any): string {
  switch (this.serverType) {
    case 'os':
      return generateDS('6cqshh5dhw73bzxn20oexa9k516chk7s')
    case 'cn':
    default:
      return generateDS('14bmu1mz0yuljprsfgpvjh3ju2ni468r')
  }
}

// 生成随机字符串
function randomString(e: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const len = str.length
  let final = ''
  for (let i = 0; i < e; i++)
    final += str.charAt(Math.floor(Math.random() * len))
  return final
}

function generateDS(salt: string) {
  const time = Math.floor(Date.now() / 1000)
  const random = randomString(6)

  const c = crypto
    .createHash('md5')
    .update(`salt=${salt}&t=${time}&r=${random}`)
    .digest('hex')
  return `${time},${random},${c}`
}
