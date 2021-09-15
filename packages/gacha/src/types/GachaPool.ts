import { AppGachaItem } from './App'

// GenshinGachaKit 卡池数据
export interface AppGachaPool {
  name: string
  type: 'novice' | 'character' | 'weapon' | 'permanent'
  begin?: string
  end?: string
  upSSR: AppGachaItem[]
  upSR: AppGachaItem[]
  ssr: AppGachaItem[]
  sr: AppGachaItem[]
  r: AppGachaItem[]
}

// 官方卡池数据
export interface OfficialGachaIndex {
  gacha_id: string
  gacha_type: keyof OfficialGachaType
  gacha_name: OfficialGachaType[keyof OfficialGachaType]
  begin_time: string
  end_time: string
}

export interface OfficialGachaPool {
  title: string
  banner: string
  content: string
  date_range: string
  begin_time?: string
  end_time?: string
  gacha_type: keyof OfficialGachaType
  r3_baodi_prob: string
  r3_prob: string
  r3_prob_list: OfficialGachaPoolProb[]
  r4_baodi_prob: string
  r4_prob: string
  r4_prob_list: OfficialGachaPoolProb[]
  r4_up_items: OfficialGachaPoolItem[]
  r4_up_prob: string
  r5_baodi_prob: string
  r5_prob: string
  r5_prob_list: OfficialGachaPoolProb[]
  r5_up_items: OfficialGachaPoolItem[]
  r5_up_prob: string
}

export interface OfficialGachaType {
  100: '新手'
  200: '常驻'
  301: '角色'
  302: '武器'
}

export interface OfficialGachaPoolProb {
  is_up: 0 | 1
  item_id: number
  item_name: string
  item_type: '武器' | '角色'
  order_value: number
  rank: 3 | 4 | 5
}

export interface OfficialGachaPoolItem {
  item_attr: string
  item_id: number
  item_img: string
  item_name: string
  item_type: '武器' | '角色'
  item_type_cn: '武器' | '角色'
}
