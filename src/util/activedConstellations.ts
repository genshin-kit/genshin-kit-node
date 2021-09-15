import { Character } from '../types'

export function activedConstellations(character: Character): number {
  return character.actived_constellation_num
}

export { activedConstellations as getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter }
