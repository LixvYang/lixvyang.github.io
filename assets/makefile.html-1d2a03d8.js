import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c,f as p,b as e,d as a,a as n,w as d,e as i}from"./app-71ed0d60.js";const u={},m=e("p",null,"我们经常可以在C/C++项目中看到Makefie，Makefile是一个非常重要的项目自动化管理工具，它用于描述项目如何编译、安装、测试等任务。",-1),k=e("p",null,[a("但是在Go的程序中却很少使用到，原因是Go的命令本身已经非常简单，"),e("code",null,"CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main"),a("，就可以编译出任意平台可运行的程序，但在Go程序中使用Makefile本身就可以帮助我们不需要手动输入上述的语法，可以极大简化项目编译的过程。")],-1),v=i(`<h1 id="makefile在go程序中的应用" tabindex="-1"><a class="header-anchor" href="#makefile在go程序中的应用" aria-hidden="true">#</a> Makefile在Go程序中的应用</h1><h2 id="make简介" tabindex="-1"><a class="header-anchor" href="#make简介" aria-hidden="true">#</a> make简介</h2><p><code>make</code>命令默认会查找名为Makefile或makefile的文件来获取构建规则然后执行对应的规则，一般来说主流的操作系统都会内置了<code>make</code>命令。</p><h2 id="makefile简介" tabindex="-1"><a class="header-anchor" href="#makefile简介" aria-hidden="true">#</a> Makefile简介</h2><p>Makefile定义一系列规则，让我们不必每次都输入相同的命令，例如你每次想运行go程序都需要输入<code>go build -o main &amp;&amp; ./main</code>,那么你就可以将这个规则写入<code>Makefile</code>文件，然后每次执行<code>make run</code>:</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">run</span><span class="token punctuation">:</span>
  go build -o main &amp;&amp; ./main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个简单的示例，你也看到了编写Makefile文件的规则:</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">[target] ...</span> <span class="token punctuation">:</span> [prerequisites] ...
&lt;tab&gt;[command]
    ...
    ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><p>targets：表示目标,即需要构建的产品,如可执行文件、文档等。<br> prerequisites：表示目标的依赖,通常是源代码文件等。只有在依赖更新后,目标才需要重建。<br> tab: 命令行必须使用tab缩进,不能使用空格。这是Makefile关键语法。<br> command: 命令行具体执行的命令</p><p>所以这个简单的Makefile展示了Makefile的基本语法结构:</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">目标</span><span class="token punctuation">:</span>依赖
&lt;tab&gt;命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="makefile-在go程序中使用" tabindex="-1"><a class="header-anchor" href="#makefile-在go程序中使用" aria-hidden="true">#</a> Makefile 在Go程序中使用</h3>`,13),b={href:"https://www.liwenzhou.com/posts/Go/makefile/",target:"_blank",rel:"noopener noreferrer"},g=i(`<div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> all build run gotool clean help

BINARY<span class="token operator">=</span><span class="token string">&quot;bluebell&quot;</span>

<span class="token target symbol">all</span><span class="token punctuation">:</span> gotool build

<span class="token target symbol">build</span><span class="token punctuation">:</span>
	CGO_ENABLED<span class="token operator">=</span>0 GOOS<span class="token operator">=</span>linux GOARCH<span class="token operator">=</span>amd64 go build -o <span class="token variable">$</span><span class="token punctuation">{</span>BINARY<span class="token punctuation">}</span>

<span class="token target symbol">run</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>go run ./

<span class="token target symbol">gotool</span><span class="token punctuation">:</span>
	go fmt ./
	go vet ./

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>if [ -f <span class="token variable">$</span><span class="token punctuation">{</span>BINARY<span class="token punctuation">}</span> ] <span class="token punctuation">;</span> then rm <span class="token variable">$</span><span class="token punctuation">{</span>BINARY<span class="token punctuation">}</span> <span class="token punctuation">;</span> fi

<span class="token target symbol">help</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token string">&quot;make - 格式化 Go 代码, 并编译生成二进制文件&quot;</span>
	<span class="token operator">@</span>echo <span class="token string">&quot;make build - 编译 Go 代码, 生成二进制文件&quot;</span>
	<span class="token operator">@</span>echo <span class="token string">&quot;make run - 直接运行 Go 代码&quot;</span>
	<span class="token operator">@</span>echo <span class="token string">&quot;make clean - 移除二进制文件和 vim swap files&quot;</span>
	<span class="token operator">@</span>echo <span class="token string">&quot;make gotool - 运行 Go 工具 &#39;fmt&#39; and &#39;vet&#39;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><p>BINARY=&quot;bluebell&quot;是定义二进制文件名称。<br> .PHONY用来定义伪目标。不创建目标文件，而是去执行这个目标下面的命令。</p><h2 id="goreleaser-一键发布你的go代码" tabindex="-1"><a class="header-anchor" href="#goreleaser-一键发布你的go代码" aria-hidden="true">#</a> goreleaser 一键发布你的Go代码</h2>`,4),f=e("br",null,null,-1),h={href:"https://www.liwenzhou.com/posts/Go/makefile/",target:"_blank",rel:"noopener noreferrer"};function _(G,x){const s=l("ExternalLinkIcon"),o=l("RouterLink");return r(),c("div",null,[m,k,p(" more "),v,e("p",null,[a("我发现Go程序里使用Makefile中写的最好的是"),e("a",b,[a("李文周的博客"),n(s)]),a(",这里也借用他的实例代码来做演示吧:")]),g,e("p",null,[n(o,{to:"/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/common/goreleaser.html"},{default:d(()=>[a("goreleaser 一键发布你的Go代码")]),_:1})]),e("p",null,[a("引用:"),f,e("a",h,[a("李文周的博客"),n(s)])])])}const E=t(u,[["render",_],["__file","makefile.html.vue"]]);export{E as default};
