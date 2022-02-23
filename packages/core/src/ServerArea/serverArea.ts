import { ServerArea } from '../types'

export function serverArea(uid: string | number): ServerArea {
  switch (uid.toString()[0]) {
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
      throw new Error('Invalid uid')
  }
}
