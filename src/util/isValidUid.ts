export function isValidCnUid(uid: any): boolean {
  const uidNum: number = parseInt(uid)
  return isValidUid(uidNum) &&
    ['1', '5'].includes(uidNum.toString()[0])
}

export function isValidOsUid(uid: any): boolean {
  const uidNum: number = parseInt(uid)
  return isValidUid(uidNum) &&
    ['6', '7', '8', '9'].includes(uidNum.toString()[0])
}

function isValidUid(uid: number): boolean {
  return !isNaN(uid) &&
    uid.toString().length === 9 &&
    Math.floor(uid / 100000000) * 100000000 !== uid
}
