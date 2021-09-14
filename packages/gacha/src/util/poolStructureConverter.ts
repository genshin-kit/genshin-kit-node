import { AppGachaPool, AppGachaItem, OfficialGachaPool } from '../types'

const gachaType: Record<string, AppGachaPool['type']> = {
  '200': 'permanent',
  '100': 'novice',
  '301': 'character',
  '302': 'weapon'
}

const itemType: Record<string, AppGachaItem['type']> = {
  武器: 'weapon',
  角色: 'character'
}

export function poolStructureConverter(data: OfficialGachaPool): AppGachaPool {
  const pool: AppGachaPool = {
    name: '',
    type: '' as AppGachaPool['type'],
    begin: '',
    end: '',
    upSSR: [],
    upSR: [],
    ssr: [],
    sr: [],
    r: []
  }

  pool.name = data.title.replace(/<\/?.+?>/g, '')
  pool.type = gachaType[data.gacha_type]
  pool.begin = data.begin_time
  pool.end = data.end_time
  // 5*
  data.r5_prob_list.forEach((item) => {
    const name = item.item_name
    const type = item.item_type
    const gachaItem: AppGachaItem = { name, type: itemType[type], rarity: 5 }
    item.is_up === 1 ? pool.upSSR.push(gachaItem) : pool.ssr.push(gachaItem)
  })
  // 4*
  data.r4_prob_list.forEach((item) => {
    const name = item.item_name
    const type = item.item_type
    const gachaItem: AppGachaItem = { name, type: itemType[type], rarity: 4 }
    item.is_up === 1 ? pool.upSR.push(gachaItem) : pool.sr.push(gachaItem)
  })
  // 3*
  data.r3_prob_list.forEach((item) => {
    const name = item.item_name
    const type = item.item_type
    const gachaItem: AppGachaItem = { name, type: itemType[type], rarity: 3 }
    pool.r.push(gachaItem)
  })

  return pool
}
