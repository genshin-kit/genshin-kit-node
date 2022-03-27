// 按首字母排序 object
export function sortKeys<T>(obj: Record<string, T>): Record<string, T> {
  const copy: Record<string, T> = {}
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      copy[key] = obj[key]
    })
  return copy
}
