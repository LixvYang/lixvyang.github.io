---
icon: carbon:character-patterns
date: 2023-10-18
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

装饰器模式(Decorator)是一种结构型设计模式,允许向一个现有的对象添加新的功能,同时又不改变其结构。这种类型的设计模式属于结构型模式,它创建了一个装饰类,用来包装原有的类,并在保持类方法完整性的前提下,提供了额外的功能。

<!-- more -->

# 装饰模式 

## 用法

装饰器模式在不改变原有对象的基础上,通过装饰类提供额外的功能。它提供了比继承更有弹性的替代方案。常用于一些复杂的扩展需求,通过装饰器可以在运行时扩展对象功能。

使用起来很简单，就是在原来对象的基础上增加一些扩展，但又不像继承那样比较难以维护。


## 示例

```go
type Component interface {
  Operate()
}

// 具体构件角色
type ConcreteComponent struct {} 

func (c *ConcreteComponent) Operate() {
  // 原有功能
}

// 具体装饰类A 
type ConcreteDecoratorA struct {
  Decorator
}

func (d *ConcreteDecoratorA) Operate() {
  // 调用原有功能
  d.Component.Operate()
  // 添加额外功能
  fmt.Println("ConcreteDecoratorA operate")
}
```

## 总结

装饰器模式可以在不改变原有对象的情况下,通过组合类提供功能扩展,符合开闭原则,比继承更灵活,是一种常用的设计模式。
