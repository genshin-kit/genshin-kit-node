export const characterNicknameList: Record<string, string[]> = {
  琴: ['jean', '琴团长', '团长', '蒲公英骑士'],
  丽莎: ['lisa', '丽莎姐姐'],
  旅行者: ['travller', '空', '荧', '爷', '老娘', '主角', '主人翁', '冒险者'],
  芭芭拉: ['babra'],
  凯亚: ['冻起来吧'],
  迪卢克: ['diluc', '卢姥爷', '在此宣判', '卢锅巴'],
  雷泽: ['razor', '卢皮卡'],
  安柏: [],
  温迪: ['venti', '巴巴托斯', '风神', '诶嘿', '卖唱的'],
  香菱: ['锅巴的召唤兽', '香师傅', '璃月厨子'],
  北斗: [],
  行秋: [],
  魈: ['打桩机', '提瓦特打桩机', '快乐风男'],
  凝光: ['投石机'],
  可莉: ['哒哒哒', '逃跑的太阳', '火花骑士'],
  钟离: ['往生堂客卿', '钟师傅', '岩神', '莫拉克斯'],
  菲谢尔: ['大幻梦森罗万象狂气断罪眼'],
  班尼特: ['倒霉蛋', '点赞哥', '命运试金石'],
  达达利亚: ['公子', '钱包'],
  诺艾尔: ['女仆', '未授勋之花'],
  七七: ['77'],
  重云: [],
  甘雨: ['椰羊'],
  阿贝多: [],
  迪奥娜: ['dio娜'],
  莫娜: ['占星术士', '穷光蛋'],
  刻晴: ['刻师傅', '斩尽牛杂', '玉衡星', '屁斜剑法'],
  砂糖: [],
  辛焱: [],
  罗莎莉亚: ['修女'],
  胡桃: ['往生堂堂主'],
}

export function getCharacterByNickname(keyword: string): string {
  keyword = keyword.toLowerCase()
  const characters: string[] = Object.keys(characterNicknameList)
  if (characters.includes(keyword)) {
    return keyword
  }
  characters.forEach((item) => {
    if (characterNicknameList[item].includes(keyword)) return item
  })
  return keyword
}
