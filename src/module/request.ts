import axios, { Method } from 'axios'

export async function request(
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
