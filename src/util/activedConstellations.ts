import { Character } from '../types'

export function activedConstellations(cahracter: Character): number {
  return (
    cahracter.constellations?.filter(({ is_actived }) => is_actived).length || 0
  )
}

export { activedConstellations as getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter }
