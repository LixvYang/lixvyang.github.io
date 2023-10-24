import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t,b as e,e as p}from"./app-3cc679b2.js";const o={},c=e("p",null,"访问者模式是一种行为型设计模式，它定义了一个作用于某个对象结构中的各个元素的操作，可以在不改变各个元素的类的前提下，定义作用于这些元素的新操作。访问者模式可以将数据结构和数据操作分离，实现对复杂对象结构的扩展。",-1),i=p(`<h1 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>访问者模式的用法有以下几种：</p><ul><li>当一个对象结构包含多个类型的对象，而且需要对这些对象执行不同的操作时，可以使用访问者模式。</li><li>当一个对象结构需要增加新的操作，而且这些操作不依赖于对象结构的具体类型时，可以使用访问者模式。</li><li>当一个对象结构需要提供多种不同的遍历方式时，可以使用访问者模式来封装这些遍历方式。</li></ul><p>访问者模式的优点有以下几种：</p><ul><li>访问者模式可以实现对象结构和操作的解耦，提高了代码的可维护性和可扩展性。</li><li>访问者模式可以实现对对象结构中各个元素的统一处理，增加了代码的复用性和一致性。</li><li>访问者模式可以实现对对象结构中各个元素的动态访问，增加了代码的灵活性和适应性。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 定义抽象元素类</span>
<span class="token keyword">type</span> Element <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token comment">// 接受访问者</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体元素类A</span>
<span class="token keyword">type</span> ConcreteElementA <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span> <span class="token comment">// 元素名称</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接受访问者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ConcreteElementA<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    visitor<span class="token punctuation">.</span><span class="token function">VisitConcreteElementA</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">// 调用访问者对自己的访问方法</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现获取名称方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ConcreteElementA<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> e<span class="token punctuation">.</span>name <span class="token comment">// 返回元素名称</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体元素类B</span>
<span class="token keyword">type</span> ConcreteElementB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span> <span class="token comment">// 元素名称</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接受访问者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ConcreteElementB<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    visitor<span class="token punctuation">.</span><span class="token function">VisitConcreteElementB</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">// 调用访问者对自己的访问方法</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现获取名称方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ConcreteElementB<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> e<span class="token punctuation">.</span>name <span class="token comment">// 返回元素名称</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义抽象访问者类</span>
<span class="token keyword">type</span> Visitor <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">VisitConcreteElementA</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementA<span class="token punctuation">)</span> <span class="token comment">// 访问具体元素A</span>
    <span class="token function">VisitConcreteElementB</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementB<span class="token punctuation">)</span> <span class="token comment">// 访问具体元素B</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体访问者类A</span>
<span class="token keyword">type</span> ConcreteVisitorA <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现访问具体元素A方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>ConcreteVisitorA<span class="token punctuation">)</span> <span class="token function">VisitConcreteElementA</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementA<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteVisitorA visits&quot;</span><span class="token punctuation">,</span> element<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现访问具体元素B方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>ConcreteVisitorA<span class="token punctuation">)</span> <span class="token function">VisitConcreteElementB</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteVisitorA visits&quot;</span><span class="token punctuation">,</span> element<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义具体访问者类B</span>
<span class="token keyword">type</span> ConcreteVisitorB <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 实现访问具体元素A方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>ConcreteVisitorB<span class="token punctuation">)</span> <span class="token function">VisitConcreteElementA</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementA<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteVisitorB visits&quot;</span><span class="token punctuation">,</span> element<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现访问具体元素B方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>ConcreteVisitorB<span class="token punctuation">)</span> <span class="token function">VisitConcreteElementB</span><span class="token punctuation">(</span>element <span class="token operator">*</span>ConcreteElementB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ConcreteVisitorB visits&quot;</span><span class="token punctuation">,</span> element<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义对象结构类</span>
<span class="token keyword">type</span> ObjectStructure <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    elements <span class="token punctuation">[</span><span class="token punctuation">]</span>Element <span class="token comment">// 持有元素对象的切片</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现添加元素方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ObjectStructure<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>element Element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    o<span class="token punctuation">.</span>elements <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>elements<span class="token punctuation">,</span> element<span class="token punctuation">)</span> <span class="token comment">// 将元素添加到切片中</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现移除元素方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ObjectStructure<span class="token punctuation">)</span> <span class="token function">Remove</span><span class="token punctuation">(</span>element Element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token keyword">range</span> o<span class="token punctuation">.</span>elements <span class="token punctuation">{</span>
        <span class="token keyword">if</span> e <span class="token operator">==</span> element <span class="token punctuation">{</span> <span class="token comment">// 找到要移除的元素</span>
            o<span class="token punctuation">.</span>elements <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>elements<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span>elements<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span> <span class="token comment">// 从切片中移除该元素</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接受访问者方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ObjectStructure<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token keyword">range</span> o<span class="token punctuation">.</span>elements <span class="token punctuation">{</span> <span class="token comment">// 遍历所有元素</span>
        e<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span> <span class="token comment">// 调用元素的接受访问者方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试代码</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建对象结构对象，并添加元素对象</span>
    o <span class="token operator">:=</span> <span class="token operator">&amp;</span>ObjectStructure<span class="token punctuation">{</span><span class="token punctuation">}</span>
    o<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ConcreteElementA<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;ElementA&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    o<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ConcreteElementB<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;ElementB&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 创建访问者对象，并访问对象结构中的元素</span>
    a <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteVisitorA<span class="token punctuation">{</span><span class="token punctuation">}</span>
    b <span class="token operator">:=</span> <span class="token operator">&amp;</span>ConcreteVisitorB<span class="token punctuation">{</span><span class="token punctuation">}</span>
    o<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    o<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ConcreteVisitorA visits ElementA
ConcreteVisitorA visits ElementB
ConcreteVisitorB visits ElementA
ConcreteVisitorB visits ElementB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>访问者模式是一种将对对象结构中各个元素的操作封装在不同的访问者类中，并使它们可以在不改变元素类的前提下，定义对这些元素的新操作的设计模式，它可以实现对象结构和操作的分离，实现对复杂对象结构的扩展。访问者模式适用于对象结构包含多个类型的对象，而且需要对这些对象执行不同的操作，或者需要增加新的操作，或者需要提供多种不同的遍历方式的场景。</p>`,12);function l(u,r){return s(),a("div",null,[c,t(" more "),i])}const m=n(o,[["render",l],["__file","Visitor.html.vue"]]);export{m as default};
