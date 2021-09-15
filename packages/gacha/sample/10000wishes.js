const { GenshinGachaKit } = require('..')
const App = new GenshinGachaKit(require('./customPool'))

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

const startTime = Date.now()

console.log('模拟开始，模拟耗时大约需要数分钟')
for (let i = 0; i < 100000; i = i + 1000) {
  const start = Date.now()
  App.multiWish(1000)
  console.log(i, (Date.now() - start).toString() + 'ms')
}
console.log('抽取结束')

const { total, upSSR, ssr, sr } = App.getCounter()
const ssrResult = App.getResult('ssr')

const upSSRCount = upSSR.length
const averageSSR = average(ssr).toFixed(2)
const averageSR = average(sr).toFixed(2)

console.log(`共抽取 ${total} 次
5星：
  ${ssr.length} (UP ${upSSRCount})
  平均 ${averageSSR} 抽一个五星，出货率 ${((ssr.length / total) * 100).toFixed(
  2
)}%
4星：
  ${sr.length}
  平均 ${averageSR} 抽一个四星，出货率 ${((sr.length / total) * 100).toFixed(
  2
)}%
你的 5 星：
${ssrResult.map((i) => `${i.name}x${i.count}`).join('、')}
模拟结束，耗时：${Date.now() - startTime}ms`)
