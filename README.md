# Genshin Kit

一个用于获取《原神》国服玩家数据的 API 封装库。

An API wrapper for fetching player data of Genshin-Impact CN server.

## 安装/Installation

```bash
# Via yarn
yarn add genshin-kit
# Or via npm
npm install genshin-kit
```

## 使用/Usage

> Because `genshin-kit` can only fetch data from CN servers at present, so I've written the docs in Chinese.

**一些完整的示例代码可以[点击这里](./demo)查看。**

### `GenshinKit` {Function}

**GenshinKit** 实例。

返回：**GenshinKit**的应用实例。

<details>
<summary>构造示例</summary>

```js
const { GenshinKit } = require('genshin-kit')
const App = new GenshinKit()
```

</details>

### `App.loginWithToken(<cookie:string>)` {Function}

使用米游社网站的 cookie 登录实例。

> 使用网页版米游社登录 <https://bbs.mihoyo.com/ys/>，然后在控制台输入 `document.cookie`，返回的结果就是 cookie，一般来说一个 cookie 可以使用一段时间，如果失效了就再次获取一遍。

> **⚠️ 注意 ⚠️**：请妥善保存您的 cookies。绝对不要把你的 cookies 交给任何人！<br>绝对绝对不要把你的 cookies 交给任何人！！<br>绝对绝对绝对不要把你的 cookies 交给任何人！！！

返回：`this`

<details>
<summary>使用示例</summary>

```js
App.loginWithToken(process.env.MHY_COOKIE)
```

</details>

### `App.getUserInfo(<uid:number>)` {Function}

使用 UID 查询玩家的游戏基础信息。

返回：`Promise<object>`

<details>
<summary>请求示例</summary>

```js
App.getUserInfo(100000001).then(console.log)
```

</details>

<details>
<summary>返回示例</summary>

```js
{
  role: null,
  // 玩家拥有的角色
  avatars: [
    {
      id: 10000007, // 角色 id
      image:
        'https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_PlayerGirl.png', // 头图
      name: '旅行者', // 角色名称
      element: 'Geo', // 元素
      fetter: 0, // 亲密度
      level: 1, // 等级
      rarity: 5 // 星级
    }
    // ...
  ],
  stats: {
    active_day_number: 0, // 活跃天数
    achievement_number: 0, // 成就达成数
    win_rate: 0, // ?
    anemoculus_number: 0, // 风神瞳
    geoculus_number: 0, // 岩神瞳
    avatar_number: 0, // 获得角色数
    way_point_number: 0, // 解锁传送点
    domain_number: 0, // 解锁秘境
    spiral_abyss: '1-1', // 深境螺旋
    precious_chest_number: 0, // 珍贵宝箱
    luxurious_chest_number: 0, // 华丽宝箱
    exquisite_chest_number: 0, // 精致宝箱
    common_chest_number: 0 // 普通宝箱
  },
  // 城市声望
  city_explorations: [
    {
      id: 1,
      level: 8, // 声望等级
      exploration_percentage: 1000, // 探索度
      icon:
        'https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Mengde.png',
      name: '蒙德'
    },
    {
      id: 2,
      level: 8,
      exploration_percentage: 1000,
      icon:
        'https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Liyue.png',
      name: '璃月'
    }
  ],
  // 世界探索
  world_explorations: [
    {
      level: 1, // 声望等级/供奉等级
      exploration_percentage: 1000, // 探索度
      icon:
        'https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Dragonspine.png',
      name: '龙脊雪山',
      type: 'Offering' // Reputation 声望 / Offering 供奉
    },
    {
      level: 1,
      exploration_percentage: 1000,
      icon:
        'https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Mengde.png',
      name: '蒙德',
      type: 'Reputation'
    },
    {
      level: 1,
      exploration_percentage: 1000,
      icon:
        'https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Liyue.png',
      name: '璃月',
      type: 'Reputation'
    }
  ]
}
```

</details>

### `App.getAllCharacters(<uid:number>)` {Function}

通过 UID 获取玩家详细的角色信息。包括角色的装备情况。

返回：`Promise<object>`

### `util.CharactersFilter(<data:object>)` (角色工具类)

一个角色筛选工具类。封装了一系列过滤角色信息的方法。

- `data` _getAllCharacters_ 返回的角色数据

返回：`Characters`类

<details>
<summary>使用示例</summary>

```js
const { CharactersFilter } = require('genshin-kit').util
App.getAllCharacters(100000001).then(
  data => {
    const Filter = new CharactersFilter(data)
    // ...
  },
  err => console.error
)
```

</details>

#### `Characters.all()` {Function}

获取特定玩家的全部角色列表。

返回：`Object`

#### `Characters.id(<id:number>)` {Function}

获取特定玩家的指定 id 的角色信息。

返回：`Object|null`

#### `Characters.name(<name:string>)` {Function}

获取特定玩家的指定名称的角色信息。

返回：`Object|null`

`name`：角色名称，必须是“简体中文”语言中的标准名称。

#### `Characters.element(<element:string>)` {Function}

获取特定玩家的指定元素的角色信息。

返回：`Object[]`

`element`：可以是中文或者英文，例如`火`和`pyro`都是可以接受的名称。

#### `Characters.rarity(<rarity:number|number[]>)` {Function}

获取特定玩家的指定稀有度的角色信息。

返回：`Object[]`

`rarity`：必须是数字或者数字组成的数组，例如`4`、`5`以及`[4, 5]`。

### `App.getAbyss(<uid:number>[, type:number<1|2>])`

根据 UID 获取“深境螺旋”信息。

- `type` 1 代表当期，2 代表上一期

返回：`Promise<object>`

<details>
<summary>返回示例</summary>

```js
{
  schedule_id: 17,
  // 时间都是不带毫秒的，需要自行乘以1000
  start_time: '1614542400',
  end_time: '1615838399',
  total_battle_times: 0,
  total_win_times: 0,
  max_floor: '0-0',
  reveal_rank: [],
  defeat_rank: [],
  damage_rank: [],
  take_damage_rank: [],
  normal_skill_rank: [],
  energy_skill_rank: [],
  floors: [],
  total_star: 0,
  is_unlock: true
}
```

</details>

---

_For communication and learning only._

**All game data & pictures from query:** &copy;miHoYo

**API endpoint:** Refer [Azure99/GenshinPlayerQuery](https://github.com/Azure99/GenshinPlayerQuery) (Apache-2.0 License)

> Copyright 2021 机智的小鱼君
>
> Licensed under the Apache License, Version 2.0 (the "License");<br>
> you may not use this file except in compliance with the License.<br>
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
