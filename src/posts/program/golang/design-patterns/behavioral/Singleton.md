---
icon: carbon:character-patterns
date: 2023-10-09
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

单例模式是一种常用的设计模式，它确保类只能创建一个实例，并提供全局访问点。本文将介绍单例模式在Go语言中的定义、用处、实现方式以及相关的优缺点。

<!-- more -->

# 单例模式

## 定义

单例模式是一种创建型设计模式，它限制类的实例化过程，确保一个类只能创建一个对象，并提供一个全局的访问点。单例模式适用于需要在整个应用程序中共享数据或资源的情况。


我们的实现可以采用饿汉和懒汉的方式来实现:

## 用处

单例模式在以下情况下特别有用：

- 当只需要一个实例来协调操作时，例如日志记录器、配置管理器等。
- 当多个实例会导致资源冲突或性能问题时，例如数据库连接池、线程池等。
- 当需要限制实例化次数以节省系统资源时。

## 实现

## 饿汉式

饿汉式是一种提前加载的方式，在应用程序启动时即创建实例。它的实现通常在包的初始化函数中完成实例的创建。

```go
type Singleton struct{}

var instance = &Singleton{}

func GetInstance() *Singleton {
	return instance
}
```

## 懒汉式

懒汉式是一种延迟加载的方式，在首次访问时才创建实例。它的实现通常包括一个私有的构造函数和一个静态的GetInstance方法来返回实例。

```go
type Singleton struct{}

var (
  instance *Singleton
  once sync.Once
)

func GetInstanceOnce() *Singleton {
  once.Do(func() {
		instance = &Singleton{}
  })
	return instance
}
```

测试:
```go
package singleton

import (
	"testing"
)

func Benchmark_GetInstance(b *testing.B) {
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			GetInstance()
		}
	})
}

func Benchmark_GetInstanceOnce(b *testing.B) {
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			GetInstanceOnce()
		}
	})
}
```

压测:

```
go test -benchmem -bench="." -v

goos: darwin
goarch: arm64
pkg: demo_design/Singleton
Benchmark_GetInstance
Benchmark_GetInstance-10                1000000000               0.1801 ns/op        0 B/op           0 allocs/op
Benchmark_GetInstanceOnce
Benchmark_GetInstanceOnce-10            1000000000               0.2661 ns/op        0 B/op           0 allocs/op
PASS
ok      demo_design/Singleton   0.591s
```



单例模式的优点包括：

- 提供了对唯一实例的全局访问点，方便在整个应用程序中共享数据或资源。
- 避免了重复创建实例，节省了系统资源。
- 保证了实例的唯一性，避免了资源冲突。
  
然而，单例模式也存在一些缺点：

- 难以测试：由于单例模式的全局性质，测试时可能会遇到困难，特别是在并发测试中。
- 潜在的性能问题：单例模式可能成为系统的瓶颈，因为它限制了并发访问实例的能力。
- 违反单一职责原则：单例模式将数据和控制逻辑耦合在一起，可能导致代码维护困难。

## 总结

单例模式是一种常用的设计模式，适用于需要在整个应用程序中共享数据或资源的情况。在Go语言中，可以使用懒汉式或饿汉式的方式来实现单例模式。
