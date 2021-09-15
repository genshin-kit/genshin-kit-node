export interface AppCounter {
  total: number
  ensureSSR: 0 | 1
  lastUpSSR: number
  lastUpSR: number
  lastSSR: number
  lastSR: number
  upSSR: number[]
  upSR: number[]
  ssr: number[]
  sr: number[]
}

export interface AppGachaItem {
  name: string
  type: 'character' | 'weapon'
  rarity?: number
  count?: number
}

export interface AppWishResult {
  ssr: AppGachaItem[]
  sr: AppGachaItem[]
  r: AppGachaItem[]
}

export interface SpecialRoll {
  lastCount: number
  baseChance: number
  upChance: number
  softEnsure: number
  turningPoint: number
  hardEnsure: boolean
}
