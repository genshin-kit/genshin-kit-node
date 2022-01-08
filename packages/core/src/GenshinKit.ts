import { serverArea } from './ServerArea'
import { cookieToObj } from './Cookie'
import { CNQuerier, OSQuerier } from './Querier'

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
  #cookie = ''
  #querier: CNQuerier | OSQuerier = new CNQuerier()
  #serverType: AppServerType = 'cn'
  serverLocale: AppServerLocale
  characters: (uid: number, noCache?: boolean) => Promise<Character[]>
  userRoles: (uid: number, noCache?: boolean) => Promise<Character[]>
  abyss: (uid: number, type?: 1 | 2, noCache?: boolean) => Promise<Abyss>
  curAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>
  prevAbyss: (uid: number, noCache?: boolean) => Promise<Abyss>

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
    const o = cookieToObj(this.#cookie)
    return `ltoken=${o.ltoken}; ltuid=${o.ltuid}`
  }

  set cookie(value: string) {
    const o = cookieToObj(value)
    if (!o.ltoken && !o.ltuid) throw { code: -1, message: 'Invalid cookie' }
    this.#cookie = value
    this.#querier.cookie = value
  }

  get serverType() {
    return this.#serverType
  }

  set serverType(value: AppServerType) {
    this.#serverType = value
    this.#querier =
      this.#serverType === 'cn' ? new CNQuerier() : new OSQuerier()
    this.#cookie = ''
  }

  clearCookie(): void {
    this.#cookie = ''
    this.#querier.cookie = ''
  }

  clearCache(): void {
    this.#cache = {}
  }

  async userInfo(uid: number, noCache = false): Promise<UserInfo> {
    const temp = this.#cache?.[uid]?.info
    if (temp && !noCache) {
      return temp
    }

    const server = serverArea(uid)
    const data = await this.#querier.send('GET', '/index', {
      params: {
        role_id: String(uid),
        server,
      },
      locale: this.serverLocale,
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    this.#cache[uid] = {
      ...this.#cache[uid],
      info: data.data,
    }
    return data.data
  }

  async selfBindingRoles(): Promise<BindingGameRoles[]> {
    const res = await this.#querier.send(
      'GET',
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    return (res.data.list as BindingGameRoles[]).filter((item) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
  }

  async allCharacters(uid: number, noCache = false): Promise<Character[]> {
    const temp = this.#cache?.[uid]?.roles
    if (temp && !noCache) {
      return temp
    }

    const server = serverArea(uid)
    const userInfo = await this.userInfo(uid)
    const character_ids = userInfo.avatars.map((item) => {
      return item.id
    })

    const data = await this.#querier.send('POST', '/character', {
      data: {
        character_ids,
        role_id: uid,
        server,
      },
      locale: this.serverLocale,
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    } else {
      this.#cache[uid] = {
        ...this.#cache[uid],
        roles: data?.data?.avatars,
      }
      return data?.data?.avatars || []
    }
  }

  /**
   * @param {1|2} type 1 cur, 2 prev
   */
  async spiralAbyss(
    uid: number,
    type: 1 | 2 = 1,
    noCache = false
  ): Promise<Abyss> {
    if (type !== 1 && type !== 2) {
      throw { code: -1, message: 'Invalid abyss type' }
    }

    const temp = this.#cache?.[uid]?.abyss?.[type]
    if (temp && !noCache) {
      return temp
    }

    const server = serverArea(uid)
    const data = await this.#querier.send('GET', '/spiralAbyss', {
      params: {
        role_id: String(uid),
        schedule_type: String(type),
        server,
      },
      locale: this.serverLocale,
    })
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    } else {
      this.#cache[uid] = this.#cache[uid] || {}
      this.#cache[uid].abyss = {
        ...this.#cache[uid].abyss,
        [type]: data.data,
      }
      return data.data
    }
  }

  async currentAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.spiralAbyss(uid, 1, noCache)
  }

  async previousAbyss(uid: number, noCache?: boolean): Promise<Abyss> {
    return this.spiralAbyss(uid, 2, noCache)
  }

  async activities(uid: number): Promise<Activities> {
    const server = serverArea(uid)
    const data = await this.#querier.send('GET', '/activities', {
      params: {
        role_id: String(uid),
        server,
      },
    })
    if (data.retcode !== 0 || !data.data) {
      throw { code: data.retcode, message: data.message }
    } else {
      return data.data
    }
  }

  async dailyNote(uid: number, noCache = false): Promise<DailyNote> {
    const temp = this.#cache?.[uid]?.dailyNote
    if (temp && !noCache) {
      return temp
    }

    const server = serverArea(uid)
    const data = await this.#querier.send('GET', '/dailyNote', {
      params: {
        role_id: String(uid),
        server,
      },
    })
    if (data.retcode !== 0 || !data.data) {
      throw {
        code: data.retcode,
        message: data.message,
      }
    }
    this.#cache[uid] = {
      ...this.#cache[uid],
      dailyNote: data.data,
    }
    return data.data
  }
}
