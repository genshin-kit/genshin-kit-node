import cookie from 'cookie'
import { CnQuery, OsQuery } from './Query'

// Types
import {
  Abyss,
  Activities,
  AppCache,
  Character,
  AppServerLocale,
  AppServerType,
  UserInfo,
  DailyNote,
  BindingGameRoles,
} from './types'

export class GenshinKit {
  #cache: AppCache = {}
  #query: CnQuery | OsQuery = new CnQuery()
  #serverLocale: AppServerLocale = 'zh-cn'
  #serverType: AppServerType = 'cn'
  characters: (uid: number) => Promise<Character[]>
  userRoles: (uid: number) => Promise<Character[]>
  abyss: (uid: number, type?: 1 | 2) => Promise<Abyss>
  curAbyss: (uid: number) => Promise<Abyss>
  prevAbyss: (uid: number) => Promise<Abyss>

  /**
   *
   */
  constructor({
    serverType,
    serverLocale,
  }: { serverType?: AppServerType; serverLocale?: AppServerLocale } = {}) {
    this.serverLocale = serverLocale || 'zh-cn'
    this.serverType = serverType || 'cn'
    // Set aliases
    this.characters = this.allCharacters
    this.userRoles = this.allCharacters
    this.abyss = this.spiralAbyss
    this.curAbyss = this.currentAbyss
    this.prevAbyss = this.previousAbyss
  }

  get cookie() {
    return this.#query.cookie
  }

  set cookie(value: string) {
    const o = cookie.parse(value)
    if (!o.ltoken && !o.ltuid) throw new Error('Invalid cookie')
    this.#query.cookie = value
  }

  get serverLocale() {
    return this.#serverLocale
  }

  set serverLocale(value: AppServerLocale) {
    this.#serverLocale = value
    this.#query.locale = value
  }

  get serverType() {
    return this.#serverType
  }

  set serverType(value: AppServerType) {
    this.#serverType = value
    this.#query = this.#serverType === 'cn' ? new CnQuery() : new OsQuery()
    this.#query.locale = this.serverLocale
    this.clearCookie()
    this.clearCache()
  }

  static #throwIfError(data: {
    retcode: number
    data: any
    message: string
  }): void {
    if (data.retcode !== 0 || !data.data) {
      throw new Error(data.message)
    }
  }

  clearCookie(): void {
    this.#query.cookie = ''
  }

  clearCache(): void {
    this.#cache = {}
  }

  #updateCache(uid: number, data: Record<string, any>): void {
    if (!this.#cache[uid]) {
      this.#cache[uid] = {}
    }
    this.#cache[uid] = {
      ...this.#cache[uid],
      ...data,
    }
  }

  async userInfo(uid: number): Promise<UserInfo> {
    const temp = this.#cache?.[uid]?.info
    if (temp) {
      return temp
    } else {
      return this.userInfoNoCache(uid)
    }
  }

  async userInfoNoCache(uid: number): Promise<UserInfo> {
    const data = await this.#query.getWithUid('index', uid)
    GenshinKit.#throwIfError(data)
    this.#updateCache(uid, { info: data.data })
    return data.data
  }

  async selfBindingRoles(): Promise<BindingGameRoles[]> {
    const res = await this.#query.get(
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    return (res.data.list as BindingGameRoles[]).filter((item) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
  }

  async allCharacters(uid: number): Promise<Character[]> {
    const temp = this.#cache?.[uid]?.roles
    if (temp) {
      return temp
    } else {
      return this.allCharactersNoCache(uid)
    }
  }

  async allCharactersNoCache(uid: number): Promise<Character[]> {
    const data = await this.#query.postWithUid('character', uid)
    GenshinKit.#throwIfError(data)

    const result = data?.data?.avatars ?? []
    this.#updateCache(uid, { roles: result })
    return result
  }

  /**
   * @param {1|2} type 1 cur, 2 prev
   */
  async spiralAbyss(uid: number, type: 1 | 2 = 1): Promise<Abyss> {
    const temp = this.#cache?.[uid]?.abyss?.[type]
    if (temp) {
      return temp
    } else {
      return this.spiralAbyssNoCache(uid, type)
    }
  }

  /**
   * @param {1|2} type 1 cur, 2 prev
   */
  async spiralAbyssNoCache(uid: number, type: 1 | 2 = 1): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw new Error('Invalid abyss type')
    }

    const data = await this.#query.getWithUid('spiralAbyss', uid, {
      params: {
        schedule_type: type.toString(),
      },
    })
    GenshinKit.#throwIfError(data)

    this.#updateCache(uid, {
      abyss: {
        [type]: data.data,
      },
    })
    return data.data
  }

  async currentAbyss(uid: number): Promise<Abyss> {
    return this.spiralAbyss(uid, 1)
  }

  async currentAbyssNoCache(uid: number): Promise<Abyss> {
    return this.spiralAbyssNoCache(uid, 1)
  }

  async previousAbyss(uid: number): Promise<Abyss> {
    return this.spiralAbyss(uid, 2)
  }

  async previousAbyssNoCache(uid: number): Promise<Abyss> {
    return this.spiralAbyssNoCache(uid, 2)
  }

  async activities(uid: number): Promise<Activities> {
    const data = await this.#query.getWithUid('activities', uid)
    GenshinKit.#throwIfError(data)
    return data.data
  }

  async dailyNote(uid: number): Promise<DailyNote> {
    const temp = this.#cache?.[uid]?.dailyNote
    if (temp) {
      return temp
    } else {
      return this.dailyNoteNoCache(uid)
    }
  }

  async dailyNoteNoCache(uid: number): Promise<DailyNote> {
    const data = await this.#query.getWithUid('dailyNote', uid)

    GenshinKit.#throwIfError(data)

    this.#updateCache(uid, { dailyNote: data.data ?? {} })
    return data.data ?? {}
  }
}
