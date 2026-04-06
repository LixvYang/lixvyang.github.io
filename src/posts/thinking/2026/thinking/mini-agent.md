---
icon: material-symbols:menu-book-outline
date: 2026-04-05
isOriginal: true
category:
  - notes
tag:
  - AI
  - Agent
  - Go
---

我用Agent写了一个Mini Agent...

<!-- more -->

# 从零理解 Agent，再到 miniagent 与 Claude Code 的实现对比

> 最近用 Agent（Claude Code）写了一个 mini agent，这篇文章回顾一下这个过程，顺便聊聊 Agent 的核心概念，以及 miniagent 和 Claude Code 在实现思路上的异同。

---

## 一、什么是 Agent？

"Agent" 这个词被用烂了。它可以指一段带 for 循环的 LLM 调用，也可以指复杂的多智能体协作系统。这里我们只讨论最核心的定义：

**Agent = 感知 + 推理 + 行动 + 记忆的循环体**

更具体地说，一个 Agent 的基本要素包括：

### 1. ReAct 循环（Reasoning + Acting）

Agent 最经典的执行模式是 ReAct：

```
用户输入
  → LLM 推理（Thought）
  → 工具调用（Action）
  → 工具返回（Observation）
  → LLM 继续推理
  → ... 循环
  → 最终回答（Final Answer）
```

这个循环让 LLM 从"一次性问答"变成了"持续迭代解决问题"的系统。

### 2. Tool Calling（工具调用）

工具是 Agent 与外部世界交互的桥梁。没有工具，LLM 只是一个文字游戏机；有了工具，它可以：

- 读写文件系统
- 执行 Shell 命令
- 发起 HTTP 请求
- 操作数据库
- 调用其他 API

现代 LLM（GPT-4、Claude、DeepSeek 等）都原生支持 Function Calling，Agent 框架的核心工作之一就是管理这套工具注册与调度机制。

### 3. Memory（记忆）

Agent 需要记忆才能在多轮对话和跨任务场景下保持连贯性。记忆通常分为几层：

| 层级 | 描述 | 存储形式 |
|------|------|----------|
| 上下文窗口 | 当前对话的即时记忆 | LLM context |
| 短期记忆 | 本次 session 的摘要 | 文件 / 数据库 |
| 长期记忆 | 跨 session 的持久知识 | 结构化文件 / 向量数据库 |

### 4. Planning（规划）

复杂任务需要先规划再执行。规划能力让 Agent 把"写一个完整功能"这种大任务分解成可执行的步骤序列，而不是盲目地一步步试错。

### 5. Guardrails（安全护栏）

Agent 能执行真实操作，因此安全是绕不开的话题：

- 哪些工具需要用户确认？
- 哪些 HTTP 地址可以访问？
- 输出内容如何脱敏？
- 同一个工具调用多少次才算异常？

护栏系统是生产级 Agent 的必备组件。

---

## 二、miniagent：用 Go 写一个最小可用的 Agent Runtime

### 项目背景

miniagent 是我用 Claude Code 辅助写的一个 Go 项目，目标是实现一个**小而完整**的本地优先 Agent 运行时：

> A small Go-based AI agent runtime with planning, tools, memory, skills, and guardrails.

项目地址：[github.com/LixvYang/miniagent](https://github.com/LixvYang/miniagent)

### 核心设计原则

miniagent 刻意保持克制：

- **Small Go core**：代码量小，易读、易改、易嵌入
- **Provider-flexible**：兼容 OpenAI-compatible API，可接 OpenAI、DeepSeek 等
- **Local-first safety**：工作区边界、HTTP 守卫、审批钩子内置
- **Structured runtime**：planner、tools、memory、sessions、skills、guardrails 各自独立分包

### 项目结构

```text
cmd/miniagent/          CLI 入口
internal/agent/         主执行循环
internal/config/        YAML + 环境变量配置
internal/guard/         集中式守卫策略与审批存储
internal/llm/           模型抽象层
internal/llm/openai/    OpenAI-compatible 客户端
internal/memory/        日志、投影、草稿、Prompt 注入
internal/planner/       运行时计划状态与渲染
internal/session/       多轮对话历史
internal/skills/        SKILL 发现、frontmatter、选择、安装
internal/tools/         内置工具与注册表
skills/                 默认内置 skill 集合
```

### 执行流程：Plan-First Loop

miniagent 采用了一个 **plan-first** 的执行模型，这是它区别于简单 ReAct 实现的关键设计：

```
用户输入任务
  → LLM 必须先调用 plan_create（不能跳过）
  → 生成简洁可执行的计划
  → 按步骤执行工具
  → 每个成功的工具调用自动推进计划步骤
  → 完成后输出最终答案
  → （可选）-show-plan 展示计划执行状态
```

这个设计强制让模型先思考后行动，避免了"直接乱调工具"的问题。

### 内置工具集

```
plan_create   创建执行计划（必须首先调用）
get_time      获取当前时间
remember      写入记忆
recall        读取记忆
list_skills   列出可用 skills
read_file     读取文件
write_file    写入文件
run_shell     执行 Shell 命令
http_get      发起 HTTP GET 请求
```

### 记忆系统

记忆存储在本地文件系统，结构清晰：

```text
memory/
  log/events.jsonl          追加写入的事件日志（Event Sourcing）
  log/checkpoint.json       投影检查点
  long_term.json            持久化长期记忆
  index.md                  长期记忆的可读索引
  YYYY-MM-DD/<session>.md   短期 session 摘要
  sessions/<session>.json   原始对话历史
```

流程是：任务完成 → 追加 MemoryEvent → 后台 projection worker → LLM 生成摘要草稿 → 更新短期/长期读模型 → 注入到下次运行的 Prompt。

### Skills 系统

Skills 是通过 `SKILL.md` 文件定义的可复用指令集，格式和 Claude Code 的 skills 体系完全一致（frontmatter + Markdown body）：

```bash
# 使用指定 skill
go run ./cmd/miniagent run --skill planning "Plan a refactor"

# 安装远程 skill
go run ./cmd/miniagent skills install https://github.com/example/SKILL.md

# 在 prompt 中引用 skill
go run ./cmd/miniagent run "Use $memory before answering"
```

### 护栏系统

守卫层统一管理所有安全策略：

- 指定工具执行前需要用户审批
- 单次运行内禁止重复工具调用
- 每个工具的调用次数上限（防止循环）
- HTTP 白名单、私有 IP 拦截、重定向策略
- 工具观察结果和最终回复的脱敏

```bash
# 列出所有守卫规则
go run ./cmd/miniagent guard list

# 审批某次工具调用
go run ./cmd/miniagent guard approve <approval-id>
```

### 快速上手

```bash
export MINIAGENT_MODEL_NAME=deepseek-chat
export MINIAGENT_MODEL_BASE_URL=https://api.deepseek.com/v1
export MINIAGENT_MODEL_API_KEY=your_api_key

# 一次性任务
go run ./cmd/miniagent run -show-plan "检查当前项目并生成摘要"

# 多轮对话
go run ./cmd/miniagent chat -session demo
```

---

## 三、对比：miniagent vs Claude Code 的实现思路

[claude-code-docs](https://github.com/anneheartrecord/claude-code-docs) 是一份对 Claude Code 客户端源码的深度技术分析文档，原始代码通过 npm 包的 sourcemap 意外泄露。515,498 行 TypeScript，2766 个文件，记录了一个生产级 Agent 的完整实现。

下面从几个维度对比两者的思路差异：

### 1. 执行循环的技术实现

| | miniagent | Claude Code |
|---|---|---|
| 循环模式 | Plan-First ReAct，Go for 循环 | 6 阶段 ReAct，TypeScript AsyncGenerator |
| 规划约束 | 强制 `plan_create` 作为第一个工具调用 | 无强制，依赖模型能力自主规划 |
| 状态管理 | 函数参数传递 | 7 个核心变量 + 不可变更新（每轮 `{...state}`） |
| 流式输出 | 暂不支持（返回完整结果） | AsyncGenerator yield 逐 token 输出 |
| 子 Agent | 无 | fork 机制（Skill Agent、Compact Agent、Session Memory Agent） |

Claude Code 用 **AsyncGenerator** 构建主循环是一个关键选型——它天然支持"执行到一半暂停、把中间结果交出去、等外面处理完再继续"，让流式输出、实时审批、工具并发可以统一在同一套机制下实现。miniagent 用简单的 Go for 循环，清晰够用，但没有流式能力。

Claude Code 还实现了 **Agent fork 机制**：执行 Skill、生成压缩摘要、沉淀 session memory 时，都会 fork 出独立子 Agent，拥有独立 token 预算和消息历史，避免污染主 Agent 上下文。fork 的子 Agent 还会与父 Agent 共享 Prompt Cache（CacheSafeParams 机制），复用缓存降低 API 成本。

### 2. 记忆架构

| | miniagent | Claude Code |
|---|---|---|
| 指令记忆 | 无（靠 System Prompt 硬编码） | CLAUDE.md 五层体系（全局管理 → 用户 → 项目 → 本地 → 自动） |
| 记忆组织 | 单层文件 | `@include` 指令支持模块化拆分，支持 200+ 文件类型，防循环引用 |
| 长期记忆写入 | 手动调用 `remember` 工具 | Agent 自主写入 MEMORY.md（最多 200 行/25KB，系统级约束） |
| 短期记忆 | session 摘要文件 | Session Memory，与压缩系统深度集成 |
| 上下文压缩 | 无 | 3 层递进：微压缩 → Session Memory 沉淀 → Full Compact 摘要 |

Claude Code 的记忆系统最有意思的设计有两个：

**CLAUDE.md 五层覆盖**的逻辑和 CSS 层叠、Git 配置层级一脉相承——越具体的配置优先级越高，本地覆盖全局。团队可以把公司规范放全局级、项目约定放项目级、个人偏好放本地级，互不干扰。

**MEMORY.md 是 Agent 自己写给自己看的**，和人写给 Agent 看的 CLAUDE.md 严格区分。所有记忆最终拼接注入 system prompt，还附带显式的 `OVERRIDE` 声明，防止模型的预训练默认行为盖过用户配置。

miniagent 目前没有等价的多层指令记忆机制，这是两者最大的功能差距之一。

### 3. 工具系统

| | miniagent | Claude Code |
|---|---|---|
| 工具数量 | 9 个 | 40+（部分通过 feature flag 控制） |
| 工具协议 | OpenAI Function Calling | 自定义协议 + MCP（6 种传输类型） |
| 工具粒度 | 通用（`run_shell` 涵盖大部分操作） | 精细化拆分（`GlobTool`/`GrepTool`/`FileEditTool`/`FileWriteTool` 各司其职） |
| 执行方式 | 串行 | 并行（`Promise.all`，多工具同时运行） |
| 错误隔离 | 单一 error 返回 | 每个工具独立 try/catch，单个失败不影响其他并行工具 |
| 扩展方式 | 代码层注册 | MCP server（任意语言实现） |

值得关注的是 Claude Code 把**文件编辑和文件写入分成两个工具**：`FileEditTool` 做精确字符串替换，`FileWriteTool` 做整文件写入。修改一个 1000 行文件中的 3 行时，Agent 只需发那 3 行的 diff，而不是整个文件——同时节省 token 和降低出错率。

工具数量越多，模型选错的概率也越高。Claude Code 用精心设计的工具描述和 system prompt 使用指南来缓解这个问题，这本身也是一个持续调优的工程方向。miniagent 工具少，但好处是模型选择简单，出错率低。

### 4. 安全模型

| | miniagent | Claude Code |
|---|---|---|
| 权限模式 | 单一审批流 | 三种模式：default（全人工）/ auto（ML 分类器）/ plan（规划置信度） |
| 危险命令拦截 | 重复调用限制 + 循环次数上限 | 42 条硬编码 bash 危险模式（python、node、eval、curl 等） |
| 智能分类 | 无 | YOLO 分类器：side-query Claude 模型评估命令安全性 + 置信度评分 |
| 模式切换安全 | 不适用 | Dangerous Rule Stripping：切换到 auto 模式时自动剥离可能被绕过的 allow 规则 |
| 文件系统沙箱 | 工作区边界限制 | 路径校验 + 路径穿越防护 + `.git`/`.claude` 目录保护 |
| 行为学习 | 无 | Denial Tracking：记录用户拒绝模式，自适应调整后续权限策略 |
| 审批时机 | CLI 审批，先批准再重跑任务 | 实时阻塞，审批后继续当前执行 |

Claude Code 权限系统是整个代码库**规模最大的单一模块**，超过 6300 行代码分布在 25 个文件里。几个值得单独说的设计：

**YOLO 分类器**：名字来自"You Only Live Once"，实现在 `yoloClassifier.ts`，把即将执行的 bash 命令发给 Claude 模型判断安全性，需要 Opus 4.6 以上版本支持。这意味着 Claude Code 的安全判断本身也在消耗 LLM 调用。

**Dangerous Rule Stripping**：从 default 切换到 auto 模式时，系统会主动清除之前配置的涉及危险模式的 allow 规则。防止用户在 default 模式下为方便加了 `Bash(python *)` 的 allow，切到 auto 后被分类器自动放行绕过 42 条拦截规则。这是防御性编程的典型案例：不信任上游配置在所有场景都是安全的。

miniagent 的安全模型轻量很多，规则透明，适合明确边界的本地任务。Claude Code 的安全是多层纵深防御，防御面广但规则不透明。

### 5. Skills 执行机制

两者的 Skills 格式完全一致（`SKILL.md` + YAML frontmatter），但执行机制有本质区别：

| | miniagent | Claude Code |
|---|---|---|
| 执行方式 | 将 SKILL.md 内容注入主 Agent 上下文 | fork 出独立子 Agent 执行 |
| 上下文隔离 | 无，共享主 Agent 消息历史 | 子 Agent 有独立 token 预算和消息历史 |
| 工具限制 | 继承主 Agent 所有工具 | 子 Agent 只能用安全工具子集（不能访问权限管理、MCP 配置等敏感工具） |
| 加载策略 | 启动时注入 metadata，按需读全文 | 两阶段：先只注入 description，确定选用后再读完整 SKILL.md |
| 容量限制 | 无 | system prompt 最多列 150 个 Skill，总字符预算 30,000 |

Claude Code 的**两阶段加载**很关键：Agent 选 Skill 时只看 description，不加载全文，避免把所有 Skill 的完整内容塞进 system prompt 爆掉上下文。子 Agent fork 执行则保证一个 Skill 的问题不会影响主 Agent。miniagent 目前是直接注入，在 Skill 数量多时会有上下文压力。

### 6. 定位差异

| | miniagent | Claude Code |
|---|---|---|
| 目标场景 | 本地自动化、嵌入业务系统、学习 Agent 实现 | 软件工程任务、大规模代码操作 |
| 语言 | Go | TypeScript |
| 代码规模 | 小（易读易改） | 超大（515K 行） |
| provider 支持 | OpenAI-compatible（OpenAI、DeepSeek 等） | 主要绑定 Claude API |
| 上下文压缩 | 无 | 三层自动压缩 |
| 记忆层级 | 单层 | 五层 CLAUDE.md + MEMORY.md |
| 开放程度 | 开源（计划中） | 源码泄露分析 |

---

## 四、用 Agent 写 Agent 的感受

这次用 Claude Code 写 miniagent 的体验很有意思：用一个 Agent 来构建另一个 Agent，在实现记忆系统时能直接"感受"到当前 Agent 的记忆是怎么工作的，在设计 skills 时能对照 Claude Code 的 skills 机制来借鉴。

几个值得记录的点：

1. **Plan-First 约束的价值**：强制规划让 Agent 的执行过程更可预测，也更容易调试。Claude Code 没有这个硬约束，但 Claude 模型足够强大，通常会自己规划。对于较弱的模型（如 deepseek-chat），强制规划显著提升了任务完成质量。

2. **Event Sourcing 适合记忆系统**：记忆天然是追加写入的，用事件日志 + 投影的模式比直接 CRUD 更稳健，也更容易做 time-travel 调试。

3. **工具越少越好**：miniagent 只有 9 个工具，但足够覆盖大多数本地任务。工具太多会让模型选择困难，增加 token 消耗。

4. **安全要内置，不要靠约定**：HTTP 私有 IP 拦截、重复调用限制这些守卫，必须在框架层实现，不能依赖"模型不会调用危险工具"的假设。

---

## 五、总结

Agent 的核心是一个感知-推理-行动的循环，但从 demo 到生产，中间有大量工程细节要填：记忆管理、规划约束、工具安全、上下文压缩……

miniagent 是对这些细节的一次最小化实现，Go 写的，代码量小，适合学习和嵌入。Claude Code 是生产级的参考实现，规模更大，功能更完整。

两者最有趣的交集在 skills 系统——一套通过 Markdown 文件扩展 Agent 行为的轻量机制，简单但有效。
