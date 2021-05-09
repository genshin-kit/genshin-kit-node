import axios from 'axios'

interface GachaInfoI18nData {
  item_id: string
  name: string
  item_type: string
  rank_type: '3' | '4' | '5'
}

type GachaInfoI18nLang = 'zh-cn' | 'zh-tw' | 'ja-jp' | 'kr-ko' | 'en-us'

export async function getAllIds(
  lang: GachaInfoI18nLang = 'zh-cn'
): Promise<GachaInfoI18nData[]> {
  return (
    await axios.get(
      `https://webstatic.mihoyo.com/hk4e/gacha_info/cn_gf01/items/${lang}.json`
    )
  ).data
}

function filter(data: GachaInfoI18nData[], names: string[]) {
  return data
    .filter((i) => names.includes(i.item_type))
    .map(({ item_id, item_type, name, rank_type }) => {
      return {
        item_id: String(Number(item_id) - 1000 + 10000000),
        name,
        item_type,
        rank_type,
      }
    })
}

export async function getCharacterIds(
  lang?: GachaInfoI18nLang
): Promise<GachaInfoI18nData[]> {
  const data = await getAllIds(lang)
  const characters = filter(data, ['角色'])
  return [
    {
      item_id: '10000007',
      name: '旅行者',
      item_type: '角色',
      rank_type: '5',
    },
    ...characters,
  ]
}
