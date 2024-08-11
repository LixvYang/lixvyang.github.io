import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-b2c97b23.js";const i={},o=t("p",null,"建造者模式是一种创建型设计模式,它可以将一个复杂对象的构建与它的表示分离,使得同样的构建过程可以创建不同的表示。",-1),c=p(`<h1 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>建造者模式的主要作用有:</p><p>封装一个复杂对象的创建过程。客户端不需要知道复杂对象的内部结构,只需要指定需要的属性就可以构建一个复杂对象。</p><p>可以更精细地控制对象的创建过程。可以通过不同的建造者创建不同的产品对象。</p><p>将复杂对象的创建代码与业务逻辑代码分离,提高复用性和灵活性。</p><h2 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h2><p>Go语言中实现建造者模式的主要步骤:</p><p>定义一个Builder接口,指定需要实现的方法,如BuildPartA()、BuildPartB()等。</p><p>实现Builder接口,创建具体的建造者,实现接口中的方法以构建产品的各个部件。</p><p>定义一个Director结构体,在其中定义一个方法,该方法会使用Builder接口构建完整的产品对象。</p><p>Director通过Builder接口与不同的具体建造者交互,以构建完整的产品对象。</p><p>建造者模式的主要优点是:</p><ul><li>封装复杂对象的创建过程</li><li>分离复杂对象的创建和表示</li><li>实现创建过程与表示分离</li></ul><p>建造者模式的主要缺点:</p><ul><li>建造者模式比直接创建复杂对象更加复杂</li><li>建造者与Director之间存在紧密的依赖</li></ul><p>相比建造者模式,Go语言更推荐使用函数选项模式。因为函数选项模式可以实现类似的功能,但是语法更简单,不需要引入多余的接口和类型,更符合Go语言的简洁风格。函数选项模式可以通过闭包和高阶函数实现,语法轻量且易于使用。</p><p>所以在Go语言中实现复杂对象的创建,更推荐使用函数选项模式,而不是较重且复杂的建造者模式。函数选项模式可以实现建造者模式的优点,同时代码更简洁。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> builder

<span class="token keyword">type</span> Gender <span class="token builtin">int</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	Men Gender <span class="token operator">=</span> <span class="token boolean">iota</span>
	Women
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name   <span class="token builtin">string</span>
	Age    <span class="token builtin">int</span>
	Gender Gender
	Phone  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> PersonConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Age    <span class="token builtin">int</span>
	Gender Gender
	Phone  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	defaultAge    <span class="token operator">=</span> <span class="token number">20</span>
	defaultGender <span class="token operator">=</span> Men
	defaultPhone  <span class="token operator">=</span> <span class="token number">12306</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> config <span class="token operator">*</span>PersonConfig<span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
		name<span class="token punctuation">,</span>
		defaultAge<span class="token punctuation">,</span>
		defaultGender<span class="token punctuation">,</span>
		defaultPhone<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> config<span class="token punctuation">.</span>Age <span class="token operator">!=</span> defaultAge <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Age <span class="token operator">=</span> config<span class="token punctuation">.</span>Age
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> config<span class="token punctuation">.</span>Phone <span class="token operator">!=</span> defaultPhone <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Phone <span class="token operator">=</span> config<span class="token punctuation">.</span>Phone
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> config<span class="token punctuation">.</span>Gender <span class="token operator">!=</span> defaultGender <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Gender <span class="token operator">=</span> config<span class="token punctuation">.</span>Gender
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetAge</span><span class="token punctuation">(</span>age <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">.</span>Age <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">.</span>Name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetPhone</span><span class="token punctuation">(</span>phone <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">.</span>Phone <span class="token operator">=</span> phone
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetGender</span><span class="token punctuation">(</span>Gender Gender<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p<span class="token punctuation">.</span>Gender <span class="token operator">=</span> Gender
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="另一种实现" tabindex="-1"><a class="header-anchor" href="#另一种实现" aria-hidden="true">#</a> 另一种实现</h2><p>但其实Go语言中并不推荐传统的建造者模式，更推荐函数选项模式。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">type</span> OptionFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>Person<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WithPhone</span><span class="token punctuation">(</span>phone <span class="token builtin">int</span><span class="token punctuation">)</span> OptionFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Phone <span class="token operator">=</span> phone
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithGender</span><span class="token punctuation">(</span>gender Gender<span class="token punctuation">)</span> OptionFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Gender <span class="token operator">=</span> gender
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithAge</span><span class="token punctuation">(</span>age <span class="token builtin">int</span><span class="token punctuation">)</span> OptionFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Age <span class="token operator">=</span> age
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson2</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> optionFunc <span class="token operator">...</span>OptionFunc<span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> o <span class="token operator">:=</span> <span class="token keyword">range</span> optionFunc <span class="token punctuation">{</span>
		<span class="token function">o</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> p
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>使用工厂模式的一些优点是降低耦合度、可扩展性和灵活性。缺点是多了一层抽象层，导致代码增多，实现复杂。</p><p>总的来说，当需要将对象创建代码与消费者代码分离，以及需要动态添加新的派生产品类时，工厂模式是非常有用的。它非常适合需要运行时配置灵活性和多态性的场景。</p>`,26);function l(u,r){return s(),a("div",null,[o,e(" more "),c])}const v=n(i,[["render",l],["__file","Builder.html.vue"]]);export{v as default};
