import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c as d,b as n,d as r,a as i,e as o}from"./app-4e74bbc5.js";const m={},u={href:"https://docs.polymarket.com/?typescript#introduction",target:"_blank",rel:"noopener noreferrer"},c={href:"https://github.com/Polymarket/ctf-exchange/blob/main/docs/Overview.md",target:"_blank",rel:"noopener noreferrer"};function v(p,e){const l=s("ExternalLinkIcon");return a(),d("div",null,[e[2]||(e[2]=n("p",null,"Polymarket 预测市场其实已经存在很久了,从 Vtalink 投资距今都有好几年了,我在 2021 年就开始接触,但一直没有深入其文档源码仔细调研,索性近两天人站调研一下.",-1)),e[3]||(e[3]=n("h1",{id:"预测市场-polymarket-research",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#预测市场-polymarket-research","aria-hidden":"true"},"#"),r(" 预测市场 Polymarket Research")],-1)),e[4]||(e[4]=n("ul",null,[n("li",null,"预测市场是什么?")],-1)),e[5]||(e[5]=n("blockquote",null,[n("p",null,"预测市场是针对未来事件进行预测的方式,投资者投资自己的真金白银,换取自己对未来事件发生情况的权益,如果发生那么自己会有收益,如果没有发生则自己会亏损.")],-1)),e[6]||(e[6]=n("p",null,"举个例子,2025年苹果市值会到达 10 万亿美金吗?你可以购买 YES/NO 的情况,你根据你的判断来进行购入接着自负盈亏.",-1)),e[7]||(e[7]=n("p",null,"这一套系统在技术上的复杂度其实是不高的,需要一个二元订单铺模型具体可以参考以下文档.",-1)),n("ul",null,[n("li",null,[n("a",u,[e[0]||(e[0]=r("Document")),i(l)])]),n("li",null,[n("a",c,[e[1]||(e[1]=r("Code Document")),i(l)])])]),e[8]||(e[8]=o(`<p>核心的一点是采用权益代币 <code>A A&#39;</code> 来代替YES/NO,接着用真实世界的代币<code>USDC</code>充当 C,其中<code>A + A&#39; = C</code>,这样一个模式来保证订单铺的稳定性.</p><p>下面你就可以看懂文档具体的内容了.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>匹配场景
资产：
A ：ERC1155 标准的结果代币。
A&#39; ：ERC1155 标准的结果代币，是 A 的互补代币（假设一个结果代币和它的互补代币总是可以合并成一个单位的抵押资产，一个单位的抵押资产也总是可以拆分成一个结果代币和它的互补代币，即 A + A&#39; = C 。还假设结果代币和抵押资产具有相同的小数位数 / 基本单位。以下例子中假设 C 为 USDC 来进行定价）。
C ：ERC20 标准的抵押代币。
场景 1 - 正常（NORMAL）：
订单创建者（Maker）订单：用户 A 以 0.5 美元的价格买入 100 个代币 A。
订单接受者（Taker）订单：用户 B 以 0.5 美元的价格卖出 50 个代币 A。
匹配操作概述：调用 matchOrders(makerOrder, [takerOrder], 50, [25]) 函数进行匹配，具体操作如下：
把 50 个代币 A 从用户 B 转移到 CTFExchange 合约中。
把 25 个代币 C 从用户 A 转移到 CTFExchange 合约中。
把 50 个代币 A 从 CTFExchange 合约转移给用户 A。
把 25 个代币 C 从 CTFExchange 合约转移给用户 B。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到最后为什么是 25个代币呢,主要是因为A和A&#39;的价格是0.5,那么50 个代币 A 就是 0.25 C 了.</p><p>这个模型在技术上其实并不复杂,到最后预测市场业务可以发展起来很大程度上是运营发展起来.最后总有一些用户留在这个系统中,据我所知 polymarket 的真实用户比很多公链都多...</p>`,5))])}const A=t(m,[["render",v],["__file","polymarket-research.html.vue"]]);export{A as default};
