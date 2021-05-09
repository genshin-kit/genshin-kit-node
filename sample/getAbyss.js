const { App, uid } = require('.')

// 获取深渊信息
function formatter({
  start_time,
  end_time,
  total_battle_times,
  total_win_times,
  max_floor,
}) {
  function getTime(t) {
    return new Date(t * 1000).toISOString()
  }
  return [
    '',
    `开始时间：${getTime(start_time)}`,
    `结束时间：${getTime(end_time)}`,
    `战斗次数：${total_battle_times}`,
    `胜利次数：${total_win_times}`,
    `到达层数：${max_floor}`,
  ].join('\n')
}

Promise.all([App.getCurrentAbyss(uid), App.getPreviousAbyss(uid)]).then(
  ([cur, prev]) => {
    // console.log(JSON.stringify(data))
    console.log('当期：', formatter(cur))
    console.log('往期：', formatter(prev))
  },
  console.error
)
