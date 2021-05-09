/**
 * @method getServer
 * @param {Number} uid
 * @returns {String} genshin cn_server code
 */
export function _getServer(uid: number): string {
  switch (String(uid)[0]) {
    case '1':
      return 'cn_gf01'
    case '5':
      return 'cn_qd01'
    default:
      throw { code: -1, message: 'Invalid uid' }
  }
}
