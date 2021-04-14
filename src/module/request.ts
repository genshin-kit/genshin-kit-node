import axios, { Method } from 'axios'

export default async function (
  this: any,
  method: Method,
  url: string,
  data?: any
) {
  return (
    await axios({
      method,
      url,
      headers: this._getHttpHeaders(),
      data,
    })
  ).data
}
