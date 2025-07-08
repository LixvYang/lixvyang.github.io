import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,b as e,f as p,e as o}from"./app-4b201fac.js";const c={};function i(l,n){return a(),t("div",null,[n[0]||(n[0]=e("p",null,"备忘录模式是一种行为型设计模式，它可以在不破坏对象的封装性的前提下，保存和恢复对象的内部状态。备忘录模式可以实现对象的撤销、回滚、恢复等功能。",-1)),p(" more "),n[1]||(n[1]=o(`<h1 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h1><p>备忘录模式的用法有以下几种：</p><ul><li>当需要保存对象的历史状态，以便在需要时恢复到某个状态时，可以使用备忘录模式。</li><li>当需要提供对象的快照，以便在发生错误或异常时，可以恢复到之前的状态时，可以使用备忘录模式。</li><li>当需要实现对象的撤销、重做、事务等功能时，可以使用备忘录模式。</li></ul><p>备忘录模式的优点有以下几种：</p><ul><li>备忘录模式可以保护对象的封装性，不暴露对象的内部结构和实现细节。</li><li>备忘录模式可以实现对象状态的管理和控制，提高对象的可靠性和安全性。</li><li>备忘录模式可以实现对象状态的历史记录和回溯，增加对象的功能性和灵活性。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// 定义发起者</span>
<span class="token keyword">type</span> Originator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	state <span class="token builtin">string</span> <span class="token comment">// 内部状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现创建方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Originator<span class="token punctuation">)</span> <span class="token function">CreateMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Memento <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Memento<span class="token punctuation">{</span>state<span class="token punctuation">:</span> o<span class="token punctuation">.</span>state<span class="token punctuation">}</span> <span class="token comment">// 返回一个包含当前状态的备忘录</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现恢复备忘录方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Originator<span class="token punctuation">)</span> <span class="token function">RestoreMemento</span><span class="token punctuation">(</span>m <span class="token operator">*</span>Memento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	o<span class="token punctuation">.</span>state <span class="token operator">=</span> m<span class="token punctuation">.</span>state <span class="token comment">// 从备忘录中恢复状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现显示状态方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Originator<span class="token punctuation">)</span> <span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Originator state:&quot;</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span>state<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义备忘录类</span>
<span class="token keyword">type</span> Memento <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	state <span class="token builtin">string</span> <span class="token comment">// 保存的状态</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义管理者类</span>
<span class="token keyword">type</span> Caretaker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mementos <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Memento <span class="token comment">// 持有备忘录对象的切片</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现保存备忘录方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Caretaker<span class="token punctuation">)</span> <span class="token function">SaveMemento</span><span class="token punctuation">(</span>m <span class="token operator">*</span>Memento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>mementos <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>mementos<span class="token punctuation">,</span> m<span class="token punctuation">)</span> <span class="token comment">// 将备忘录添加到切片中</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现获取备忘录方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Caretaker<span class="token punctuation">)</span> <span class="token function">GetMemento</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Memento <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>mementos<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 检查索引是否有效</span>
		<span class="token keyword">return</span> c<span class="token punctuation">.</span>mementos<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token comment">// 返回指定索引的备忘录</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span> <span class="token comment">// 返回空值</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建发起人对象，并设置初始状态</span>
	o <span class="token operator">:=</span> <span class="token operator">&amp;</span>Originator<span class="token punctuation">{</span>state<span class="token punctuation">:</span> <span class="token string">&quot;ON&quot;</span><span class="token punctuation">}</span>
	o<span class="token punctuation">.</span><span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 创建管理者对象，并保存发起人的状态</span>
	c <span class="token operator">:=</span> <span class="token operator">&amp;</span>Caretaker<span class="token punctuation">{</span><span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">SaveMemento</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">CreateMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 改变发起人的状态，并继续保存</span>
	o<span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;OFF&quot;</span>
	o<span class="token punctuation">.</span><span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">SaveMemento</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">CreateMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 再次改变发起人的状态，并继续保存</span>
	o<span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;ON&quot;</span>
	o<span class="token punctuation">.</span><span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">SaveMemento</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">CreateMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 从管理者对象中获取备忘录，并恢复发起人的状态</span>
	o<span class="token punctuation">.</span><span class="token function">RestoreMemento</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">GetMemento</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 恢复到第一个状态</span>
	o<span class="token punctuation">.</span><span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	o<span class="token punctuation">.</span><span class="token function">RestoreMemento</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">GetMemento</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 恢复到第二个状态</span>
	o<span class="token punctuation">.</span><span class="token function">ShowState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>备忘录模式是一种将对象状态保存到外部对象中，并在需要时从外部对象中恢复的设计模式，它可以实现对象状态的历史记录和回溯，实现对象的撤销、回滚、恢复等功能。备忘录模式适用于需要保存和恢复对象状态，或者需要提供对象的快照的场景。</p>`,9))])}const r=s(c,[["render",i],["__file","Memento.html.vue"]]);export{r as default};
