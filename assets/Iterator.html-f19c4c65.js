import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,b as o,f as p,e}from"./app-ec54e917.js";const c={};function i(l,n){return a(),t("div",null,[n[0]||(n[0]=o("p",null,"迭代器模式（Iterator Pattern）是一种行为型设计模式，它提供了一种顺序访问集合元素的方法，而不需要暴露集合的内部表示。",-1)),p(" more "),n[1]||(n[1]=e(`<h1 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h1><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>迭代器模式通常用于以下场景：</p><ul><li>当你需要对一个复杂的集合进行多种方式的遍历时，你可以使用迭代器模式，让每种遍历方式都有一个专门的迭代器，而不需要修改集合的代码。</li><li>当你需要对一个集合进行多种操作时，你可以使用迭代器模式，让每种操作都有一个专门的迭代器，而不需要在集合中添加新的方法。</li><li>当你需要对一个隐藏了内部结构的集合进行访问时，你可以使用迭代器模式，让迭代器作为一个中介，提供统一的访问接口。</li></ul><h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2><p>迭代器模式有以下优点：</p><ul><li>迭代器模式可以实现集合和遍历的分离，降低了系统的耦合度。</li><li>迭代器模式可以提供多种遍历方式和操作方式，增加了系统的灵活性。</li><li>迭代器模式可以隐藏集合的内部结构，保证了集合的封装性。</li></ul><p>实际上如果你熟悉C++的STL的话，对于迭代器的用法就不会陌生，因为C++的标准库STL的设计模式几乎就是基于Iterator来的。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>下面是一个使用go语言实现的迭代器模式的例子，它模拟了一个书架上的书籍集合和两种不同的遍历方式。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Book 结构体定义了书籍对象</span>
<span class="token keyword">type</span> Book <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name   <span class="token builtin">string</span>
	Author <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewBook 构造函数创建一个书籍对象</span>
<span class="token keyword">func</span> <span class="token function">NewBook</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> author <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Book <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Book<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> Author<span class="token punctuation">:</span> author<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// BookShelf 结构体定义了书架对象，它是一个包含书籍对象的切片</span>
<span class="token keyword">type</span> BookShelf <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Books <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Book
<span class="token punctuation">}</span>

<span class="token comment">// NewBookShelf 构造函数创建一个书架对象</span>
<span class="token keyword">func</span> <span class="token function">NewBookShelf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>BookShelf <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>BookShelf<span class="token punctuation">{</span>Books<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Book<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// AddBook 方法定义了向书架中添加书籍的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bs <span class="token operator">*</span>BookShelf<span class="token punctuation">)</span> <span class="token function">AddBook</span><span class="token punctuation">(</span>book <span class="token operator">*</span>Book<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bs<span class="token punctuation">.</span>Books <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>Books<span class="token punctuation">,</span> book<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// GetSize 方法定义了获取书架中书籍数量的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bs <span class="token operator">*</span>BookShelf<span class="token punctuation">)</span> <span class="token function">GetSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>Books<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// GetBook 方法定义了获取书架中指定位置的书籍的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bs <span class="token operator">*</span>BookShelf<span class="token punctuation">)</span> <span class="token function">GetBook</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Book <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> bs<span class="token punctuation">.</span><span class="token function">GetSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> bs<span class="token punctuation">.</span>Books<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// Iterator 接口定义了迭代器对象的行为</span>
<span class="token keyword">type</span> Iterator <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">HasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
	<span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// NameIterator 结构体定义了按照书名顺序遍历书架的迭代器</span>
<span class="token keyword">type</span> NameIterator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	bookShelf <span class="token operator">*</span>BookShelf
	index     <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewNameIterator 构造函数创建一个按照书名顺序遍历书架的迭代器</span>
<span class="token keyword">func</span> <span class="token function">NewNameIterator</span><span class="token punctuation">(</span>bookShelf <span class="token operator">*</span>BookShelf<span class="token punctuation">)</span> <span class="token operator">*</span>NameIterator <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>NameIterator<span class="token punctuation">{</span>bookShelf<span class="token punctuation">:</span> bookShelf<span class="token punctuation">,</span> index<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// HasNext 方法实现了 Iterator 接口，判断是否还有下一个元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>ni <span class="token operator">*</span>NameIterator<span class="token punctuation">)</span> <span class="token function">HasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> ni<span class="token punctuation">.</span>index <span class="token operator">&lt;</span> ni<span class="token punctuation">.</span>bookShelf<span class="token punctuation">.</span><span class="token function">GetSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Next 方法实现了 Iterator 接口，返回下一个元素，并将索引加一</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>ni <span class="token operator">*</span>NameIterator<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	book <span class="token operator">:=</span> ni<span class="token punctuation">.</span>bookShelf<span class="token punctuation">.</span><span class="token function">GetBook</span><span class="token punctuation">(</span>ni<span class="token punctuation">.</span>index<span class="token punctuation">)</span>
	ni<span class="token punctuation">.</span>index<span class="token operator">++</span>
	<span class="token keyword">return</span> book
<span class="token punctuation">}</span>

<span class="token comment">// AuthorIterator 结构体定义了按照作者顺序遍历书架的迭代器</span>
<span class="token keyword">type</span> AuthorIterator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	bookShelf <span class="token operator">*</span>BookShelf
	index     <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewAuthorIterator 构造函数创建一个按照作者顺序遍历书架的迭代器</span>
<span class="token keyword">func</span> <span class="token function">NewAuthorIterator</span><span class="token punctuation">(</span>bookShelf <span class="token operator">*</span>BookShelf<span class="token punctuation">)</span> <span class="token operator">*</span>AuthorIterator <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>AuthorIterator<span class="token punctuation">{</span>bookShelf<span class="token punctuation">:</span> bookShelf<span class="token punctuation">,</span> index<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// HasNext 方法实现了 Iterator 接口，判断是否还有下一个元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>ai <span class="token operator">*</span>AuthorIterator<span class="token punctuation">)</span> <span class="token function">HasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> ai<span class="token punctuation">.</span>index <span class="token operator">&lt;</span> ai<span class="token punctuation">.</span>bookShelf<span class="token punctuation">.</span><span class="token function">GetSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Next 方法实现了 Iterator 接口，返回下一个元素，并将索引加一</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>ai <span class="token operator">*</span>AuthorIterator<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	book <span class="token operator">:=</span> ai<span class="token punctuation">.</span>bookShelf<span class="token punctuation">.</span><span class="token function">GetBook</span><span class="token punctuation">(</span>ai<span class="token punctuation">.</span>index<span class="token punctuation">)</span>
	ai<span class="token punctuation">.</span>index<span class="token operator">++</span>
	<span class="token keyword">return</span> book
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个书架对象，并向其中添加一些书籍对象</span>
	bookShelf <span class="token operator">:=</span> <span class="token function">NewBookShelf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	bookShelf<span class="token punctuation">.</span><span class="token function">AddBook</span><span class="token punctuation">(</span><span class="token function">NewBook</span><span class="token punctuation">(</span><span class="token string">&quot;The Go Programming Language&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Alan A. A. Donovan and Brian W. Kernighan&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	bookShelf<span class="token punctuation">.</span><span class="token function">AddBook</span><span class="token punctuation">(</span><span class="token function">NewBook</span><span class="token punctuation">(</span><span class="token string">&quot;The C Programming Language&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Brian W. Kernighan and Dennis M. Ritchie&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	bookShelf<span class="token punctuation">.</span><span class="token function">AddBook</span><span class="token punctuation">(</span><span class="token function">NewBook</span><span class="token punctuation">(</span><span class="token string">&quot;Design Patterns&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	bookShelf<span class="token punctuation">.</span><span class="token function">AddBook</span><span class="token punctuation">(</span><span class="token function">NewBook</span><span class="token punctuation">(</span><span class="token string">&quot;Refactoring&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Martin Fowler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 创建两个不同的迭代器对象，分别按照书名顺序和作者顺序遍历书架</span>
	nameIterator <span class="token operator">:=</span> <span class="token function">NewNameIterator</span><span class="token punctuation">(</span>bookShelf<span class="token punctuation">)</span>
	authorIterator <span class="token operator">:=</span> <span class="token function">NewAuthorIterator</span><span class="token punctuation">(</span>bookShelf<span class="token punctuation">)</span>
	<span class="token comment">// 使用迭代器对象进行遍历，并打印结果</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Iterate by name:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> nameIterator<span class="token punctuation">.</span><span class="token function">HasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		book <span class="token operator">:=</span> nameIterator<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Book<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Name: %s, Author: %s\\n&quot;</span><span class="token punctuation">,</span> book<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> book<span class="token punctuation">.</span>Author<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Iterate by author:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> authorIterator<span class="token punctuation">.</span><span class="token function">HasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		book <span class="token operator">:=</span> authorIterator<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Book<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Author: %s, Name: %s\\n&quot;</span><span class="token punctuation">,</span> book<span class="token punctuation">.</span>Author<span class="token punctuation">,</span> book<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Iterate by name:
Name: The Go Programming Language, Author: Alan A. A. Donovan and Brian W. Kernighan
Name: The C Programming Language, Author: Brian W. Kernighan and Dennis M. Ritchie
Name: Design Patterns, Author: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides
Name: Refactoring, Author: Martin Fowler
Iterate by author:
Author: Alan A. A. Donovan and Brian W. Kernighan, Name: The Go Programming Language
Author: Brian W. Kernighan and Dennis M. Ritchie, Name: The C Programming Language
Author: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, Name: Design Patterns
Author: Martin Fowler, Name: Refactoring
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>迭代器模式是一种提供顺序访问集合元素的方法的设计模式，它可以实现集合和遍历的分离，提供多种遍历方式和操作方式，隐藏集合的内部结构。go语言可以很容易地实现迭代器模式，只需要定义一个 Iterator 接口，然后为每种遍历方式创建一个实现了该接口的结构体，并在其 HasNext 和 Next 方法中实现逻辑。最后，创建一个集合对象，提供一个返回迭代器对象的方法。</p><p>我希望这篇文章能对你有所帮助。如果你还有其他想要了解的话题，欢迎继续和我聊天。😊</p>`,16))])}const r=s(c,[["render",i],["__file","Iterator.html.vue"]]);export{r as default};
