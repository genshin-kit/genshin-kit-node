import axios, { Method } from 'axios'

export default async function (
  this: any,
  method: Method,
  path: string,
  data?: any
) {
  return (
    await axios({
      method,
      url: `${this._getApiEndpoint()}${path}`,
      headers: this._getHttpHeaders(),
      data
    })
  ).data
}
