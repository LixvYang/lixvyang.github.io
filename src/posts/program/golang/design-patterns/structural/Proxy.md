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

代理模式提供了一个其他对象的替身或占位符来控制对这个对象的访问。代理模式一般用于控制访问、扩展功能等目的。

<!-- more -->

# 代理模式

## 用法

- 第一步定义接口,原对象和代理对象都实现该接口。

- 第二步代理对象持有原对象的引用。实现接口方法时可能会进行一些附加操作,然后再转交给原对象进行处理。

## 示例

```go
type Subject interface {
  Request()
}

type RealSubject struct{} 

func (r *RealSubject) Request() {
  // real request 
}

type Proxy struct {
  subject Subject
}

func (p *Proxy) Request() {
  // proxy additional logic
  p.subject.Request()
}
```

## 总结

代理模式提供访问原对象的替代者,可以在不修改原对象的情况下对访问进行控制和扩展,是一种常见的设计模式。Go通过接口实现松耦合的代理关系。