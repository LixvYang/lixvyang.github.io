import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-146edfe9.js";const o={},c=t("p",null,"组合模式描述了对象的部分-整体层次结构,将对象组合成树状结构以表示“整体-部分”的层次关系。它使得用户对单个对象和组合对象的使用具有一致性。",-1),i=p(`<h1 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h1><p>明确整体和部分对象,部分对象实现共同的接口,整体对象包含部分对象,提供实现整体业务的方法。</p><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><p>让我们试着用一个操作系统文件系统的例子来理解组合模式。 文件系统中有两种类型的对象： 文件和文件夹。 在某些情形中， 文件和文件夹应被视为相同的对象。 这就是组合模式发挥作用的时候了。</p><p>想象一下， 你需要在文件系统中搜索特定的关键词。 这一搜索操作需要同时作用于文件和文件夹上。 对于文件而言， 其只会查看文件的内容； 对于文件夹则会在其内部的所有文件中查找关键词。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// component.go</span>
<span class="token keyword">type</span> Component <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">search</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// folder.go</span>
<span class="token keyword">type</span> Folder <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    components <span class="token punctuation">[</span><span class="token punctuation">]</span>Component
    name       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>Folder<span class="token punctuation">)</span> <span class="token function">search</span><span class="token punctuation">(</span>keyword <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Serching recursively for keyword %s in folder %s\\n&quot;</span><span class="token punctuation">,</span> keyword<span class="token punctuation">,</span> f<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> composite <span class="token operator">:=</span> <span class="token keyword">range</span> f<span class="token punctuation">.</span>components <span class="token punctuation">{</span>
        composite<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>keyword<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>Folder<span class="token punctuation">)</span> <span class="token function">add</span><span class="token punctuation">(</span>c Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    f<span class="token punctuation">.</span>components <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span>components<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// file.go</span>
<span class="token keyword">type</span> File <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>File<span class="token punctuation">)</span> <span class="token function">search</span><span class="token punctuation">(</span>keyword <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Searching for keyword %s in file %s\\n&quot;</span><span class="token punctuation">,</span> keyword<span class="token punctuation">,</span> f<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>File<span class="token punctuation">)</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> f<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    file1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>File<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;File1&quot;</span><span class="token punctuation">}</span>
    file2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>File<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;File2&quot;</span><span class="token punctuation">}</span>
    file3 <span class="token operator">:=</span> <span class="token operator">&amp;</span>File<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;File3&quot;</span><span class="token punctuation">}</span>

    folder1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Folder<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> <span class="token string">&quot;Folder1&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    folder1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>file1<span class="token punctuation">)</span>

    folder2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Folder<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> <span class="token string">&quot;Folder2&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    folder2<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>file2<span class="token punctuation">)</span>
    folder2<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>file3<span class="token punctuation">)</span>
    folder2<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>folder1<span class="token punctuation">)</span>

    folder2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token string">&quot;rose&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Serching recursively <span class="token keyword">for</span> keyword rose <span class="token keyword">in</span> folder Folder2
Searching <span class="token keyword">for</span> keyword rose <span class="token keyword">in</span> <span class="token function">file</span> File2
Searching <span class="token keyword">for</span> keyword rose <span class="token keyword">in</span> <span class="token function">file</span> File3
Serching recursively <span class="token keyword">for</span> keyword rose <span class="token keyword">in</span> folder Folder1
Searching <span class="token keyword">for</span> keyword rose <span class="token keyword">in</span> <span class="token function">file</span> File1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>组合模式作为结构模式可以将对象组合成树状的结构，并可以将成员对象抽象成接口像独立对象一样使用它们。</p>`,13);function l(u,r){return s(),a("div",null,[c,e(" more "),i])}const v=n(o,[["render",l],["__file","Composite.html.vue"]]);export{v as default};
