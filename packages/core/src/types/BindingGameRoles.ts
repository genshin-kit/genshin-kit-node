export interface BindingGameRoles {
  game_biz: 'hk4e_cn' | 'hk4e_global'
  region: 'cn_gf01' | 'cn_qd01' | 'os_usa' | 'os_euro' | 'os_asia' | 'os_cht'
  game_uid: `${number}`
  nickname: string
  level: number
  is_chosen: boolean
  region_name: '天空岛' | '世界树' | 'Asia Server' | string
  is_official: boolean
}
