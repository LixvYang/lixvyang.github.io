import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e,b as t,e as p}from"./app-98773038.js";const c={},o=t("p",null,"命令模式（Command Pattern）是一种行为型设计模式，它将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。",-1),i=p(`<h1 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h1><h2 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h2><p>命令模式通常用于以下场景：</p><ul><li>当你需要将发出请求的对象和执行请求的对象解耦时，你可以使用命令模式，让中间的命令对象充当他们之间的桥梁。</li><li>当你需要在不同的时刻指定、排列和执行请求时，你可以使用命令模式，让命令对象充当请求的容器，而且可以对它们进行保存、传递和调用。</li><li>当你需要支持撤销、恢复功能时，你可以使用命令模式，让命令对象负责在执行操作之前保存状态，并在撤销操作时恢复状态。</li><li>当你需要支持事务功能时，你可以使用命令模式，让命令对象作为事务中的原子操作，并在出现错误时回滚操作。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Command 接口定义了执行操作的方法</span>
<span class="token keyword">type</span> Command <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// TVReceiver 结构体定义了电视机接收者</span>
<span class="token keyword">type</span> TVReceiver <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Channel <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewTVReceiver 构造函数创建一个电视机接收者</span>
<span class="token keyword">func</span> <span class="token function">NewTVReceiver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>TVReceiver <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>TVReceiver<span class="token punctuation">{</span>Channel<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// TurnOn 方法定义了打开电视机的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tv <span class="token operator">*</span>TVReceiver<span class="token punctuation">)</span> <span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Turn on the TV&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// TurnOff 方法定义了关闭电视机的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tv <span class="token operator">*</span>TVReceiver<span class="token punctuation">)</span> <span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Turn off the TV&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// SwitchChannel 方法定义了切换频道的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tv <span class="token operator">*</span>TVReceiver<span class="token punctuation">)</span> <span class="token function">SwitchChannel</span><span class="token punctuation">(</span>channel <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tv<span class="token punctuation">.</span>Channel <span class="token operator">=</span> channel
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Switch the channel to %d\\n&quot;</span><span class="token punctuation">,</span> tv<span class="token punctuation">.</span>Channel<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// OnCommand 结构体定义了打开电视机的命令</span>
<span class="token keyword">type</span> OnCommand <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Receiver <span class="token operator">*</span>TVReceiver
<span class="token punctuation">}</span>

<span class="token comment">// NewOnCommand 构造函数创建一个打开电视机的命令</span>
<span class="token keyword">func</span> <span class="token function">NewOnCommand</span><span class="token punctuation">(</span>receiver <span class="token operator">*</span>TVReceiver<span class="token punctuation">)</span> <span class="token operator">*</span>OnCommand <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>OnCommand<span class="token punctuation">{</span>Receiver<span class="token punctuation">:</span> receiver<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Execute 方法实现了 Command 接口，调用接收者的 TurnOn 方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>OnCommand<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Receiver<span class="token punctuation">.</span><span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// OffCommand 结构体定义了关闭电视机的命令</span>
<span class="token keyword">type</span> OffCommand <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Receiver <span class="token operator">*</span>TVReceiver
<span class="token punctuation">}</span>

<span class="token comment">// NewOffCommand 构造函数创建一个关闭电视机的命令</span>
<span class="token keyword">func</span> <span class="token function">NewOffCommand</span><span class="token punctuation">(</span>receiver <span class="token operator">*</span>TVReceiver<span class="token punctuation">)</span> <span class="token operator">*</span>OffCommand <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>OffCommand<span class="token punctuation">{</span>Receiver<span class="token punctuation">:</span> receiver<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Execute 方法实现了 Command 接口，调用接收者的 TurnOff 方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>OffCommand<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Receiver<span class="token punctuation">.</span><span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ChannelCommand 结构体定义了切换频道的命令</span>
<span class="token keyword">type</span> ChannelCommand <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Receiver <span class="token operator">*</span>TVReceiver
	Channel  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewChannelCommand 构造函数创建一个切换频道的命令</span>
<span class="token keyword">func</span> <span class="token function">NewChannelCommand</span><span class="token punctuation">(</span>receiver <span class="token operator">*</span>TVReceiver<span class="token punctuation">,</span> channel <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>ChannelCommand <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>ChannelCommand<span class="token punctuation">{</span>Receiver<span class="token punctuation">:</span> receiver<span class="token punctuation">,</span> Channel<span class="token punctuation">:</span> channel<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Execute 方法实现了 Command 接口，调用接收者的 SwitchChannel 方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ChannelCommand<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Receiver<span class="token punctuation">.</span><span class="token function">SwitchChannel</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Channel<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Invoker 结构体定义了命令的调用者</span>
<span class="token keyword">type</span> Invoker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	On      Command
	Off     Command
	Channel Command
<span class="token punctuation">}</span>

<span class="token comment">// NewInvoker 构造函数创建一个命令的调用者</span>
<span class="token keyword">func</span> <span class="token function">NewInvoker</span><span class="token punctuation">(</span>on<span class="token punctuation">,</span> off<span class="token punctuation">,</span> channel Command<span class="token punctuation">)</span> <span class="token operator">*</span>Invoker <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Invoker<span class="token punctuation">{</span>On<span class="token punctuation">:</span> on<span class="token punctuation">,</span> Off<span class="token punctuation">:</span> off<span class="token punctuation">,</span> Channel<span class="token punctuation">:</span> channel<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// CallOn 方法定义了调用打开电视机的命令的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>Invoker<span class="token punctuation">)</span> <span class="token function">CallOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i<span class="token punctuation">.</span>On<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// CallOff 方法定义了调用关闭电视机的命令的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>Invoker<span class="token punctuation">)</span> <span class="token function">CallOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i<span class="token punctuation">.</span>Off<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// CallChannel 方法定义了调用切换频道的命令的操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>Invoker<span class="token punctuation">)</span> <span class="token function">CallChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i<span class="token punctuation">.</span>Channel<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个电视机接收者</span>
	tv <span class="token operator">:=</span> <span class="token function">NewTVReceiver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 创建三个命令对象，分别对应打开、关闭和切换频道的操作</span>
	on <span class="token operator">:=</span> <span class="token function">NewOnCommand</span><span class="token punctuation">(</span>tv<span class="token punctuation">)</span>
	off <span class="token operator">:=</span> <span class="token function">NewOffCommand</span><span class="token punctuation">(</span>tv<span class="token punctuation">)</span>
	channel <span class="token operator">:=</span> <span class="token function">NewChannelCommand</span><span class="token punctuation">(</span>tv<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token comment">// 创建一个命令调用者，将命令对象传入</span>
	invoker <span class="token operator">:=</span> <span class="token function">NewInvoker</span><span class="token punctuation">(</span>on<span class="token punctuation">,</span> off<span class="token punctuation">,</span> channel<span class="token punctuation">)</span>
	<span class="token comment">// 调用者执行各种操作</span>
	invoker<span class="token punctuation">.</span><span class="token function">CallOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	invoker<span class="token punctuation">.</span><span class="token function">CallChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	invoker<span class="token punctuation">.</span><span class="token function">CallOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>命令模式是一种将请求封装为对象的设计模式，它可以实现请求的参数化、排队、日志记录、撤销、恢复和事务等功能。命令模式可以降低系统的耦合度，增加系统的灵活性和可扩展性。go语言可以很容易地实现命令模式，只需要定义一个 Command 接口，然后为每个具体的请求创建一个实现了该接口的结构体，并在其 Execute 方法中调用接收者的相应方法。最后，创建一个 Invoker 结构体，将各个命令对象传入，并在其方法中调用命令对象的 Execute 方法。</p>`,8);function l(u,k){return s(),a("div",null,[o,e(" more "),i])}const v=n(c,[["render",l],["__file","Command.html.vue"]]);export{v as default};
