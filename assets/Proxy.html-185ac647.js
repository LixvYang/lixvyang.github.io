import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as c}from"./app-71ed0d60.js";const p={},i=t("p",null,"代理模式提供了一个其他对象的替身或占位符来控制对这个对象的访问。代理模式一般用于控制访问、扩展功能等目的。",-1),o=c(`<h1 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><ul><li><p>第一步定义接口,原对象和代理对象都实现该接口。</p></li><li><p>第二步代理对象持有原对象的引用。实现接口方法时可能会进行一些附加操作,然后再转交给原对象进行处理。</p></li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Subject <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> RealSubject <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span> 

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>RealSubject<span class="token punctuation">)</span> <span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// real request </span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Proxy <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  subject Subject
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Proxy<span class="token punctuation">)</span> <span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// proxy additional logic</span>
  p<span class="token punctuation">.</span>subject<span class="token punctuation">.</span><span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>代理模式提供访问原对象的替代者,可以在不修改原对象的情况下对访问进行控制和扩展,是一种常见的设计模式。Go通过接口实现松耦合的代理关系。</p>`,7);function l(u,d){return s(),a("div",null,[i,e(" more "),o])}const v=n(p,[["render",l],["__file","Proxy.html.vue"]]);export{v as default};
