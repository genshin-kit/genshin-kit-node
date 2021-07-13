// 玩家角色
export interface Character {
  id: number
  icon?: string
  image?: string
  name: string
  element: string
  fetter: number
  level: number
  rarity: number
  actived_constellation_num: number
  weapon?: Weapon
  reliquaries?: Reliquaries[]
  constellations?: Constellations[]
}

// 武器
export interface Weapon {
  id: number
  name: string
  icon: string
  type: number
  type_name: string
  desc: string
  rarity: number
  level: number
  promote_level: number
  affix_level: number
}

// 圣遗物
export interface Reliquaries {
  id: number
  name: string
  icon: string
  pos: number
  pos_name: string
  rarity: number
  level: number
  set: {
    id: number
    name: string
    affixes: {
      activation_number: number
      effect: string
    }[]
  }
}

// 命座
export interface Constellations {
  id: number
  name: string
  icon: string
  effect: string
  is_actived: boolean
  pos: number
}
