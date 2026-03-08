---
icon: cryptocurrency-color:xin
date: 2026-02-08
isOriginal: true
category:
  - notes
tag:
  - solana
---

在 Mixin 进行 Vibe Coding  做出 Betxin(从 Mixin 直接买 Polymarket 市场订单) 的感受.

Betxin 我自己一行代码都没写,全都是 AI 生成的...

<!--- more --->

# Mixin VibeCoding

最近在 Mixin 开发了一些程序:

- [Fluxor](https://mrgn-ts-preview-v5.fluxor.cc) 7000105323
- [XINLet](https://xinlet.fluxor.cc) 小额换XIN,通过 Mixin Route 换其他代币 7000104827
- [Betxin](https://fluxor-polymarket-frontend.zeabur.app) 7000104187 可以在 Mixin 直接买入 Polymarket 的话题市场.

我在程序中大量使用 AI 辅助来进行编码,比如 XINLet 几乎全部使用 Claude/Codex 来进行 UI 的编写和逻辑的生成.XINLet 开源地址: https://github.com/DomeLiquid/fluxor-xinlet

Betxin 从需求调研到代码编写再到用户界面也全都由 Claude/Codex 来操作, 大量运用 AI 编程的技巧, 用户UI界面主要由 [v0.dev](https://v0.dev)生成,再由其他 AI 进行微调.

Fluxor 借贷程序自然不必多说...

本文就从 Betxin 从环境准备/需求调研到确定执行再到开发过程 以及部署上线再到自测验证 再到发布服务整个流程.

## Betxin Vibe Coding 的时间线

虽然我在 2022 年就开始接触预测市场了(当时还写了 Betxin 专门在 Mixin 生态玩但没什么流动性),但是2025年11月Polymarket 再一次火起来才开始正式接触预测市场.

然后在 2025 年 11 月 20 号左右开始萌生一个在 Mixin 对接 Polymarket机器人的想法.之后的一段时间一直在一边需求调研和在忙自己事情的阶段就这个事情就搁置了起来.另一个方面是这个对接机器人是接触 Mixin 之外的其他系统,我一直在想做项目怎么保持用户的持续参与性与活跃性,在公司中运营这类工作本不是程序员应该考虑的事情,但我之前做的一些业余项目总是把程序写好了就没有继续运营或者很难继续运营下去.

直到后来 2025 年 12 月 20 号才开始正式当做一个另一个和 Fluxor 借贷同优先级的业余项目来开始做.

Fluxor Lend 借贷项目的时间线
2025 年 5 月 2 日开始接触 Mixin 金融云 
2025 年 5 月 20 日, Fluxor 借贷的第一个版本就开发完成
后来就一直不断迭代优化,直到 10 月份左右才正式稳定下来.


明确需求:
一切以简单为原则去设计第一个用户可用的版本,例如:
1. 不支持挂单,只支持一次性买入.
2. 不支持卖出,只支持买入后等待结算(这个对用户不友好了,后面改成可以卖出了)
3. 只支持展示几个限定类型的 Polymarket 市场

当然也走了一些弯路,例如一开始想快速上线,先支持了与 Bot 交互操作就可以下单的流程,后来发现这个路线不太行,需要用户点击两下以上的逻辑都应该用清晰可见的用户界面来指导.



需求调研阶段:
罗列需求:

1. 查看 Polymarket 的开发者文档(2023 年看过 Polymarket 的开发者文档,不是给人看的.现在好多了),了解了 Polymarket 交易市场如何进行下单与每个字段的含义(他们的字段含义没有描述 全靠自己猜)
2. Polymarket 代理钱包的管理
3. Mixin 的对接(这里比较熟悉,但也有一些注意的点,包括处理交易幂等性和优化用户体验流程等部分)
4. 尽量借助已有部分组件sdk进行开发
5. 机器人收手续费逻辑(如何收取合理的手续费)
6. Fluxor 藏品的所有者可以免除部分手续费

回答需求的问题:



### 开发阶段



#### AI开发技巧

上下文管理

SKILL 技巧

### 自测阶段

### 上线

#### 收益情况

后面的开发学习计划:







