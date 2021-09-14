import axios from 'axios'

import {
  OfficialGachaIndex,
  OfficialGachaPool,
  OfficialGachaType
} from '../types'

const API_ENDPOINT = 'https://webstatic.mihoyo.com/hk4e/gacha_info/cn_gf01'

export async function getGachaIndex(): Promise<OfficialGachaIndex[]> {
  const { data } = await axios.get(`${API_ENDPOINT}/gacha/list.json`)
  if (data.retcode !== 0 || !data.data) throw { code: data.retcode, ...data }
  return data?.data?.list
}

export async function getGachaData(id: string): Promise<OfficialGachaPool> {
  return (await axios.get(`${API_ENDPOINT}/${id}/zh-cn.json`)).data
}

export async function getOfficialGachaPool(
  type: keyof OfficialGachaType
): Promise<OfficialGachaPool | null> {
  const list = await getGachaIndex()
  const poolData = list.filter((i) => i.gacha_type === type)
  if (poolData.length < 1) return null
  const id = poolData[0].gacha_id
  const pool = await getGachaData(id)
  pool.begin_time = poolData[0].begin_time
  pool.end_time = poolData[0].end_time
  return pool
}
