export function _hoyolabVersion(this: any): string {
  switch (this.serverType) {
    case 'os':
      return '1.5.0'
    case 'cn':
    default:
      return '2.7.0'
  }
}
