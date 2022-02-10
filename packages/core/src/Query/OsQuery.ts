import axios, { Method } from 'axios'
import { URL, URLSearchParams } from 'url'
import { osHeader } from '../Header'
import { BaseQuery } from './BaseQuery'

export class OsQuery extends BaseQuery {
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
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
      data?: any
    } = {}
  ): Promise<any> {
    if (this.#cookie.length === 0) {
      throw new Error('No cookie specified')
    }
    return (
      await axios({
        method,
        url: `${new URL(
          path,
          'https://bbs-api-os.mihoyo.com/game_record/genshin/api/'
        )}`,
        headers: osHeader({
          cookie: this.#cookie,
          query: params,
          body: data,
          locale: this.locale,
        }),
        params,
        data,
        withCredentials: true,
      })
    ).data
  }
}
