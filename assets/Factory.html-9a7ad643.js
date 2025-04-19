import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as e,b as s,f as p,e as o}from"./app-730781c5.js";const c={};function i(l,n){return t(),e("div",null,[n[0]||(n[0]=s("p",null,"工厂模式是面向对象编程语言中常用的设计模式，用于抽象对象创建过程。",-1)),n[1]||(n[1]=s("p",null,"代码不直接实例化对象，而是向工厂对象请求实例，工厂对象负责返回完全初始化的对象。",-1)),p(" more "),n[2]||(n[2]=o(`<h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>工厂模式定义了创建对象的接口，但让子类决定实例化哪个类。这种模式包括一个创建类，它知道要实例化哪些具体类。客户端代码调用工厂对象，而不是直接通过构造函数创建对象。</p><p>工厂方法返回一个通用产品。它为在超类中创建对象提供了一个接口，但允许子类改变将要创建对象的类型。</p><h2 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h2><p>使用工厂模式有几个主要好处：</p><ul><li>减少了复杂的对象创建代码，并通过将创建逻辑集中在一处来消除重复。</li><li>减少对具体类型的依赖，促进松散耦合。客户端代码只需了解工厂接口，而无需关心对象是如何创建的。</li><li>它遵循单一责任原则，将对象创建代码与其他业务逻辑分开。</li><li>测试代码变得更容易，因为在测试过程中可以对具体类型进行模拟或存根测试，而无需更改客户端代码。</li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="简单工厂" tabindex="-1"><a class="header-anchor" href="#简单工厂" aria-hidden="true">#</a> 简单工厂</h3><p>在Go语言本身是没有构造函数一说，也没有父类字类一说。可以通过init函数在包被加载的时候创建对象，不过我们经常会定义一个<code>NewXXX</code>来创建对象。</p><p>其关键在于定义一个工厂接口，通过一个具体的工厂来实现它，并在工厂后面抽象出对象的创建</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Product is the interface for products </span>
<span class="token keyword">type</span> Product <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// Concrete product 1</span>
<span class="token keyword">type</span> ConcreteProduct1 <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ConcreteProduct1<span class="token punctuation">)</span> <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;Product 1&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Concrete product 2 </span>
<span class="token keyword">type</span> ConcreteProduct2 <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span> 

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ConcreteProduct2<span class="token punctuation">)</span> <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;Product 2&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Factory is the interface for the factory</span>
<span class="token keyword">type</span> Factory <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token function">CreateProduct</span><span class="token punctuation">(</span>product <span class="token builtin">string</span><span class="token punctuation">)</span> Product
<span class="token punctuation">}</span>

<span class="token comment">// Concrete factory </span>
<span class="token keyword">type</span> ConcreteFactory <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>ConcreteFactory<span class="token punctuation">)</span> <span class="token function">CreateProduct</span><span class="token punctuation">(</span>product <span class="token builtin">string</span><span class="token punctuation">)</span> Product <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> product <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token operator">&amp;</span>ConcreteProduct1<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token operator">&amp;</span>ConcreteProduct2<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  factory <span class="token operator">:=</span> ConcreteFactory<span class="token punctuation">{</span><span class="token punctuation">}</span>
  product <span class="token operator">:=</span> factory<span class="token punctuation">.</span><span class="token function">CreateProduct</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>使用工厂模式的一些优点是降低耦合度、可扩展性和灵活性。缺点是多了一层抽象，导致代码增多，实现复杂。</p><p>总的来说，当需要将对象创建代码与消费者代码分离，以及需要动态添加新的派生产品类时，工厂模式非常有用。它非常适合需要运行时配置灵活性和多态性的场景。</p>`,15))])}const d=a(c,[["render",i],["__file","Factory.html.vue"]]);export{d as default};
