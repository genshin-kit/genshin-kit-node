export interface DailyNote {
  current_resin: number
  max_resin: number
  resin_recovery_time: string
  finished_task_num: number
  total_task_num: number
  is_extra_task_reward_received: boolean
  remain_resin_discount_num: number
  resin_discount_num_limit: number
  current_expedition_num: number
  max_expedition_num: number
  expeditions?: Expeditions[]
}

export interface Expeditions {
  avatar_side_icon?: string
  status: string
  remained_time: string
}
