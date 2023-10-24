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

在软件开发中，经常会遇到需要保证系统中只有一个对象的情况。这种情况下，可以使用单例模式来解决问题。本文将介绍单例模式的定义、用处、实现方法和区别，并通过一个示例程序来说明其应用。

<!-- more -->

# 单例模式

## 定义

单例模式是一种创建型设计模式，其目的是确保系统中只有一个对象，并提供了一个全局访问点来访问该对象。单例模式通常用于管理系统资源，如数据库连接池、日志记录器等。

我们的实现可以采用饿汉和懒汉的方式来实现:

## 用处

单例模式的主要用处包括：

- 保证系统中只有一个对象，从而节省内存空间和提高性能。
- 提供了一个全局访问点，使得系统中的其他对象可以访问该对象。
- 可以方便地控制对象的生命周期，如初始化、销毁等。

## 实现

### 饿汉式

饿汉式单例模式是指在类加载时就立即创建对象，并将其存储在静态变量中。这种方式的好处是线程安全，但是缺点是不能够延迟对象的创建，可能会造成资源浪费。

```go
type Singleton struct{}

var instance = &Singleton{}

func GetInstance() *Singleton {
	return instance
}
```


```go
var RespMap = map[int]string{
	200: "OK",
	
	304: "Move",
	305: "Move",
}

type Resp struct {
	Code int
	Msg string
}

func GetInstance(code int) Resp {
	return Resp{
		Code: code,
		Msg: RespMap[code],
	}
}
```


### 懒汉式

懒汉式单例模式是指在第一次使用对象时才创建对象，并将其存储在静态变量中。这种方式的好处是可以延迟对象的创建，从而节省资源，但是缺点是线程不安全。

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

然而，单例模式也存在一些缺点：

- 难以测试：由于单例模式的全局性质，测试时可能会遇到困难，特别是在并发测试中。
- 潜在的性能问题：单例模式可能成为系统的瓶颈，因为它限制了并发访问实例的能力。
- 违反单一职责原则：单例模式将数据和控制逻辑耦合在一起，可能导致代码维护困难。

## 总结

单例模式是一种常用的设计模式，可以保证系统中只有一个对象，从而节省内存空间和提高性能。在Go语言中，可以使用饿汉式或懒汉式单例模式来实现。饿汉式单例模式更加适合于对象创建后不会被修改的场景，而懒汉式单例模式更加适合于对象创建后可能会被修改的场景。