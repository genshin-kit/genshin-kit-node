const { GenshinGachaKit } = require('..')
const App = new GenshinGachaKit()
(() => {
  // 当期角色卡池
  App.setOfficialGachaPool(301).then(() => {
    // 抽 90 发
    App.multiWish(90)
    // 打印结果
    console.log(App.getCounter(), App.getResult())
  })
})()
