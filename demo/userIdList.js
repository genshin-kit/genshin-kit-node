const { App, niubi_uid } = require('.')

// 获取角色详细信息
App.getUserRoles(niubi_uid).then((data) => {
  function sortObject(subject, comparator) {
    const result = {}
    const sortedKeys = Object.keys(subject).sort(comparator)
    for (let i = 0; i < sortedKeys.length; ++i) {
      // Fetch
      const key = sortedKeys[i]
      let value = subject[key]
      // Recurse if object or array
      if (value != null) {
        if (Array.isArray(value)) {
          value = sortArray(value, comparator)
        } else if (typeof value === 'object') {
          value = sortObject(value, comparator)
        }
      }
      // Push
      result[key] = value
    }
    return result
  }
  let data1 = {}
  data.forEach(({ id, name }) => {
    data1[id] = name
  })
  data1 = sortObject(data1)
  const data2 = {}
  for (let item of Object.values(data1)) {
    data2[item] = []
  }
  console.log(data1, data2)
}, console.error)
