import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,b as e,f as p,e as c}from"./app-4e74bbc5.js";const o={};function i(l,n){return a(),t("div",null,[n[0]||(n[0]=e("p",null,"模板方法模式是一种行为型设计模式，它定义了一个算法的骨架，将一些步骤延迟到子类中实现。模板方法模式可以让子类在不改变算法结构的情况下，重新定义算法的某些步骤。",-1)),p(" more "),n[1]||(n[1]=c(`<h1 id="模版模式" tabindex="-1"><a class="header-anchor" href="#模版模式" aria-hidden="true">#</a> 模版模式</h1><p>当你希望在某个算法中的特定点上提供挂钩，以便其他人可以扩展该算法而无需更改其结构时，可以使用模板方法模式。</p><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><ul><li>代码复用：你可以将相同的代码放在超类的一个公共方法中。</li><li>扩展性：子类可以通过重写部分算法来实现新的行为。</li><li>控制：父类可以控制子类的执行顺序。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// Game 是一个抽象类</span>
<span class="token keyword">type</span> Game <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">End</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Chess 是 Game 的一个具体实现</span>
<span class="token keyword">type</span> Chess <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Chess<span class="token punctuation">)</span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Chess game started!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Chess<span class="token punctuation">)</span> <span class="token function">End</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Chess game ended!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Chess<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Playing chess...&quot;</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">End</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Main</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> game Game <span class="token operator">=</span> <span class="token operator">&amp;</span>Chess<span class="token punctuation">{</span><span class="token punctuation">}</span>
	game<span class="token punctuation">.</span><span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>模板方法模式是一种非常有用的设计模式，它提供了一种优雅的方式来处理某些需要高度灵活性和可扩展性的问题。在Go语言中，我们可以通过接口和结构体来实现这个模式。这种模式允许我们在不改变算法结构的情况下，通过子类改变算法中的某些步骤。这使得我们可以将变化的部分放在子类中，保持超类的稳定和一致。总的来说，这是一种非常强大且灵活的设计模式。</p>`,8))])}const r=s(o,[["render",i],["__file","TemplateMethod.html.vue"]]);export{r as default};
