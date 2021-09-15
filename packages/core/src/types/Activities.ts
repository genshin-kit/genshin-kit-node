// This type is incomplete - I don’t want to find out more activities types
// It’s f**king too much. PRs welcome

export type Activities = ActivitiesCommon & ActivitiesExistKeys

interface ActivitiesCommon {
  activities: ActivitiesList
  latest_activity_guide_url: string
  is_latest_activity_opened: true
}

type ActivitiesExistKeys = Record<string, null>

// Activities List
type ActivitiesList = [ActivityEffigy, ActivityMechanicus, ActivityFleurFair] &
  Record<string, ActivitiesDetailsCommon & any>

// Common types
interface ActivitiesDetailsCommon {
  start_time: string
  end_time: string
  total_score: number
  total_times: number
}

interface ActivitiesAvatarCommon {
  id: number
  icon: string
  level: number
}

// 无相交响诗 2021
interface ActivityEffigy {
  effigy: ActivitiesDetailsCommon & {
    records: {
      avatars: ActivitiesAvatarCommon[]
      is_multiplayer_online: boolean
      difficulty: number
      challenge_id: number
      challenge_name: string
      max_score: number
      limit_conditions: {
        id: number
        desc: string
        score: number
      }[]
      score_multiple: number
    }[]
    exists_data: true
  }
}

// 机关奇谭 2021
interface ActivityMechanicus {
  mechanicus: ActivitiesDetailsCommon & {
    gears: {
      id: number
      icon: string
      name: string
      level: number
      element: number
      is_locked: boolean
    }[]
    records: {
      avatars: ActivitiesAvatarCommon[]
      difficulty: number
      score_multiple: number
      name: string
      score: number
      settle_time: string
    }[]
    exists_data: boolean
  }
}

// 风花节 2021
interface ActivityFleurFair {
  fleur_fair: {
    fleur_fair_gallery: ActivitiesDetailsCommon & {
      game_collections: {
        type: string
        games: {
          name: string
          records: {
            max_score: number
            difficulty: number
          }[]
        }[]
      }[]
      exists_data: true
    }
    fleur_fair_dungeon: ActivitiesDetailsCommon & {
      records: {
        avatars: ActivitiesAvatarCommon[]
        score: number
        stage_names: string[]
        settle_time: string
      }[]
      exists_data: boolean
    }
    is_sub_activity: boolean
  }
}

// ...
