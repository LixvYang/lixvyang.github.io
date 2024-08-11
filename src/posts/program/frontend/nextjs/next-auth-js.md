---
icon: logos:nextjs
title: NextAuth 学习笔记
timeline: true
date: 2024-08-11
isOriginal: true
banner: https://image.betxin.top/file/4e68e9e0142df4f7d4675.jpg
cover: https://image.betxin.top/file/4e68e9e0142df4f7d4675.jpg
category:
  - frontend
  - nextjs
tag:
  - nextjs
  - next-auth
  - authentication
---

NextJs是目前最流行的 FullStack FrameWork 之一，它提供了一套完整的开发体验，包括服务端渲染、API路由、数据管理、路由管理等。

于是在 NextJs 之上就会有许多插件系统帮助我们实现各种功能，其中就包括 NextAuth。

NextAuth 是 NextJs 的一个插件，它可以帮助你实现用户认证、授权、管理等功能。

本文将介绍 NextAuth 的基本用法，以及如何集成到 NextJs 项目中。

<!-- more -->

# NextAuth 学习笔记

本文是我在使用NextAuth过程中,尝试使用 JWT Token 使用方式, 尝试使用 Prisma ORM 框架, 尝试使用 [Github](https://github.com/nextauthjs/next-auth)/[Mixin](https://mixin.one/)第三方登录/Email(Resent)后总结而来的学习笔记。

使用[T3-App](https://create.t3.gg/)快速搭建NextJs项目, 简单来说T3-App是一个NextJs的脚手架，比如之前使用NextJs的方式是安装了NextJs，接着需要安装`prisma`、`next-auth`、`dotenv`、`TailwindCSS`等等依赖服务，于是T3-App可以帮助你节省这些时间，T3-App会自动帮你安装这些依赖，并且配置好项目。

所以我们后续使用T3-App快速搭建项目后，将着重点放在NextAuth的使用上。

## 快速搭建T3-App项目

根据t3-app的文档，我们可以快速搭建一个NextJs项目，这里我们使用T3-App快速搭建项目。

```bash
pnpm create t3-app@latest
```

```bash
What will your project be called?
nextauth-test

Will you be using TypeScript or JavaScript?
TypeScript

Will you be using Tailwind CSS for styling?
Yes

Would you like to use tRPC?
Yes

What authentication provider would you like to use?
NextAuth.js

What database ORM would you like to use?
Prisma

Would you like to use Next.js App Router?
Yes

What database provider would you like to use?
SQLite (LibSQL) # 数据库这里开发测试时你可以随意使用

Should we initialize a Git repository and stage the changes?
Yes

Should we run 'pnpm install' for you?
Yes

What import alias would you like to use?
~/
```

接着你进入到文档后发现`pnpm dev`是运行不起来的，原因是默认NextAuth的第三方登录默认使用的是Discard登录，所以你需要去Discard Developer Portal申请一个OAuth2.0的Client ID和Client Secret，然后在项目根目录下创建`.env`文件，添加以下内容：

```bash
# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

但是相信开发人员都是有自己的Github账号的，所以事实上我们可以直接使用Github登录，所以我们需要在项目根目录下创建`.env`文件，添加以下内容：

```bash
# Next Auth Github Provider
GITHUB_CLIENT_ID="xxx"
GITHUB_CLIENT_SECRET="xxx"
```

你需要去Github `Settings -> Developer settings -> OAuth Apps`申请一个Github OAuth App的Client ID和Client Secret。

注意填入 App 的Homepage URL 和 Callback URL分别为：

```bash
Homepage URL: http://localhost:3000
Callback URL: http://localhost:3000/api/auth/callback/github
```

端口是NextJS服务的端口默认是3000，如果你使用其他端口，请修改对应的端口。

接着将.env中的需求修改的其他部分进行更新，比如:

```bash
# 使用openssl rand -base64 32 生成一个随机的密钥
NEXTAUTH_SECRET="xxx"
NEXTAUTH_URL="http://localhost:3000" # 这里的端口同上修改
```

代码里对应的Discard登录的配置一律改为Github登录的配置，其余部分保持不变。

`src/env.js`中的DISCARD所有字段都改为GITHUB，然后在`src/server/auth.ts`文件中，将`providers`字段中的`discord`改为`github`，然后将`client_id`和`client_secret`字段中的`DISCORD_CLIENT_ID`和`DISCORD_CLIENT_SECRET`改为`GITHUB_CLIENT_ID`和`GITHUB_CLIENT_SECRET`。

```bash
# src/server/auth.ts
# 后续我们将扩展使用Mixin登录和Email(Resent)进行登录
import GithubProvider from "next-auth/providers/github";

providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    })
]
```

接下来如无意外，从浏览器进入`http://localhost:3000`就可以点击SignIn按钮使用Github进行登录了。

::: warning 
如果你遇到了额外问题，大概率是你的配置不对或者哪个地方代码没有改，用错误信息去问AI就可以解决了。
:::

Amazing！我们已经成功搭建了一个NextJs项目，并且集成了NextAuth，并且使用了Github登录。

## 通读NextAuth文档

接下来我们需要直接去读NextAuth文档，详细探索一下NextAuth的功能，深度探讨为什么只改了Providers字段就能使用Github登录。

NextAuth默认是使用Session存储用户的登录信息，这样的登录信息需要我们在自己的数据库中存储一份，并不适合大型应用使用，后续我们将改为JWT Token的存储方式(数据库不存Token)。

接着我们将自己写一个Provider，比如我们想实现Mixin登录，我们需要去Mixin Developer Portal申请一个OAuth2.0的Client ID和Client Secret，接着自己写一个Provider就可以使用了。

### 配置信息

### 路由

### 数据库

## 为用户分配Role

## 在 NextJS 组件中鉴权

### 客户端

### 服务端

## 最佳实践
