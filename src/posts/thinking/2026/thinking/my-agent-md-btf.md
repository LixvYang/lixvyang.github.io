---
icon: material-symbols:menu-book-outline
date: 2026-08-24
isOriginal: true
category:
  - notes
tag:
  - AI
---

# 我的 AGENTS.md

我用 AI 写代码以后，经常遇到同样的话要说很多遍的情况。

- 别顺手重构无关代码
- 先读项目再改
- 修 bug 先复现,改完要跑测试
- 不要看到一个报错就猜原因,少写一层没用的抽象

问题是这些要求在一次对话 session 里有效，换个会话又要重说，说多了，我自己也会漏掉。

<!-- more -->


后来 2025 年底我开始维护一份 `AGENTS.md`。每次发现自己又在纠正同一个问题，就考虑把它写进去，再通过各个工具的入口文件交给 Agent。这样能省掉一轮又一轮的口头交代。

规则很具体：避免魔法数字、减少缩进、不要跨层调用、控制改动范围、修 bug 时先写测试,TDD优先。我把这些规则当作骨架，再补上自己使用 Agent 时反复遇到的问题。每个项目的烂摊子不同，规则也会继续变化。

## 我会把什么写进去

我现在更关心 Agent 怎么工作，代码格式排在后面。

我通常先要求它读。读目录结构、现有实现、测试和最近的改动。

很多烂的代码并非模型不会写，原因更简单：它还没看懂项目就动手了。

改动范围也要控制。完成一个功能时，只动和它有关的文件。顺手改命名、整理旧代码、升级依赖，很容易把一件小事做成一次没法审查的大改动。

做完以后留下依据。修 bug 要先复现；声称测试通过，要有刚刚运行过的结果；没有验证过的内容，直接说明没有验证。Agent 很擅长给出听起来完整的结论，这正是最容易被 AI 坑他爹的地方。

项目边界需要单独强调。UI 不要直接碰数据库，业务代码不要绕过已有服务去调用底层接口。模型为了尽快完成任务，常会走一条眼前最短的路，维护成本留给后人...

我还会加几条小规则：

- 优先沿用项目已有写法；
- 新增依赖前先说明理由；
- 不确定时把不确定说出来；
- 不擅自提交、推送或扩大任务范围；
- 注释解释原因，代码已经说清的内容不用再翻译一遍；
- 保留用户已有改动，不清理与当前任务无关的工作区。

这些算不上高深的内容。**真正有用的规则往往很朴素**，而且能检查。像“保持高质量”“遵循最佳实践”这种模糊的话， Agent 读完也不知道该做什么。

## 一份可以直接使用的 AGENTS.md

下面这份`AGENTS.md`可以直接放进项目根目录，再按项目情况删改。

```md
# AGENTS.md

## Communication

- When writing comments, commit messages, or replies, use as few words as possible. Pick each word carefully. Get to the point.
- Avoid superlatives, praise, and automatic agreement. Give the user the facts, trade-offs, and uncertainty.
- State assumptions when requirements are incomplete.
- Ask only when a missing answer would materially change the result or create risk.

## Before changing anything

- Read the relevant code, tests, configuration, documentation, and recent changes first.
- Check the working tree and preserve all existing user changes.
- Follow the project's current structure, naming, and tooling.
- Identify the smallest coherent set of files needed for the task.

## Code style

- Avoid magic numbers and strings. Extract recurring or meaningful values into descriptive constants or enums. Keep self-explanatory one-off values inline. If a value comes from a specification, use a named constant even when it appears once.
- Reduce indentation. Avoid the Arrow Anti-Pattern. Use early returns and `continue` where they make the flow clearer.
- Keep function names under 30 characters.
- Use enums or descriptive types instead of booleans for function parameters.
- Add empty lines between logical blocks so the code can breathe.
- Add short comments that explain what a block does and why it exists. Use examples when useful. Propose ASCII diagrams when they make a complete system easier to understand.
- Always use braces, including one-line `if`, `else`, `for`, and `while` statements.
- Handle errors explicitly. Do not hide failures with empty catches or silent fallbacks.

## API and architecture

- Treat member visibility changes as design changes. Keep fields and functions private unless external access is required. Ask for explicit approval before changing an access modifier from private to internal or public.
- Program to levels of abstraction. Encapsulate low-level mechanics such as hardware I/O, sector parsing, raw database access, and socket streams behind a dedicated driver or abstraction layer. Expose domain-level APIs to the rest of the application.
- Respect the layered boundary hierarchy. A layer may communicate directly only with its immediate neighbor below. Do not let controllers or UI components call database queries, hardware drivers, or low-level network clients directly.
- Do not change unrelated code. Do not add comments, rename symbols, reformat files, or refactor blocks outside the requested work. Minimize the number of changed lines.
- Do not add or upgrade dependencies unless the task requires it. Explain the reason first.
- Do not change public APIs, access levels, data formats, or architectural boundaries without explicit approval.

## Bug fixes

- Reproduce the reported bug before changing the implementation.
- Write or update a test that demonstrates the bug.
- Run the test and observe it fail for the expected reason.
- Write the fix.
- Run the new test and observe it pass.
- Run the relevant existing tests and check nearby edge cases.

## Verification

- Run the narrowest relevant checks during development.
- Before completion, run the appropriate tests, lint, type-check, and build commands available in the project.
- Read the full command output before reporting the result.
- Do not claim a check passed without fresh output from that check.
- If a check cannot be run, state which check was skipped and why.

## Commit messages

When asked to write a commit message, follow these rules:

1. Separate the subject from the body with one blank line.
2. Limit the subject to 50 characters. Treat 72 characters as the hard limit.
3. Capitalize the first letter of the subject.
4. Do not end the subject with a period.
5. Use the imperative mood. It should complete: "If applied, this commit will ..."
6. Wrap the body manually at 72 characters.
7. Use the body to explain what changed and why. Let the code explain how.

## Safety and Git

- Do not delete, overwrite, or discard user data or local changes.
- Avoid destructive commands unless the user explicitly requested them and the exact target has been verified.
- Do not commit, push, merge, rebase, publish, deploy, or open a pull request unless asked.
- Do not expose credentials, tokens, private keys, personal data, or environment files.

## Completion

- Summarize what changed and why.
- List the verification commands run and their results.
- Mention any remaining risk, skipped check, or follow-up the user needs to know.
```

测试命令、目录结构、技术栈约束和部署方式，应该由使用者继续补充。有些工具默认寻找 `AGENTS.md`（复数），遇到这种情况可以直接改名；下面的 Claude Code 和 Gemini CLI 方案继续使用 `AGENTS.md` 作为公共文件。

## 只维护一份

不同工具认的文件名不同。Claude Code 默认读取 `CLAUDE.md`，Gemini CLI 默认读取 `GEMINI.md`。如果三份文件各写一遍，很快就会出现三个版本。

我的做法是让 `AGENTS.md` 保存公共规则，另外两份文件只负责引用它。

`CLAUDE.md`：

```md
@AGENTS.md
```

`GEMINI.md`：

```md
@AGENTS.md
```

Claude Code 官方文档说明了 `CLAUDE.md` 的文件导入语法，也直接给出了引用 `AGENTS.md` 的用法。Gemini CLI 的 Memory Import Processor 同样支持在 `GEMINI.md` 中通过 `@file.md` 导入其他文件。

这样一来，公共规则只改一处。某个工具确实需要单独说明时，再写在对应文件的引用下面。公共部分和工具差异不会混在一起。

## 文件越长，效果未必越好

规则会积累。踩一次坑加一条，几个月后就可能堆成一份没人愿意读的长文，模型也未必能稳定遵守。

我给自己留了几个限制：

1. 同一个问题重复出现，再考虑加入。
2. 能从代码、配置或测试里直接看出来的内容，不重复写。
3. 只对某个目录生效的规则，放到那个目录附近。
4. 很长的操作流程单独存放，需要时再引用。
5. 定期删除失效、重复和互相冲突的内容。

长对话还有上下文稀释的问题。会话进行得越久，早先加载的规则越容易失去作用。一个功能开一个会话通常更省事。发现 Agent 开始偏离时，我会让它重新读取 `AGENTS.md`，然后继续。

## 它替代不了代码审查

有了规则，AI 仍会误解需求、编造不存在的接口，也会用一段看似合理的解释掩盖错误实现。我依然要看 diff、跑测试、检查架构。

变化在于，我花在低级重复问题上的时间少了。

## 从第二次纠正开始记录

我现在这样维护：第一次出错，纠正它；第二次又出现，看看能否写成一条清楚、可检查的规则；旧规则没用，就改掉或删掉。

用久以后，`AGENTS.md` 会留下一个项目真实在意的东西。代码格式只占很小一部分，更多内容来自过去的事故、审查习惯和架构取舍。新同事读它也有用，因为这里收集了许多代码里看不出来的约束。

它需要持续维护。项目在变，工具在变，我对“好代码”的判断也会变。文件跟着改就行。

## 参考资料

- [My AGENTS.md to improve LLM-assisted code quality](https://fabiensanglard.net/AGENTS.md/index.html)
- [Claude Code：How Claude remembers your project](https://code.claude.com/docs/en/memory#import-additional-files)
- [Gemini CLI：Memory Import Processor](https://geminicli.com/docs/reference/memport/)
- [AGENTS.md](https://agents.md)
