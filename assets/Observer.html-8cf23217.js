import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t,b as e,e as p}from"./app-b2c97b23.js";const c={},o=e("p",null,"观察者模式是一种行为型设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，当主题对象的状态发生变化时，它会通知所有观察者对象，使它们能够自动更新自己。",-1),i=p(`<h1 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式" aria-hidden="true">#</a> 观察者模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>观察者模式的用法有以下几种：</p><ul><li>当一个对象的状态需要被其他对象实时关注时，可以使用观察者模式。</li><li>当一个对象需要通知其他对象，而又不想与其他对象产生紧密的耦合时，可以使用观察者模式。</li><li>当一个抽象模型有两个方面，其中一个方面依赖于另一个方面，可以将这两个方面封装在独立的对象中，使它们可以各自独立地改变和复用时，可以使用观察者模式。</li></ul><p>观察者模式的优点有以下几种：</p><ul><li>观察者模式可以实现对象之间的动态联动，实现数据的实时更新和同步。</li><li>观察者模式可以实现对象之间的松耦合，增强对象的重用性和独立性。</li><li>观察者模式可以实现抽象层的封装，隐藏了主题对象和观察者对象之间的具体实现细节。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 定义抽象主题类</span>
<span class="token keyword">type</span> Subject <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Attach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token comment">// 添加观察者</span>
    <span class="token function">Detach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token comment">// 移除观察者</span>
    <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 通知观察者</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义抽象观察者类</span>
<span class="token keyword">type</span> Observer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Update</span><span class="token punctuation">(</span>subject Subject<span class="token punctuation">)</span> <span class="token comment">// 更新状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体主题类</span>
<span class="token keyword">type</span> ConcreteSubject <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    state <span class="token builtin">int</span> <span class="token comment">// 内部状态</span>
    observers <span class="token punctuation">[</span><span class="token punctuation">]</span>Observer <span class="token comment">// 持有观察者对象的切片</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现添加观察者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteSubject<span class="token punctuation">)</span> <span class="token function">Attach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>observers<span class="token punctuation">,</span> observer<span class="token punctuation">)</span> <span class="token comment">// 将观察者添加到切片中</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现移除观察者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteSubject<span class="token punctuation">)</span> <span class="token function">Detach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> o <span class="token operator">:=</span> <span class="token keyword">range</span> s<span class="token punctuation">.</span>observers <span class="token punctuation">{</span>
        <span class="token keyword">if</span> o <span class="token operator">==</span> observer <span class="token punctuation">{</span> <span class="token comment">// 找到要移除的观察者</span>
            s<span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>observers<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>observers<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span> <span class="token comment">// 从切片中移除该观察者</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现通知观察者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteSubject<span class="token punctuation">)</span> <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> o <span class="token operator">:=</span> <span class="token keyword">range</span> s<span class="token punctuation">.</span>observers <span class="token punctuation">{</span> <span class="token comment">// 遍历所有观察者</span>
        o<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// 调用观察者的更新方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现获取状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteSubject<span class="token punctuation">)</span> <span class="token function">GetState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>state <span class="token comment">// 返回当前状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现设置状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ConcreteSubject<span class="token punctuation">)</span> <span class="token function">SetState</span><span class="token punctuation">(</span>state <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span>state <span class="token operator">=</span> state <span class="token comment">// 设置新状态</span>
    s<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 通知所有观察者</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体观察者类A</span>
<span class="token keyword">type</span> ConcreteObserverA <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    state <span class="token builtin">int</span> <span class="token comment">// 内部状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现更新状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ConcreteObserverA<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>subject Subject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>state <span class="token operator">=</span> subject<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 从主题对象中获取新状态</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteObserverA state:&quot;</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span>state<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体观察者类B</span>
<span class="token keyword">type</span> ConcreteObserverB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    state <span class="token builtin">int</span> <span class="token comment">// 内部状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现更新状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ConcreteObserverB<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>subject Subject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>state <span class="token operator">=</span> subject<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 从主题对象中获取新状态</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteObserverB state:&quot;</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span>state<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建具体主题对象，并设置初始状态</span>
    s <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteSubject<span class="token punctuation">{</span>state<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Subject state:&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>state<span class="token punctuation">)</span>

    <span class="token comment">// 创建具体观察者对象，并添加到主题对象中</span>
    a <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteObserverA<span class="token punctuation">{</span><span class="token punctuation">}</span>
    b <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteObserverB<span class="token punctuation">{</span><span class="token punctuation">}</span>
    s<span class="token punctuation">.</span><span class="token function">Attach</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    s<span class="token punctuation">.</span><span class="token function">Attach</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

    <span class="token comment">// 改变主题对象的状态，并通知所有观察者</span>
    s<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    s<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Subject state: <span class="token number">0</span>
ConcreteObserverA state: <span class="token number">1</span>
ConcreteObserverB state: <span class="token number">1</span>
ConcreteObserverA state: <span class="token number">2</span>
ConcreteObserverB state: <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>观察者模式是一种将对象状态的变化通知给其他对象的设计模式，它可以实现对象之间的动态联动，实现数据的实时更新和同步。观察者模式适用于对象状态需要被其他对象实时关注，或者需要通知其他对象，而又不想与其他对象产生紧密的耦合的场景。</p>`,12);function l(u,r){return s(),a("div",null,[o,t(" more "),i])}const v=n(c,[["render",l],["__file","Observer.html.vue"]]);export{v as default};
