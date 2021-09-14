import { Character } from './Character'

export interface UserInfo {
  role: Character[] | null
  avatars: Character[]
  stats: UserStats
  city_explorations: City[]
  world_explorations: City[]
  homes: Home[]
}

// 信息总览
export interface UserStats {
  active_day_number: number
  achievement_number: number
  win_rate: number
  anemoculus_number: number
  geoculus_number: number
  avatar_number: number
  way_point_number: number
  domain_number: number
  spiral_abyss: string
  precious_chest_number: number
  luxurious_chest_number: number
  exquisite_chest_number: number
  common_chest_number: number
}

// 城市探索
export interface City {
  id: number
  type?: string
  level: number
  exploration_percentage: number
  icon: string
  name: string
}

// 尘歌壶
export interface Home {
  level: number
  visit_num: number
  comfort_num: number
  item_num: number
  name: string
  icon: string
  comfort_level_name: string
  comfort_level_icon: string
}
