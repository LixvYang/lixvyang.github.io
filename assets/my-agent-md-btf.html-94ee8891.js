import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as d,b as e,d as n,a,f as c,e as i}from"./app-584b6577.js";const r={},p={id:"我的-agent-md",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#我的-agent-md","aria-hidden":"true"},"#",-1),m={href:"http://AGENT.md",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"我用 AI 写代码以后，经常遇到同样的话要说很多遍的情况。",-1),h=e("ul",null,[e("li",null,"别顺手重构无关代码"),e("li",null,"先读项目再改"),e("li",null,"修 bug 先复现,改完要跑测试"),e("li",null,"不要看到一个报错就猜原因,少写一层没用的抽象")],-1),b=e("p",null,"问题是这些要求在一次对话 session 里有效，换个会话又要重说，说多了，我自己也会漏掉。",-1),k=i('<p>后来 2025 年底我开始维护一份 <code>AGENT.md</code>。每次发现自己又在纠正同一个问题，就考虑把它写进去，再通过各个工具的入口文件交给 Agent。这样能省掉一轮又一轮的口头交代。</p><p>规则很具体：避免魔法数字、减少缩进、不要跨层调用、控制改动范围、修 bug 时先写测试,TDD优先。我把这些规则当作骨架，再补上自己使用 Agent 时反复遇到的问题。每个项目的烂摊子不同，规则也会继续变化。</p><h2 id="我会把什么写进去" tabindex="-1"><a class="header-anchor" href="#我会把什么写进去" aria-hidden="true">#</a> 我会把什么写进去</h2><p>我现在更关心 Agent 怎么工作，代码格式排在后面。</p><p>我通常先要求它读。读目录结构、现有实现、测试和最近的改动。</p><p>很多烂的代码并非模型不会写，原因更简单：它还没看懂项目就动手了。</p><p>改动范围也要控制。完成一个功能时，只动和它有关的文件。顺手改命名、整理旧代码、升级依赖，很容易把一件小事做成一次没法审查的大改动。</p><p>做完以后留下依据。修 bug 要先复现；声称测试通过，要有刚刚运行过的结果；没有验证过的内容，直接说明没有验证。Agent 很擅长给出听起来完整的结论，这正是最容易被 AI 坑他爹的地方。</p><p>项目边界需要单独强调。UI 不要直接碰数据库，业务代码不要绕过已有服务去调用底层接口。模型为了尽快完成任务，常会走一条眼前最短的路，维护成本留给后人...</p><p>我还会加几条小规则：</p><ul><li>优先沿用项目已有写法；</li><li>新增依赖前先说明理由；</li><li>不确定时把不确定说出来；</li><li>不擅自提交、推送或扩大任务范围；</li><li>注释解释原因，代码已经说清的内容不用再翻译一遍；</li><li>保留用户已有改动，不清理与当前任务无关的工作区。</li></ul><p>这些算不上高深的内容。<strong>真正有用的规则往往很朴素</strong>，而且能检查。像“保持高质量”“遵循最佳实践”这种模糊的话， Agent 读完也不知道该做什么。</p>',12),f={id:"agent-md-是怎么生效的",tabindex:"-1"},g=e("a",{class:"header-anchor",href:"#agent-md-是怎么生效的","aria-hidden":"true"},"#",-1),w={href:"http://AGENT.md",target:"_blank",rel:"noopener noreferrer"},_=i(`<p>先说一个容易误解的地方：<code>AGENT.md</code> 不是所有工具都会自动识别的标准文件名。它在这套方案里承担公共规则文件的角色。</p><p>Claude Code 启动时寻找 <code>CLAUDE.md</code>，Gemini CLI 寻找 <code>GEMINI.md</code>。工具读到其中的 <code>@AGENT.md</code> 后，会继续读取同目录下的 <code>AGENT.md</code>，展开文件内容，再把它连同当前任务、对话记录和相关代码一起交给模型。</p><p>过程大致是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>用户提出任务
    ↓
Claude Code / Gemini CLI 读取入口文件
    ↓
入口文件通过 @AGENT.md 引入公共规则
    ↓
工具把规则放进模型的上下文
    ↓
模型根据任务和规则决定下一步操作
    ↓
工具执行读文件、改代码、跑测试等操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模型每次生成回复或决定调用工具时，都能看到这份上下文。因此，<code>AGENT.md</code> 可以长期提供几类信息：</p><ul><li>项目的目录、架构和常用命令；</li><li>编码习惯与禁止触碰的边界；</li><li>修 bug、写测试和完成验证的步骤；</li><li>Git、发布和删除文件等操作的权限约束；</li><li>完成任务时应该交付哪些信息。</li></ul><p>它仍是一组文字指令。工具不会把每一条规则编译成强制检查，模型也可能漏读、误解或者在长对话里逐渐偏离。真正需要强制执行的内容，应该继续放在测试、Lint、类型检查、CI、权限系统和 Git 保护规则里。</p><p>根目录里的文件适合放整个项目都要遵守的内容。大型项目可以在子目录增加更具体的入口文件，让局部规则只在处理那部分代码时出现。公共文件改动后，最好开启新会话，或者让当前 Agent 重新读取相关文件。</p><p>如果使用的工具原生寻找 <code>AGENTS.md</code>，可以把公共文件直接命名为 <code>AGENTS.md</code>。本文保留 <code>AGENT.md</code>，再通过 <code>CLAUDE.md</code> 和 <code>GEMINI.md</code> 引入它，方便展示一份规则如何同时供多个工具使用。</p>`,9),A={id:"一份可以直接使用的-agent-md",tabindex:"-1"},y=e("a",{class:"header-anchor",href:"#一份可以直接使用的-agent-md","aria-hidden":"true"},"#",-1),x={href:"http://AGENT.md",target:"_blank",rel:"noopener noreferrer"},E=i(`<p>下面这份<code>AGENTS.md</code>可以直接放进项目根目录，再按项目情况删改。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> AGENT.md</span>

<span class="token title important"><span class="token punctuation">##</span> Communication</span>

<span class="token list punctuation">-</span> When writing comments, commit messages, or replies, use as few words as possible. Pick each word carefully. Get to the point.
<span class="token list punctuation">-</span> Avoid superlatives, praise, and automatic agreement. Give the user the facts, trade-offs, and uncertainty.
<span class="token list punctuation">-</span> State assumptions when requirements are incomplete.
<span class="token list punctuation">-</span> Ask only when a missing answer would materially change the result or create risk.

<span class="token title important"><span class="token punctuation">##</span> Before changing anything</span>

<span class="token list punctuation">-</span> Read the relevant code, tests, configuration, documentation, and recent changes first.
<span class="token list punctuation">-</span> Check the working tree and preserve all existing user changes.
<span class="token list punctuation">-</span> Follow the project&#39;s current structure, naming, and tooling.
<span class="token list punctuation">-</span> Identify the smallest coherent set of files needed for the task.

<span class="token title important"><span class="token punctuation">##</span> Code style</span>

<span class="token list punctuation">-</span> Avoid magic numbers and strings. Extract recurring or meaningful values into descriptive constants or enums. Keep self-explanatory one-off values inline. If a value comes from a specification, use a named constant even when it appears once.
<span class="token list punctuation">-</span> Reduce indentation. Avoid the Arrow Anti-Pattern. Use early returns and <span class="token code-snippet code keyword">\`continue\`</span> where they make the flow clearer.
<span class="token list punctuation">-</span> Keep function names under 30 characters.
<span class="token list punctuation">-</span> Use enums or descriptive types instead of booleans for function parameters.
<span class="token list punctuation">-</span> Add empty lines between logical blocks so the code can breathe.
<span class="token list punctuation">-</span> Add short comments that explain what a block does and why it exists. Use examples when useful. Propose ASCII diagrams when they make a complete system easier to understand.
<span class="token list punctuation">-</span> Always use braces, including one-line <span class="token code-snippet code keyword">\`if\`</span>, <span class="token code-snippet code keyword">\`else\`</span>, <span class="token code-snippet code keyword">\`for\`</span>, and <span class="token code-snippet code keyword">\`while\`</span> statements.
<span class="token list punctuation">-</span> Handle errors explicitly. Do not hide failures with empty catches or silent fallbacks.

<span class="token title important"><span class="token punctuation">##</span> API and architecture</span>

<span class="token list punctuation">-</span> Treat member visibility changes as design changes. Keep fields and functions private unless external access is required. Ask for explicit approval before changing an access modifier from private to internal or public.
<span class="token list punctuation">-</span> Program to levels of abstraction. Encapsulate low-level mechanics such as hardware I/O, sector parsing, raw database access, and socket streams behind a dedicated driver or abstraction layer. Expose domain-level APIs to the rest of the application.
<span class="token list punctuation">-</span> Respect the layered boundary hierarchy. A layer may communicate directly only with its immediate neighbor below. Do not let controllers or UI components call database queries, hardware drivers, or low-level network clients directly.
<span class="token list punctuation">-</span> Do not change unrelated code. Do not add comments, rename symbols, reformat files, or refactor blocks outside the requested work. Minimize the number of changed lines.
<span class="token list punctuation">-</span> Do not add or upgrade dependencies unless the task requires it. Explain the reason first.
<span class="token list punctuation">-</span> Do not change public APIs, access levels, data formats, or architectural boundaries without explicit approval.

<span class="token title important"><span class="token punctuation">##</span> Bug fixes</span>

<span class="token list punctuation">-</span> Reproduce the reported bug before changing the implementation.
<span class="token list punctuation">-</span> Write or update a test that demonstrates the bug.
<span class="token list punctuation">-</span> Run the test and observe it fail for the expected reason.
<span class="token list punctuation">-</span> Write the fix.
<span class="token list punctuation">-</span> Run the new test and observe it pass.
<span class="token list punctuation">-</span> Run the relevant existing tests and check nearby edge cases.

<span class="token title important"><span class="token punctuation">##</span> Verification</span>

<span class="token list punctuation">-</span> Run the narrowest relevant checks during development.
<span class="token list punctuation">-</span> Before completion, run the appropriate tests, lint, type-check, and build commands available in the project.
<span class="token list punctuation">-</span> Read the full command output before reporting the result.
<span class="token list punctuation">-</span> Do not claim a check passed without fresh output from that check.
<span class="token list punctuation">-</span> If a check cannot be run, state which check was skipped and why.

<span class="token title important"><span class="token punctuation">##</span> Commit messages</span>

When asked to write a commit message, follow these rules:

<span class="token list punctuation">1.</span> Separate the subject from the body with one blank line.
<span class="token list punctuation">2.</span> Limit the subject to 50 characters. Treat 72 characters as the hard limit.
<span class="token list punctuation">3.</span> Capitalize the first letter of the subject.
<span class="token list punctuation">4.</span> Do not end the subject with a period.
<span class="token list punctuation">5.</span> Use the imperative mood. It should complete: &quot;If applied, this commit will ...&quot;
<span class="token list punctuation">6.</span> Wrap the body manually at 72 characters.
<span class="token list punctuation">7.</span> Use the body to explain what changed and why. Let the code explain how.

<span class="token title important"><span class="token punctuation">##</span> Safety and Git</span>

<span class="token list punctuation">-</span> Do not delete, overwrite, or discard user data or local changes.
<span class="token list punctuation">-</span> Avoid destructive commands unless the user explicitly requested them and the exact target has been verified.
<span class="token list punctuation">-</span> Do not commit, push, merge, rebase, publish, deploy, or open a pull request unless asked.
<span class="token list punctuation">-</span> Do not expose credentials, tokens, private keys, personal data, or environment files.

<span class="token title important"><span class="token punctuation">##</span> Completion</span>

<span class="token list punctuation">-</span> Summarize what changed and why.
<span class="token list punctuation">-</span> List the verification commands run and their results.
<span class="token list punctuation">-</span> Mention any remaining risk, skipped check, or follow-up the user needs to know.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试命令、目录结构、技术栈约束和部署方式，应该由使用者继续补充。有些工具默认寻找 <code>AGENTS.md</code>（复数），遇到这种情况可以直接改名；下面的 Claude Code 和 Gemini CLI 方案继续使用 <code>AGENT.md</code> 作为公共文件。</p><h2 id="只维护一份" tabindex="-1"><a class="header-anchor" href="#只维护一份" aria-hidden="true">#</a> 只维护一份</h2><p>不同工具认的文件名不同。Claude Code 默认读取 <code>CLAUDE.md</code>，Gemini CLI 默认读取 <code>GEMINI.md</code>。如果三份文件各写一遍，很快就会出现三个版本。</p><p>我的做法是让 <code>AGENT.md</code> 保存公共规则，另外两份文件只负责引用它。</p><p><code>CLAUDE.md</code>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>@AGENT.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>GEMINI.md</code>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>@AGENT.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Claude Code 官方文档说明了 <code>CLAUDE.md</code> 的文件导入语法，也直接给出了引用 <code>AGENTS.md</code> 的用法。Gemini CLI 的 Memory Import Processor 同样支持在 <code>GEMINI.md</code> 中通过 <code>@file.md</code> 导入其他文件。</p><p>这样一来，公共规则只改一处。某个工具确实需要单独说明时，再写在对应文件的引用下面。公共部分和工具差异不会混在一起。</p><h2 id="文件越长-效果未必越好" tabindex="-1"><a class="header-anchor" href="#文件越长-效果未必越好" aria-hidden="true">#</a> 文件越长，效果未必越好</h2><p>规则会积累。踩一次坑加一条，几个月后就可能堆成一份没人愿意读的长文，模型也未必能稳定遵守。</p><p>我给自己留了几个限制：</p><ol><li>同一个问题重复出现，再考虑加入。</li><li>能从代码、配置或测试里直接看出来的内容，不重复写。</li><li>只对某个目录生效的规则，放到那个目录附近。</li><li>很长的操作流程单独存放，需要时再引用。</li><li>定期删除失效、重复和互相冲突的内容。</li></ol><p>长对话还有上下文稀释的问题。会话进行得越久，早先加载的规则越容易失去作用。一个功能开一个会话通常更省事。发现 Agent 开始偏离时，我会让它重新读取 <code>AGENT.md</code>，然后继续。</p><h2 id="它替代不了代码审查" tabindex="-1"><a class="header-anchor" href="#它替代不了代码审查" aria-hidden="true">#</a> 它替代不了代码审查</h2><p>有了规则，AI 仍会误解需求、编造不存在的接口，也会用一段看似合理的解释掩盖错误实现。我依然要看 diff、跑测试、检查架构。</p><p>变化在于，我花在低级重复问题上的时间少了。</p><h2 id="从第二次纠正开始记录" tabindex="-1"><a class="header-anchor" href="#从第二次纠正开始记录" aria-hidden="true">#</a> 从第二次纠正开始记录</h2><p>我现在这样维护：第一次出错，纠正它；第二次又出现，看看能否写成一条清楚、可检查的规则；旧规则没用，就改掉或删掉。</p><p>用久以后，<code>AGENT.md</code> 会留下一个项目真实在意的东西。代码格式只占很小一部分，更多内容来自过去的事故、审查习惯和架构取舍。新同事读它也有用，因为这里收集了许多代码里看不出来的约束。</p><p>它需要持续维护。项目在变，工具在变，我对“好代码”的判断也会变。文件跟着改就行。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,25),G={href:"https://fabiensanglard.net/agent.md/index.html",target:"_blank",rel:"noopener noreferrer"},I={href:"https://code.claude.com/docs/en/memory#import-additional-files",target:"_blank",rel:"noopener noreferrer"},N={href:"https://geminicli.com/docs/reference/memport/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://agents.md",target:"_blank",rel:"noopener noreferrer"};function T(L,D){const s=l("ExternalLinkIcon");return o(),d("div",null,[e("h1",p,[u,n(" 我的 "),e("a",m,[n("AGENT.md"),a(s)])]),v,h,b,c(" more "),k,e("h2",f,[g,n(),e("a",w,[n("AGENT.md"),a(s)]),n(" 是怎么生效的")]),_,e("h2",A,[y,n(" 一份可以直接使用的 "),e("a",x,[n("AGENT.md"),a(s)])]),E,e("ul",null,[e("li",null,[e("a",G,[n("My agent.md to improve LLM-assisted code quality"),a(s)])]),e("li",null,[e("a",I,[n("Claude Code：How Claude remembers your project"),a(s)])]),e("li",null,[e("a",N,[n("Gemini CLI：Memory Import Processor"),a(s)])]),e("li",null,[e("a",C,[n("AGENT.md"),a(s)])])])])}const S=t(r,[["render",T],["__file","my-agent-md-btf.html.vue"]]);export{S as default};
