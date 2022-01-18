/* eslint-disable @typescript-eslint/no-unused-vars */
import { Method } from 'axios'
import { URLSearchParams } from 'url'
import { serverArea } from '../ServerArea'
import { AppServerLocale, ServerArea } from '../types'

export class BaseQuery {
  locale: AppServerLocale = 'zh-cn'
  defaultParams(uid: number): { role_id: string; server: ServerArea } {
    return {
      role_id: uid.toString(),
      server: serverArea(uid),
    }
  }

  async get(
    path: string,
    {
      params,
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
    } = {}
  ): Promise<any> {
    return this.send('GET', path, { params })
  }

  async getWithUid(
    path: string,
    uid: number,
    {
      params,
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
    } = {}
  ): Promise<any> {
    const defaultParams = this.defaultParams(uid)
    return this.get(path, { params: { ...defaultParams, ...params } })
  }

  async post(
    path: string,
    {
      params,
      data,
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
      data?: any
    } = {}
  ): Promise<any> {
    return this.send('POST', path, { params, data })
  }

  async postWithUid(
    path: string,
    uid: number,
    {
      params,
      data,
    }: {
      params?: URLSearchParams | Record<string, string | string[]>
      data?: any
    } = {}
  ): Promise<any> {
    const defaultParams = this.defaultParams(uid)
    return this.send('POST', path, { params, data: { ...defaultParams, data } })
  }

  async send(
    _method: Method,
    _path: string,
    _config: Record<string, any>
  ): Promise<any> {
    throw new Error('Not implemented')
  }
}
