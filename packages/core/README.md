# GenshinKit Core 原神开发工具核心包

[简体中文](./README.md) | [English](./doc/README.en.md)

![](https://badgen.net/npm/v/genshin-kit) ![](https://badgen.net/npm/v/genshin-kit/next) ![](https://badgen.net/npm/types/genshin-kit) ![](https://badgen.net/npm/license/genshin-kit)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/context:javascript)

一个用于获取《原神》任意服务器玩家数据的 API 封装库。

完全使用 TypeScript 编写，API 返回值的全部 [typings](./src/types) 均已由作者手动扣出来，现代 IDE 自动显示代码提示，轻松调用无压力！

## 安装

```bash
# Via yarn
yarn add @genshin-kit/core
# Or via npm
npm install @genshin-kit/core
```

## 使用

**一些完整的示例代码可以[点击这里](./sample)查看。**

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
const app = new GenshinKit()
```

</details>

### `cookie: string`

修改此项来配置米游社网站的 cookie。它形如 `foo=bar; baz=qux`。

> **⚠️ 注意 ⚠️**：请妥善保存您的 cookies。<br>绝对不要把你的 cookies 交给任何人！<br>绝对绝对不要把你的 cookies 交给任何人！！<br>绝对绝对绝对不要把你的 cookies 交给任何人！！！

**国服获取方法**：使用网页版米游社登录 <https://bbs.mihoyo.com/ys/>，在控制台输入 `document.cookie`，返回的结果就是 cookie，一般来说只要不修改账号密码等敏感信息 cookie 就不会过期，如果过期了就再获取一遍。

<details>
<summary>使用示例</summary>

```js
App.cookie = process.env.HOYOLAB_COOKIE
```

</details>

### `serverType: 'cn' | 'os'`

设置被查询的 UID 所在的服务器分区。若不设置，预设查询`cn`（国服）数据。

- `cn` 中国服（天空岛、世界树）
- `os` 国际服

### `serverLocale: string`

**仅限国际服**

设置返回结果的语言。若不设置，预设查询`zh-CN`（简体中文）数据。支持的语言见 `AppServerLocale`。

### `selfBindingRoles(): Promise<BindingGameRoles>`

获取当前配置的账号的游戏角色信息。

### `userInfo(uid: number, noCache?: boolean): Promise<UserInfo>`

使用 UID 查询玩家的游戏基础信息。

返回：[UserInfo](./src/types/UserInfo.ts)

<details>
<summary>请求示例</summary>

```js
App.userInfo(100000001).then(console.log)
```

</details>

### `allCharacters(uid: number, noCache?: boolean): Promise<Character[]>`

通过 UID 获取玩家详细的角色信息。包括角色的装备情况。

返回：[Character[]](./src/types/Character.ts)

### `spiralAbyss(uid: number, type?: 1 | 2, noCache?: boolean): Promise<Abyss>`

根据 UID 获取“深境螺旋”信息。

`type` 1 代表当期，2 代表上一期

返回：[Abyss](./src/types/Abyss.ts)

快速查询の糖：`App.currentAbyss(<uid:number>): Promise<Abyss>` `App.previousAbyss(<uid:number>): Promise<Abyss>`

### `activities(uid: number): Promise<Activities>`

通过 UID 获取玩家的“风来人”等限时 raid 战绩。

返回：[Activities](./src/types/Activities.ts)

---

**辅助工具**

```js
const { util } = require('genshin-kit')
```

## `util.getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter(character: Character): number` 获取角色的命座数

好吧，其实用`util.activedConstellations`就行了，~~这里巨 TM 长的方法名是作者和朋友探讨这个方法该如何命名时的恶趣味。~~

返回指定角色的命座数量。

## `util.CharactersFilter(characters: Character[])` {class} 角色筛选工具

一个角色筛选工具类。封装了一系列过滤角色信息的方法。

返回：`CharactersFilter`实例

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

### `all(): Character[]`

获取特定玩家的全部角色列表。

### `id(id: number): Character | null`

获取特定玩家的指定 id 的角色信息。

### `name(name: string): Character | null`

获取特定玩家的指定名称的角色信息。

`name`：角色名称，建议使用`serverLocale`语言中的标准名称。但是支持部分别称，详见`CharacterNickname`。

### `element(element: string): Character[]`

获取特定玩家的指定元素的角色信息。

`element`：可以是中文或者英文，例如`火`和`pyro`都是可以接受的名称。

### `rarity(rarity: number | number[]): Character[]`

获取特定玩家的指定稀有度的角色信息。

`rarity`：必须是数字或者数字组成的数组，例如`4`、`5`以及`[4, 5]`。

### `nicknameFilter: CharacterNickname`

暴露过滤器使用的`CharacterNickname`实例。

## `util.CharacterNickname` {class} 角色昵称工具

返回：`CharacterNickname`实例

### `setNicknames(id: number, nicknames: string[]): this`

通过角色 ID 添加一批昵称。

### `getIdByNickname(keyword: string): number | undefined`

通过昵称获取角色 ID，可能不存在。

### `getNicknamesById(id: number): string[] | undefined`

通过角色 ID 获取可能的昵称列表，可能不存在。

## `util.isValidCnUid(uid: any): boolean` 国服 uid 验证工具

判断输入值是否为合法的国服 uid。

---

_For communication and learning only._

**All game data & pictures from query:** &copy;miHoYo

**API endpoint:** Refer [Azure99/GenshinPlayerQuery](https://github.com/Azure99/GenshinPlayerQuery) (Apache-2.0 License)

> Copyright 2021 Genshin-Kit
>
> Licensed under the Apache License, Version 2.0 (the "License");<br>
> you may not use this file except in compliance with the License.<br>
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
