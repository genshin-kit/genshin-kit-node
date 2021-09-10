/**
 * @function _getHttpHeaders
 * @returns
 */
export function _getHttpHeaders(this: any, { query, body }: any): any {
  switch (this.serverType) {
    case 'os':
      return {
        DS: this._getDS({ query, body }),
        Origin: 'https://webstatic-sea.hoyolab.com',
        Referer: 'https://webstatic-sea.hoyolab.com/',
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,en-US;q=0.8',
        'x-rpc-language': this.serverLocale,
        'x-rpc-app_version': this._hoyolabVersion(),
        'x-rpc-client_type': '5',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        Cookie: this.cookie,
      }
    case 'cn':
    default:
      return {
        DS: this._getDS({ query, body }),
        Origin: 'https://webstatic.mihoyo.com',
        'x-rpc-app_version': this._hoyolabVersion(),
        'User-Agent': `Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/${this._hoyolabVersion()}`,
        'x-rpc-client_type': '5',
        Referer:
          'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,en-US;q=0.8',
        'X-Requested-With': 'com.mihoyo.hyperion',
        Accept: 'application/json, text/plain, */*',
        Cookie: this.cookie,
      }
  }
}
