---
icon: logos:jwt-icon
date: 2023-09-14
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - web
---


众所周知，HTTP协议是无状态协议，在一次请求过后，下一次服务器就不知道这个请求是谁发送过来的了，在Web应用中，用户的认证和鉴权是非常重要的一环，实践有多种可用方案，并且各有千秋。

<!-- more -->

# Cookie & JWT 学习

## Cookie-Session 认证

在Web应用发展初期至目前依然有很多网站采用Cookie-Session的方案来管理用户认证的逻辑：

1. 客户端通过用户名密码/第三方登录进行认证
2. 认证成功后，在服务器端生成对应的session，然后将sessionID通过HTTP响应头Cookie发送给客户端
3. 客户端访问需要认证的接口时，在Cookie中携带对应的SessionID
4. 服务端根据对应的SessionID查找Session并进行鉴权 返回给客户端需要的数据

![cookie-session.png](/assets/images/program/cookie-jwt/cookie-session.png)

Golang代码实现:

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("secret-key"))

func main() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/logout", logoutHandler)

	fmt.Println("Server started on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")

	// Check if the user is authenticated
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	// Display the user's name
	name := session.Values["name"].(string)
	fmt.Fprintf(w, "Welcome, %s!", name)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")

	// Set user authentication status and name in the session
	session.Values["authenticated"] = true
	session.Values["name"] = "John Doe"

	// Save the session
	session.Save(r, w)

	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")

	// Revoke user authentication status and clear session data
	session.Values["authenticated"] = false
	session.Values["name"] = ""

	// Save the session
	session.Save(r, w)

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
```

问题:
1. 服务器端需要存储大量的Session数据SessionID，而且需要存储在内存数据库中快速查找，在线用户很多时需要占用大量资源
2. 当服务器资源不够需要扩展时需要整体迁移，可能创建session服务和验证sesion不是同一个服务资源消耗大
3. 难以防范CSRF攻击

## Token 认证

基于Session的会话管理模式有很多缺点，所以基于Session会话管理做进一步提升的Token无状态会话管理就诞生了，所谓无状态就是服务器端不再存储状态：

1. 客户端通过用户名密码/第三方登录进行认证
2. 认证成功后，在服务器端加密生成Token返还给客户端
3. 客户端保存Token，认证时接口通过HTTP请求头加入token请求服务器端
4. 服务端根据对应的Token进行鉴权 返回给客户端需要的数据



![token.png](/assets/images/program/cookie-jwt/token.png)
 
## JWT 认证

JSON Web Token (JWT) 是一种开放标准 ([RFC 7519](https://tools.ietf.org/html/rfc7519))，它定义了一种紧凑且独立的方式，用于在各方之间以 JSON 对象的形式安全地传输信息。该信息可以被验证和信任，因为它是经过数字签名的。JWT 可以使用密钥（使用HMAC算法）或使用RSA或ECDSA的公钥/私钥对进行签名。

什么时候应该使用 JSON Web 令牌？

1. 授权：这是使用 JWT 最常见的场景。用户登录后，每个后续请求都将包含 JWT，从而允许用户访问该令牌允许的路由、服务和资源。单点登录是当今广泛使用 JWT 的一项功能，因为它的开销很小并且能够轻松地跨不同域使用。

2. 信息交换：JSON Web 令牌是在各方之间安全传输信息的好方法。因为 JWT 可以进行签名（例如，使用公钥/私钥对），所以您可以确定发送者就是他们所说的人。此外，由于签名是使用标头和有效负载计算的，因此您还可以验证内容是否未被篡改。

[jwt.io](https://jwt.io/)就是专门在线处理JWT的网站

一个JWT Token就像这样:


:::info
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
:::

由两个 `.`分割成的三段部分组成，这三个部分分别是由`Header`头、`Payload`负载、`Signature`签名组成。

因此，JWT 通常如下所示:

`xxxxx.yyyyy.zzzzz`


头和负载以JSON的格式存在，这就是JWT中的JSON，这三部分的内容都是经过了`Base64`编码组成。

比如`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`是由编码组成:

```js
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Header存储了加密算法和Token类型。

Payload表示一个(负载)，也是一个JSON对象，官方提供7个字段(不强制):

```js
iss (issuer)（发行人）
sub (subject)（主题）
aud (audienct) （受众）
exp (expiration time)（到期时间）
nbf (not before)（不早于 生效时间）
iat (issued at)（发布于）
jti (jwt id)（JWT ID）
```

除了这几个，我们也可以自定义字段,比如：

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

然后对Payload进行 Base64Url 编码以形成 JWT 的第二部分。

:::danger
请注意，对于已签名的令牌来说，这些信息虽然可以防止篡改，但任何人都可以读取。除非经过加密，否则不要在 JWT 的payload或Header中加入用户隐私信息。
:::

最后一部分就是Signature,主要作用是对前面的部分进行加密防止数据篡改:

要创建签名部分，您必须获取JWT的加密后的Header、加密后的payload、一个密钥、Header中指定的算法，然后对其进行签名。

例如，如果要使用HMAC SHA256算法，则将通过以下方式创建签名：

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

最后三部分合起来就组成了JWT.

JWT 也缺点:

由于有效期存储在Token中，一旦JWT Token签发后，在有效期内就是一直可用的，无法在服务器端废除，当用户取消登陆时，只能依赖客户端删除本地的JWT Token。

基于JWT实现认证的实践:

通常我们有两种token，一种是`Access Token`是用来访问接口资源的token。另一种是`Refresh Token`。通常情况下，Refresh Token存在的有效期时间会比较长，而Access Token的有效期会比较短，当Access Token由于过期而失效时，就可以使用Refresh Token来刷新获取到新的Access Token。如果Refresh Token也失效了，那用户就只能重新登录了。

Go JWT代码逻辑实现:

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("secret-key")

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func main() {
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/home", homeHandler)

	fmt.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	// Check username and password (dummy check)
	if username != "admin" || password != "password" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Create token
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Set token in response header
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	w.WriteHeader(http.StatusOK)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenString := cookie.Value

	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !token.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Token is valid, proceed with authenticated user
	fmt.Fprintf(w, "Welcome, %s!", claims.Username)
}
```

