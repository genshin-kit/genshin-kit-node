/**
 * @method getServer
 * @param {Number} uid
 * @returns {String} genshin cn_server code
 */
export default function(uid: number): string {
  if (String(uid)[0] === '1') return 'cn_gf01'
  if (String(uid)[0] === '5') return 'cn_qd01'
  throw { message: 'Invalid uid' }
}
