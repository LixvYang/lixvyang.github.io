import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c,b as s,f as u,d as a,a as e,e as p}from"./app-eb0ff571.js";const r={},d={href:"https://github.com/nextauthjs/next-auth",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mixin.one/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://create.t3.gg/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/nextauthjs/next-auth/discussions/562#discussioncomment-6589689",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/DakaiGroup/nextjs-nextauth-metamask/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.quicknode.com/guides/solana-development/dapps/how-to-authenticate-users-with-a-solana-wallet#overview",target:"_blank",rel:"noopener noreferrer"},g={href:"https://authjs.dev/guides/role-based-access-control",target:"_blank",rel:"noopener noreferrer"};function x(f,n){const t=i("ExternalLinkIcon");return l(),c("div",null,[n[22]||(n[22]=s("p",null,"NextJs是目前最流行的 FullStack FrameWork 之一，它提供了一套完整的开发体验，包括服务端渲染、API路由、数据管理、路由管理等。",-1)),n[23]||(n[23]=s("p",null,"于是在 NextJs 之上就会有许多插件系统帮助我们实现各种功能，其中就包括 NextAuth。",-1)),n[24]||(n[24]=s("p",null,"NextAuth 是 NextJs 的一个插件，它可以帮助你实现用户认证、授权、管理等功能。",-1)),n[25]||(n[25]=s("p",null,"本文将介绍 NextAuth 的基本用法，以及如何集成到 NextJs 项目中。",-1)),u(" more "),n[26]||(n[26]=s("h1",{id:"nextauth-学习笔记",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#nextauth-学习笔记","aria-hidden":"true"},"#"),a(" NextAuth 学习笔记")],-1)),s("p",null,[n[2]||(n[2]=a("本文是我在使用NextAuth过程中,尝试使用 JWT Token 使用方式, 尝试使用 Prisma ORM 框架, 尝试使用 ")),s("a",d,[n[0]||(n[0]=a("Github")),e(t)]),n[3]||(n[3]=a("/")),s("a",k,[n[1]||(n[1]=a("Mixin")),e(t)]),n[4]||(n[4]=a("第三方登录/Email(Resent)后总结而来的学习笔记。"))]),s("p",null,[n[6]||(n[6]=a("使用")),s("a",v,[n[5]||(n[5]=a("T3-App")),e(t)]),n[7]||(n[7]=a("快速搭建NextJs项目, 简单来说T3-App是一个NextJs的脚手架，比如之前使用NextJs的方式是安装了NextJs，接着需要安装")),n[8]||(n[8]=s("code",null,"prisma",-1)),n[9]||(n[9]=a("、")),n[10]||(n[10]=s("code",null,"next-auth",-1)),n[11]||(n[11]=a("、")),n[12]||(n[12]=s("code",null,"dotenv",-1)),n[13]||(n[13]=a("、")),n[14]||(n[14]=s("code",null,"TailwindCSS",-1)),n[15]||(n[15]=a("等等依赖服务，于是T3-App可以帮助你节省这些时间，T3-App会自动帮你安装这些依赖，并且配置好项目。"))]),n[27]||(n[27]=p(`<p>所以我们后续使用T3-App快速搭建项目后，将着重点放在NextAuth的使用上。</p><h2 id="快速搭建t3-app项目" tabindex="-1"><a class="header-anchor" href="#快速搭建t3-app项目" aria-hidden="true">#</a> 快速搭建T3-App项目</h2><p>根据t3-app的文档，我们可以快速搭建一个NextJs项目，这里我们使用T3-App快速搭建项目。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> create t3-app@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>What will your project be called?
nextauth-test

Will you be using TypeScript or JavaScript?
TypeScript

Will you be using Tailwind CSS <span class="token keyword">for</span> styling?
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
SQLite <span class="token punctuation">(</span>LibSQL<span class="token punctuation">)</span> <span class="token comment"># 数据库这里开发测试时你可以随意使用</span>

Should we initialize a Git repository and stage the changes?
Yes

Should we run <span class="token string">&#39;pnpm install&#39;</span> <span class="token keyword">for</span> you?
Yes

What <span class="token function">import</span> <span class="token builtin class-name">alias</span> would you like to use?
~/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着你进入到文档后发现<code>pnpm dev</code>是运行不起来的，原因是默认NextAuth的第三方登录默认使用的是Discard登录，所以你需要去Discard Developer Portal申请一个OAuth2.0的Client ID和Client Secret，然后在项目根目录下创建<code>.env</code>文件，添加以下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Next Auth Discord Provider</span>
<span class="token assign-left variable">DISCORD_CLIENT_ID</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">DISCORD_CLIENT_SECRET</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是相信开发人员都是有自己的Github账号的，所以事实上我们可以直接使用Github登录，所以我们需要在项目根目录下创建<code>.env</code>文件，添加以下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Next Auth Github Provider</span>
<span class="token assign-left variable">GITHUB_CLIENT_ID</span><span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span>
<span class="token assign-left variable">GITHUB_CLIENT_SECRET</span><span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你需要去Github <code>Settings -&gt; Developer settings -&gt; OAuth Apps</code>申请一个Github OAuth App的Client ID和Client Secret。</p><p>注意填入 App 的Homepage URL 和 Callback URL分别为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Homepage URL: http://localhost:3000
Callback URL: http://localhost:3000/api/auth/callback/github
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>端口是NextJS服务的端口默认是3000，如果你使用其他端口，请修改对应的端口。</p><p>接着将.env中的需求修改的其他部分进行更新，比如:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用openssl rand -base64 32 生成一个随机的密钥</span>
<span class="token assign-left variable">NEXTAUTH_SECRET</span><span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span>
<span class="token assign-left variable">NEXTAUTH_URL</span><span class="token operator">=</span><span class="token string">&quot;http://localhost:3000&quot;</span> <span class="token comment"># 这里的端口同上修改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码里对应的Discard登录的配置一律改为Github登录的配置，其余部分保持不变。</p><p><code>src/env.js</code>中的DISCARD所有字段都改为GITHUB，然后在<code>src/server/auth.ts</code>文件中，将<code>providers</code>字段中的<code>discord</code>改为<code>github</code>，然后将<code>client_id</code>和<code>client_secret</code>字段中的<code>DISCORD_CLIENT_ID</code>和<code>DISCORD_CLIENT_SECRET</code>改为<code>GITHUB_CLIENT_ID</code>和<code>GITHUB_CLIENT_SECRET</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># src/server/auth.ts</span>
<span class="token comment"># 后续我们将扩展使用Mixin登录和Email(Resent)进行登录</span>
<span class="token function">import</span> GithubProvider from <span class="token string">&quot;next-auth/providers/github&quot;</span><span class="token punctuation">;</span>

providers: <span class="token punctuation">[</span>
    GithubProvider<span class="token punctuation">(</span><span class="token punctuation">{</span>
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来如无意外，从浏览器进入<code>http://localhost:3000</code>就可以点击SignIn按钮使用Github进行登录了。</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>如果你遇到了额外问题，大概率是你的配置不对或者哪个地方代码没有改，用错误信息去问AI就可以解决了。</p></div><p>Amazing！我们已经成功搭建了一个NextJs项目，并且集成了NextAuth，并且使用了Github登录。</p><h2 id="通读nextauth文档" tabindex="-1"><a class="header-anchor" href="#通读nextauth文档" aria-hidden="true">#</a> 通读NextAuth文档</h2><p>一般情况下，面对经常使用的库/组建通读一遍可以省去很多debug的时间。</p><p>官网的Get Start内容大致给我们介绍了一下内容：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>NextAuth.js 是用于Next.js应用程序的完整开源身份验证解决方案。

它从头开始设计，以支持 Next.js 和无服务器。

<span class="token list punctuation">-</span> 它旨在与任意 OAuth 服务配合使用，支持 OAuth 1.0、1.0A、2.0 和 OpenID Connect
<span class="token list punctuation">-</span> 对许多常用登录服务的内置支持
<span class="token list punctuation">-</span> 支持使用任何后端（Active Directory、LDAP 等）进行无状态身份验证
<span class="token list punctuation">-</span> 支持 JSON Web 令牌和 Sessions 会话
<span class="token list punctuation">-</span> 专为无服务器设计，但在任何地方运行（AWS Lambda、Docker、Heroku 等）

拥有自己的数据

NextAuth.js可以与数据库一起使用，也可以不与数据库一起使用。

<span class="token list punctuation">-</span> 一种开源解决方案，可让您保持对数据的控制
<span class="token list punctuation">-</span> 支持自带数据库 （BYOD），可与任何数据库一起使用
<span class="token list punctuation">-</span> 内置支持 MySQL、MariaDB、Postgres、SQL Server、MongoDB 和 SQLite
<span class="token list punctuation">-</span> 与来自流行托管服务提供商的数据库配合使用效果很好
<span class="token list punctuation">-</span> 也可以在没有数据库的情况下使用（例如 OAuth + JWT）
注意：电子邮件登录需要配置数据库以存储一次性验证令牌。

默认安全

<span class="token list punctuation">-</span> 促进使用无密码登录机制
<span class="token list punctuation">-</span> 默认情况下设计为安全，并鼓励采用最佳实践来保护用户数据
<span class="token list punctuation">-</span> 在 POST 路由上使用跨站点请求伪造令牌（登录、注销）
<span class="token list punctuation">-</span> 默认 Cookie 政策旨在为每个 Cookie 制定最严格的政策
<span class="token list punctuation">-</span> 启用 JSON Web 令牌后，默认情况下会使用 A256GCM 对它们进行加密 （JWE）
<span class="token list punctuation">-</span> 自动生成对称签名和加密密钥，方便开发人员
<span class="token list punctuation">-</span> 具有选项卡/窗口同步和 keepalive 消息功能，可支持短期会话
<span class="token list punctuation">-</span> 尝试实施 Open Web Application Security Project 发布的最新指南

高级选项允许您定义自己的例程，以控制允许登录的帐户、编码和解码 JSON Web 令牌，以及设置自定义 Cookie 安全策略和会话属性，以便您可以控制谁可以登录以及必须重新验证会话的频率。

etc...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档中的内容非常庞杂，但属于可接受的范围内，我们需要什么就去阅读什么就OK。</p><p>大概有几个部分我们需要仔细阅读一下: <code>NextAuthOptions</code>、<code>Session</code>、<code>Provider</code>、<code>Database</code>、<code>Callbacks</code>部分，这些部分可以让我们使用起来更加得心应手。</p><h3 id="jwt-token配置" tabindex="-1"><a class="header-anchor" href="#jwt-token配置" aria-hidden="true">#</a> JWT Token配置</h3><p>默认情况下是JWT来记录用户信息，但是我们需要额外配置一些信息来让我们的服务更易使用:</p><p>例如你可以覆盖原有的Session属性，让Session属性包含用户的id和role，这样我们就可以在组建中获取登录用户的id和role了，并且根据id和role来控制用户的权限和行为。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&quot;next-auth&quot;</span> <span class="token punctuation">{</span>
  <span class="token keyword">interface</span> <span class="token class-name">Session</span> <span class="token punctuation">{</span>
    user<span class="token operator">:</span> <span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
      <span class="token comment">// role: UserRole;</span>
    <span class="token punctuation">}</span> <span class="token operator">&amp;</span> DefaultSession<span class="token punctuation">[</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置jwt和callback:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>callbacks<span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">{</span> session<span class="token punctuation">,</span> token <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将 token.user 的 id 添加到 session.user</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token operator">?.</span>user <span class="token operator">&amp;&amp;</span> token<span class="token operator">?.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      session<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id <span class="token operator">=</span> token<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> session<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">jwt</span><span class="token punctuation">(</span><span class="token punctuation">{</span> token<span class="token punctuation">,</span> user <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      token<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>user<span class="token punctuation">,</span>
        id<span class="token operator">:</span> user<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> token<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
session<span class="token operator">:</span> <span class="token punctuation">{</span>
  strategy<span class="token operator">:</span> <span class="token string">&quot;jwt&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就可以在服务端获取到用户的id了，并且可以根据id来控制用户的权限和行为。</p><p>如果我们想使用Email登录，我推荐Resend服务，每个月免费3000封电子邮件，可以很方便的集成到NextAuth中，可以搭配React Email组件来实组件的发送。</p><p>Resend官网有针对NextJs接入的例子非常方便:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .env</span>
<span class="token constant">EMAIL_SERVER_USER</span><span class="token operator">=</span><span class="token string">&quot;resend&quot;</span>
<span class="token constant">EMAIL_SERVER_PASSWORD</span><span class="token operator">=</span><span class="token string">&quot;xxxx&quot;</span>
<span class="token constant">EMAIL_SERVER_HOST</span><span class="token operator">=</span><span class="token string">&quot;smtp.resend.com&quot;</span>
<span class="token constant">EMAIL_SERVER_PORT</span><span class="token operator">=</span><span class="token string">&quot;465&quot;</span>
<span class="token constant">EMAIL_FROM</span><span class="token operator">=</span><span class="token string">&quot;email@$YOUR_DOMAIN.com&quot;</span>

<span class="token comment">// server/auth.ts</span>
<span class="token function">EmailProvider</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  server<span class="token operator">:</span> <span class="token punctuation">{</span>
    host<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">EMAIL_SERVER_HOST</span><span class="token punctuation">,</span>
    port<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">EMAIL_SERVER_PORT</span><span class="token punctuation">,</span>
    auth<span class="token operator">:</span> <span class="token punctuation">{</span>
      user<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">EMAIL_SERVER_USER</span><span class="token punctuation">,</span>
      pass<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">EMAIL_SERVER_PASSWORD</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  from<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">EMAIL_FROM</span><span class="token punctuation">,</span>
  <span class="token comment">// sendVerificationRequest # 还可以自己定义邮件内容 </span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37)),s("p",null,[n[17]||(n[17]=a("但是这样的话，email用户每次登录都没有对应的名称，我们可以覆盖prisma db原有的createUser方法，在创建用户时，将用户的name和email一起创建到数据库中,")),s("a",m,[n[16]||(n[16]=a("解决方案")),e(t)]),n[18]||(n[18]=a(":"))]),n[28]||(n[28]=p(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> PrismaAdapter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@next-auth/prisma-adapter&#39;</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** <span class="token keyword">@return</span> <span class="token punctuation">{</span> import(&quot;next-auth/adapters&quot;).Adapter <span class="token punctuation">}</span> */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">CustomPrismaAdapterForNextAuth</span><span class="token punctuation">(</span>prisma<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> adapter <span class="token operator">=</span> <span class="token function">PrismaAdapter</span><span class="token punctuation">(</span>prisma<span class="token punctuation">)</span><span class="token punctuation">;</span>

  adapter<span class="token punctuation">.</span><span class="token function-variable function">createUser</span> <span class="token operator">=</span> <span class="token keyword">async</span> data <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userExist <span class="token operator">=</span> <span class="token keyword">await</span> prisma<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">findUnique</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      where<span class="token operator">:</span> <span class="token punctuation">{</span>
        email<span class="token operator">:</span> data<span class="token punctuation">.</span>email
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>userExist<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> userExist<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> prisma<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span>
        email<span class="token operator">:</span> data<span class="token punctuation">.</span>email<span class="token punctuation">,</span>
        name<span class="token operator">:</span> data<span class="token punctuation">.</span>name <span class="token operator">||</span> data<span class="token punctuation">.</span>email<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;@&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        username<span class="token operator">:</span> data<span class="token punctuation">.</span>username <span class="token operator">||</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token punctuation">.</span>email<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;@&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        image<span class="token operator">:</span>
          data<span class="token punctuation">.</span>image <span class="token operator">||</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://www.gravatar.com/avatar/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?d=identicon&amp;r=PG</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        emailVerified<span class="token operator">:</span> data<span class="token punctuation">.</span>emailVerified
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> adapter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> authOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  adapter<span class="token operator">:</span> <span class="token function">CustomPrismaAdapterForNextAuth</span><span class="token punctuation">(</span>prisma<span class="token punctuation">)</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接入mixin-oauth" tabindex="-1"><a class="header-anchor" href="#接入mixin-oauth" aria-hidden="true">#</a> 接入Mixin Oauth</h3><p>不仅仅是Mixin，其他Oauth也是类似的接入方式,在authOptions中添加provider:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token string">&quot;mixin&quot;</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">&quot;mixin&quot;</span><span class="token punctuation">,</span>
      type<span class="token operator">:</span> <span class="token string">&quot;oauth&quot;</span><span class="token punctuation">,</span>
      style<span class="token operator">:</span> <span class="token punctuation">{</span>
        logo<span class="token operator">:</span> <span class="token string">&quot;https://mixin.one/zh/img/favicon.png&quot;</span><span class="token punctuation">,</span>
        bg<span class="token operator">:</span> <span class="token string">&quot;#41a6f6&quot;</span><span class="token punctuation">,</span>
        text<span class="token operator">:</span> <span class="token string">&quot;#000000&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      clientId<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">MIXIN_CLIENT_ID</span><span class="token punctuation">,</span>
      clientSecret<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">MIXIN_CLIENT_SECRET</span><span class="token punctuation">,</span>
      authorization<span class="token operator">:</span> <span class="token punctuation">{</span>
        url<span class="token operator">:</span> <span class="token string">&quot;https://mixin.one/oauth/authorize&quot;</span><span class="token punctuation">,</span>
        params<span class="token operator">:</span> <span class="token punctuation">{</span>
          scope<span class="token operator">:</span> <span class="token string">&quot;PROFILE:READ&quot;</span><span class="token punctuation">,</span>
          client_id<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">MIXIN_CLIENT_ID</span><span class="token punctuation">,</span>
          response_type<span class="token operator">:</span> <span class="token string">&quot;code&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      token<span class="token operator">:</span> <span class="token punctuation">{</span>
        url<span class="token operator">:</span> <span class="token string">&quot;https://api.mixin.one/oauth/token&quot;</span><span class="token punctuation">,</span>
        <span class="token keyword">async</span> <span class="token function">request</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&quot;https://api.mixin.one/oauth/token&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            method<span class="token operator">:</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span>
            headers<span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token string-property property">&quot;Content-Type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            body<span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              client_id<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">MIXIN_CLIENT_ID</span><span class="token punctuation">,</span>
              client_secret<span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">MIXIN_CLIENT_SECRET</span><span class="token punctuation">,</span>
              code<span class="token operator">:</span> context<span class="token punctuation">.</span>params<span class="token punctuation">.</span>code<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resp<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> resp<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">return</span> <span class="token punctuation">{</span>
            tokens<span class="token operator">:</span> <span class="token punctuation">{</span>
              access_token<span class="token operator">:</span> response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>access_token<span class="token punctuation">,</span>
              scope<span class="token operator">:</span> response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>scope<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      userinfo<span class="token operator">:</span> <span class="token string">&quot;https://api.mixin.one/me&quot;</span><span class="token punctuation">,</span>
      <span class="token function">profile</span><span class="token punctuation">(</span>profile<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          id<span class="token operator">:</span> profile<span class="token operator">?.</span>data<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span>
          name<span class="token operator">:</span> profile<span class="token operator">?.</span>data<span class="token punctuation">.</span>full_name<span class="token punctuation">,</span>
          email<span class="token operator">:</span> profile<span class="token operator">?.</span>data<span class="token punctuation">.</span>email<span class="token punctuation">,</span>
          image<span class="token operator">:</span> profile<span class="token operator">?.</span>data<span class="token punctuation">.</span>avatar_url<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token operator">...</span><span class="token comment">// 其他provider/Github/Email</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Mixin登录用户的所有信息都可以通过这个provider获取到，包括id、name、image等，注意Mixin用户没有Email。</p><p>基于角色的管理也比较重要，如果你的控制台需要角色去管理的话。</p><h3 id="接入-web3-登录" tabindex="-1"><a class="header-anchor" href="#接入-web3-登录" aria-hidden="true">#</a> 接入 Web3 登录</h3>`,7)),s("p",null,[s("a",b,[n[19]||(n[19]=a("NextAuth ETH灯枯教程")),e(t)])]),n[29]||(n[29]=s("h4",{id:"solana-登录",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#solana-登录","aria-hidden":"true"},"#"),a(" Solana 登录")],-1)),s("p",null,[s("a",h,[n[20]||(n[20]=a("NextAuth Solana登录教程")),e(t)])]),n[30]||(n[30]=p(`<h4 id="eth-登录" tabindex="-1"><a class="header-anchor" href="#eth-登录" aria-hidden="true">#</a> Eth 登录</h4><h3 id="添加session会话" tabindex="-1"><a class="header-anchor" href="#添加session会话" aria-hidden="true">#</a> 添加Session会话</h3><p>你需要添加SessionProvider来存储Session信息，以便于客户端代码可以获取session信息。</p><p>于是你就可以保护你的API路由了，只允许登录用户访问。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// middleware中控制的不区分客户端/服务端组件</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;next-auth/middleware&quot;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span> matcher<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/dashboard&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>

<span class="token comment">//  client客户端组件</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>data<span class="token operator">:</span> session<span class="token punctuation">,</span> update<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useSession</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">// 这里的update 可以重新获取session信息，比如用户修改了用户信息，则可以更新session信息</span>
  required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">onUnauthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/signin?callbackUrl=\${your-page-url}&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 服务端组件</span>

<span class="token keyword">const</span> session <span class="token operator">=</span> <span class="token function">getServerSession</span><span class="token punctuation">(</span>authOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">&#39;/signin?callbackUrl=\${your-page-url}&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 如果你想保护API路由，指向让登录用户使用，使用方式和上面一样。 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基于角色的认证" tabindex="-1"><a class="header-anchor" href="#基于角色的认证" aria-hidden="true">#</a> 基于角色的认证</h3>`,6)),s("p",null,[s("a",g,[n[21]||(n[21]=a("文档地址")),e(t)])]),n[31]||(n[31]=p(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// middleware/config</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">withAuth</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  callbacks<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">authorized</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>req<span class="token punctuation">,</span> token<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>nextUrl<span class="token punctuation">.</span>pathname <span class="token operator">===</span> <span class="token string">&#39;/admin&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> token<span class="token operator">?.</span>role <span class="token operator">===</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token function">middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// if authorized  return true, else handle middleware</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>matcher<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/dashboard&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/admin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;protected-route&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里也是有点问题，一个已经登录的用户访问 /admin authorized返回 false,会重定向到sign in 界面，所以实际上在sign in 页面需要检测session 判断是否用户已经登录，如果已经登录则重定向到首页即可。或者直接在middleware中执行页面跳转。</p>`,2))])}const q=o(r,[["render",x],["__file","next-auth-js.html.vue"]]);export{q as default};
