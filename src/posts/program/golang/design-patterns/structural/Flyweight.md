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

享元模式(Flyweight)主要用于减少创建对象的数量,以减少内存占用和提高性能。这种类型的设计模式属于结构型模式,它提供了减少对象数量从而改善应用所需的对象结构的方式。

<!-- more -->

# 享元模式

## 用法

享元模式尝试重用现有的同类对象,如果未找到匹配的对象,则创建新对象。

模式通过共享多个对象的部分状态来实现上述功能。 换句话来说， 享元会将不同对象的相同数据进行缓存以节省内存。

## 示例


```go
type Flyweight struct {
  // 公共状态 
}

type FlyweightFactory struct {
  pool map[string]*Flyweight
}

func (f *FlyweightFactory) GetFlyweight(key string) *Flyweight {
  if v, ok := f.pool[key]; ok {
    return v 
  }
  // 共享实例
  return &Flyweight{}
}
```

## 总结

享元模式通过与共享对象减少内存使用和对象创建,并可以细粒度地控制对象粒度,是一种常见和有效的优化设计模式。