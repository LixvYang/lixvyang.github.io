import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t,b as e,e as p}from"./app-31e9cdde.js";const i={},c=e("p",null,"桥接模式是一种结构型设计模式,它能将抽象部分与实现部分分离开来,使得两者可以独立变化。桥接模式建立一个桥接结构去搭起抽象部分和实现部分,从而可以保持各部分的独立性和优势。",-1),o=p(`<h1 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h1><p>桥接模式的主要作用是:</p><p>桥接模式能将抽象部分和实现部分分离,它们可以独立地变化。</p><p>消除永久绑定关系,提高系统的可扩展性,客户端不需要重新编译代码就可以扩展新的实现类。</p><p>桥接模式提高了抽象和实现的独立性,有利于系统的分层设计。</p><p>桥接模式符合开闭原则,在抽象和实现中任意一方改变,都不影响另一方。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>例如我们现在有两台电脑，一台Mac和一台Windows，另外还有两台打印机，任意电脑都可使用两台打印机，所以这四台机器的排列组合值是4个。</p><p>抽象层是计算机，实施层是打印机。</p><p>这两个层次可以通过<mark>桥接</mark>进行沟通，其中抽象层(计算机)包含对实施层(打印机)的引用。抽象层和实施层均可独立开发不受影响。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// computer.go</span>
<span class="token keyword">type</span> Computer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">SetPrinter</span><span class="token punctuation">(</span>Printer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// mac.go</span>
<span class="token keyword">type</span> Mac <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    printer Printer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Mac<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Print request for mac&quot;</span><span class="token punctuation">)</span>
    m<span class="token punctuation">.</span>printer<span class="token punctuation">.</span><span class="token function">PrintFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Mac<span class="token punctuation">)</span> <span class="token function">SetPrinter</span><span class="token punctuation">(</span>p Printer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    m<span class="token punctuation">.</span>printer <span class="token operator">=</span> p
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// windows.go</span>
<span class="token keyword">type</span> Windows <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    printer Printer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>Windows<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Print request for windows&quot;</span><span class="token punctuation">)</span>
    w<span class="token punctuation">.</span>printer<span class="token punctuation">.</span><span class="token function">PrintFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>Windows<span class="token punctuation">)</span> <span class="token function">SetPrinter</span><span class="token punctuation">(</span>p Printer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    w<span class="token punctuation">.</span>printer <span class="token operator">=</span> p
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// printer.go</span>
<span class="token keyword">type</span> Printer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">PrintFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// epson.go</span>
<span class="token keyword">type</span> Epson <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Epson<span class="token punctuation">)</span> <span class="token function">PrintFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Printing by a EPSON Printer&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// hp.go</span>
<span class="token keyword">type</span> Hp <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Hp<span class="token punctuation">)</span> <span class="token function">PrintFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Printing by a HP Printer&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    hpPrinter <span class="token operator">:=</span> <span class="token operator">&amp;</span>Hp<span class="token punctuation">{</span><span class="token punctuation">}</span>
    epsonPrinter <span class="token operator">:=</span> <span class="token operator">&amp;</span>Epson<span class="token punctuation">{</span><span class="token punctuation">}</span>

    macComputer <span class="token operator">:=</span> <span class="token operator">&amp;</span>Mac<span class="token punctuation">{</span><span class="token punctuation">}</span>

    macComputer<span class="token punctuation">.</span><span class="token function">SetPrinter</span><span class="token punctuation">(</span>hpPrinter<span class="token punctuation">)</span>
    macComputer<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    macComputer<span class="token punctuation">.</span><span class="token function">SetPrinter</span><span class="token punctuation">(</span>epsonPrinter<span class="token punctuation">)</span>
    macComputer<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    winComputer <span class="token operator">:=</span> <span class="token operator">&amp;</span>Windows<span class="token punctuation">{</span><span class="token punctuation">}</span>

    winComputer<span class="token punctuation">.</span><span class="token function">SetPrinter</span><span class="token punctuation">(</span>hpPrinter<span class="token punctuation">)</span>
    winComputer<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    winComputer<span class="token punctuation">.</span><span class="token function">SetPrinter</span><span class="token punctuation">(</span>epsonPrinter<span class="token punctuation">)</span>
    winComputer<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Print request <span class="token keyword">for</span> mac
Printing by a HP Printer

Print request <span class="token keyword">for</span> mac
Printing by a EPSON Printer

Print request <span class="token keyword">for</span> windows
Printing by a HP Printer

Print request <span class="token keyword">for</span> windows

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>桥接器作为结构型设计模式，可以将业务逻辑拆分为不同的结构层次，从而独立开发，抽象层一般可以将对自己的调用委派给实现的对象。所有的实现部分都有一个通用接口， 因此它们能在抽象部分内部相互替换。</p>`,21);function l(u,r){return s(),a("div",null,[c,t(" more "),o])}const v=n(i,[["render",l],["__file","Bridge.html.vue"]]);export{v as default};
