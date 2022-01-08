import { getOsDS } from '@genshin-kit/dynamic-secret'
import axios, { Method } from 'axios'
import { URL, URLSearchParams } from 'url'
import { AppServerLocale } from '../types'

export class OSQuerier {
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
          'https://bbs-api-os.mihoyo.com/game_record/genshin/api'
        )}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,en-US;q=0.8',
          Cookie: this.#cookie,
          DS: getOsDS(),
          Origin: 'https://webstatic-sea.hoyolab.com',
          Referer: 'https://webstatic-sea.hoyolab.com/',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
          'x-rpc-app_version': '1.5.0',
          'x-rpc-client_type': '5',
          'x-rpc-language': locale || 'zh-cn',
        },
        params,
        data,
        withCredentials: true,
      })
    ).data
  }
}
