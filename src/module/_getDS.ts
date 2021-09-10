import crypto from 'crypto'
import { URLSearchParams } from 'url'

/**
 * @function _getDS get DynamicSecret
 */
export function _getDS(this: any, { query, body }: any): string {
  switch (this.serverType) {
    case 'os':
      return getOsDS('6s25p5ox5y14umn1p61aqyyvbvvl3lrt')
    case 'cn':
    default:
      return getCnDS({ query, body })
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

// 按首字母排序 object
function sortKeys(obj: Record<string, any>) {
  const copy = {} as Record<string, any>
  const allKeys = Object.keys(obj).sort()
  allKeys.forEach((key) => {
    copy[key] = obj[key]
  })
  return copy
}

function getOsDS(salt: string) {
  const time = Math.floor(Date.now() / 1000)
  const random = randomString(6)

  const c = crypto
    .createHash('md5')
    .update(`salt=${salt}&t=${time}&r=${random}`)
    .digest('hex')
  return `${time},${random},${c}`
}

function getCnDS({
  query,
  body,
}: {
  query: Record<string, any>
  body: Record<string, any>
}) {
  const salt = 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'
  const time = Math.floor(Date.now() / 1000)
  // Integer between 100000 - 200000
  const random = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000

  const b = body ? JSON.stringify(sortKeys(body)) : ''
  const q = query ? new URLSearchParams(sortKeys(query)) : ''

  const check = crypto
    .createHash('md5')
    .update(`salt=${salt}&t=${time}&r=${random}&b=${b}&q=${q}`)
    .digest('hex')

  const dynamic = `${time},${random},${check}`

  return dynamic
}
