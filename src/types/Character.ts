// 玩家角色
export interface Character {
  id: number
  icon?: string
  image?: string
  name: number
  element: string
  fetter: number
  level: number
  rarity: number
  weapon?: Weapon
  reliquaries?: Reliquaries[]
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
