# GenshinKit

[简体中文](./../README.md) | [English](./README.en.md)

![](https://badgen.net/npm/v/genshin-kit) ![](https://badgen.net/npm/v/genshin-kit/next) ![](https://badgen.net/npm/types/genshin-kit) ![](https://badgen.net/npm/license/genshin-kit)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Dragon-Fish/genshin-kit.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Dragon-Fish/genshin-kit/context:javascript)

An API wrapper for fetching player data of Genshin Impact from any servers.

## Installation

```bash
# Via yarn
yarn add genshin-kit
# Or via npm
npm install genshin-kit
```

## Usage

You can find some sample code snippets [here](./../sample).

Below is the documentation of GenshinKit.

---

**Main methods**

## `GenshinKit` {Class}

Instances of **GenshinKit**.

Returns: application instances of **GenshinKit**.

<details>
<summary>Constructor Example</summary>

```js
const { GenshinKit } = require('genshin-kit')
const App = new GenshinKit()
```

</details>

## `App.loginWithToken(cookie: string): this`

Use cookies of hoyolab site to login to the instance.

> **⚠️ Caution ⚠️**：Please keep your cookies safe.<br>NEVER SHARE YOUR COOKIES WITH ANYONE ELSE!

**How to obtain**: login to hoyolab <https://www.hoyolab.com/genshin/>, then input `document.cookie` in the browser console, it returns the cookies you need. Usually the cookies you obtained can be used for some time; if it fails, try to obtain another one.

<details>
<summary>Usage Example</summary>

```js
App.loginWithToken(process.env.MHY_COOKIE)
```

</details>

## `App.setServerType(type: 'cn' | 'os'): this`

Set the server type will be queried. Default is `cn`, if you need to query Asia, Europe, US or HK-MC-TW server data, set this to `os`.

- `cn` Chinese servers (Official, Bilibili)
- `os` Oversea servers (Asia, Europe, US, HK-MC-TW)

## `App.getUserInfo(uid: number, noCache?: boolean): Promise<UserInfo>`

Use UID to query player's basic information.

Returns: [UserInfo](./../src/types/UserInfo.ts)

<details>
<summary>Request Example</summary>

```js
App.getUserInfo(100000001).then(console.log)
```

</details>

## `App.getAllCharacters(uid: number, noCache?: boolean): Promise<Character[]>`

Use UID to query player's detailed character information, including equipment.

Returns: [Character[]](./../src/types/Character.ts)

## `App.getSpiralAbyss(uid: number, type?: 1 | 2, noCache?: boolean): Promise<Abyss>`

Use UID to query Spiral Abyss information.

`type`: 1 means current Lunar Phase, 2 means previous Lunar Phase.

Returns: [Abyss](./../src/types/Abyss.ts)

Quick query: `App.getCurrentAbyss(<uid:number>): Promise<Abyss>` `App.getPreviousAbyss(<uid:number>): Promise<Abyss>`

---

**Auxiliary utilities**

```js
const { util } = require('genshin-kit')
```

## `util.getTheActivedConstellationsNumberOfSpecifiedGenshinImpactCharacter(character: Character): number` get activated constellation number

Nah, just use `util.activedConstellations` should be fine; this f**king long name originated when the author was discussing with his friends how to name this method.

Returns the activated constellation number of specified Genshin Impact character. (Sorry for copy paste this name again :)

## `util.CharactersFilter(characters: Character[])` {class} character filter tool

A class encapsulating a set of methods for filtering character information.

Returns: `Filter` class

<details>
<summary>Usage Example</summary>

```js
const { CharactersFilter } = require('genshin-kit').util
App.getAllCharacters(100000001).then((data) => {
  const Filter = new CharactersFilter(data)
  // ...
}, console.error)
```

</details>

### `Filter.all(): Character[]`

Get all characters for a specified player.

### `Filter.id(id: number): Character | null`

Get character information with specified id for a specified player.

### `Filter.name(name: string): Character | null`

Get character information with specified name for a specified player.

`name`: character name, currently only support name in Simplified Chinese.

### `Filter.element(element: string): Character[]`

Get character information with specified element for a specified player.

`element`: can be in English or Simplified Chinese, e.g. `pyro` or `火`.

### `Filter.rarity(rarity: number | number[]): Character[]`

Get character information with specified rarity for a specified player.

`rarity`: should be a number or a number array, e.g. `4`, `5` or `[4, 5]`.

## `util.isValidOsUid(uid: any): boolean`  uid validation tool

Check whether input is a valid uid.

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
