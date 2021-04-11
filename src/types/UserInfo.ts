import { Character } from './Character'

export interface UserInfo {
  role: Character[] | null
  avatars: Character[]
  stats: UserStats
  city_explorations: City[]
  world_explorations: City[]
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
