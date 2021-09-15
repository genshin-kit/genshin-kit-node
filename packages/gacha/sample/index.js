const { GenshinGachaKit } = require('..')

const App = new GenshinGachaKit(require('./customPool'))

console.log(App.multiWish(90), App.getCounter(), App.getResult())
