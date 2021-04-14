# GenshinKit 原神工具包

![](https://badgen.net/npm/v/genshin-kit) ![](https://badgen.net/npm/v/genshin-kit/next) ![](https://badgen.net/npm/types/genshin-kit) ![](https://badgen.net/npm/license/genshin-kit)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/context:javascript)

一个用于获取《原神》国服玩家数据的 API 封装库。An API wrapper for fetching player data of Genshin-Impact CN server.

完全使用 TypeScript 编写，API 返回值的全部 [typings](./src/types) 均已由作者手动扣出来，现代 IDE 自动显示代码提示，轻松调用无压力！

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

下面是 GenshinKit 的文档。

---

**主要方法**

## `GenshinKit` {class}

**GenshinKit** 实例。

返回：**GenshinKit**的应用实例。

<details>
<summary>构造示例</summary>

```js
const { GenshinKit } = require('genshin-kit')
const App = new GenshinKit()
```

</details>

## `App.loginWithToken(cookie: string): this`

使用米游社网站的 cookie 登录实例。

> 使用网页版米游社登录 <https://bbs.mihoyo.com/ys/>，然后在控制台输入 `document.cookie`，返回的结果就是 cookie，一般来说一个 cookie 可以使用一段时间，如果失效了就再次获取一遍。

> **⚠️ 注意 ⚠️**：请妥善保存您的 cookies。<br>绝对不要把你的 cookies 交给任何人！<br>绝对绝对不要把你的 cookies 交给任何人！！<br>绝对绝对绝对不要把你的 cookies 交给任何人！！！

<details>
<summary>使用示例</summary>

```js
App.loginWithToken(process.env.MHY_COOKIE)
```

</details>

## `App.getUserInfo(uid: number, noCache?: boolean): Promise<UserInfo>`

使用 UID 查询玩家的游戏基础信息。

返回：[UserInfo](./src/types/UserInfo.ts)

<details>
<summary>请求示例</summary>

```js
App.getUserInfo(100000001).then(console.log)
```

</details>

## `App.getAllCharacters(uid: number, noCache?: boolean): Promise<Character[]>`

通过 UID 获取玩家详细的角色信息。包括角色的装备情况。

返回：[Character](./src/types/Character.ts)

## `App.getSpiralAbyss(uid: number, type?: 1 | 2, noCache?: boolean): Promise<Abyss>`

根据 UID 获取“深境螺旋”信息。

`type` 1 代表当期，2 代表上一期

返回：[Abyss](./src/types/Abyss.ts)

快速查询の糖：`App.getCurrentAbyss(<uid:number>): Promise<Abyss>` `App.getPreviousAbyss(<uid:number>): Promise<Abyss>`

---

**辅助工具**

```js
const { util } = require('genshin-kit')
```

## `util.getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter(character: Character): number` 获取角色的命座数

好吧，其实用`util.activedConstellations`就行了，~~这里巨 TM 长的方法名是作者和朋友探讨这个方法该如何命名时的恶趣味。~~

返回指定角色的命座数量。

## `util.CharactersFilter(<data:object>)` {class} 角色筛选工具

一个角色筛选工具类。封装了一系列过滤角色信息的方法。

- `data` _getAllCharacters_ 返回的角色数据

返回：`Filter`类

<details>
<summary>使用示例</summary>

```js
const { CharactersFilter } = require('genshin-kit').util
App.getAllCharacters(100000001).then((data) => {
  const Filter = new CharactersFilter(data)
  // ...
}, console.error)
```

</details>

### `Filter.all(): Character[]`

获取特定玩家的全部角色列表。

### `Filter.id(<id:number>): Character | null`

获取特定玩家的指定 id 的角色信息。

### `Filter.name(<name:string>): Character | null`

获取特定玩家的指定名称的角色信息。

`name`：角色名称，必须是“简体中文”语言中的标准名称。

### `Filter.element(<element:string>): Character[]`

获取特定玩家的指定元素的角色信息。

`element`：可以是中文或者英文，例如`火`和`pyro`都是可以接受的名称。

### `Filter.rarity(<rarity:number | number[]>): Character[]`

获取特定玩家的指定稀有度的角色信息。

`rarity`：必须是数字或者数字组成的数组，例如`4`、`5`以及`[4, 5]`。

## `util.isValidCnUid(<uid:any>): boolean` 国服 uid 验证工具

判断输入值是否为合法的国服 uid。

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
