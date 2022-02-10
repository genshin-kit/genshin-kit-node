import { URLSearchParams } from 'url'
import { getCnDS, HOYOLAB_VERSION } from '@genshin-kit/dynamic-secret'

export function cnHeader({
  cookie,
  query,
  body,
  locale,
}: {
  cookie: string
  query?: URLSearchParams | Record<string, string | string[]>
  body?: any
  locale?: string
}): Record<string, string> {
  return {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,en-US;q=0.8',
    Cookie: cookie,
    DS: getCnDS({ query, body }),
    Origin: 'https://webstatic.mihoyo.com',
    Referer:
      'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/2.11.1',
    'x-rpc-app_version': HOYOLAB_VERSION.cn,
    'x-rpc-client_type': '5',
    'x-rpc-language': locale ?? 'zh-cn',
    'X-Requested-With': 'com.mihoyo.hyperion',
  }
}
