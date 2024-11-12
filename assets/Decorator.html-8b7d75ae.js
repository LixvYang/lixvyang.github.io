import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as e,b as t,f as o,e as p}from"./app-0c6ce274.js";const c={};function i(l,n){return a(),e("div",null,[n[0]||(n[0]=t("p",null,"装饰器模式(Decorator)是一种结构型设计模式,允许向一个现有的对象添加新的功能,同时又不改变其结构。这种类型的设计模式属于结构型模式,它创建了一个装饰类,用来包装原有的类,并在保持类方法完整性的前提下,提供了额外的功能。",-1)),o(" more "),n[1]||(n[1]=p(`<h1 id="装饰模式" tabindex="-1"><a class="header-anchor" href="#装饰模式" aria-hidden="true">#</a> 装饰模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>装饰器模式在不改变原有对象的基础上,通过装饰类提供额外的功能。它提供了比继承更有弹性的替代方案。常用于一些复杂的扩展需求,通过装饰器可以在运行时扩展对象功能。</p><p>使用起来很简单，就是在原来对象的基础上增加一些扩展，但又不像继承那样比较难以维护。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Component <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token function">Operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体构件角色</span>
<span class="token keyword">type</span> ConcreteComponent <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ConcreteComponent<span class="token punctuation">)</span> <span class="token function">Operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 原有功能</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体装饰类A </span>
<span class="token keyword">type</span> ConcreteDecoratorA <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  Decorator
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>ConcreteDecoratorA<span class="token punctuation">)</span> <span class="token function">Operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 调用原有功能</span>
  d<span class="token punctuation">.</span>Component<span class="token punctuation">.</span><span class="token function">Operate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 添加额外功能</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteDecoratorA operate&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>装饰器模式可以在不改变原有对象的情况下,通过组合类提供功能扩展,符合开闭原则,比继承更灵活,是一种常用的设计模式。</p>`,8))])}const d=s(c,[["render",i],["__file","Decorator.html.vue"]]);export{d as default};
