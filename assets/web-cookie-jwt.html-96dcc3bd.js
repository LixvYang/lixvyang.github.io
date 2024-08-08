import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c,f as u,b as n,d as s,a as t,e}from"./app-27ebef6f.js";const l="/assets/images/program/cookie-jwt/cookie-session.png",r="/assets/images/program/cookie-jwt/token.png",k={},d=n("p",null,"众所周知，HTTP协议是无状态协议，在一次请求过后，下一次服务器就不知道这个请求是谁发送过来的了，在Web应用中，用户的认证和鉴权是非常重要的一环，实践有多种可用方案，并且各有千秋。",-1),v=e('<h1 id="cookie-jwt-学习" tabindex="-1"><a class="header-anchor" href="#cookie-jwt-学习" aria-hidden="true">#</a> Cookie &amp; JWT 学习</h1><h2 id="cookie-session-认证" tabindex="-1"><a class="header-anchor" href="#cookie-session-认证" aria-hidden="true">#</a> Cookie-Session 认证</h2><p>在Web应用发展初期至目前依然有很多网站采用Cookie-Session的方案来管理用户认证的逻辑：</p><ol><li>客户端通过用户名密码/第三方登录进行认证</li><li>认证成功后，在服务器端生成对应的session，然后将sessionID通过HTTP响应头Cookie发送给客户端</li><li>客户端访问需要认证的接口时，在Cookie中携带对应的SessionID</li><li>服务端根据对应的SessionID查找Session并进行鉴权 返回给客户端需要的数据</li></ol><figure><img src="'+l+`" alt="cookie-session.png" tabindex="0" loading="lazy"><figcaption>cookie-session.png</figcaption></figure><p>Golang代码实现:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/gorilla/sessions&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> store <span class="token operator">=</span> sessions<span class="token punctuation">.</span><span class="token function">NewCookieStore</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;secret-key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> homeHandler<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> loginHandler<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/logout&quot;</span><span class="token punctuation">,</span> logoutHandler<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Server started on http://localhost:8080&quot;</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">homeHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	session<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> store<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;session-name&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// Check if the user is authenticated</span>
	<span class="token keyword">if</span> auth<span class="token punctuation">,</span> ok <span class="token operator">:=</span> session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;authenticated&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token operator">||</span> <span class="token operator">!</span>auth <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusSeeOther<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Display the user&#39;s name</span>
	name <span class="token operator">:=</span> session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Welcome, %s!&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">loginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	session<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> store<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;session-name&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// Set user authentication status and name in the session</span>
	session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;authenticated&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;John Doe&quot;</span>

	<span class="token comment">// Save the session</span>
	session<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> w<span class="token punctuation">)</span>

	http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusSeeOther<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">logoutHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	session<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> store<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;session-name&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// Revoke user authentication status and clear session data</span>
	session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;authenticated&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
	session<span class="token punctuation">.</span>Values<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>

	<span class="token comment">// Save the session</span>
	session<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> w<span class="token punctuation">)</span>

	http<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusSeeOther<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题:</p><ol><li>服务器端需要存储大量的Session数据SessionID，而且需要存储在内存数据库中快速查找，在线用户很多时需要占用大量资源</li><li>当服务器资源不够需要扩展时需要整体迁移，可能创建session服务和验证sesion不是同一个服务资源消耗大</li><li>难以防范CSRF攻击</li></ol><h2 id="token-认证" tabindex="-1"><a class="header-anchor" href="#token-认证" aria-hidden="true">#</a> Token 认证</h2><p>基于Session的会话管理模式有很多缺点，所以基于Session会话管理做进一步提升的Token无状态会话管理就诞生了，所谓无状态就是服务器端不再存储状态：</p><ol><li>客户端通过用户名密码/第三方登录进行认证</li><li>认证成功后，在服务器端加密生成Token返还给客户端</li><li>客户端保存Token，认证时接口通过HTTP请求头加入token请求服务器端</li><li>服务端根据对应的Token进行鉴权 返回给客户端需要的数据</li></ol><figure><img src="`+r+'" alt="token.png" tabindex="0" loading="lazy"><figcaption>token.png</figcaption></figure><h2 id="jwt-认证" tabindex="-1"><a class="header-anchor" href="#jwt-认证" aria-hidden="true">#</a> JWT 认证</h2>',14),m={href:"https://tools.ietf.org/html/rfc7519",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"什么时候应该使用 JSON Web 令牌？",-1),g=n("ol",null,[n("li",null,[n("p",null,"授权：这是使用 JWT 最常见的场景。用户登录后，每个后续请求都将包含 JWT，从而允许用户访问该令牌允许的路由、服务和资源。单点登录是当今广泛使用 JWT 的一项功能，因为它的开销很小并且能够轻松地跨不同域使用。")]),n("li",null,[n("p",null,"信息交换：JSON Web 令牌是在各方之间安全传输信息的好方法。因为 JWT 可以进行签名（例如，使用公钥/私钥对），所以您可以确定发送者就是他们所说的人。此外，由于签名是使用标头和有效负载计算的，因此您还可以验证内容是否未被篡改。")])],-1),h={href:"https://jwt.io/",target:"_blank",rel:"noopener noreferrer"},f=e(`<p>一个JWT Token就像这样:</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<br> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.<br> SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</p></div><p>由两个 <code>.</code>分割成的三段部分组成，这三个部分分别是由<code>Header</code>头、<code>Payload</code>负载、<code>Signature</code>签名组成。</p><p>因此，JWT 通常如下所示:</p><p><code>xxxxx.yyyyy.zzzzz</code></p><p>头和负载以JSON的格式存在，这就是JWT中的JSON，这三部分的内容都是经过了<code>Base64</code>编码组成。</p><p>比如<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</code>是由编码组成:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;alg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;HS256&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;typ&quot;</span><span class="token operator">:</span> <span class="token string">&quot;JWT&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Header存储了加密算法和Token类型。</p><p>Payload表示一个(负载)，也是一个JSON对象，官方提供7个字段(不强制):</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">iss</span> <span class="token punctuation">(</span>issuer<span class="token punctuation">)</span>（发行人）
<span class="token function">sub</span> <span class="token punctuation">(</span>subject<span class="token punctuation">)</span>（主题）
<span class="token function">aud</span> <span class="token punctuation">(</span>audienct<span class="token punctuation">)</span> （受众）
<span class="token function">exp</span> <span class="token punctuation">(</span>expiration time<span class="token punctuation">)</span>（到期时间）
<span class="token function">nbf</span> <span class="token punctuation">(</span>not before<span class="token punctuation">)</span>（不早于 生效时间）
<span class="token function">iat</span> <span class="token punctuation">(</span>issued at<span class="token punctuation">)</span>（发布于）
<span class="token function">jti</span> <span class="token punctuation">(</span>jwt id<span class="token punctuation">)</span>（<span class="token constant">JWT</span> <span class="token constant">ID</span>）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了这几个，我们也可以自定义字段,比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;sub&quot;: &quot;1234567890&quot;,
  &quot;name&quot;: &quot;John Doe&quot;,
  &quot;admin&quot;: true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后对Payload进行 Base64Url 编码以形成 JWT 的第二部分。</p><div class="hint-container danger"><p class="hint-container-title">警告</p><p>请注意，对于已签名的令牌来说，这些信息虽然可以防止篡改，但任何人都可以读取。除非经过加密，否则不要在 JWT 的payload或Header中加入用户隐私信息。</p></div><p>最后一部分就是Signature,主要作用是对前面的部分进行加密防止数据篡改:</p><p>要创建签名部分，您必须获取JWT的加密后的Header、加密后的payload、一个密钥、Header中指定的算法，然后对其进行签名。</p><p>例如，如果要使用HMAC SHA256算法，则将通过以下方式创建签名：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>HMACSHA256(
  base64UrlEncode(header) + &quot;.&quot; +
  base64UrlEncode(payload),
  secret)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后三部分合起来就组成了JWT.</p><p>JWT 也缺点:</p><p>由于有效期存储在Token中，一旦JWT Token签发后，在有效期内就是一直可用的，无法在服务器端废除，当用户取消登陆时，只能依赖客户端删除本地的JWT Token。</p><p>基于JWT实现认证的实践:</p><p>通常我们有两种token，一种是<code>Access Token</code>是用来访问接口资源的token。另一种是<code>Refresh Token</code>。通常情况下，Refresh Token存在的有效期时间会比较长，而Access Token的有效期会比较短，当Access Token由于过期而失效时，就可以使用Refresh Token来刷新获取到新的Access Token。如果Refresh Token也失效了，那用户就只能重新登录了。</p><p>Go JWT代码逻辑实现:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token string">&quot;github.com/dgrijalva/jwt-go&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> jwtKey <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;secret-key&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">type</span> Claims <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">\`json:&quot;username&quot;\`</span>
	jwt<span class="token punctuation">.</span>StandardClaims
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> loginHandler<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/home&quot;</span><span class="token punctuation">,</span> homeHandler<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Server started on http://localhost:8080&quot;</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">loginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> r<span class="token punctuation">.</span>Method <span class="token operator">!=</span> <span class="token string">&quot;POST&quot;</span> <span class="token punctuation">{</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusMethodNotAllowed<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	username <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span>
	password <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">FormValue</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// Check username and password (dummy check)</span>
	<span class="token keyword">if</span> username <span class="token operator">!=</span> <span class="token string">&quot;admin&quot;</span> <span class="token operator">||</span> password <span class="token operator">!=</span> <span class="token string">&quot;password&quot;</span> <span class="token punctuation">{</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Create token</span>
	expirationTime <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span>
	claims <span class="token operator">:=</span> <span class="token operator">&amp;</span>Claims<span class="token punctuation">{</span>
		Username<span class="token punctuation">:</span> username<span class="token punctuation">,</span>
		StandardClaims<span class="token punctuation">:</span> jwt<span class="token punctuation">.</span>StandardClaims<span class="token punctuation">{</span>
			ExpiresAt<span class="token punctuation">:</span> expirationTime<span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	token <span class="token operator">:=</span> jwt<span class="token punctuation">.</span><span class="token function">NewWithClaims</span><span class="token punctuation">(</span>jwt<span class="token punctuation">.</span>SigningMethodHS256<span class="token punctuation">,</span> claims<span class="token punctuation">)</span>
	tokenString<span class="token punctuation">,</span> err <span class="token operator">:=</span> token<span class="token punctuation">.</span><span class="token function">SignedString</span><span class="token punctuation">(</span>jwtKey<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Set token in response header</span>
	http<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span>    <span class="token string">&quot;token&quot;</span><span class="token punctuation">,</span>
		Value<span class="token punctuation">:</span>   tokenString<span class="token punctuation">,</span>
		Expires<span class="token punctuation">:</span> expirationTime<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">homeHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cookie<span class="token punctuation">,</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Cookie</span><span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> http<span class="token punctuation">.</span>ErrNoCookie <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	tokenString <span class="token operator">:=</span> cookie<span class="token punctuation">.</span>Value

	claims <span class="token operator">:=</span> <span class="token operator">&amp;</span>Claims<span class="token punctuation">{</span><span class="token punctuation">}</span>

	token<span class="token punctuation">,</span> err <span class="token operator">:=</span> jwt<span class="token punctuation">.</span><span class="token function">ParseWithClaims</span><span class="token punctuation">(</span>tokenString<span class="token punctuation">,</span> claims<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>token <span class="token operator">*</span>jwt<span class="token punctuation">.</span>Token<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> jwtKey<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> jwt<span class="token punctuation">.</span>ErrSignatureInvalid <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> <span class="token operator">!</span>token<span class="token punctuation">.</span>Valid <span class="token punctuation">{</span>
		w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Token is valid, proceed with authenticated user</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Welcome, %s!&quot;</span><span class="token punctuation">,</span> claims<span class="token punctuation">.</span>Username<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function q(w,y){const a=o("ExternalLinkIcon");return i(),c("div",null,[d,u(" more "),v,n("p",null,[s("JSON Web Token (JWT) 是一种开放标准 ("),n("a",m,[s("RFC 7519"),t(a)]),s(")，它定义了一种紧凑且独立的方式，用于在各方之间以 JSON 对象的形式安全地传输信息。该信息可以被验证和信任，因为它是经过数字签名的。JWT 可以使用密钥（使用HMAC算法）或使用RSA或ECDSA的公钥/私钥对进行签名。")]),b,g,n("p",null,[n("a",h,[s("jwt.io"),t(a)]),s("就是专门在线处理JWT的网站")]),f])}const W=p(k,[["render",q],["__file","web-cookie-jwt.html.vue"]]);export{W as default};
