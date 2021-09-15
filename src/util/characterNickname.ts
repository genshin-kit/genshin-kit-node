export class CharacterNickname {
  _nicknameList: NicknameList[]

  constructor() {
    this._nicknameList = defaultList
  }

  addNicknames(id: number, nicknames: string[]) {
    if (!this._nicknameList.find(({ id: id1 }) => id1 === id)) {
      this._nicknameList.push({ id, nicknames: [] })
    }
    const index = this._nicknameList.findIndex(({ id: id1 }) => id1 === id)
    this._nicknameList[index].nicknames.push(...nicknames)
    return this
  }

  getIdByNickname(keyword: string) {
    keyword = keyword.toLowerCase().replace(/\s+/g, '')
    return this._nicknameList.find(({ nicknames }) =>
      nicknames.includes(keyword)
    )?.id
  }

  getNicknamesById(id: number) {
    return this._nicknameList.find(({ id: id1 }) => id1 === id)?.nicknames
  }
}

interface NicknameList {
  id: number
  nicknames: string[]
}

/**
 * @desc nicknames list
 *       [0] Standard simplified Chinese name. `e.g. 空`
 *       [1] Standard English name, remove all spaces, to lower case. `e.g. aether`
 *       [2] Pinyin. `e.g. kong`
 *       [3] Official card title `e.g. 雷泽 → 狼少年`
 */
const defaultList: NicknameList[] = [
  {
    id: 10000002,
    nicknames: [
      '神里绫华',
      'kamisatoayaka',
      'shenlilinghua',
      '白鹭霜华',
      '绫华',
      'ayaka',
    ],
  },
  {
    id: 10000003,
    nicknames: ['琴', 'jean', 'qin', '蒲公英骑士', '琴团长', '团长'],
  },
  {
    id: 10000005,
    nicknames: ['空', 'aether', 'kong', '哥哥', '龙哥', '男主'],
  },
  {
    id: 10000006,
    nicknames: ['丽莎', 'lisa', 'lisha', '蔷薇魔女', '丽莎姐姐'],
  },
  {
    id: 10000007,
    nicknames: ['荧', 'lumine', 'ying', 'lxz', '妹妹', '爷', '女主'],
  },
  {
    id: 10000014,
    nicknames: ['芭芭拉', 'barbara', 'babala', '闪耀偶像', 'bbl'],
  },
  {
    id: 10000015,
    nicknames: [
      '凯亚',
      'kaeya',
      'kaiya',
      '寒风剑士',
      '冻结吧',
      '凝冰渡海真君',
      '骑兵队长',
    ],
  },
  {
    id: 10000016,
    nicknames: [
      '迪卢克',
      'diluc',
      'diluke',
      '晨曦的暗面',
      '卢姥爷',
      '在此宣判',
      '卢锅巴',
      '正义人',
    ],
  },
  {
    id: 10000020,
    nicknames: ['雷泽', 'razor', 'leize', '狼少年', '卢皮卡'],
  },
  {
    id: 10000021,
    nicknames: ['安柏', 'amber', 'anbo', '飞行冠军', '侦察骑士', '爱酱'],
  },
  {
    id: 10000022,
    nicknames: [
      '温迪',
      'venti',
      'wendi',
      '杯装之诗',
      '巴巴托斯',
      '风神',
      '诶嘿',
      '卖唱的',
    ],
  },
  {
    id: 10000023,
    nicknames: [
      '香菱',
      'xiangling',
      '万民百味',
      '锅巴的召唤兽',
      '香师傅',
      '璃月厨子',
    ],
  },
  {
    id: 10000024,
    nicknames: ['北斗', 'beidou', '无冕的龙王', '大姐头'],
  },
  {
    id: 10000025,
    nicknames: ['行秋', 'xingqiu', '少年春衫薄'],
  },
  {
    id: 10000026,
    nicknames: ['魈', 'xiao', '打桩机', '提瓦特打桩机', '靖妖傩舞'],
  },
  {
    id: 10000027,
    nicknames: ['凝光', 'ningguang', '投石机'],
  },
  {
    id: 10000029,
    nicknames: ['可莉', 'klee', 'keli', '哒哒哒', '逃跑的太阳', '火花骑士'],
  },
  {
    id: 10000030,
    nicknames: [
      '钟离',
      'zhongli',
      '往生堂客卿',
      '钟师傅',
      '岩神',
      '摩拉克斯',
      '钟大爷',
    ],
  },
  {
    id: 10000031,
    nicknames: [
      '菲谢尔',
      'fischl',
      'feixieer',
      '大幻梦森罗万象狂气断罪眼',
      '皇女',
      '中二皇女',
    ],
  },
  {
    id: 10000032,
    nicknames: [
      '班尼特',
      'bennett',
      'bannite',
      '倒霉蛋',
      '点赞哥',
      '命运试金石',
    ],
  },
  {
    id: 10000033,
    nicknames: [
      '达达利亚',
      'tartaglia',
      'dadaliya',
      'ddly',
      '公子',
      '钱包',
      '达达利鸭',
      '达达鸭',
    ],
  },
  {
    id: 10000034,
    nicknames: ['诺艾尔', 'noelle', 'nuoaier', '女仆', '未授勋之花'],
  },
  {
    id: 10000035,
    nicknames: ['七七', 'qiqi', '77', '度厄真君', '肚饿真君'],
  },
  {
    id: 10000036,
    nicknames: ['重云', 'chongyun'],
  },
  {
    id: 10000037,
    nicknames: ['甘雨', 'ganyu', '椰羊', '王小美', '加班'],
  },
  {
    id: 10000038,
    nicknames: ['阿贝多', 'albedo', 'abeiduo'],
  },
  {
    id: 10000039,
    nicknames: ['迪奥娜', 'diona', 'diaona', 'dio娜', '冰猫'],
  },
  {
    id: 10000041,
    nicknames: ['莫娜', 'mona', '占星术士', '穷光蛋'],
  },
  {
    id: 10000042,
    nicknames: [
      '刻晴',
      'keqing',
      '刻师傅',
      '斩尽牛杂',
      '玉衡星',
      '屁斜剑法',
      '免疫',
    ],
  },
  {
    id: 10000043,
    nicknames: ['砂糖', 'sucrose', 'shatang'],
  },
  {
    id: 10000044,
    nicknames: ['辛焱', 'xinyan'],
  },
  {
    id: 10000045,
    nicknames: ['罗莎莉亚', 'rosaria', 'luoshaliya', '修女'],
  },
  {
    id: 10000046,
    nicknames: ['胡桃', 'hutao', '往生堂堂主'],
  },
  {
    id: 10000047,
    nicknames: ['枫原万叶', 'kaedeharakazuha', 'fengyuanwanye', 'kazuha'],
  },
  {
    id: 10000048,
    nicknames: ['烟绯', 'yanfei', '罗翔', '璃月罗翔'],
  },
  {
    id: 10000049,
    nicknames: ['宵宫', 'yoimiya', 'xiaogong'],
  },
  {
    id: 10000052,
    nicknames: [
      '雷电将军',
      'raidenshogun',
      'leidianjiangjun',
      '雷电芽衣',
      '芽衣',
      '雷军',
      '雷神',
    ],
  },
  {
    id: 10000053,
    nicknames: ['早柚', 'sayu', 'zaoyou', '忍里之貉'],
  },
  {
    id: 10000056,
    nicknames: ['九条裟罗', 'kujousara', 'jiutiaoshaluo', '天狗'],
  },
]
