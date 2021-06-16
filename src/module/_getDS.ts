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
      return generateDS('w5k9n3aqhoaovgw25l373ee18nsazydo')
  }
}

// 生成随机字符串
function randomString(e: number) {
  return crypto
    .randomBytes(16)
    .toString('base64')
    .replace(/[/+=]/g, '')
    .slice(0, e)
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
