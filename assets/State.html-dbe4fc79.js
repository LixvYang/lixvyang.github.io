import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c,f as o,b as n,d as s,a as i,w as l,e as u}from"./app-4c436d3b.js";const d={},r=n("p",null,"状态模式是一种行为型设计模式，它允许一个对象在其内部状态改变时，改变其行为。状态模式将对象的状态和行为分离，使得对象可以在运行时切换不同的状态，从而实现不同的行为。",-1),k=n("h1",{id:"状态模式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#状态模式","aria-hidden":"true"},"#"),s(" 状态模式")],-1),m=u(`<p>状态模式的用法有以下几种：</p><ul><li>当一个对象的行为取决于其状态，并且它需要在运行时根据状态改变其行为时，可以使用状态模式。</li><li>当一个对象有多个状态，而且这些状态之间的转换逻辑复杂时，可以使用状态模式来管理这些状态和转换逻辑。</li><li>当一个对象的操作有多个分支，每个分支依赖于该对象的状态时，可以使用状态模式来消除冗余的条件分支语句。</li></ul><p>状态模式的优点有以下几种：</p><ul><li>状态模式可以实现对象状态和行为的封装，提高了代码的可读性和可维护性。</li><li>状态模式可以实现对象状态和行为的动态切换，增加了对象的灵活性和扩展性。</li><li>状态模式可以避免使用大量的条件分支语句，降低了代码的复杂度和出错率。</li></ul><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 定义抽象状态类</span>
<span class="token keyword">type</span> State <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>context <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token comment">// 处理状态逻辑</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体状态类A</span>
<span class="token keyword">type</span> ConcreteStateA <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现处理状态逻辑方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteStateA<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>context <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Current state is A&quot;</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ConcreteStateB<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 切换到下一个状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体状态类B</span>
<span class="token keyword">type</span> ConcreteStateB <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现处理状态逻辑方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteStateB<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>context <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Current state is B&quot;</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ConcreteStateA<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 切换到下一个状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义上下文类</span>
<span class="token keyword">type</span> Context <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    state State <span class="token comment">// 持有当前状态对象</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现设置状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">SetState</span><span class="token punctuation">(</span>state State<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>state <span class="token operator">=</span> state <span class="token comment">// 设置新状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现请求方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// 调用当前状态对象的处理方法</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建上下文对象，并设置初始状态</span>
    c <span class="token operator">:=</span> <span class="token operator">&amp;</span>Context<span class="token punctuation">{</span>state<span class="token punctuation">:</span> <span class="token operator">&amp;</span>ConcreteStateA<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment">// 调用请求方法，观察不同状态下的行为</span>
    c<span class="token punctuation">.</span><span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Current state is A
Current state is B
Current state is A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>状态模式是一种将对象的行为与其内部状态关联的设计模式，它可以实现对象在运行时根据不同的状态切换不同的行为。状态模式适用于对象的行为取决于其状态，或者对象有多个状态，并且这些状态之间的转换逻辑复杂的场景。</p>`,10);function v(b,f){const a=e("RouterLink");return p(),c("div",null,[r,o(" more "),k,n("p",null,[s("你可以读一读有限状态机这篇文章更详细了解状态模式"),i(a,{to:"/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/common/fsm.html"},{default:l(()=>[s("有限状态机")]),_:1})]),m])}const C=t(d,[["render",v],["__file","State.html.vue"]]);export{C as default};
