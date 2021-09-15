# Genshin Kits for Node.js

一系列用于获取《原神》游戏相关资源的开发工具包。

## 任君挑选

- **米游社(hoyolab)查询**
  - 包名：[@genshin-kit/core](https://npmjs.com/package/@genshin-kit/core)
  - 源码：[packages/core](./packages/core)
- **抽卡模拟**
  - 包名：[@genshin-kit/gacha](https://npmjs.com/package/@genshin-kit/gacha)
  - 源码：[packages/gacha](./packages/gacha)

## 特色功能

### 开箱即用

安装

```sh
yarn install @genshin-kit/core
```

使用

```ts
import { GenshinKit } from '@genshin-kit/core'
const genshin = new GenshinKit()
// ...
```

☆ 注：各包具体使用文档请在对应文件夹下查看。

### 丰富的 API，以及 types 支持

完全使用 TypeScript 编写，现代 IDE 自动代码提示，轻松使用无压力！

## 项目推荐

这些项目基于 genshin-kit 开发：

| 名称               | 仓库                                                                                | 说明                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Genshin for koishi | [koishijs/koishi-plugin-genshin](https://github.com/koishijs/koishi-plugin-genshin) | 为聊天机器人框架[koishi](https://github.com/koishijs/koishi)设计的查询展示原神国服玩家数据以及抽卡模拟的插件。支持玩家卡片等功能。 |

想要分享您的作品吗？点击右上角的小铅笔！

## 开发指南

详情请查看：[贡献指南](.github/contributing.md)

## 加入我们！

详情请查看：<https://github.com/genshin-kit/genshin-kit/issues/28>

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
