---
icon: carbon:character-patterns
date: 2023-10-19
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

作为行为模式，责任链模式允许你将请求沿着处理链路不断进行处理，每个处理者收到请求后会根据情况将请求传递给下一个链路的处理者。

<!-- more -->

# 责任链模式

## 定义

责任链模式使多个对象都有可能接收请求,对请求的发送者和接收者解耦,可以根据需要在链中增加或者删除处理器。

- 降低耦合度,发送者和接收者不需要知道彼此
- 增加接收对象的灵活性
- 可以根据需要构造链,自由组合不同的处理器

## 示例

例如你需要设计一个网关系统，这个网关系统需要对请求头，请求体进行鉴权，那么这样你就可以利用责任链形式对鉴权的过程进行封装包装:

```go
package main

import (
	"errors"
	"fmt"
	"strings"
)

type HandleRequest interface {
	HandleAuth() error
}

type Authorization struct {
	handlers []HandleRequest
}

func (a *Authorization) AddHandler(h HandleRequest) {
	a.handlers = append(a.handlers, h)
}

func (a *Authorization) Run() error {
	for _, h := range a.handlers {
		// 如果发现敏感直接返回结果
		if err := h.HandleAuth(); err != nil {
			return err
		}
	}
	return nil
}

type HttpHeaderAuth struct {
	headers []string
}

func (h *HttpHeaderAuth) HandleAuth() error {
	if len(h.headers) == 0 {
		return errors.New("len(header) == 0")

	}
	for _, header := range h.headers {
		if header != "xid123" {
			return errors.New("error for header")
		}
	}
	return nil
}

type HttpBodyAuth struct {
	body string
}

func (h *HttpBodyAuth) HandleAuth() error {
	if strings.HasPrefix(h.body, "body: ") {
		return errors.New("error for http body")
	}
	return nil
}

func main() {
	reqChain := &Authorization{}
	reqChain.AddHandler(&HttpHeaderAuth{})
	reqChain.AddHandler(&HttpBodyAuth{})
	fmt.Println(reqChain.Run())
}
```


我们平时在Go Web开发中的中间件大多也是利用责任链模式实现的，例如gin的`engine.Use()`方法。

## 总结


责任链模式通过链式请求传递,实现请求的多重接收和灵活处理,降低了耦合,增强了系统的灵活性。