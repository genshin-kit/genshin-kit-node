const { GenshinGachaKit } = require('..')
const App = new GenshinGachaKit()
!(async () => {
  // 当期角色卡池
  await App.setOfficialGachaPool('301')
  // 抽 90 发
  App.multiWish(90)
  // 打印结果
  console.log(App.getCounter(), App.getResult())
})()
