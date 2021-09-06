import { Abyss, Character, UserInfo } from './index'

export type AppCache = {
  [K in number]: {
    abyss?: { 1?: Abyss; 2?: Abyss }
    avatars?: Character[]
    info?: UserInfo
    roles?: Character[]
  }
}

export type AppServerLocale =
  | 'zh-cn'
  | 'zh-tw'
  | 'de-de'
  | 'en-us'
  | 'es-es'
  | 'fr-fr'
  | 'id-id'
  | 'ja-jp'
  | 'ko-kr'
  | 'pt-pt'
  | 'ru-ru'
  | 'th-th'
  | 'vi-vn'

export type AppServerType = 'os' | 'cn'