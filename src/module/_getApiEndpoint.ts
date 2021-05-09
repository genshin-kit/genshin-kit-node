export function _getApiEndpoint(this: any): string {
  switch (this.serverType) {
    case 'sea':
      return ''
    case 'cn':
    default:
      return 'https://api-takumi.mihoyo.com/game_record/genshin/api/'
  }
}
