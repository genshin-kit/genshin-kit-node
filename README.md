# Genshin Kits for Node.js

一系列用于获取《原神》游戏相关资源的开发工具包。

A series of development kits for obtaining resources related to the Genshin Impact game.

## 任君挑选/Ecosystem

- **米游社查询/hoyolab query**
  - Package: [@genshin-kit/core](https://npmjs.com/package/@genshin-kit/core)
  - Source code: [packages/core](./packages/core)
- **抽卡模拟/gacha simulate**
  - Package: [@genshin-kit/gacha](https://npmjs.com/package/@genshin-kit/gacha)
  - Source code: [packages/gacha](./packages/gacha)

## 特色功能/Features

### 开箱即用/Out of box

安装/installation

```sh
yarn install @genshin-kit/core
```

使用/usage

```ts
import { GenshinKit } from '@genshin-kit/core'
const genshin = new GenshinKit()
// ...
```

☆ P.S. 各包具体使用文档请在对应文件夹下查看/Please view the specific documents in the corresponding folder

### 丰富的 API，以及 types 支持/Full TypeScript supported

完全使用 TypeScript 编写，现代 IDE 自动代码提示，轻松使用无压力！

## 项目推荐/Good projects

这些项目使用 genshin-kit 开发/These projects were developed using Genshin kit:

| 名称/name          | 仓库/repo                                                                           | 说明/info                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Genshin for koishi | [koishijs/koishi-plugin-genshin](https://github.com/koishijs/koishi-plugin-genshin) | 为聊天机器人框架[koishi](https://github.com/koishijs/koishi)设计的查询展示原神国服玩家数据以及抽卡模拟的插件。支持玩家卡片等功能。 |

想要分享您的作品吗？点击右上角的小铅笔！Want to share your work? Click the small pencil in the upper right corner!

## 贡献指南/Contributing guide

[贡献指南/Contributing guide](.github/contributing.md)

## 加入我们/Join us!

<https://github.com/genshin-kit/genshin-kit/issues/28>

---

_For communication and learning only._

**All game data & pictures from query:** &copy;miHoYo

> Copyright 2021 Genshin-Kit
>
> Licensed under the Apache License, Version 2.0 (the "License");<br>
> you may not use this file except in compliance with the License.<br>
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
