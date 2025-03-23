---
icon: token-branded:polygon
date: 2025-03-23
isOriginal: true
category:
  - notes
tag:
  - crypto
---

Polymarket 预测市场其实已经存在很久了,从 Vtalink 投资距今都有好几年了,我在 2021 年就开始接触,但一直没有深入其文档源码仔细调研,索性近两天人站调研一下.

# 预测市场 Polymarket Research

- 预测市场是什么?

> 预测市场是针对未来事件进行预测的方式,投资者投资自己的真金白银,换取自己对未来事件发生情况的权益,如果发生那么自己会有收益,如果没有发生则自己会亏损.

举个例子,2025年苹果市值会到达 10 万亿美金吗?你可以购买 YES/NO 的情况,你根据你的判断来进行购入接着自负盈亏.

这一套系统在技术上的复杂度其实是不高的,需要一个二元订单铺模型具体可以参考以下文档.

- [Document](https://docs.polymarket.com/?typescript#introduction)
- [Code Document](https://github.com/Polymarket/ctf-exchange/blob/main/docs/Overview.md)

核心的一点是采用权益代币 `A A'` 来代替YES/NO,接着用真实世界的代币`USDC`充当 C,其中`A + A' = C`,这样一个模式来保证订单铺的稳定性.

下面你就可以看懂文档具体的内容了.

```
匹配场景
资产：
A ：ERC1155 标准的结果代币。
A' ：ERC1155 标准的结果代币，是 A 的互补代币（假设一个结果代币和它的互补代币总是可以合并成一个单位的抵押资产，一个单位的抵押资产也总是可以拆分成一个结果代币和它的互补代币，即 A + A' = C 。还假设结果代币和抵押资产具有相同的小数位数 / 基本单位。以下例子中假设 C 为 USDC 来进行定价）。
C ：ERC20 标准的抵押代币。
场景 1 - 正常（NORMAL）：
订单创建者（Maker）订单：用户 A 以 0.5 美元的价格买入 100 个代币 A。
订单接受者（Taker）订单：用户 B 以 0.5 美元的价格卖出 50 个代币 A。
匹配操作概述：调用 matchOrders(makerOrder, [takerOrder], 50, [25]) 函数进行匹配，具体操作如下：
把 50 个代币 A 从用户 B 转移到 CTFExchange 合约中。
把 25 个代币 C 从用户 A 转移到 CTFExchange 合约中。
把 50 个代币 A 从 CTFExchange 合约转移给用户 A。
把 25 个代币 C 从 CTFExchange 合约转移给用户 B。
```

到最后为什么是 25个代币呢,主要是因为A和A'的价格是0.5,那么50 个代币 A 就是 0.25 C 了.

这个模型在技术上其实并不复杂,到最后预测市场业务可以发展起来很大程度上是运营发展起来.最后总有一些用户留在这个系统中,据我所知 polymarket 的真实用户比很多公链都多...
