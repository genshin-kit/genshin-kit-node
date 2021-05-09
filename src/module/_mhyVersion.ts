export function _mhyVersion(this: any): string {
  switch (this.serverType) {
    case 'sea':
      return '1.5.0'
    case 'cn':
    default:
      return '2.7.0'
  }
}
