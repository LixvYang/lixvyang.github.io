import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-fd676414.js";const i={},c=t("p",null,"在软件开发中，经常会遇到需要保证系统中只有一个对象的情况。这种情况下，可以使用单例模式来解决问题。本文将介绍单例模式的定义、用处、实现方法和区别，并通过一个示例程序来说明其应用。",-1),o=p(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>单例模式是一种创建型设计模式，其目的是确保系统中只有一个对象，并提供了一个全局访问点来访问该对象。单例模式通常用于管理系统资源，如数据库连接池、日志记录器等。</p><p>我们的实现可以采用饿汉和懒汉的方式来实现:</p><h2 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h2><p>单例模式的主要用处包括：</p><ul><li>保证系统中只有一个对象，从而节省内存空间和提高性能。</li><li>提供了一个全局访问点，使得系统中的其他对象可以访问该对象。</li><li>可以方便地控制对象的生命周期，如初始化、销毁等。</li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="饿汉式" tabindex="-1"><a class="header-anchor" href="#饿汉式" aria-hidden="true">#</a> 饿汉式</h3><p>饿汉式单例模式是指在类加载时就立即创建对象，并将其存储在静态变量中。这种方式的好处是线程安全，但是缺点是不能够延迟对象的创建，可能会造成资源浪费。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Singleton <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token operator">&amp;</span>Singleton<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Singleton <span class="token punctuation">{</span>
	<span class="token keyword">return</span> instance
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> RespMap <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
	<span class="token number">200</span><span class="token punctuation">:</span> <span class="token string">&quot;OK&quot;</span><span class="token punctuation">,</span>
	
	<span class="token number">304</span><span class="token punctuation">:</span> <span class="token string">&quot;Move&quot;</span><span class="token punctuation">,</span>
	<span class="token number">305</span><span class="token punctuation">:</span> <span class="token string">&quot;Move&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Resp <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Code <span class="token builtin">int</span>
	Msg <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetInstance</span><span class="token punctuation">(</span>code <span class="token builtin">int</span><span class="token punctuation">)</span> Resp <span class="token punctuation">{</span>
	<span class="token keyword">return</span> Resp<span class="token punctuation">{</span>
		Code<span class="token punctuation">:</span> code<span class="token punctuation">,</span>
		Msg<span class="token punctuation">:</span> RespMap<span class="token punctuation">[</span>code<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="懒汉式" tabindex="-1"><a class="header-anchor" href="#懒汉式" aria-hidden="true">#</a> 懒汉式</h3><p>懒汉式单例模式是指在第一次使用对象时才创建对象，并将其存储在静态变量中。这种方式的好处是可以延迟对象的创建，从而节省资源，但是缺点是线程不安全。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Singleton <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
  instance <span class="token operator">*</span>Singleton
  once sync<span class="token punctuation">.</span>Once
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">GetInstanceOnce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Singleton <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			instance <span class="token operator">=</span> <span class="token operator">&amp;</span>Singleton<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> instance
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> singleton

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;testing&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Benchmark_GetInstance</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b<span class="token punctuation">.</span><span class="token function">RunParallel</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>pb <span class="token operator">*</span>testing<span class="token punctuation">.</span>PB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> pb<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">GetInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Benchmark_GetInstanceOnce</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b<span class="token punctuation">.</span><span class="token function">RunParallel</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>pb <span class="token operator">*</span>testing<span class="token punctuation">.</span>PB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> pb<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">GetInstanceOnce</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压测:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go test -benchmem -bench=&quot;.&quot; -v

goos: darwin
goarch: arm64
pkg: demo_design/Singleton
Benchmark_GetInstance
Benchmark_GetInstance-10                1000000000               0.1801 ns/op        0 B/op           0 allocs/op
Benchmark_GetInstanceOnce
Benchmark_GetInstanceOnce-10            1000000000               0.2661 ns/op        0 B/op           0 allocs/op
PASS
ok      demo_design/Singleton   0.591s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，单例模式也存在一些缺点：</p><ul><li>难以测试：由于单例模式的全局性质，测试时可能会遇到困难，特别是在并发测试中。</li><li>潜在的性能问题：单例模式可能成为系统的瓶颈，因为它限制了并发访问实例的能力。</li><li>违反单一职责原则：单例模式将数据和控制逻辑耦合在一起，可能导致代码维护困难。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>单例模式是一种常用的设计模式，可以保证系统中只有一个对象，从而节省内存空间和提高性能。在Go语言中，可以使用饿汉式或懒汉式单例模式来实现。饿汉式单例模式更加适合于对象创建后不会被修改的场景，而懒汉式单例模式更加适合于对象创建后可能会被修改的场景。</p>`,23);function l(u,d){return s(),a("div",null,[c,e(" more "),o])}const v=n(i,[["render",l],["__file","Singleton.html.vue"]]);export{v as default};
