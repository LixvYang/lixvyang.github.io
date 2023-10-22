---
icon: carbon:character-patterns
date: 2023-10-22
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

策略模式是一种行为型设计模式，它定义了一系列的算法，将它们封装在一个个的策略类中，并使它们可以互相替换。策略模式可以根据不同的情况，选择不同的算法来完成相同的功能。

<!-- more -->

# 策略模式

## 用法

策略模式的用法有以下几种：
- 当一个对象有多种行为，而且这些行为可以根据不同的条件进行选择时，可以使用策略模式。
- 当一个对象需要动态地改变其行为时，可以使用策略模式来避免多重条件分支语句。
- 当一个算法需要在多个地方使用，或者有多种实现方式时，可以使用策略模式来封装和复用这些算法。

策略模式的优点有以下几种：
- 策略模式可以实现算法和对象的解耦，提高了代码的可维护性和可扩展性。
- 策略模式可以实现算法的动态切换，增加了对象的灵活性和适应性。
- 策略模式可以避免使用大量的条件分支语句，降低了代码的复杂度和出错率。

## 示例

```go
// 定义抽象策略类
type Strategy interface {
    DoOperation(num1, num2 int) int // 定义算法接口
}

// 定义具体策略类A
type AddOperation struct {}

// 实现算法接口
func (s *AddOperation) DoOperation(num1, num2 int) int {
    return num1 + num2 // 返回两数之和
}

// 定义具体策略类B
type SubOperation struct {}

// 实现算法接口
func (s *SubOperation) DoOperation(num1, num2 int) int {
    return num1 - num2 // 返回两数之差
}

// 定义具体策略类C
type MulOperation struct {}

// 实现算法接口
func (s *MulOperation) DoOperation(num1, num2 int) int {
    return num1 * num2 // 返回两数之积
}

// 定义上下文类
type Context struct {
    strategy Strategy // 持有当前策略对象
}

// 实现设置策略方法
func (c *Context) SetStrategy(strategy Strategy) {
    c.strategy = strategy // 设置新策略
}

// 实现执行策略方法
func (c *Context) ExecuteStrategy(num1, num2 int) int {
    return c.strategy.DoOperation(num1, num2) // 调用当前策略对象的算法方法
}

// 测试代码
func main() {
    // 创建上下文对象，并设置初始策略
    c := &Context{strategy: &AddOperation{}}

    // 调用执行策略方法，观察不同策略下的结果
    fmt.Println("10 + 5 =", c.ExecuteStrategy(10, 5))

    // 改变上下文对象的策略，并继续执行
    c.SetStrategy(&SubOperation{})
    fmt.Println("10 - 5 =", c.ExecuteStrategy(10, 5))

    // 再次改变上下文对象的策略，并继续执行
    c.SetStrategy(&MulOperation{})
    fmt.Println("10 * 5 =", c.ExecuteStrategy(10, 5))
}
```

输出结果：

```
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
```

## 总结

策略模式是一种将算法封装在不同的策略类中，并使它们可以互相替换的设计模式，它可以实现对象在运行时根据不同的条件选择不同的算法来完成相同的功能。策略模式适用于对象有多种行为，或者一个算法有多种实现方式的场景。