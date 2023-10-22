import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-1dad8d12.js";const c={},o=t("p",null,"中介者模式是一种行为型设计模式，它定义了一个对象，用于封装一组对象之间的交互。中介者模式使得各个对象不需要显式地相互引用，从而降低了它们之间的耦合度。",-1),i=p(`<h1 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式" aria-hidden="true">#</a> 中介者模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>中介者模式的用法有以下几种：</p><ul><li>当一组对象之间的通信方式复杂且难以理解时，可以使用中介者模式来简化它们之间的交互。</li><li>当一个对象需要与多个其他对象进行协作时，可以使用中介者模式来减少对象之间的依赖关系。</li><li>当一个系统需要在运行时动态地改变对象之间的交互方式时，可以使用中介者模式来实现灵活的变化。</li></ul><p>中介者模式的优点有以下几种：</p><ul><li>中介者模式可以降低系统的复杂度，提高系统的可维护性和可扩展性。</li><li>中介者模式可以实现对象之间的松耦合，增强对象的重用性和独立性。</li><li>中介者模式可以实现对象之间的一致性和协调性，保证系统的整体性和一致性。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 定义抽象同事类</span>
<span class="token keyword">type</span> Colleague <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">SetMediator</span><span class="token punctuation">(</span>mediator Mediator<span class="token punctuation">)</span> <span class="token comment">// 设置中介者</span>
    <span class="token function">Send</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token comment">// 发送消息</span>
    <span class="token function">Receive</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token comment">// 接收消息</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义抽象中介者类</span>
<span class="token keyword">type</span> Mediator <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Register</span><span class="token punctuation">(</span>colleague Colleague<span class="token punctuation">)</span> <span class="token comment">// 注册同事</span>
    <span class="token function">Relay</span><span class="token punctuation">(</span>colleague Colleague<span class="token punctuation">,</span> message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token comment">// 转发消息</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体同事类A</span>
<span class="token keyword">type</span> ColleagueA <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    mediator Mediator <span class="token comment">// 持有中介者引用</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现设置中介者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueA<span class="token punctuation">)</span> <span class="token function">SetMediator</span><span class="token punctuation">(</span>mediator Mediator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mediator <span class="token operator">=</span> mediator
<span class="token punctuation">}</span>

<span class="token comment">// 实现发送消息方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueA<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mediator<span class="token punctuation">.</span><span class="token function">Relay</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token comment">// 通过中介者转发消息</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接收消息方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueA<span class="token punctuation">)</span> <span class="token function">Receive</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ColleagueA received:&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体同事类B</span>
<span class="token keyword">type</span> ColleagueB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    mediator Mediator <span class="token comment">// 持有中介者引用</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现设置中介者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueB<span class="token punctuation">)</span> <span class="token function">SetMediator</span><span class="token punctuation">(</span>mediator Mediator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mediator <span class="token operator">=</span> mediator
<span class="token punctuation">}</span>

<span class="token comment">// 实现发送消息方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueB<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mediator<span class="token punctuation">.</span><span class="token function">Relay</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token comment">// 通过中介者转发消息</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接收消息方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ColleagueB<span class="token punctuation">)</span> <span class="token function">Receive</span><span class="token punctuation">(</span>message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ColleagueB received:&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体中介者类</span>
<span class="token keyword">type</span> ConcreteMediator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    colleagues <span class="token punctuation">[</span><span class="token punctuation">]</span>Colleague <span class="token comment">// 持有同事对象的集合</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现注册同事方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>ConcreteMediator<span class="token punctuation">)</span> <span class="token function">Register</span><span class="token punctuation">(</span>colleague Colleague<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    m<span class="token punctuation">.</span>colleagues <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>colleagues<span class="token punctuation">,</span> colleague<span class="token punctuation">)</span>
    colleague<span class="token punctuation">.</span><span class="token function">SetMediator</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token comment">// 设置同事的中介者为自己</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现转发消息方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>ConcreteMediator<span class="token punctuation">)</span> <span class="token function">Relay</span><span class="token punctuation">(</span>colleague Colleague<span class="token punctuation">,</span> message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> m<span class="token punctuation">.</span>colleagues <span class="token punctuation">{</span>
        <span class="token keyword">if</span> c <span class="token operator">!=</span> colleague <span class="token punctuation">{</span> <span class="token comment">// 转发给除自己以外的所有同事</span>
            c<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建具体同事对象</span>
    a <span class="token operator">:=</span> <span class="token operator">&amp;</span>ColleagueA<span class="token punctuation">{</span><span class="token punctuation">}</span>
    b <span class="token operator">:=</span> <span class="token operator">&amp;</span>ColleagueB<span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 创建具体中介者对象，并注册同事对象</span>
    m <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteMediator<span class="token punctuation">{</span><span class="token punctuation">}</span>
    m<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    m<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

    <span class="token comment">// 同事对象通过中介者进行通信</span>
    a<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, I am A.&quot;</span><span class="token punctuation">)</span>
    b<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;Hi, I am B.&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ColleagueB received: Hello, I am A.
ColleagueA received: Hi, I am B.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>中介者模式是一种将对象之间的交互封装到一个中心对象的设计模式，它可以简化对象之间的通信，降低系统的耦合度，提高系统的可维护性和可扩展性。中介者模式适用于对象之间的交互方式复杂且难以理解，或者需要在运行时动态地改变对象之间的交互方式的场景。</p>`,12);function l(u,d){return s(),a("div",null,[o,e(" more "),i])}const m=n(c,[["render",l],["__file","Mediator.html.vue"]]);export{m as default};
