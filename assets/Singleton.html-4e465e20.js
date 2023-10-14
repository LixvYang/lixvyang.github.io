import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-3f768ba3.js";const i={},c=t("p",null,"单例模式是一种常用的设计模式，它确保类只能创建一个实例，并提供全局访问点。本文将介绍单例模式在Go语言中的定义、用处、实现方式以及相关的优缺点。",-1),o=p(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>单例模式是一种创建型设计模式，它限制类的实例化过程，确保一个类只能创建一个对象，并提供一个全局的访问点。单例模式适用于需要在整个应用程序中共享数据或资源的情况。</p><p>我们的实现可以采用饿汉和懒汉的方式来实现:</p><h2 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h2><p>单例模式在以下情况下特别有用：</p><ul><li>当只需要一个实例来协调操作时，例如日志记录器、配置管理器等。</li><li>当多个实例会导致资源冲突或性能问题时，例如数据库连接池、线程池等。</li><li>当需要限制实例化次数以节省系统资源时。</li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="饿汉式" tabindex="-1"><a class="header-anchor" href="#饿汉式" aria-hidden="true">#</a> 饿汉式</h3><p>饿汉式是一种提前加载的方式，在应用程序启动时即创建实例。它的实现通常在包的初始化函数中完成实例的创建。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Singleton <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">var</span> instance <span class="token operator">=</span> <span class="token operator">&amp;</span>Singleton<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Singleton <span class="token punctuation">{</span>
	<span class="token keyword">return</span> instance
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="懒汉式" tabindex="-1"><a class="header-anchor" href="#懒汉式" aria-hidden="true">#</a> 懒汉式</h3><p>懒汉式是一种延迟加载的方式，在首次访问时才创建实例。它的实现通常包括一个私有的构造函数和一个静态的GetInstance方法来返回实例。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Singleton <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单例模式的优点包括：</p><ul><li>提供了对唯一实例的全局访问点，方便在整个应用程序中共享数据或资源。</li><li>避免了重复创建实例，节省了系统资源。</li><li>保证了实例的唯一性，避免了资源冲突。</li></ul><p>然而，单例模式也存在一些缺点：</p><ul><li>难以测试：由于单例模式的全局性质，测试时可能会遇到困难，特别是在并发测试中。</li><li>潜在的性能问题：单例模式可能成为系统的瓶颈，因为它限制了并发访问实例的能力。</li><li>违反单一职责原则：单例模式将数据和控制逻辑耦合在一起，可能导致代码维护困难。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>单例模式是一种常用的设计模式，适用于需要在整个应用程序中共享数据或资源的情况。在Go语言中，可以使用懒汉式或饿汉式的方式来实现单例模式。</p>`,24);function l(u,d){return s(),a("div",null,[c,e(" more "),o])}const v=n(i,[["render",l],["__file","Singleton.html.vue"]]);export{v as default};
