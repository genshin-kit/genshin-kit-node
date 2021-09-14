/**
 * @method getServer
 * @param {Number} uid
 * @returns {String} genshin cn_server code
 */
export function _getServer(uid: number): string {
  switch (String(uid)[0]) {
    case '1':
    case '2':
      return 'cn_gf01'
    case '5':
      return 'cn_qd01'
    case '6':
      return 'os_usa'
    case '7':
      return 'os_euro'
    case '8':
      return 'os_asia'
    case '9':
      return 'os_cht'
    default:
      throw { code: -1, message: 'Invalid uid' }
  }
}
