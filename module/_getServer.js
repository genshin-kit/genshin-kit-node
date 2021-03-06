/**
 * @method getServer
 * @param {Number} uid
 * @returns {String} genshin cn_server code
 */
module.exports = function(uid) {
  uid = String(uid)
  if (uid[0] === '1') return 'cn_gf01'
  if (uid[0] === '5') return 'cn_qd01'
  throw { message: 'Invalid uid' }
}
