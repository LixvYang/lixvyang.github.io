---
icon: carbon:character-patterns
date: 2023-10-13
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

原型模式是一种创建型设计模式,使我们可以基于已有对象复制一个又一个新对象，而又无需使代码依赖它们所属的类。

最简单的方式就是在创建类的时候附加一个`Clone`的方法。

<!-- more -->

# 原型模式

原型模式的问题在于有些对象不是很容易复制的，如果仅仅是在赋值就没有意义了，有些对象比如说字符串可能是在堆上的类，这样的类通过直接赋值的方式是没办法直接复制的。

另外对于类而言有些类内的内容是有私有内容并且不希望对外暴露的，所以有时候直接从外部复制并不可行，就需要类的方法帮助我们。

原型模式就是将Clone的过程交给原有对象，这相当于让原有对象提供一个允许我们任意复制的接口。

## 定义


## 用处

原型模式的优点是:

- 提高性能。使用原型模式实现对象的构造通常比直接调用构造函数更快一些。这是因为使用原型模式创建对象不需要额外信息,在某些场景下并不需要每次都重新创建一个完全新对象。

- 简化对象创建过程。原型模式大大简化了创建新对象的工作,通过拷贝原型直接复制对象结构而不是通过单独的构造器来实现。

- 在运行时可以增加和删除对象类型,实现灵活的生成对象的功能。

## 实现

```go
package prototype

type Person struct {
	Name  string
	Proto map[string]string
}

func (p *Person) Clone() *Person {
	pClone := &Person{Name: p.Name}

	pClone.Proto = make(map[string]string)
	for k, v := range p.Proto {
		pClone.Proto[k] = v
	}

	return pClone
}

func NewPerson(name string, Proto map[string]string) *Person {
	return &Person{
		Name:  name,
		Proto: Proto,
	}
}
```

## 总结

总结来说,原型模式通过对象复制的方式实现对象的创建和克隆操作。Go语言通过结构体的组合和方法来支持灵活的原型模式实现。这种模式能够简化对象的创建过程。