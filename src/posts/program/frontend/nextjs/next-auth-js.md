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

一般情况下，面对经常使用的库/组建通读一遍可以省去很多debug的时间。

官网的Get Start内容大致给我们介绍了一下内容：

```md
NextAuth.js 是用于Next.js应用程序的完整开源身份验证解决方案。

它从头开始设计，以支持 Next.js 和无服务器。

- 它旨在与任意 OAuth 服务配合使用，支持 OAuth 1.0、1.0A、2.0 和 OpenID Connect
- 对许多常用登录服务的内置支持
- 支持使用任何后端（Active Directory、LDAP 等）进行无状态身份验证
- 支持 JSON Web 令牌和 Sessions 会话
- 专为无服务器设计，但在任何地方运行（AWS Lambda、Docker、Heroku 等）

拥有自己的数据

NextAuth.js可以与数据库一起使用，也可以不与数据库一起使用。

- 一种开源解决方案，可让您保持对数据的控制
- 支持自带数据库 （BYOD），可与任何数据库一起使用
- 内置支持 MySQL、MariaDB、Postgres、SQL Server、MongoDB 和 SQLite
- 与来自流行托管服务提供商的数据库配合使用效果很好
- 也可以在没有数据库的情况下使用（例如 OAuth + JWT）
注意：电子邮件登录需要配置数据库以存储一次性验证令牌。

默认安全

- 促进使用无密码登录机制
- 默认情况下设计为安全，并鼓励采用最佳实践来保护用户数据
- 在 POST 路由上使用跨站点请求伪造令牌（登录、注销）
- 默认 Cookie 政策旨在为每个 Cookie 制定最严格的政策
- 启用 JSON Web 令牌后，默认情况下会使用 A256GCM 对它们进行加密 （JWE）
- 自动生成对称签名和加密密钥，方便开发人员
- 具有选项卡/窗口同步和 keepalive 消息功能，可支持短期会话
- 尝试实施 Open Web Application Security Project 发布的最新指南

高级选项允许您定义自己的例程，以控制允许登录的帐户、编码和解码 JSON Web 令牌，以及设置自定义 Cookie 安全策略和会话属性，以便您可以控制谁可以登录以及必须重新验证会话的频率。

etc...
```

文档中的内容非常庞杂，但属于可接受的范围内，我们需要什么就去阅读什么就OK。

大概有几个部分我们需要仔细阅读一下: `NextAuthOptions`、`Session`、`Provider`、`Database`、`Callbacks`部分，这些部分可以让我们使用起来更加得心应手。

### JWT Token配置

默认情况下是JWT来记录用户信息，但是我们需要额外配置一些信息来让我们的服务更易使用:

例如你可以覆盖原有的Session属性，让Session属性包含用户的id和role，这样我们就可以在组建中获取登录用户的id和role了，并且根据id和role来控制用户的权限和行为。

```ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // role: UserRole;
    } & DefaultSession["user"];
  }
}
```

配置jwt和callback:

```ts
callbacks: {
  async session({ session, token }) {
    // 将 token.user 的 id 添加到 session.user
    if (token?.user && token?.user.id) {
      session.user.id = token.user.id;
    }
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.user = {
        ...user,
        id: user.id,
      };
    }
    return token;
  },
},
session: {
  strategy: "jwt",
},
```

这样就可以在服务端获取到用户的id了，并且可以根据id来控制用户的权限和行为。

如果我们想使用Email登录，我推荐Resend服务，每个月免费3000封电子邮件，可以很方便的集成到NextAuth中，可以搭配React Email组件来实组件的发送。

Resend官网有针对NextJs接入的例子非常方便:

```ts
// .env
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="xxxx"
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="465"
EMAIL_FROM="email@$YOUR_DOMAIN.com"

// server/auth.ts
EmailProvider({
  server: {
    host: env.EMAIL_SERVER_HOST,
    port: env.EMAIL_SERVER_PORT,
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: env.EMAIL_FROM,
  // sendVerificationRequest # 还可以自己定义邮件内容 
}),
```

但是这样的话，email用户每次登录都没有对应的名称，我们可以覆盖prisma db原有的createUser方法，在创建用户时，将用户的name和email一起创建到数据库中,[解决方案](https://github.com/nextauthjs/next-auth/discussions/562#discussioncomment-6589689):


```ts
import { PrismaAdapter } from '@next-auth/prisma-adapter';

/** @return { import("next-auth/adapters").Adapter } */
export default function CustomPrismaAdapterForNextAuth(prisma) {
  const adapter = PrismaAdapter(prisma);

  adapter.createUser = async data => {
    const userExist = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (userExist) {
      return userExist;
    }

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name || data.email.split('@')[0],
        username: data.username || `${data.email.split('@')[0]}_${Math.random().toString(36).substring(7)}`,
        image:
          data.image || `https://www.gravatar.com/avatar/${Math.random().toString(36).substring(7)}?d=identicon&r=PG`,
        emailVerified: data.emailVerified
      }
    });
  };

  return adapter;
}

export const authOptions = {
  adapter: CustomPrismaAdapterForNextAuth(prisma),
  providers: [
...
```

### 接入Mixin Oauth

不仅仅是Mixin，其他Oauth也是类似的接入方式,在authOptions中添加provider:

```ts
providers: [
    {
      id: "mixin",
      name: "mixin",
      type: "oauth",
      style: {
        logo: "https://mixin.one/zh/img/favicon.png",
        bg: "#41a6f6",
        text: "#000000",
      },
      clientId: env.MIXIN_CLIENT_ID,
      clientSecret: env.MIXIN_CLIENT_SECRET,
      authorization: {
        url: "https://mixin.one/oauth/authorize",
        params: {
          scope: "PROFILE:READ",
          client_id: env.MIXIN_CLIENT_ID,
          response_type: "code",
        },
      },
      token: {
        url: "https://api.mixin.one/oauth/token",
        async request(context) {
          const response = await fetch("https://api.mixin.one/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: env.MIXIN_CLIENT_ID,
              client_secret: env.MIXIN_CLIENT_SECRET,
              code: context.params.code,
            }),
          }).then((resp) => resp.json());

          return {
            tokens: {
              access_token: response.data.access_token,
              scope: response.data.scope,
            },
          };
        },
      },
      userinfo: "https://api.mixin.one/me",
      profile(profile: any) {
        return {
          id: profile?.data.user_id,
          name: profile?.data.full_name,
          email: profile?.data.email,
          image: profile?.data.avatar_url,
        };
      },
    },
    ...// 其他provider/Github/Email
]
```

Mixin登录用户的所有信息都可以通过这个provider获取到，包括id、name、image等，注意Mixin用户没有Email。

基于角色的管理也比较重要，如果你的控制台需要角色去管理的话。

### 添加Session会话

你需要添加SessionProvider来存储Session信息，以便于客户端代码可以获取session信息。

于是你就可以保护你的API路由了，只允许登录用户访问。

```ts
// middleware中控制的不区分客户端/服务端组件
export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard"] }

//  client客户端组件
const {data: session, update} = useSession({ // 这里的update 可以重新获取session信息，比如用户修改了用户信息，则可以更新session信息
  required: true,
  onUnauthenticated() {
    redirect('/signin?callbackUrl=${your-page-url}')
  }
});

// 服务端组件

const session = getServerSession(authOptions);
if (!session) {
    redirect('/signin?callbackUrl=${your-page-url}')
}

// 如果你想保护API路由，指向让登录用户使用，使用方式和上面一样。 
```

### 基于角色的认证

[文档地址](https://authjs.dev/guides/role-based-access-control)

```ts
// middleware/config
export default withAuth({
  callbacks: {
    authorized: ({req, token}) => {
      if (req.nextUrl.pathname === '/admin') {
        return token?.role === 'admin';
      }
      return Boolean(token);
    }
  },
  function middleware() {} // if authorized  return true, else handle middleware
})

const config = {matcher: ["/dashboard", "/admin", "protected-route"]}
```

这里也是有点问题，一个已经登录的用户访问 /admin authorized返回 false,会重定向到sign in 界面，所以实际上在sign in 页面需要检测session 判断是否用户已经登录，如果已经登录则重定向到首页即可。或者直接在middleware中执行页面跳转。
