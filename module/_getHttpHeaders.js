/**
 * @function _getHttpHeaders
 * @returns
 */
module.exports = function() {
  return {
    DS: require('./_getDS')(),
    Origin: 'https://webstatic.mihoyo.com',
    'x-rpc-app_version': require('./_mhyVersion'),
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/' +
      require('./_mhyVersion'),
    'x-rpc-client_type': '5',
    Referer:
      'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,en-US;q=0.8',
    'X-Requested-With': 'com.mihoyo.hyperion',
    Accept: 'pplication/json, text/plain, */*',
    Cookie: this.cookie,
  }
}
