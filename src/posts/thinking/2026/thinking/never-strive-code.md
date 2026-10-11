---
icon: material-symbols:menu-book-outline
date: 2026-08-30
isOriginal: true
category:
  - notes
tag:
  - AI
  - 编程
  - 软件工程
---

# AI 写的代码，我真的可以一行都不看吗？

> 当 AI 可以一次生成几千行代码时，人还需要逐行阅读它吗？

这个问题最近一直在我脑子里转。

我自己用下来的感觉是，AI 写的代码经常比人写的更长，也更啰嗦，重复的地方特别多。以前我们的默认流程是自己写、自己读，再让别人审。现在实现代码的边际成本在飞快往下掉，要是大部分时间还花在逐行阅读上，AI 带来的杠杆好像根本没用上。

可完全不看呢？出了事谁背锅？

先把结论撂这儿。个人项目要是风险低、随时能回滚，逐行读 AI 的代码就不必当成上线前提，先验证需求、行为和结果更划算。但不逐行读，不代表不审查，单元测试、集成测试、端到端测试、静态分析、安全扫描、监控、回滚，这些反而得备得更全。到了生产系统，就别拿一句「这是 AI 写的」来推责任了，失败代价越高、影响范围越大、越难回滚，关键路径就越得深入到实现层去审。

说白了，问题根本不在看不看代码，在于：

> **这个系统出事了，会造成多大损失？**

<!-- more -->

## 咱们吵的可能不是同一种「看」

「我没看代码」这句话，至少能指三件完全不同的事：没逐行读实现，没验证程序行为，没为结果负责。

第一件在某些场景下确实可以省。后两件不行，一件都不行。

一个只在本地跑、数据随时能删的小工具，输入输出对得上就行，每个函数都吃透，投入产出比大概很低。可要是系统处理用户的钱、身份、隐私，或者公司的核心数据，测试全绿了也不能只看看页面能不能打开。

所以读代码只是验证手段之一，扛责任才是工程的本体。

> **代码不是产品。能被验证、看得见运行状态、出错后还能恢复的系统，才是产品。**

## AI 真能让程序员更快吗

直觉上，AI 写得比人快，项目就该完成得更快。研究结果没这么痛快。

2023 年有个关于 GitHub Copilot 的受控实验，让参与者用 JavaScript 实现一个 HTTP server，用 Copilot 的那组平均快了 55.8%。边界清楚、结果好判断的任务，AI 确实可能把实现时间压下来很多。

到了 2025 年，METR 找了 16 名熟悉大型开源项目的资深开发者，做随机对照实验。他们在自己长期维护的仓库里做了 246 个真实任务，用上当时的 AI 工具之后，完成时间反而多了约 19%。更有意思的是，开发者在实验前后都觉得 AI 让自己更快，实际记录偏偏显示相反。

2026 年 METR 的后续数据开始冒出加速的迹象，但研究团队自己也说，参与者和任务的选择偏差，加上并行跑 Agent 之后很难准确计时，这个数字已经没法好好解释了。

这几项研究互不矛盾，放一起看只说明一件事：

> **AI 能很快生成代码，不等于完整交付时间就缩短了。**

完整的账里还有一大堆活：给 AI 讲清上下文，等它输出再从里头筛，读关键改动，补测试、修错误，让代码合上现有架构，还得保证团队里别人也能接着维护。

所以再拿「生成了多少代码」衡量生产力就没意义了。该看的是从提出需求到结果被可靠验证，一共花了多久。

## 最怕的是它看起来很对

AI 生成一段编译不过的代码，一点都不吓人，错误立刻就暴露了。吓人的是另一种：代码能跑，测试能过，写法也像模像样，结果在极端输入、并发、权限或者安全边界上悄悄出错。

有一项被 ISSRE 2025 接收的大规模研究，比较了超过 50 万份 Python 和 Java 代码样本。在它的实验设置里，AI 代码整体更简单也更重复，更容易出现未使用的结构、硬编码的调试内容和高风险安全漏洞。人类代码也没好到哪去，结构更复杂，可维护性问题更多。

再看发表在 ACM CCS 2023 的一项用户研究，用 AI 助手做安全相关编程任务的参与者，整体写出了更不安全的代码，却更相信自己的答案是安全的。这点挺扎心的。

这背后有个比生成式 AI 还早的概念，叫**自动化偏误**。自动化系统给出一个看着可信的建议，人可能漏掉它没发现的问题，也可能直接接受它给的错误答案。新手会中招，专家也一样（别以为自己能免疫）。

所以「我大概扫了一遍」不一定算靠谱的审查。让生成代码的同一个 AI 来告诉你代码没问题，也算不上独立证据。

靠谱的做法是让验证尽量独立于生成过程。先写验收标准，再让 AI 去实现；用测试去执行行为，别光让 AI 口头解释行为；静态分析、依赖扫描和安全工具各查各的问题；权限、资金、数据写入、外部调用这几块交给人工审；真实环境里留好监控、灰度发布和快速回滚。

## 工作里的代码还是得看

以前我把这事分得很粗：自己的业余项目可以不看，公司的代码必须逐行看。

方向没错，但原因不止「公司会追责」。差别其实在三个地方。

个人玩具坏了，顶多浪费自己一个晚上，生产系统坏了，可能是用户流失、资金损失、数据泄露，或者合规问题。本地脚本只影响自己，公共服务的一次错误，可能同时砸到成千上万个用户。还有一个常被忘掉的点：现代代码审查不光为了找 bug，相关研究发现它还管着理解变更、传递知识、保持团队感知、寻找替代方案。

测试能证明某些行为符合预期，可它没法让同事知道为什么这么设计，也没法保证半年后团队还敢动这块代码。

## 我现在的答案

手写每一行代码的投入产出比ROI，我觉得还会继续往下掉。就像现代社会不要求每个人亲自种粮食，将来也不会要求每个做软件的人亲自实现所有细节。

人的注意力会往需求、架构、验证、运维、营销、交付和售后挪。认知科学管「借外部工具减轻脑子里的负担」叫认知卸载。卸载本身没毛病，要紧的是你还留着判断「这工具什么时候会翻车」的能力吗？

所以回到最开头那个问题，能不能完全不看 AI 写的代码。低风险、可回滚的个人项目，可以不逐行看。高风险的代码，要看关键实现，而且光靠看也不够。

**AI 可以替我写代码，替不了我扛责任。**

## 论文与研究资料

下面这些研究各自支撑文中的某个局部事实，并不直接证明「该采用哪一级审查」这个价值判断。风险分级的框架是我在这些证据上做的工程推论。

- Sida Peng, Eirini Kalliamvakou, Peter Cihon, Mert Demirer, 2023, [*The Impact of AI on Developer Productivity: Evidence from GitHub Copilot*](https://arxiv.org/abs/2302.06590)  
  支持什么：在限定的 JavaScript HTTP server 任务中，使用早期 GitHub Copilot 的实验组平均快 55.8%。不能外推为所有开发任务。

- Joel Becker, Nate Rush, Elizabeth Barnes, David Rein, 2025, [*Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*](https://arxiv.org/abs/2507.09089)  
  支持什么：资深开发者在熟悉的大型仓库完成真实任务时，使用 2025 年初 AI 工具平均慢约 19%，而主观上仍认为自己更快。结果是特定时期和场景的快照。

- Joel Becker et al., 2026, [*We Are Changing Our Developer Productivity Experiment Design*](https://metr.org/blog/2026-02-24-uplift-update/)  
  支持什么：后续数据出现加速迹象，但选择偏差和并行 Agent 计时问题使生产率幅度无法可靠估计。这是研究更新，不是同行评审论文。

- Domenico Cotroneo, Cristina Improta, Pietro Liguori, 2025, [*Human-Written vs. AI-Generated Code: A Large-Scale Study of Defects, Vulnerabilities, and Complexity*](https://arxiv.org/abs/2508.21634)  
  支持什么：在超过 50 万份 Python 和 Java 样本中，AI 代码更简单、更重复，但也呈现不同的缺陷和高风险漏洞分布。论文已被 ISSRE 2025 接收。

- Neil Perry, Megha Srivastava, Deepak Kumar, Dan Boneh, 2023, [*Do Users Write More Insecure Code with AI Assistants?*](https://arxiv.org/abs/2211.03622)  
  支持什么：在该用户研究的安全编程任务中，使用 AI 助手的参与者整体写出更不安全的代码，却更容易相信代码是安全的。发表于 ACM CCS 2023。

- Raja Parasuraman, Dietrich H. Manzey, 2010, [*Complacency and Bias in Human Use of Automation: An Attentional Integration*](https://pubmed.ncbi.nlm.nih.gov/21077562/)  
  支持什么：自动化偏误会造成遗漏和误采纳，在新手与专家中都可能出现，单靠训练和提醒不能完全消除。

- Alberto Bacchelli, Christian Bird, 2013, [*Expectations, Outcomes, and Challenges of Modern Code Review*](https://research.tudelft.nl/en/publications/expectations-outcomes-and-challenges-of-modern-code-review/)  
  支持什么：现代代码审查除了发现缺陷，还承担理解变更、知识传递、团队感知和寻找替代方案等作用。

- Evan F. Risko, Sam J. Gilbert, 2016, [*Cognitive Offloading*](https://doi.org/10.1016/j.tics.2016.07.002)  
  支持什么：人会借助外部工具降低认知负担，但关于何时卸载的元认知判断也可能失准。这是通用认知研究，不是 AI 编程实验。

- Abbas Sabra, Olivier Schmitt, Joseph Tyler, 2025, [*Assessing the Quality and Security of AI-Generated Code: A Quantitative Analysis*](https://arxiv.org/abs/2508.14727)  
  支持什么：在该研究的 4,442 份 Java 生成结果中，通过功能单测与静态分析发现的质量、安全问题之间没有直接相关。当前为 arXiv 预印本。
