import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-211d18b9.js";const e={},p=t(`<h1 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h1><p>适配器是一种结构型设计模式，它能使不兼容的接口匹配和工作。</p><p>例如我们知道美国、欧洲、中国的充电器接口和插座电源标准都不太一样，这时候如果我们去欧洲，那么我们可以通过一个适配器转换将我们在中国的插口转换为在欧洲电源上的充电。</p><p>简单来说，适配器可以充当两个对象之间的中间封装层，用于接受一个对象的调用将其转换为另一个接口对象可以识别的接口。</p><h2 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h2><p>当我们希望使用一个类时，但其接口与其他代码不兼容，我们这时候就可以使用适配器来解决:适配器允许我们创建一个中间层类，可以作为代码与遗留类、第三方类提供接口的转换器。</p><p>但是代码会变得比较复杂，因为我们会多加一系列接口和类，有时候还得更改原服务类来解决。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>例如我们目前有个解释器，只接受JSON格式的输入，但于此同时，我们有一些YAML格式的数据，想通过=<mark>适配器</mark>进行转换，我们就可以这样解决。</p><p>我们这里有一个只接受JSON格式的客户端的代码，用于接收一个JSON对象来分析。</p><p>但是某些情况下我们可能希望输入YAML格式的数据，这时候就可以通过适配器来解决。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// client.go</span>
<span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Client<span class="token punctuation">)</span> <span class="token function">InputIntoJson</span><span class="token punctuation">(</span>d DataFormat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Client input json format data.&quot;</span><span class="token punctuation">)</span>
	d<span class="token punctuation">.</span><span class="token function">InputIntoJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// format.go</span>
<span class="token keyword">type</span> DataFormat <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">InputIntoJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// json.go</span>
<span class="token keyword">type</span> JSONFormat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>j <span class="token operator">*</span>JSONFormat<span class="token punctuation">)</span> <span class="token function">InputIntoJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;JSONFormat input json&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// yaml.go</span>
<span class="token keyword">type</span> YAMLFormat <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>YAMLFormat<span class="token punctuation">)</span> <span class="token function">InputIntoYAML</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;input into yaml.&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// yamlAdapter.go</span>
<span class="token keyword">type</span> YAMLFormatAdapter <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	yamlFormat <span class="token operator">*</span>YAMLFormat
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>YAMLFormatAdapter<span class="token punctuation">)</span> <span class="token function">InputIntoJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span>yamlFormat<span class="token punctuation">.</span><span class="token function">InputIntoYAML</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Adapter converts yaml to JSON.&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// main.go</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">:=</span> Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	json <span class="token operator">:=</span> <span class="token operator">&amp;</span>JSONFormat<span class="token punctuation">{</span><span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">InputIntoJson</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span>

	yaml <span class="token operator">:=</span> <span class="token operator">&amp;</span>YAMLFormat<span class="token punctuation">{</span><span class="token punctuation">}</span>
	yamlFormatAdapter <span class="token operator">:=</span> <span class="token operator">&amp;</span>YAMLFormatAdapter<span class="token punctuation">{</span>
		yaml<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">InputIntoJson</span><span class="token punctuation">(</span>yamlFormatAdapter<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>Client input json format data<span class="token punctuation">.</span>
JSONFormat input json
Client input json format data<span class="token punctuation">.</span>
input into yaml<span class="token punctuation">.</span>
Adapter converts yaml to JSON<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>适配器模式是一种结构型设计模式,它能使不兼容的接口匹配和工作。适配器模式在接口不兼容的情况下,使用一个适配器作为中间件,来连接目标接口和适配的接口,从而使原本不匹配的接口可以一起工作。</p><p>适配器模式的主要作用是:</p><ul><li>把一个类的接口转换成客户希望的另一个接口,使原本接口不兼容的类可以一起工作。</li><li>通过适配器和适配接口,可以让原本不兼容的类工作在一起,提高了类的复用性。</li><li>可以将目标类和适配者类解耦,提高程序的灵活性。</li><li>符合开闭原则,在不修改原有代码的情况下,增加了新的接口适配功能。</li></ul>`,23),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","Adapter.html.vue"]]);export{r as default};
