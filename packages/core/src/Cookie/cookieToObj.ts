export function cookieToObj(str: string): Record<string, string> {
  return Object.fromEntries(str.split('; ').map((item) => item.split('=', 2)))
}
