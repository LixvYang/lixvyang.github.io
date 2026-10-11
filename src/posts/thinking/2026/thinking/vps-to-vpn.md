---
icon: material-symbols:menu-book-outline
date: 2026-10-10
isOriginal: true
category:
  - notes
tag:
  - VPS
  - 网络
  - AI
---

# 从买一台搬瓦工 VPS 到自建代理：手动版 + 让 AI 帮你搞

买了一台搬瓦工 CN2 GIA-E 的洛杉矶 VPS，搭成自己的海外出口，Windows 用 v2rayN 直连。这篇记录完整过程：手动怎么做、踩了什么坑，以及怎么把这件事整个交给 AI（Claude Code）去做。

<!-- more -->

> 本文所有 IP、UUID、密钥都用占位符表示，请替换成你自己的。**不要把服务器密码、vless 链接公开发出去。**

---

## 一、方案选择

| 项目 | 选择 | 理由 |
|---|---|---|
| VPS | 搬瓦工 CN2 GIA-E，洛杉矶 | 回国走电信 CN2 GIA 精品线路，晚高峰稳定 |
| 系统 | Debian 12 | 干净、轻量、资料多 |
| 服务端 | Xray 官方脚本（不装面板） | 少一个暴露在公网的 Web 面板，更安全 |
| 协议 | VLESS + REALITY + xtls-rprx-vision | 不需要域名和证书，伪装成访问正常的 HTTPS 大站 |
| 客户端 | v2rayN（Windows）/ v2rayNG（Android）/ Karing（macOS） | 都支持直接导入 `vless://` 链接 |

网上很多教程用的是 3x-ui 面板，点点鼠标就能配好，对新手很友好。但面板默认走 HTTP，需要额外放行一个端口，还容易被扫到。如果你有 AI 帮忙，直接写配置文件反而更简单。

---

## 二、购买搬瓦工 CN2 GIA-E

1. 打开搬瓦工官网，在套餐里找 **CN2 GIA-E**。这是搬瓦工的高端线路系列，可以在多个机房之间自由切换，回国线路质量好。
2. 选配置。一个人当代理用，最低配（1 核 / 1GB 内存）完全够。价格和流量以官网为准，年付一般比月付划算。
3. 机房选**洛杉矶 CN2 GIA**。下单后在 KiwiVM 面板里随时可以迁移到别的机房，比如香港、日本。
4. 付款可以用支付宝或 PayPal。

买完后进入 **KiwiVM** 控制面板（在搬瓦工后台的 Services → My Services → KiwiVM Control Panel 里）。

### KiwiVM 里要做的事

1. **重装系统**：Install new OS → 选 **Debian 12 x86_64**。
2. **记下 SSH 信息**：首页有 IP 地址和 SSH 端口。注意，搬瓦工有的机器 SSH 端口不是 22，要以面板上显示的为准。
3. **设置 root 密码**：Root password modification → 生成新密码，然后记下来。

---

## 三、手动搭建（约 15 分钟）

### 1. 登录服务器，配好密钥

```bash
# 本机执行：把公钥传上去，以后免密登录
ssh-copy-id -p <SSH端口> root@<VPS_IP>
ssh -p <SSH端口> root@<VPS_IP>
```

确认密钥能登录之后，建议关掉密码登录：

```bash
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh
```

### 2. 更新系统并开启 BBR

```bash
apt update && apt upgrade -y
apt install -y curl ca-certificates openssl

# BBR 拥塞控制，对跨洋链路提速明显
printf "net.core.default_qdisc=fq\nnet.ipv4.tcp_congestion_control=bbr\n" >> /etc/sysctl.conf
sysctl -w net.core.default_qdisc=fq net.ipv4.tcp_congestion_control=bbr
sysctl net.ipv4.tcp_congestion_control   # 输出 bbr 即成功
```

> 坑：搬瓦工的系统镜像里自带了几条 `eth1` 相关的 sysctl 配置，执行 `sysctl -p` 会报 `cannot stat /proc/sys/net/ipv4/.../eth1/...`。这些报错可以忽略，用 `sysctl -w` 直接设置即可。

### 3. 安装 Xray

```bash
bash -c "$(curl -fsSL https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
xray version
```

### 4. 生成 UUID、密钥和 shortId

```bash
xray uuid                 # 用户 ID
xray x25519               # 输出 PrivateKey 和 Password(PublicKey)
openssl rand -hex 8       # shortId
```

- `PrivateKey` 写进服务端配置；
- `Password (PublicKey)` 给客户端用（链接里的 `pbk` 参数）。

### 5. 选一个伪装目标站

REALITY 会把"不认识的访问"原样转发给一个真实的大站，所以在外人看来，你的 VPS 就像是那个网站。目标站要满足：

- 支持 TLS 1.3 和 HTTP/2；
- 离 VPS 近、延迟低；
- **兼容新版 Xray 的后量子密钥交换**（下面有踩坑记录）。

可以在 VPS 上测一下：

```bash
for d in www.apple.com dl.google.com www.cloudflare.com; do
  echo -n "$d: "
  curl -sI --tlsv1.3 --http2 -o /dev/null -w "%{http_version} %{time_connect}s\n" https://$d
done
```

我最后选的是 `www.apple.com`。

### 6. 写配置文件

编辑 `/usr/local/etc/xray/config.json`：

```json
{
  "log": { "loglevel": "warning" },
  "inbounds": [{
    "listen": "0.0.0.0",
    "port": 443,
    "protocol": "vless",
    "settings": {
      "clients": [{ "id": "<UUID>", "flow": "xtls-rprx-vision" }],
      "decryption": "none"
    },
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "target": "www.apple.com:443",
        "serverNames": ["www.apple.com"],
        "privateKey": "<PrivateKey>",
        "shortIds": ["<shortId>"]
      }
    },
    "sniffing": { "enabled": true, "destOverride": ["http", "tls", "quic"] }
  }],
  "outbounds": [
    { "protocol": "freedom", "tag": "direct" },
    { "protocol": "blackhole", "tag": "block" }
  ],
  "routing": {
    "rules": [{ "type": "field", "ip": ["geoip:private"], "outboundTag": "block" }]
  }
}
```

端口用 **443**。REALITY 伪装的就是普通 HTTPS 流量，443 最自然。有些教程建议"避开 443"，那是针对面板端口说的，不适用于 REALITY 入站。

检查并启动：

```bash
xray run -test -c /usr/local/etc/xray/config.json   # 输出 Configuration OK
systemctl enable --now xray
systemctl restart xray
ss -tlnp | grep 443
```

如果开了防火墙（ufw / iptables），记得放行 443 和 SSH 端口。

### 7. 拼出分享链接

```
vless://<UUID>@<VPS_IP>:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.apple.com&fp=chrome&pbk=<PublicKey>&sid=<shortId>&type=tcp#LA-BWH
```

---

## 四、客户端设置（v2rayN）

1. 去 GitHub 的 `2dust/v2rayN` 下载最新 Release，选带 core 的包。
2. 复制上面的 `vless://` 链接，在 v2rayN 主界面按 **Ctrl+V** 导入。
3. 右键节点 → **测试真连接延迟**，能显示毫秒数就说明能连通。
4. 底部状态栏：
   - 系统代理：**自动配置系统代理**；
   - 路由：**绕过大陆**，国内网站直连，不绕到美国。
5. 浏览器打开 `ip.sb`，显示的是 VPS 的 IP 就说明成功了。

### 关于 TUN 模式

- **系统代理**：只对遵守系统代理设置的程序生效，比如浏览器。
- **TUN 模式**：建一张虚拟网卡，接管所有程序的流量（包括命令行、UDP）。需要管理员权限运行。

只想让某几条命令走代理，不需要开 TUN，用环境变量就行（端口以 v2rayN 底部显示为准）：

```bash
proxy_on()  { export HTTPS_PROXY=http://127.0.0.1:10808 HTTP_PROXY=http://127.0.0.1:10808 ALL_PROXY=socks5://127.0.0.1:10808; }
proxy_off() { unset HTTPS_PROXY HTTP_PROXY ALL_PROXY; }
```

> 注意：电脑上如果装了公司的 VPN 客户端，开 TUN 很容易和它抢路由，导致断网或内网打不开。

---

## 五、踩坑记录：连不上，原因是伪装站选错了

我第一次配置时用的伪装站是 `www.microsoft.com`，结果：

- 本机到 VPS 的 443 端口能连通；
- 不带密钥的访问也能被正常转发到微软，证书有效；
- **但客户端就是连不上**，测速显示 -1。

服务端日志（先把 loglevel 改成 `info`）里全是：

```
REALITY: processed invalid connection from x.x.x.x: handshake did not complete successfully
```

排查过程：

1. **核对密钥**：`xray x25519 -i <PrivateKey>` 算出的公钥和客户端填的一致，排除。
2. **排除网络问题**：在 VPS 上跑一个客户端连自己，**同样失败**，说明是配置问题，跟本地网络无关。
3. **对比测试**：只换伪装站，其他配置不变：

```
www.microsoft.com  => 失败
www.apple.com      => 成功
dl.google.com      => 成功
www.cloudflare.com => 成功
```

**原因**：新版 Xray 用 `fp=chrome` 指纹握手时，会带上后量子密钥交换（X25519MLKEM768）。伪装目标如果不支持，握手就会中途失败。所以选目标站时，**一定要做一次完整的代理连接测试**，不能只测"转发是否正常"。

**教训**：验证要做端到端的测试。我第一次只测了伪装转发，以为没问题，结果漏掉了真正的故障。

---

## 六、测速与线路检测

### 回国线路：backtrace

```bash
curl -fsSL -o backtrace https://github.com/oneclickvirt/backtrace/releases/latest/download/backtrace-linux-amd64
chmod +x backtrace && ./backtrace
```

我这台的结果：

| | 电信 | 联通 | 移动 |
|---|---|---|---|
| 北京 | CN2 GIA | CN2 GIA | CMIN2 |
| 上海 | 未识别 | CN2 GIA | CMIN2 |
| 广州 | CN2 GT | CN2 GIA | CMIN2 |
| 成都 | CN2 GIA | 4837（普通） | CMIN2 |

延迟方面，到上海约 130ms，到广州约 160ms，没有丢包。VPS 自身从 Cloudflare 下载约 875 Mbps。

### 其他工具

| 用途 | 工具 |
|---|---|
| 全国多节点延迟和丢包 | [ITDOG](https://www.itdog.cn)（选 TCPing，填 `IP:443`）、ping.pe |
| 逐跳路由 | NextTrace |
| VPS 综合性能 | bench.sh、YABS、融合怪 ecs |
| 点对点带宽 | iperf3 |
| 客户端实测 | v2rayN 测速、speed.cloudflare.com |

> 坑：如果你在公司网络里测，海外流量可能先从公司的国际出口（比如新加坡）绕出去，测出来的速度是公司出口的速度，不代表 VPS 的真实水平。要测"国内直连"，请用家里宽带、手机流量，或者 ITDOG。

---

## 七、让 AI 帮你搞定（Claude Code）

上面的流程，我实际上是让 Claude Code 在终端里直接完成的。它能执行本地命令、通过 SSH 操作远程服务器、读日志、自己排错。

### 1. 前置条件

- 本机装好 Claude Code（或其他能执行终端命令的 AI Agent）；
- 本机有 SSH 密钥（`~/.ssh/id_rsa.pub` 或 `id_ed25519.pub`），没有的话用 `ssh-keygen -t ed25519` 生成一个；
- VPS 的 IP、SSH 端口、root 密码。

### 2. 提示词示例

```
我买了一台搬瓦工 VPS，Debian 12，IP 是 <VPS_IP>，SSH 端口 <端口>，root 密码是 <密码>。
请帮我：
1. 把我本机的 SSH 公钥装到服务器上，后续用密钥登录；
2. 安装 Xray 官方版本，配置 VLESS + REALITY + xtls-rprx-vision，端口 443；
3. 开启 BBR；
4. 在服务器上做一次完整的客户端连接自测，确认能通；
5. 最后给我一条可以导入 v2rayN 的 vless:// 链接。
密码之后我会改，不用担心泄露。
```

### 3. AI 实际做了什么

1. 用 `expect` 自动输入一次密码，执行 `ssh-copy-id` 安装公钥，之后全程用密钥登录；
2. 检查系统版本、内存、端口占用；
3. 安装 Xray，开启 BBR，生成 UUID、密钥对和 shortId；
4. 测试几个候选伪装站的 TLS 1.3 / HTTP/2 支持和延迟；
5. 写配置、`xray run -test` 校验、重启服务；
6. 我反馈"连不上"之后，它把日志调成 info，在本机下载同版本 Xray 客户端复现问题，又在 VPS 上自己连自己排除网络因素，最后逐个对比伪装站，定位到 microsoft.com 的兼容问题并修复；
7. 顺手用 backtrace、ping 和下载测试测了线路质量。

### 4. 让 AI 操作服务器的注意事项

- **密码只给新机器、只用一次**：AI 装好密钥后，马上改 root 密码（`passwd`），并关闭密码登录。
- **要求端到端验证**：明确让它"跑一次完整的客户端连接测试"。我踩的那个坑，就是 AI 一开始只做了半截验证。
- **看它执行了什么**：Claude Code 每次执行命令前都会展示命令内容，删除、覆盖这类操作留意一下。
- **凭证不外传**：vless 链接、私钥都相当于密码，别贴到公开的地方。

---

## 八、搭完之后

- [ ] 修改 root 密码，关闭 SSH 密码登录
- [ ] 视情况把 SSH 改到非 22 端口，装 fail2ban
- [ ] KiwiVM 里留意每月流量用量
- [ ] 定期 `apt upgrade`，用官方脚本升级 Xray（重新执行安装命令即可）
- [ ] 链接泄露了就重新生成 UUID 和密钥

常用命令：

```bash
systemctl status xray          # 状态
journalctl -u xray -f          # 实时日志
xray run -test -c /usr/local/etc/xray/config.json   # 校验配置
```

最后提醒一句：自建代理请遵守当地法律法规和各个服务的使用条款，在公司网络里使用前也先看看公司的安全规定。
