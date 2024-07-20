import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t,b as p,e}from"./app-842e9af4.js";const o={},c=p("p",null,"作为行为模式，责任链模式允许你将请求沿着处理链路不断进行处理，每个处理者收到请求后会根据情况将请求传递给下一个链路的处理者。",-1),i=e(`<h1 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>责任链模式使多个对象都有可能接收请求,对请求的发送者和接收者解耦,可以根据需要在链中增加或者删除处理器。</p><ul><li>降低耦合度,发送者和接收者不需要知道彼此</li><li>增加接收对象的灵活性</li><li>可以根据需要构造链,自由组合不同的处理器</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>例如你需要设计一个网关系统，这个网关系统需要对请求头，请求体进行鉴权，那么这样你就可以利用责任链形式对鉴权的过程进行封装包装:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> HandleRequest <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">HandleAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Authorization <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	handlers <span class="token punctuation">[</span><span class="token punctuation">]</span>HandleRequest
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Authorization<span class="token punctuation">)</span> <span class="token function">AddHandler</span><span class="token punctuation">(</span>h HandleRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">.</span>handlers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>handlers<span class="token punctuation">,</span> h<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Authorization<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> h <span class="token operator">:=</span> <span class="token keyword">range</span> a<span class="token punctuation">.</span>handlers <span class="token punctuation">{</span>
		<span class="token comment">// 如果发现敏感直接返回结果</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> h<span class="token punctuation">.</span><span class="token function">HandleAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> HttpHeaderAuth <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	headers <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>HttpHeaderAuth<span class="token punctuation">)</span> <span class="token function">HandleAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span>headers<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;len(header) == 0&quot;</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> header <span class="token operator">:=</span> <span class="token keyword">range</span> h<span class="token punctuation">.</span>headers <span class="token punctuation">{</span>
		<span class="token keyword">if</span> header <span class="token operator">!=</span> <span class="token string">&quot;xid123&quot;</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error for header&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> HttpBodyAuth <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	body <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>HttpBodyAuth<span class="token punctuation">)</span> <span class="token function">HandleAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span>body<span class="token punctuation">,</span> <span class="token string">&quot;body: &quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error for http body&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	reqChain <span class="token operator">:=</span> <span class="token operator">&amp;</span>Authorization<span class="token punctuation">{</span><span class="token punctuation">}</span>
	reqChain<span class="token punctuation">.</span><span class="token function">AddHandler</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>HttpHeaderAuth<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	reqChain<span class="token punctuation">.</span><span class="token function">AddHandler</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>HttpBodyAuth<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reqChain<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们平时在Go Web开发中的中间件大多也是利用责任链模式实现的，例如gin的<code>engine.Use()</code>方法。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>责任链模式通过链式请求传递,实现请求的多重接收和灵活处理,降低了耦合,增强了系统的灵活性。</p>`,10);function l(u,r){return s(),a("div",null,[c,t(" more "),i])}const v=n(o,[["render",l],["__file","ChainOfResponsibility.html.vue"]]);export{v as default};
