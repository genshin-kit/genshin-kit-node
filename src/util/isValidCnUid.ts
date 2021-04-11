export default (uid: any): boolean => {
  const uidNum: number = parseInt(uid)
  if (
    !isNaN(uidNum) &&
    String(uidNum).length === 9 &&
    (String(uidNum)[0] === '1' || String(uidNum)[0] === '5') &&
    uidNum !== 100000000 &&
    uidNum !== 500000000
  ) {
    return true
  } else {
    return false
  }
}
