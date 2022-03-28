import axios, { Method } from 'axios'
import { URL, URLSearchParams } from 'url'
import { cnHeader } from '../Header'
import { BaseQuery } from './BaseQuery'

export class CnQuery extends BaseQuery {
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
          'https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/'
        )}`,
        headers: cnHeader({
          cookie: this.#cookie,
          query: params,
          body: data,
          locale: this.locale,
        }),
        params,
        data,
      })
    ).data
  }
}
