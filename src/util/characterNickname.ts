export const characterNicknameList: Record<string, string[]> = {
  10000003: ['琴', 'jean', 'qin', '琴团长', '团长', '蒲公英骑士'],
  10000006: ['丽莎', 'lisa', 'lisha', '丽莎姐姐'],
  10000007: [
    '旅行者',
    'traveller',
    'lvxingzhe',
    'lxz',
    'kong',
    'ying',
    '空',
    '荧',
    '爷',
    '老娘',
    '主角',
    '主人翁',
    '冒险者',
    '龙哥',
  ],
  10000014: ['芭芭拉', 'barbara', 'babala', 'bbl'],
  10000015: ['凯亚', 'kaeya', 'kaiya', '冻结吧', '凝冰渡海真君', '骑兵队长'],
  10000016: ['迪卢克', 'diluc', '卢姥爷', '在此宣判', '卢锅巴', '正义人'],
  10000020: ['雷泽', 'razor', '卢皮卡'],
  10000021: ['安柏', 'amber', 'anbo', '侦察骑士', '爱酱'],
  10000022: ['温迪', 'venti', 'wendi', '巴巴托斯', '风神', '诶嘿', '卖唱的'],
  10000023: ['香菱', 'xiangling', '锅巴的召唤兽', '香师傅', '璃月厨子'],
  10000024: ['北斗', 'beidou', '大姐头'],
  10000025: ['行秋', 'xingqiu'],
  10000026: ['魈', 'xiao', '打桩机', '提瓦特打桩机', '快乐风男', '靖妖傩舞'],
  10000027: ['凝光', 'ningguang', '投石机'],
  10000029: ['可莉', 'klee', 'keli', '哒哒哒', '逃跑的太阳', '火花骑士'],
  10000030: [
    '钟离',
    'zhongli',
    '往生堂客卿',
    '钟师傅',
    '岩神',
    '摩拉克斯',
    '钟大爷',
  ],
  10000031: [
    '菲谢尔',
    'fischl',
    'feixieer',
    '大幻梦森罗万象狂气断罪眼',
    '皇女',
    '中二皇女',
  ],
  10000032: ['班尼特', 'bennett', 'bannite', '倒霉蛋', '点赞哥', '命运试金石'],
  10000033: [
    '达达利亚',
    'tartaglia',
    'dadaliya',
    'ddly',
    '公子',
    '钱包',
    '达达利鸭',
    '达达鸭',
  ],
  10000034: ['诺艾尔', 'noelle', 'nuoaier', '女仆', '未授勋之花'],
  10000035: ['七七', 'qiqi', '77', '度厄真君', '肚饿真君'],
  10000036: ['重云', 'chongyun'],
  10000037: ['甘雨', 'ganyu', '椰羊', '王小美', '加班'],
  10000038: ['阿贝多', 'albedo', 'abeiduo'],
  10000039: ['迪奥娜', 'diona', 'diaona', 'dio娜', '冰猫'],
  10000041: ['莫娜', 'mona', '占星术士', '穷光蛋'],
  10000042: [
    '刻晴',
    'keqing',
    '刻师傅',
    '斩尽牛杂',
    '玉衡星',
    '屁斜剑法',
    '免疫',
  ],
  10000043: ['砂糖', 'sucrose', 'shatang'],
  10000044: ['辛焱', 'xinyan'],
  10000045: ['罗莎莉亚', 'rosaria', 'luoshaliya', '修女'],
  10000046: ['胡桃', 'hutao', '往生堂堂主'],
  10000048: ['烟绯', 'yanfei', '罗翔', '璃月罗翔'],
}

export function getCharacterByNickname(keyword: string): string | null {
  keyword = keyword.toLowerCase().replace(/\s+/g, '')
  const characters = Object.keys(characterNicknameList)
  if (characters.includes(keyword)) {
    return keyword
  }
  characters.forEach((item) => {
    if (characterNicknameList[item].includes(keyword)) return item
  })
  return null
}
