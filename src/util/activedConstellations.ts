import { Character } from '../types'

export function activedConstellations(cahracter: Character): number {
  return cahracter.actived_constellation_num
}

export { activedConstellations as getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter }
