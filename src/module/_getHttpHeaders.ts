import { _getDS } from './_getDS'

/**
 * @function _getHttpHeaders
 * @returns
 */
export function _getHttpHeaders(this: any): any {
  switch (this.serverType) {
    case 'sea':
      return {}
    case 'cn':
    default:
      return {
        DS: _getDS(),
        Origin: 'https://webstatic.mihoyo.com',
        'x-rpc-app_version': this._hoyolabVersion(),
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/' +
          this._hoyolabVersion(),
        'x-rpc-client_type': '5',
        Referer:
          'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,en-US;q=0.8',
        'X-Requested-With': 'com.mihoyo.hyperion',
        Accept: 'pplication/json, text/plain, */*',
        Cookie: this.cookie
      }
  }
}
