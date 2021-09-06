import axios, { Method } from 'axios'

export async function request(
  this: any,
  method: Method,
  path: string,
  data?: any
) {
  let query, body
  if (method.toLowerCase() === 'get') {
    query = data
  } else {
    body = data
  }

  return (
    await axios({
      method,
      url: path.startsWith('http') ? path : `${this._getApiEndpoint()}${path}`,
      headers: this._getHttpHeaders({ query, body }),
      data: body,
      params: query,
    })
  ).data
}
