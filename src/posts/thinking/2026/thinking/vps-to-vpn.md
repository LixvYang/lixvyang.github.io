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

买了一台搬瓦工 CN2 GIA-E 的洛杉矶 VPS，搭成自己的海外出口，Windows 上用 v2rayN 直连。这篇把整个过程记下来：手动怎么做，踩了哪些坑，最后怎么把这摊事整个甩给 AI（Claude Code）去干。

<!-- more -->

> 文中所有 IP、UUID、密钥都是占位符，换成你自己的。**服务器密码和 vless 链接别往外发，别手滑。**

## 先把方案定下来

VPS 选搬瓦工 CN2 GIA-E 的洛杉矶机房，回国走电信 CN2 GIA 精品线路，晚高峰也稳。系统用 Debian 12，干净、轻量、资料多。服务端装 Xray 官方脚本，不装面板，少一个暴露在公网的 Web 入口。协议用 VLESS + REALITY + xtls-rprx-vision，不用域名也不用证书，流量伪装成访问正常的 HTTPS 大站。客户端 Windows 用 v2rayN，Android 用 v2rayNG，macOS 用 Karing，都能直接导入 `vless://` 链接。

网上很多教程爱用 3x-ui 面板，点点鼠标就配好了，新手确实友好。可面板默认走 HTTP，得多放行一个端口，还容易被扫到，我个人不太想碰。再说身边有 AI 的话，直接写配置文件反而更省事。

## 买机器

去搬瓦工官网，在套餐里找 **CN2 GIA-E**。这是它的高端线路系列，能在多个机房之间随便切，回国线路质量好。配置看自己，一个人当代理用，最低配（1 核 / 1GB 内存）完全够。价格和流量以官网为准，年付一般比月付划算。机房选洛杉矶 CN2 GIA，下单之后在 KiwiVM 面板里随时能迁到香港、日本这些地方。付款支持支付宝或 PayPal。

买完进 **KiwiVM** 控制面板（搬瓦工后台 Services → My Services → KiwiVM Control Panel）。

在里面要办三件事。先重装系统，Install new OS 选 **Debian 12 x86_64**。再记下 SSH 信息，首页就有 IP 和 SSH 端口，注意搬瓦工有的机器端口不是 22，以面板显示为准。最后在 Root password modification 里生成新的 root 密码，记下来。

## 手动搭一遍（大概 15 分钟）

### 先把密钥配上

```bash
# 本机执行：把公钥传上去，以后免密登录
ssh-copy-id -p <SSH端口> root@<VPS_IP>
ssh -p <SSH端口> root@<VPS_IP>
```

确认密钥能登录了，就把密码登录关掉：

```bash
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh
```

### 更新系统，顺手开 BBR

```bash
apt update && apt upgrade -y
apt install -y curl ca-certificates openssl

# BBR 拥塞控制，对跨洋链路提速明显
printf "net.core.default_qdisc=fq\nnet.ipv4.tcp_congestion_control=bbr\n" >> /etc/sysctl.conf
sysctl -w net.core.default_qdisc=fq net.ipv4.tcp_congestion_control=bbr
sysctl net.ipv4.tcp_congestion_control   # 输出 bbr 即成功
```

> 有个小坑：搬瓦工的系统镜像自带几条 `eth1` 相关的 sysctl 配置，执行 `sysctl -p` 会报 `cannot stat /proc/sys/net/ipv4/.../eth1/...`。忽略就行，用 `sysctl -w` 直接设置。

### 装 Xray

```bash
bash -c "$(curl -fsSL https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
xray version
```

### 生成 UUID、密钥和 shortId

```bash
xray uuid                 # 用户 ID
xray x25519               # 输出 PrivateKey 和 Password(PublicKey)
openssl rand -hex 8       # shortId
```

`PrivateKey` 写进服务端配置，`Password (PublicKey)` 给客户端用，也就是链接里的 `pbk` 参数。别搞混了。

### 挑一个伪装站

REALITY 会把「不认识的访问」原样转发给一个真实的大站，所以在外人看来，你的 VPS 就是那个网站。目标站得支持 TLS 1.3 和 HTTP/2，离 VPS 近、延迟低，还要**兼容新版 Xray 的后量子密钥交换**（后面踩坑那节细说）。

可以在 VPS 上先测一圈：

```bash
for d in www.apple.com dl.google.com www.cloudflare.com; do
  echo -n "$d: "
  curl -sI --tlsv1.3 --http2 -o /dev/null -w "%{http_version} %{time_connect}s\n" https://$d
done
```

我最后选了 `www.apple.com`。

### 写配置

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

端口就用 **443**。REALITY 伪装的本来就是普通 HTTPS 流量，443 最自然。有些教程叫你「避开 443」，那说的是面板端口，跟 REALITY 入站没关系。

校验、启动：

```bash
xray run -test -c /usr/local/etc/xray/config.json   # 输出 Configuration OK
systemctl enable --now xray
systemctl restart xray
ss -tlnp | grep 443
```

机器上开了防火墙（ufw / iptables）的话，记得放行 443 和 SSH 端口。

### 拼分享链接

```
vless://<UUID>@<VPS_IP>:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.apple.com&fp=chrome&pbk=<PublicKey>&sid=<shortId>&type=tcp#LA-BWH
```

## 客户端这头怎么弄（v2rayN）

去 GitHub 的 `2dust/v2rayN` 下最新 Release，选带 core 的包。把上面的 `vless://` 链接复制下来，回到 v2rayN 主界面按 **Ctrl+V** 导入。右键节点，点**测试真连接延迟**，能蹦出毫秒数就说明通了。

底部状态栏有两处要设：系统代理选**自动配置系统代理**，路由选**绕过大陆**，国内网站直连，别绕去美国再绕回来。然后浏览器打开 `ip.sb`，显示的是 VPS 的 IP，就成了。

### TUN 到底要不要开

系统代理只对遵守系统代理设置的程序生效，浏览器算一个。TUN 模式会建一张虚拟网卡，把所有程序的流量都接管，命令行和 UDP 也在内，不过得用管理员权限跑。

只想让几条命令走代理的话，用不着 TUN，环境变量就够了（端口以 v2rayN 底部显示为准）：

```bash
proxy_on()  { export HTTPS_PROXY=http://127.0.0.1:10808 HTTP_PROXY=http://127.0.0.1:10808 ALL_PROXY=socks5://127.0.0.1:10808; }
proxy_off() { unset HTTPS_PROXY HTTP_PROXY ALL_PROXY; }
```

> 提醒一句：电脑上要是装了公司的 VPN 客户端，开 TUN 很容易跟它抢路由，结果断网，或者内网打不开。

## 踩坑：连不上，原来是伪装站选错了

我第一次配的伪装站是 `www.microsoft.com`。本机到 VPS 的 443 端口能连通，不带密钥的访问也能被正常转发到微软，证书有效。**可客户端就是连不上**，测速显示 -1。

把服务端 loglevel 改成 `info` 之后，日志里刷了一屏：

```
REALITY: processed invalid connection from x.x.x.x: handshake did not complete successfully
```

我先核对了密钥。`xray x25519 -i <PrivateKey>` 算出来的公钥跟客户端填的一致，排除。接着排除网络问题，在 VPS 上跑一个客户端连它自己，**照样失败**，说明跟本地网络无关，是配置的锅。最后做对比测试，只换伪装站，其他配置一概不动：

```
www.microsoft.com  => 失败
www.apple.com      => 成功
dl.google.com      => 成功
www.cloudflare.com => 成功
```

原因是这样的。新版 Xray 用 `fp=chrome` 指纹握手时，会带上后量子密钥交换（X25519MLKEM768），伪装目标要是不支持，握手就在半路失败了。所以挑目标站的时候，**一定要做一次完整的代理连接测试**，别只测「转发是否正常」。我第一次就只测了转发，以为没事，结果真正的故障被漏掉了。

**验证得端到端。** 半截验证等于没验证。

## 测速和线路检测

回国线路用 backtrace 看：

```bash
curl -fsSL -o backtrace https://github.com/oneclickvirt/backtrace/releases/latest/download/backtrace-linux-amd64
chmod +x backtrace && ./backtrace
```

我这台的结果如下：

| | 电信 | 联通 | 移动 |
|---|---|---|---|
| 北京 | CN2 GIA | CN2 GIA | CMIN2 |
| 上海 | 未识别 | CN2 GIA | CMIN2 |
| 广州 | CN2 GT | CN2 GIA | CMIN2 |
| 成都 | CN2 GIA | 4837（普通） | CMIN2 |

延迟上，到上海大约 130ms，到广州大约 160ms，没丢包。VPS 自己从 Cloudflare 下载，跑到约 875 Mbps。

别的工具也顺手列一下。全国多节点的延迟和丢包，用 [ITDOG](https://www.itdog.cn)（选 TCPing，填 `IP:443`）或 ping.pe。逐跳路由用 NextTrace。VPS 综合性能看 bench.sh、YABS、融合怪 ecs。点对点带宽用 iperf3。客户端实测就用 v2rayN 自带的测速，或者 speed.cloudflare.com。

> 在公司网络里测要小心。海外流量可能先从公司的国际出口（比如新加坡）绕出去，你测到的是公司出口的速度，跟 VPS 的真实水平没什么关系。想测国内直连，用家里宽带、手机流量或者 ITDOG。

## 让 AI 帮你搞定（Claude Code）

上面这一整套，我其实是让 Claude Code 在终端里直接干完的。它能执行本地命令，能通过 SSH 操作远程服务器，能读日志，出了问题还会自己排错。

### 开工前准备

本机装好 Claude Code（或者别的能跑终端命令的 AI Agent）。本机要有 SSH 密钥，也就是 `~/.ssh/id_rsa.pub` 或 `id_ed25519.pub`，没有就 `ssh-keygen -t ed25519` 生成一个。再备好 VPS 的 IP、SSH 端口和 root 密码。

### 提示词

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

### 它实际干了啥

它先用 `expect` 自动输了一次密码，跑 `ssh-copy-id` 装上公钥，之后全程走密钥登录。然后检查系统版本、内存、端口占用，装 Xray，开 BBR，生成 UUID、密钥对和 shortId，再测了几个候选伪装站的 TLS 1.3 / HTTP/2 支持和延迟。写好配置之后先 `xray run -test` 校验，再重启服务。

等我反馈「连不上」，它就把日志调成 info，在本机下载同版本的 Xray 客户端来复现问题，又在 VPS 上自己连自己排除网络因素，最后逐个对比伪装站，定位到 microsoft.com 的兼容问题并修好。收尾时顺手用 backtrace、ping 和下载测试把线路质量也测了。

### 让 AI 碰服务器，有几件事得盯着

密码只给新机器，只用一次。AI 装好密钥以后马上 `passwd` 改掉 root 密码，再关掉密码登录。

要明确让它「跑一次完整的客户端连接测试」，我踩的坑就是 AI 一开始只做了半截验证。

它每次执行命令之前，Claude Code 都会把命令内容摆出来给你看，删除、覆盖这类操作多留意一眼。还有，vless 链接和私钥都跟密码一个级别，别贴到公开的地方。

## 搭完之后还有点事

先改 root 密码，关掉 SSH 密码登录。有空可以把 SSH 挪到非 22 端口，再装个 fail2ban。KiwiVM 里每月瞄一眼流量用量，定期 `apt upgrade`，Xray 升级的话重新执行一遍官方安装命令就行。链接要是泄露了，赶紧重新生成 UUID 和密钥。

常用命令放这儿：

```bash
systemctl status xray          # 状态
journalctl -u xray -f          # 实时日志
xray run -test -c /usr/local/etc/xray/config.json   # 校验配置
```

最后唠叨一句，自建代理请遵守当地法律法规和各个服务的使用条款，在公司网络里用之前，也先翻翻公司的安全规定。
