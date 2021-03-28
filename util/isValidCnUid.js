module.exports = (uid) => {
  uid = parseInt(uid)
  if (
    !NaN(uid) &&
    String(uid).length === 9 &&
    (String(uid)[0] === '1' || String(uid)[0] === '5')
  ) {
    return true
  } else {
    return false
  }
}
