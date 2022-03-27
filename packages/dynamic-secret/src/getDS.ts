import crypto from 'crypto'
import { URLSearchParams } from 'url'
import { sortKeys } from './sortKeys'
import { SALT } from './index'

export function getDS(
  {
    serverType,
    query,
    body,
  }: {
    serverType: 'cn' | 'os'
    query?: URLSearchParams | Record<string, string | string[]>
    body?: Record<string, unknown>
  } = { serverType: 'cn' }
): string {
  const time = Math.floor(Date.now() / 1000)
  // Integer between 100000 - 200000
  const random = crypto.randomInt(100000, 200000)

  const b = body ? JSON.stringify(sortKeys(body)) : ''
  const q = new URLSearchParams(query)
  q.sort()

  const check = crypto
    .createHash('md5')
    .update(`salt=${SALT[serverType]}&t=${time}&r=${random}&b=${b}&q=${q}`)
    .digest('hex')

  return `${time},${random},${check}`
}

export function getOsDS({
  query,
  body,
}: {
  query?: URLSearchParams | Record<string, string | string[]>
  body?: Record<string, unknown>
} = {}): string {
  return getDS({
    serverType: 'os',
    query,
    body,
  })
}

export function getCnDS({
  query,
  body,
}: {
  query?: URLSearchParams | Record<string, string | string[]>
  body?: Record<string, unknown>
} = {}): string {
  return getDS({
    serverType: 'cn',
    query,
    body,
  })
}
