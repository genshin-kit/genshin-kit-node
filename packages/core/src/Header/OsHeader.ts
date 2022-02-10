import { URLSearchParams } from 'url'
import { getOsDS, HOYOLAB_VERSION } from '@genshin-kit/dynamic-secret'

export function osHeader({
  cookie,
  query,
  body,
  locale,
}: {
  cookie: string
  query?: URLSearchParams | Record<string, string | string[]>
  body?: Record<string, any>
  locale?: string
}): Record<string, string> {
  return {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,en-US;q=0.8',
    Cookie: cookie,
    DS: getOsDS({ query, body }),
    Origin: 'https://webstatic-sea.hoyolab.com',
    Referer: 'https://webstatic-sea.hoyolab.com/',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    'x-rpc-app_version': HOYOLAB_VERSION.os,
    'x-rpc-client_type': '5',
    'x-rpc-language': locale ?? 'zh-cn',
  }
}
