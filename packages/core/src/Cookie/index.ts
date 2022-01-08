export function cookieToObj(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str
    .split(';')
    .map((i) => {
      const [key, val] = i.split('=')
      return { key: key?.trim(), val: val?.trim() }
    })
    .forEach(({ key, val }) => {
      if (key) obj[key] = val || ''
    })
  return obj
}
