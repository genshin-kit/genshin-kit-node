// 按首字母排序 object
export function sortKeys<T>(obj: Record<string, T>): Record<string, T> {
  const copy: Record<string, T> = {}
  const allKeys = Object.keys(obj).sort()
  allKeys.forEach((key) => {
    copy[key] = obj[key]
  })
  return copy
}
