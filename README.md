# Genshin Kit

An API wrapper for fetching player data of Genshin-Impact CN server

## 安装/Installation

```bash
yarn add genshin-kit
# Or npm install genshin-kit
```

## 使用/Usage

> Because it can only fetch data from CN servers at present, so I've written the docs in Chinese.

### genshinKit `{Function}`

**genshinKit** 实例。

返回：**genshinKit**的应用实例。

```js
const { genshinKit } = require('genshin-kit')
const App = new genshinKit()
```

### App.loginWithToken(<cookie:string>) `{Function}`

使用米游社网站的 cookie 登录实例。

> 使用网页版米游社登录 <https://bbs.mihoyo.com/ys/>，然后在控制台输入 `document.cookies`，返回的结果就是 cookies，一般来说一个 cookie 可以使用一段时间，如果失效了就再次获取一遍。
> 注意：请妥善保存您的 cookies。绝对不要把你的 cookies 交给任何人！绝对绝对不要把你的 cookies 交给任何人！！绝对绝对绝对不要把你的 cookies 交给任何人！！！

返回：`null`

```js
// 登录示例
App.loginWithToken('')
```

### App.getUserInfo(<uid:number>) `{Function}`

使用 UID 查询玩家的游戏信息。

返回：`Promise`

```js
// 请求示例
genshin.getUserInfo(100000001).then(console.log)
```

<details>
<summary>返回示例</summary>

```js
// Return data
{
  retcode: 0,
  message: 'OK',
  data: {
    role: null,
    // 玩家拥有的角色
    avatars: [
      {
        "id": 10000007,
        "image": "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_PlayerGirl.png",
        "name": "旅行者",
        "element": "Geo",
        "fetter": 0,
        "level": 1,
        "rarity": 5
      },
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
        "id": 1,
        "level": 8, // 声望等级
        "exploration_percentage": 1000, // 探索度
        "icon": "https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Mengde.png",
        "name": "蒙德"
      },
      {
        "id": 2,
        "level": 8,
        "exploration_percentage": 1000,
        "icon": "https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Liyue.png",
        "name": "璃月"
      }
    ],
    // 世界探索
    world_explorations: [
      {
        "level": 1, // 声望等级
        "exploration_percentage": 1000, // 探索度
        "icon": "https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Dragonspine.png",
        "name": "龙脊雪山",
        "type": "Offering"
      },
      {
        "level": 1,
        "exploration_percentage": 1000,
        "icon": "https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Mengde.png",
        "name": "蒙德",
        "type": "Reputation"
      },
      {
        "level": 1,
        "exploration_percentage": 1000,
        "icon": "https://upload-bbs.mihoyo.com/game_record/genshin/city_icon/UI_ChapterIcon_Liyue.png",
        "name": "璃月",
        "type": "Reputation"
      }
    ]
  }
}
```

</details>
