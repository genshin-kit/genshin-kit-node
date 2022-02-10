import crypto from 'crypto'
import { URLSearchParams } from 'url'

const SALT = {
  cn: 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs',
  os: 'okr4obncj8bw5a65hbnn5oo6ixjc3l9w',
}

export const HOYOLAB_VERSION = {
  cn: '2.11.1',
  os: '2.4.1',
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

export function getOsDS({
  query,
  body,
}: {
  query?: Record<string, string | string[]>
  body?: Record<string, unknown>
} = {}): string {
  return getDs({
    serverType: 'os',
    query,
    body,
  })
}

export function getCnDS({
  query,
  body,
}: {
  query?: Record<string, string | string[]>
  body?: Record<string, unknown>
} = {}): string {
  return getDs({
    serverType: 'cn',
    query,
    body,
  })
}

export function getDS({
  serverType,
  query,
  body,
}: {
  serverType?: 'cn' | 'os'
  query?: URLSearchParams | Record<string, string | string[]>
  body?: Record<string, unknown>
} = {
  serverType: 'cn',
}): string {
  const time = Math.floor(Date.now() / 1000)
  // Integer between 100000 - 200000
  const random = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000

  const b = body ? JSON.stringify(sortKeys(body)) : ''
  const q = new URLSearchParams(query)
  q.sort()

  const check = crypto
    .createHash('md5')
    .update(`salt=${SALT[serverType]}&t=${time}&r=${random}&b=${b}&q=${q}`)
    .digest('hex')

  return `${time},${random},${check}`
}
