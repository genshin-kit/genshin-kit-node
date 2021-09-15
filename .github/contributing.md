# 贡献指南

`genshin-kit` 是一个 monorepo，里面包含了各种各样的包与插件。作者在写了一段时间以后才意识到自己挖了一个大坑。我们非常鼓励您亲自动手，参与到 genshin-kit 及其生态的开发中。同时，基于您对本仓库的贡献，我们也会在适当的时机邀请您成为本仓库的 collaborator。

## 在你贡献之前需要知道

### 我发现了一个 BUG！

首先非常感谢你。不过在提交用于修复 BUG 的 pr 前，你应该先提交一个 issue，用于说明你遇到的问题，然后在 pr 的说明中，简单描述你修复的方法。

### 我能给已有的库增加新特性吗？

当然可以。不过在此之前建议你发一个 feature request 或者在官方群中与作者交流意见。这是因为 genshin-kit 几乎全是工具包，它们一般会被很多其他的项目使用，为了防止依赖此包的其他包全部炸掉，请多加沟通。

## 如何发送 Pull Request

### 基本流程

1. fork 这个仓库
2. 检出 dev 分支（注意不是 master）
3. 在 HEAD 处创建一个自己的分支，比如 my-feature
4. 进行你的开发
5. 创建 pull request 到 dev 分支

### 额外说明

1. src 中应该使用 ts 格式编写而不是 js，在提交前您应该使用 yarn lint 进行质量检查；如果你不熟悉 TypeScript，可以先发 draft PR 并在其中说明缘由
2. 请不要修改`package.json`中的版本号，我们的发版脚本会自动修改版本号
3. 一般情况下，我们会采取 squash merge —— 但如果你的 commit 写的特别漂亮，我们会考虑直接 merge

### 关于 commit Message 规范

我们采用“约定式提交”规范。如果你使用的是 vscode，推荐安装`vivaxy.vscode-conventional-commits`插件。

简单来说：

1. 标题一定要是纯英文（当然可以包含适当的 emoji）
2. 要有一个合适的前缀，即你的 commit 标题应当满足下列格式：
   - fix(xxx): message
   - feat(xxx): message
   - test(xxx): message
   - build: message
   - chore: message
   - docs: message
3. 上面的 xxx 应该是修改中对应的包名，例如 core

注：merge commit 等自动产生的 commit message 不受限制

## 脚本说明

TBC

## 成为 Collaborator

如果你为本仓库做出了许多贡献，你账号绑定的邮箱可能会收到一封带有本仓库神秘链接的电子邮件，你可以通过其中的按钮成为本仓库的正式开发者！

之后，你将可以：

- 审核其他人的 pull request
- 修改代码前不必再 fork，可以直接在本仓库进行操作
- ~~在互动讨论中有一个帅气的 collaborator 标识~~

### 各分支功能

主要

- `master` 被认为是稳定的或已发行的代码
- `dev` 用于开发的基准分支

其他

- `dependabot/*` 由 GitHub dependabot 自动推送
