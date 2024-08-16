import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as e,f as o,b as n,d as s,e as p}from"./app-452f36db.js";const i={},c=n("p",null,[s("你自己写代码经常会"),n("code",null,"go run xxx.go"),s(",但是如果一个仓库下有一个"),n("code",null,"cmd"),s("目录并且之下会有很多"),n("code",null,"main"),s("函数，那么你每次启动都会"),n("code",null,"go run cmd/xxx.go xxxx"),s(",这样做很ugly,有没有办法让启动程序更优雅美观一些呢？当然是有的，社区有很成熟的命令行库程序，例如今天我们来介绍的Cobra.")],-1),l=p(`<h1 id="cobra-系统化你的命令行程序" tabindex="-1"><a class="header-anchor" href="#cobra-系统化你的命令行程序" aria-hidden="true">#</a> Cobra 系统化你的命令行程序</h1><p>Cobra是Go的一个Cli框架，为Go语言程序提供现代强大的命令行程序。</p><p>提供一些特别强大的功能(官网的功能描述):</p><ul><li>基于子命令的简单 CLI：app server、app fetch 等</li><li>完全符合 POSIX 标准的标志（包括短版本和长版本）</li><li>嵌套子命令</li><li>全局、局部和级联标志</li><li>轻松生成应用程序和应用程序带有 cobra init appname &amp; 的命令cobra add cmdname</li><li>智能建议（app srver...您的意思是app server吗？）</li><li>自动生成命令和标志的帮助</li><li>自动帮助标记识别-h、--help等</li><li>为您的应用程序自动生成 bash 自动完成功能</li><li>为您的应用程序自动生成手册页</li><li>命令别名，以便您可以在不破坏它们的情况下进行更改</li><li>灵活定义您自己的帮助、用法等。</li></ul><p>实际上有很多成熟的项目在使用cobra，例如<code>kubectl</code>、<code>hugo</code>等等。</p><p>下载也非常简单，在自己的项目中集成就可以了.</p><p><code>go get -u github.com/spf13/cobra/cobra</code></p><p>&amp;</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;github.com/spf13/cobra&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中我们只需要理解三个核心的概念就可以完全掌握cobra了:</p><ol><li>Commands 描述行为</li><li>Args 命令行参数</li><li>Flags 命令行选项</li></ol><p>一般的格式为:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>APPNAME COMMAND ARG <span class="token parameter variable">--FLAG</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举一个大家都会用的命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建xxx分支</span>
<span class="token comment"># git 是APPNAME </span>
<span class="token comment"># checkout 表示 COMMAND 表示行为</span>
<span class="token comment"># ARG 是 xxx 表示checkout的参数是xxx</span>
<span class="token comment"># -b 是 flags 是命令行的选项</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实这个概念理解了，就只需要按照文档跑一遍就会使用cobra了。</p><h3 id="入门过程" tabindex="-1"><a class="header-anchor" href="#入门过程" aria-hidden="true">#</a> 入门过程</h3><p>最近cobra的api发生了变化，之前文章的用法都失败了，但没关系我们只需要跟着文档跑就可以了。</p><p>要使用cobra创建自定义命令行的程序，你首先需要在本地创建一个<code>go.mod</code>,接着就可以使用cobra命令行来创建程序了:</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>对了，记得事先下载cobra-cli命令</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> install github<span class="token punctuation">.</span>com<span class="token operator">/</span>spf13<span class="token operator">/</span>cobra<span class="token operator">-</span>cli@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go mod init cobra-test
<span class="token comment"># 使用cobra</span>
cobra-cli init  cobra_test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面你的程序应该长这个样子:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├── cobra_test
│   ├── LICENSE
│   ├── cmd
│   │   └── root.go
│   └── main.go
├── go.mod
└── go.sum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理论上讲你可以在当前目录下创建很多可运行的main程序，但一般情况下只需要一个main程序，接着往主要的main程序添加命令启动各个服务就好。</p><p>所以我们把cobra_test目录下的所有程序移动到当前目录下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> ./cobra_test/* ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面你就可以开始<code>go run main.go</code>了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜  demo_cobra go run main.go        
A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library <span class="token keyword">for</span> Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想添加不同的命令还可以继续做，比如要一个echo服务，cmd目录下就可以加一个echo文件，只需要在文件里编写逻辑就好:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>➜  demo_cobra cobra-cli add echo        
echo created at /Users/lixin/code/demo_code/demo_cobra
➜  demo_cobra tree .
.
├── LICENSE
├── cmd
│   ├── echo.go
│   └── root.go
├── go.mod
├── go.sum
└── main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为命令添加具体的功能" tabindex="-1"><a class="header-anchor" href="#为命令添加具体的功能" aria-hidden="true">#</a> 为命令添加具体的功能</h3><p>到目前为止，我们一共为 cobra_demo 程序添加了两个 Command，分别是 rootCmd(cobra init 命令默认生成)echoCmd。</p><p>打开文件 root.go ，找到变量 rootCmd 的初始化过程并修改 Run 方法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;cobra demo program&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着运行go run main.go就变化了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go run main.go
cobra demo program
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为-command-添加选项-flags" tabindex="-1"><a class="header-anchor" href="#为-command-添加选项-flags" aria-hidden="true">#</a> 为 Command 添加选项(flags)</h3><p>选项(flags)用来控制 Command 的具体行为。根据选项的作用范围，可以把选项分为两类：</p><ul><li>persistent</li><li>local</li></ul><p>对于 persistent 类型的选项，既可以设置给该 Command，又可以设置给该 Command 的子 Command。对于一些全局性的选项，比较适合设置为 persistent 类型，比如控制输出的 verbose 选项：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> Verbose <span class="token builtin">bool</span>
rootCmd<span class="token punctuation">.</span><span class="token function">PersistentFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BoolVarP</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Verbose<span class="token punctuation">,</span> <span class="token string">&quot;verbose&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;v&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">&quot;verbose output&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>local 类型的选项只能设置给指定的 Command，比如下面定义的 source 选项：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> Source <span class="token builtin">string</span>
rootCmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StringVarP</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Source<span class="token punctuation">,</span> <span class="token string">&quot;source&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Source directory to read from&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> Name <span class="token builtin">string</span>
rootCmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StringVarP</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Name<span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;user name (required)&quot;</span><span class="token punctuation">)</span>
rootCmd<span class="token punctuation">.</span><span class="token function">MarkFlagRequired</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行参数(arguments)</p><p>首先我们来搞清楚命令行参数(arguments)与命令行选项的区别(flags/options)。以常见的 ls 命令来说，其命令行的格式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span>FILE<span class="token punctuation">]</span>…
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中的 OPTION 对应本文中介绍的 flags，以 - 或 -- 开头；而 FILE 则被称为参数(arguments)或位置参数。一般的规则是参数在所有选项的后面，上面的 … 表示可以指定多个选项和多个参数。</p><p>cobra 默认提供了一些验证方法：</p><p>NoArgs - 如果存在任何位置参数，该命令将报错<br> ArbitraryArgs - 该命令会接受任何位置参数<br> OnlyValidArgs - 如果有任何位置参数不在命令的 ValidArgs 字段中，该命令将报错<br> MinimumNArgs(int) - 至少要有 N 个位置参数，否则报错<br> MaximumNArgs(int) - 如果位置参数超过 N 个将报错<br> ExactArgs(int) - 必须有 N 个位置参数，否则报错<br> ExactValidArgs(int) 必须有 N 个位置参数，且都在命令的 ValidArgs 字段中，否则报错<br> RangeArgs(min, max) - 如果位置参数的个数不在区间 min 和 max 之中，报错</p><p>比如要让 Command echo 至少有一个位置参数，可以这样初始化它：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> cmdTimes <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
    Use<span class="token punctuation">:</span> …
    Short<span class="token punctuation">:</span> …
    Long<span class="token punctuation">:</span> …
    Args<span class="token punctuation">:</span> cobra<span class="token punctuation">.</span><span class="token function">MinimumNArgs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    Run<span class="token punctuation">:</span> …
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一个完整的-demo" tabindex="-1"><a class="header-anchor" href="#一个完整的-demo" aria-hidden="true">#</a> 一个完整的 demo</h3><p>我们在前面创建的代码的基础上，为 image 命令添加行为(打印信息到控制台)，并为它添加一个子命令 cmdTimes，下面是更新后的 image.go 文件的内容(本文 demo 的完整代码请参考这里)：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> cmd

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>

    <span class="token string">&quot;github.com/spf13/cobra&quot;</span>
    <span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// echoCmd represents the echo command</span>
<span class="token keyword">var</span> echoCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
    Use<span class="token punctuation">:</span>   <span class="token string">&quot;echo&quot;</span><span class="token punctuation">,</span>
    Short<span class="token punctuation">:</span> <span class="token string">&quot;Print echo information&quot;</span><span class="token punctuation">,</span>
    Long<span class="token punctuation">:</span> <span class="token string">&quot;Print all echo information&quot;</span><span class="token punctuation">,</span>
    Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;echo one is ubuntu 16.04&quot;</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;echo two is ubuntu 18.04&quot;</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;echo args are : &quot;</span> <span class="token operator">+</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> echoTimes <span class="token builtin">int</span>
<span class="token keyword">var</span> cmdTimes <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
    Use<span class="token punctuation">:</span>   <span class="token string">&quot;times [string to echo]&quot;</span><span class="token punctuation">,</span>
    Short<span class="token punctuation">:</span> <span class="token string">&quot;Echo anything to the screen more times&quot;</span><span class="token punctuation">,</span>
    Long<span class="token punctuation">:</span> <span class="token string">\`echo things multiple times back to the user by providing
a count and a string.\`</span><span class="token punctuation">,</span>
    Args<span class="token punctuation">:</span> cobra<span class="token punctuation">.</span><span class="token function">MinimumNArgs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> echoTimes<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Echo: &quot;</span> <span class="token operator">+</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    rootCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>echoCmd<span class="token punctuation">)</span>
    cmdTimes<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IntVarP</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>echoTimes<span class="token punctuation">,</span> <span class="token string">&quot;times&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;t&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;times to echo the input&quot;</span><span class="token punctuation">)</span>
    echoCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>cmdTimes<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go run main.go
$ ./cobrademo <span class="token builtin class-name">echo</span> hello
$ ./cobrademo <span class="token builtin class-name">echo</span> <span class="token builtin class-name">times</span> <span class="token parameter variable">-t</span><span class="token operator">=</span><span class="token number">3</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们为 cmdTimes 命令设置了 Args: cobra.MinimumNArgs(1)，所以必须为 times 子命令传入一个参数，不然 times 子命令会报错：</p><h3 id="在-commnad-执行前后执行额外的操作" tabindex="-1"><a class="header-anchor" href="#在-commnad-执行前后执行额外的操作" aria-hidden="true">#</a> 在 Commnad 执行前后执行额外的操作</h3><p>Command 执行的操作是通过 Command.Run 方法实现的，为了支持我们在 Run 方法执行的前后执行一些其它的操作，Command 还提供了额外的几个方法，它们的执行顺序如下：</p><ol><li>PersistentPreRun</li><li>PreRun</li><li>Run</li><li>PostRun</li><li>PersistentPostRun</li></ol><p>修改 rootCmd 的初始化代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> rootCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
    Use<span class="token punctuation">:</span>   <span class="token string">&quot;cobrademo&quot;</span><span class="token punctuation">,</span>
    Short<span class="token punctuation">:</span> <span class="token string">&quot;sparkdev&#39;s cobra demo&quot;</span><span class="token punctuation">,</span>
    Long<span class="token punctuation">:</span> <span class="token string">&quot;the demo show how to use cobra package&quot;</span><span class="token punctuation">,</span>
    PersistentPreRun<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Inside rootCmd PersistentPreRun with args: %v\\n&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    PreRun<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Inside rootCmd PreRun with args: %v\\n&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;cobra demo program, with args: %v\\n&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    PostRun<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Inside rootCmd PostRun with args: %v\\n&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    PersistentPostRun<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Inside rootCmd PersistentPostRun with args: %v\\n&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>cobra 是一个非常实用(流行)的包，很多优秀的开源应用都在使用它，包括 Docker 和 Kubernetes 等等。当我们熟悉了 cobra 包的基本用法后，再去看 Docker 等应用的命令行工具的格式，是不是就很容易理解了！</p>`,63);function u(r,d){return t(),e("div",null,[c,o(" more "),l])}const v=a(i,[["render",u],["__file","cobra.html.vue"]]);export{v as default};