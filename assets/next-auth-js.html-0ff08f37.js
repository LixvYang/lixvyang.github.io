import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as d,c as l,f as r,b as e,d as n,a,e as o}from"./app-01148a66.js";const c={},u=e("p",null,"NextJs是目前最流行的 FullStack FrameWork 之一，它提供了一套完整的开发体验，包括服务端渲染、API路由、数据管理、路由管理等。",-1),p=e("p",null,"于是在 NextJs 之上就会有许多插件系统帮助我们实现各种功能，其中就包括 NextAuth。",-1),h=e("p",null,"NextAuth 是 NextJs 的一个插件，它可以帮助你实现用户认证、授权、管理等功能。",-1),v=e("p",null,"本文将介绍 NextAuth 的基本用法，以及如何集成到 NextJs 项目中。",-1),b=e("h1",{id:"nextauth-学习笔记",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#nextauth-学习笔记","aria-hidden":"true"},"#"),n(" NextAuth 学习笔记")],-1),m={href:"https://github.com/nextauthjs/next-auth",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mixin.one/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://create.t3.gg/",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"prisma",-1),k=e("code",null,"next-auth",-1),N=e("code",null,"dotenv",-1),T=e("code",null,"TailwindCSS",-1),f=o(`<p>所以我们后续使用T3-App快速搭建项目后，将着重点放在NextAuth的使用上。</p><h2 id="快速搭建t3-app项目" tabindex="-1"><a class="header-anchor" href="#快速搭建t3-app项目" aria-hidden="true">#</a> 快速搭建T3-App项目</h2><p>根据t3-app的文档，我们可以快速搭建一个NextJs项目，这里我们使用T3-App快速搭建项目。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> create t3-app@latest
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来如无意外，从浏览器进入<code>http://localhost:3000</code>就可以点击SignIn按钮使用Github进行登录了。</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>如果你遇到了额外问题，大概率是你的配置不对或者哪个地方代码没有改，用错误信息去问AI就可以解决了。</p></div><p>Amazing！我们已经成功搭建了一个NextJs项目，并且集成了NextAuth，并且使用了Github登录。</p><h2 id="通读nextauth文档" tabindex="-1"><a class="header-anchor" href="#通读nextauth文档" aria-hidden="true">#</a> 通读NextAuth文档</h2><p>接下来我们需要直接去读NextAuth文档，详细探索一下NextAuth的功能，深度探讨为什么只改了Providers字段就能使用Github登录。</p><p>NextAuth默认是使用Session存储用户的登录信息，这样的登录信息需要我们在自己的数据库中存储一份，并不适合大型应用使用，后续我们将改为JWT Token的存储方式(数据库不存Token)。</p><p>接着我们将自己写一个Provider，比如我们想实现Mixin登录，我们需要去Mixin Developer Portal申请一个OAuth2.0的Client ID和Client Secret，接着自己写一个Provider就可以使用了。</p><h3 id="配置信息" tabindex="-1"><a class="header-anchor" href="#配置信息" aria-hidden="true">#</a> 配置信息</h3><h3 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h3><h3 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库" aria-hidden="true">#</a> 数据库</h3><h2 id="为用户分配role" tabindex="-1"><a class="header-anchor" href="#为用户分配role" aria-hidden="true">#</a> 为用户分配Role</h2><h2 id="在-nextjs-组件中鉴权" tabindex="-1"><a class="header-anchor" href="#在-nextjs-组件中鉴权" aria-hidden="true">#</a> 在 NextJS 组件中鉴权</h2><h3 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h3><h3 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端" aria-hidden="true">#</a> 服务端</h3><h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h2>`,33);function A(I,C){const s=t("ExternalLinkIcon");return d(),l("div",null,[u,p,h,v,r(" more "),b,e("p",null,[n("本文是我在使用NextAuth过程中,尝试使用 JWT Token 使用方式, 尝试使用 Prisma ORM 框架, 尝试使用 "),e("a",m,[n("Github"),a(s)]),n("/"),e("a",x,[n("Mixin"),a(s)]),n("第三方登录/Email(Resent)后总结而来的学习笔记。")]),e("p",null,[n("使用"),e("a",_,[n("T3-App"),a(s)]),n("快速搭建NextJs项目, 简单来说T3-App是一个NextJs的脚手架，比如之前使用NextJs的方式是安装了NextJs，接着需要安装"),g,n("、"),k,n("、"),N,n("、"),T,n("等等依赖服务，于是T3-App可以帮助你节省这些时间，T3-App会自动帮你安装这些依赖，并且配置好项目。")]),f])}const D=i(c,[["render",A],["__file","next-auth-js.html.vue"]]);export{D as default};
