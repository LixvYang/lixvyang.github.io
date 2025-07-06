import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,b as p,f as e,e as c}from"./app-468a2905.js";const o={};function i(l,n){return a(),t("div",null,[n[0]||(n[0]=p("p",null,"策略模式是一种行为型设计模式，它定义了一系列的算法，将它们封装在一个个的策略类中，并使它们可以互相替换。策略模式可以根据不同的情况，选择不同的算法来完成相同的功能。",-1)),e(" more "),n[1]||(n[1]=c(`<h1 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>策略模式的用法有以下几种：</p><ul><li>当一个对象有多种行为，而且这些行为可以根据不同的条件进行选择时，可以使用策略模式。</li><li>当一个对象需要动态地改变其行为时，可以使用策略模式来避免多重条件分支语句。</li><li>当一个算法需要在多个地方使用，或者有多种实现方式时，可以使用策略模式来封装和复用这些算法。</li></ul><p>策略模式的优点有以下几种：</p><ul><li>策略模式可以实现算法和对象的解耦，提高了代码的可维护性和可扩展性。</li><li>策略模式可以实现算法的动态切换，增加了对象的灵活性和适应性。</li><li>策略模式可以避免使用大量的条件分支语句，降低了代码的复杂度和出错率。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 定义抽象策略类</span>
<span class="token keyword">type</span> Strategy <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">DoOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token comment">// 定义算法接口</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体策略类A</span>
<span class="token keyword">type</span> AddOperation <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现算法接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>AddOperation<span class="token punctuation">)</span> <span class="token function">DoOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2 <span class="token comment">// 返回两数之和</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体策略类B</span>
<span class="token keyword">type</span> SubOperation <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现算法接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SubOperation<span class="token punctuation">)</span> <span class="token function">DoOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">-</span> num2 <span class="token comment">// 返回两数之差</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体策略类C</span>
<span class="token keyword">type</span> MulOperation <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现算法接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>MulOperation<span class="token punctuation">)</span> <span class="token function">DoOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">*</span> num2 <span class="token comment">// 返回两数之积</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义上下文类</span>
<span class="token keyword">type</span> Context <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    strategy Strategy <span class="token comment">// 持有当前策略对象</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现设置策略方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">SetStrategy</span><span class="token punctuation">(</span>strategy Strategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy <span class="token comment">// 设置新策略</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现执行策略方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">ExecuteStrategy</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> c<span class="token punctuation">.</span>strategy<span class="token punctuation">.</span><span class="token function">DoOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span> <span class="token comment">// 调用当前策略对象的算法方法</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建上下文对象，并设置初始策略</span>
    c <span class="token operator">:=</span> <span class="token operator">&amp;</span>Context<span class="token punctuation">{</span>strategy<span class="token punctuation">:</span> <span class="token operator">&amp;</span>AddOperation<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment">// 调用执行策略方法，观察不同策略下的结果</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;10 + 5 =&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">ExecuteStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 改变上下文对象的策略，并继续执行</span>
    c<span class="token punctuation">.</span><span class="token function">SetStrategy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>SubOperation<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;10 - 5 =&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">ExecuteStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 再次改变上下文对象的策略，并继续执行</span>
    c<span class="token punctuation">.</span><span class="token function">SetStrategy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>MulOperation<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;10 * 5 =&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">ExecuteStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>策略模式是一种将算法封装在不同的策略类中，并使它们可以互相替换的设计模式，它可以实现对象在运行时根据不同的条件选择不同的算法来完成相同的功能。策略模式适用于对象有多种行为，或者一个算法有多种实现方式的场景。</p>`,12))])}const k=s(o,[["render",i],["__file","Strategy.html.vue"]]);export{k as default};
