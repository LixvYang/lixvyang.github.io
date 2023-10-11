---
icon: carbon:character-patterns
date: 2023-10-10
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

工厂模式是面向对象编程语言中常用的设计模式，用于抽象对象创建过程。

代码不直接实例化对象，而是向工厂对象请求实例，工厂对象负责返回完全初始化的对象。

# 工厂模式

## 定义

工厂模式定义了创建对象的接口，但让子类决定实例化哪个类。这种模式包括一个创建类，它知道要实例化哪些具体类。客户端代码调用工厂对象，而不是直接通过构造函数创建对象。

工厂方法返回一个通用产品。它为在超类中创建对象提供了一个接口，但允许子类改变将要创建对象的类型。

## 用处

使用工厂模式有几个主要好处：

- 减少了复杂的对象创建代码，并通过将创建逻辑集中在一处来消除重复。
- 减少对具体类型的依赖，促进松散耦合。客户端代码只需了解工厂接口，而无需关心对象是如何创建的。
- 它遵循单一责任原则，将对象创建代码与其他业务逻辑分开。
- 测试代码变得更容易，因为在测试过程中可以对具体类型进行模拟或存根测试，而无需更改客户端代码。

## 实现

### 简单工厂

在Go语言本身是没有构造函数一说，也没有父类字类一说。可以通过init函数在包被加载的时候创建对象，不过我们经常会定义一个`NewXXX`来创建对象。

其关键在于定义一个工厂接口，通过一个具体的工厂来实现它，并在工厂后面抽象出对象的创建

```go
// Product is the interface for products 
type Product interface {
  Name() string
}

// Concrete product 1
type ConcreteProduct1 struct{}

func (c *ConcreteProduct1) Name() string {
  return "Product 1"
}

// Concrete product 2 
type ConcreteProduct2 struct{} 

func (c *ConcreteProduct2) Name() string {
  return "Product 2"
}

// Factory is the interface for the factory
type Factory interface {
  CreateProduct(product string) Product
}

// Concrete factory 
type ConcreteFactory struct{}

func (f *ConcreteFactory) CreateProduct(product string) Product {
    switch product {
    case "1":
        return &ConcreteProduct1{}
    case "2":
        return &ConcreteProduct2{}
    }
    return nil
}

func main() {
  factory := ConcreteFactory{}
  product := factory.CreateProduct("1")
  fmt.Println(product.Name()) 
}
```

## 总结

使用工厂模式的一些优点是降低耦合度、可扩展性和灵活性。缺点是多了一层抽象，导致代码增多，实现复杂。

总的来说，当需要将对象创建代码与消费者代码分离，以及需要动态添加新的派生产品类时，工厂模式非常有用。它非常适合需要运行时配置灵活性和多态性的场景。