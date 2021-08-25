import crypto from 'crypto'

/**
 * @function _getDS
 */
export function _getDS(this: any): string {
  switch (this.serverType) {
    case 'os':
      return generateDS('6s25p5ox5y14umn1p61aqyyvbvvl3lrt')
    case 'cn':
    default:
      return generateDS('4a8knnbk5pbjqsrudp3dq484m9axoc5g')
  }
}

// 生成随机字符串
function randomString(e: number) {
  const s = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const res = []
  for (let i = 0; i < e; ++i) {
    res.push(s[Math.floor(Math.random() * s.length)])
  }
  return res.join('')
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
