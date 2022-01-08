import { getCnDS } from '@genshin-kit/dynamic-secret'
import axios, { Method } from 'axios'
import { URL, URLSearchParams } from 'url'
import { AppServerLocale } from '../types'

export class CNQuerier {
  #cookie = ''

  set cookie(value: string) {
    this.#cookie = value
  }

  async send(
    method: Method,
    path: string,
    {
      params,
      data,
      locale,
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
      data?: any
      locale?: AppServerLocale
    } = {}
  ): Promise<any> {
    return (
      await axios({
        method,
        url: `${new URL(
          path,
          'https://api-takumi-record.mihoyo.com/game_record/genshin/api'
        )}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,en-US;q=0.8',
          Cookie: this.#cookie,
          DS: getCnDS({ query: params, body: data }),
          Origin: 'https://webstatic.mihoyo.com',
          Referer:
            'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/2.11.1',
          'x-rpc-app_version': '2.11.1',
          'x-rpc-client_type': '5',
          'x-rpc-language': locale || 'zh-cn',
          'X-Requested-With': 'com.mihoyo.hyperion',
        },
        params,
        data,
      })
    ).data
  }
}
