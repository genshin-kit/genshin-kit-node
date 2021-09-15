/**
 * @name GenshinGachaKit
 * @desc
 *
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @license Aoache-2.0
 */
import {
  AppCounter,
  AppGachaPool,
  SpecialRoll,
  AppWishResult,
  OfficialGachaType,
  AppGachaItem
} from './types'
import { getOfficialGachaPool, poolStructureConverter } from './util'
export * from './types'
export * as util from './util'

function randomNum(): number {
  return Math.random()
}

function randomPick(list: any[]) {
  return list[Math.floor(Math.random() * list.length)]
}

export class GenshinGachaKit {
  _counter!: AppCounter
  _gachaPool!: AppGachaPool
  _result!: AppWishResult

  constructor(gachaPool: AppGachaPool) {
    // Init gacha pool
    if (gachaPool) {
      this.setGachaPool(gachaPool)
    }
    // Init counter
    this.setCounter({
      total: 0,
      ensureSSR: 0,
      lastUpSSR: 0,
      lastUpSR: 0,
      lastSSR: 0,
      lastSR: 0,
      upSSR: [],
      upSR: [],
      ssr: [],
      sr: []
    })

    // Init result
    this.setResult({
      ssr: [],
      sr: [],
      r: []
    })
  }

  /**
   * @method setGachaPool 配置卡池信息
   * @param {AppGachaPool} gachaPool 卡池信息
   * @return {this}
   */
  setGachaPool(gachaPool: AppGachaPool): this {
    this._gachaPool = gachaPool
    return this
  }

  async setOfficialGachaPool(type: keyof OfficialGachaType): Promise<this> {
    const pool = await getOfficialGachaPool(type)
    if (pool) {
      this.setGachaPool(poolStructureConverter(pool))
    } else {
      throw 'No such pool'
    }

    return this
  }

  setCounter(name: keyof AppCounter | AppCounter, value?: any) {
    this._counter = this._counter || {}
    if (typeof name === 'string' && typeof value !== 'undefined') {
      this._counter[name] = value
    } else if (typeof name === 'object') {
      this._counter = {
        ...this._counter,
        ...name
      }
    }
    return this
  }

  increaseCounter(name: keyof AppCounter, increase = 1): this {
    const value = this.getCounter(name)
    if (typeof value === 'number') {
      this.setCounter(name, value + increase)
    } else if (value.constructor.name.toLowerCase() === 'array') {
      this.setCounter(name, [...(value as number[]), increase])
    }
    return this
  }

  clearCounter() {
    this.setCounter({
      total: 0,
      ensureSSR: 0,
      lastUpSSR: 0,
      lastUpSR: 0,
      lastSSR: 0,
      lastSR: 0,
      upSSR: [],
      upSR: [],
      ssr: [],
      sr: []
    })
    return this
  }

  /**
   * @method getCounter 获取指定计数器记录，若未指定则以键值对返回全部计数器记录
   * @param name
   * total {number} 总抽取数;
   * ensureSSR {0 | 1} 是否位于“大保底”状态;
   * lastUpSSR {number} 距离上一次 UP 5 星已过去多少抽;
   * lastUpSR {number} 距离上一次 UP 4 星已过去多少抽;
   * lastSSR {number} 距离上一次 5 星已过去多少抽;
   * lastSR {number} 距离上一次 4 星已过去多少抽;
   * upSSR {number[]} 每次获取 UP 5 星的间隔;
   * upSR {number[]} 每次获取 UP 4 星的间隔;
   * ssr {number[]} 每次获取 5 星的间隔;
   * sr {number[]} 每次获取 4 星的间隔;
   * @return {number | number[] | AppCounter}
   */
  getCounter(name?: keyof AppCounter): number | number[] | AppCounter {
    return name ? this._counter?.[name] || 0 : this._counter
  }

  setResult(
    type: keyof AppWishResult | AppWishResult,
    value?: AppGachaItem[]
  ): this {
    if (typeof type === 'string' && typeof value !== 'undefined') {
      this._result[type] = value
    } else {
      this._result = type as AppWishResult
    }
    return this
  }

  increaseResult(type: keyof AppWishResult, item: AppGachaItem) {
    const oldResult = this.getResult(type) as AppGachaItem[]
    const sameItem = oldResult.filter((i) => i.name === item.name)
    if (sameItem.length < 1) {
      item.count = 1
      this.setResult(type, [...oldResult, item])
    } else {
      sameItem[0].count && sameItem[0].count++
    }
    return this
  }

  clearResult() {
    this.setResult({
      ssr: [],
      sr: [],
      r: []
    })
    return this
  }

  /**
   *
   * @param type
   * @returns
   */
  getResult(type?: keyof AppWishResult): AppWishResult | AppGachaItem[] {
    return type ? this._result?.[type] || [] : this._result
  }

  /**
   * @function specialRoll
   * @param {number} count
   * @return {0|1|2} 分别代表失败、抽中、抽中 UP
   */
  _generateRoll({
    lastCount,
    baseChance,
    upChance,
    softEnsure,
    turningPoint,
    hardEnsure
  }: SpecialRoll): 0 | 1 | 2 {
    let chance = 0
    const more = (1 - baseChance) / (softEnsure - turningPoint)
    if (lastCount <= turningPoint) {
      chance = baseChance
    } else {
      chance = baseChance + more * (lastCount - turningPoint)
    }
    if (chance >= randomNum()) {
      if (randomNum() >= upChance || hardEnsure) {
        return 2
      }
      return 1
    }
    return 0
  }

  rollSSR(ensure: boolean): 0 | 1 | 2 {
    this.increaseCounter('lastSSR')
    this.increaseCounter('lastUpSSR')

    const count = this.getCounter('lastSSR') as number
    const upCount = this.getCounter('lastUpSSR') as number

    const result = this._generateRoll({
      lastCount: count,
      baseChance: 0.006,
      upChance: 0.5,
      softEnsure: 90,
      turningPoint: 72,
      hardEnsure: ensure
    })
    if (result === 1) {
      this.setCounter('ensureSSR', 1)
    }
    if (result === 2) {
      this.setCounter('ensureSSR', 0)
      this.increaseCounter('upSSR', upCount)
      this.setCounter('lastUpSSR', 0)
    }
    if (result > 0) {
      this.increaseCounter('ssr', count)
      this.setCounter('lastSSR', 0)
    }
    return result
  }

  rollSR(): 0 | 1 | 2 {
    this.increaseCounter('lastSR')
    this.increaseCounter('lastUpSR')

    const result = this._generateRoll({
      lastCount: this.getCounter('lastSR') as number,
      baseChance: 0.051,
      upChance: 0.5,
      softEnsure: 10,
      hardEnsure: false,
      turningPoint: 7
    })
    if (result === 2) {
      this.increaseCounter('upSR', this.getCounter('lastUpSR') as number)
      this.setCounter('lastUpSR', 0)
    }
    if (result > 0) {
      this.increaseCounter('sr', this.getCounter('lastSR') as number)
      this.setCounter('lastSR', 0)
    }
    return result
  }

  /**
   * @method singleWish 进行单次抽取并获取结果
   * @return {AppGachaItem} 抽取结果
   */
  singleWish(): AppGachaItem {
    this.increaseCounter('total')

    const getSSR = (isUP: boolean) => {
      if (this._gachaPool.upSSR.length < 1) {
        this._gachaPool.upSSR = this._gachaPool.ssr
      }
      const character = randomPick(
        isUP ? this._gachaPool.upSSR : this._gachaPool.ssr
      ) as AppGachaItem
      character.rarity = 5
      this.increaseResult('ssr', character)

      return character
    }

    const getSR = (isUP: boolean) => {
      if (this._gachaPool.upSR.length < 1) {
        this._gachaPool.upSR = this._gachaPool.sr
      }
      const character = randomPick(
        isUP ? this._gachaPool.upSR : this._gachaPool.sr
      ) as AppGachaItem
      character.rarity = 4
      this.increaseResult('sr', character)

      return character
    }
    const getR = () => {
      const character = randomPick(this._gachaPool.r) as AppGachaItem
      character.rarity = 3
      this.increaseResult('r', character)

      return character
    }

    const isSSR = this.rollSSR(Boolean(this.getCounter('ensureSSR')))
    if (isSSR > 0) {
      return getSSR(isSSR === 2)
    } else {
      const isSR = this.rollSR()
      if (isSR > 0) {
        return getSR(isSR === 2)
      } else {
        return getR()
      }
    }
  }

  /**
   * @method multiWish 进行多次抽取并获取结果集合
   * @param count 抽取的次数
   * @return {AppGachaItem[]} 结果集合
   */
  multiWish(count: number): AppGachaItem[] {
    const result: AppGachaItem[] = []
    for (let i = 0; i < count; i++) {
      result.push(this.singleWish())
    }
    return result
  }
}
