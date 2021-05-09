export function isValidCnUid(uid: any): boolean {
  const uidNum: number = parseInt(uid)
  if (
    isValidUid(uidNum) &&
    ['1', '5'].includes(uidNum.toString()[0])
  ) {
    return true
  }
  else {
    return false
  }
}

export function isValidOsUid(uid: any): boolean {
  const uidNum: number = parseInt(uid)
  if (
    !isValidUid(uidNum) &&
    ['6', '7', '8', '9'].includes(uidNum.toString()[0])
  ) {
    return true
  }
  else {
    return false
  }
}

function isValidUid(uid: number): boolean {
  if (
    !isNaN(uid) &&
    uid.toString().length === 9 &&
    Math.floor(uid / 100000000) * 100000000 !== uid
  ) {
    return true
  }
  else {
    return false
  }
}