// 深境螺旋
export interface Abyss {
  schedule_id: number
  start_time: string
  end_time: string
  total_battle_times: number
  total_win_times: number
  max_floor: string
  reveal_rank: AbyssCharacterData[]
  defeat_rank: AbyssCharacterData[]
  damage_rank: AbyssCharacterData[]
  take_damage_rank: AbyssCharacterData[]
  normal_skill_rank: AbyssCharacterData[]
  energy_skill_rank: AbyssCharacterData[]
  floors: AbyssFloorData[]
  total_star: number
  is_unlock: boolean
}

// 角色数据
export interface AbyssCharacterData {
  avatar_id: number
  avatar_icon: string
  value: number
  rarity: number
}

// 单层数据
export interface AbyssFloorData {
  index: number
  icon: string
  is_unlock: boolean
  settle_time: string
  star: number
  max_star: number
  levels: AbyssLevelData[]
}

// 单间数据
export interface AbyssLevelData {
  index: number
  star: number
  max_star: number
  battles: AbyssBattleData[]
}

// 战斗数据
export interface AbyssBattleData {
  index: number
  timestamp: string
  avatars: AbyssCharacterData[]
}
