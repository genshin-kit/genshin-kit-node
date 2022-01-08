import crypto from 'crypto'
import { URLSearchParams } from 'url'

const CN_SALT = 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'
const OS_SALT = '6s25p5ox5y14umn1p61aqyyvbvvl3lrt'

export const HOYOLAB_VERSION = {
  cn: '2.11.1',
  os: '1.5.0',
}

export function getDS(serverType?: 'os'): string
export function getDS(
  serverType?: 'cn' | 'os',
  {
    query,
    body,
  }: {
    query?: Record<string, string | string[]>
    body?: Record<string, unknown>
  } = {}
): string {
  switch (serverType) {
    case 'os':
      return getOsDS()
    case 'cn':
    default:
      if (query && body) {
        return getCnDS({ query, body })
      } else {
        throw new Error('query and body must be provided')
      }
  }
}

// 生成随机字符串
function randomString(length: number): string {
  const s = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const res = []
  for (let i = 0; i < length; ++i) {
    res.push(s[Math.floor(Math.random() * s.length)])
  }
  return res.join('')
}

// 按首字母排序 object
function sortKeys<T>(obj: Record<string, T>): Record<string, T> {
  const copy: Record<string, T> = {}
  const allKeys = Object.keys(obj).sort()
  allKeys.forEach((key) => {
    copy[key] = obj[key]
  })
  return copy
}

export function getOsDS(): string {
  const time = Math.floor(Date.now() / 1000)
  const random = randomString(6)

  const c = crypto
    .createHash('md5')
    .update(`salt=${OS_SALT}&t=${time}&r=${random}`)
    .digest('hex')
  return `${time},${random},${c}`
}

export function getCnDS({
  query,
  body,
}: {
  query?: URLSearchParams | Record<string, string | string[]>
  body?: Record<string, unknown>
} = {}): string {
  const time = Math.floor(Date.now() / 1000)
  // Integer between 100000 - 200000
  const random = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000

  const b = body ? JSON.stringify(sortKeys(body)) : ''
  const q = new URLSearchParams(query)
  q.sort()

  const check = crypto
    .createHash('md5')
    .update(`salt=${CN_SALT}&t=${time}&r=${random}&b=${b}&q=${q}`)
    .digest('hex')

  return `${time},${random},${check}`
}
