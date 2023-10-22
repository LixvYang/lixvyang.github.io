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

状态模式是一种行为型设计模式，它允许一个对象在其内部状态改变时，改变其行为。状态模式将对象的状态和行为分离，使得对象可以在运行时切换不同的状态，从而实现不同的行为。

<!-- more -->

# 状态模式

你可以读一读有限状态机这篇文章更详细了解状态模式[有限状态机](../../常用框架工具/common/fsm.md)


状态模式的用法有以下几种：

- 当一个对象的行为取决于其状态，并且它需要在运行时根据状态改变其行为时，可以使用状态模式。
- 当一个对象有多个状态，而且这些状态之间的转换逻辑复杂时，可以使用状态模式来管理这些状态和转换逻辑。
- 当一个对象的操作有多个分支，每个分支依赖于该对象的状态时，可以使用状态模式来消除冗余的条件分支语句。

状态模式的优点有以下几种：

- 状态模式可以实现对象状态和行为的封装，提高了代码的可读性和可维护性。
- 状态模式可以实现对象状态和行为的动态切换，增加了对象的灵活性和扩展性。
- 状态模式可以避免使用大量的条件分支语句，降低了代码的复杂度和出错率。

## 用法

```go
// 定义抽象状态类
type State interface {
    Handle(context *Context) // 处理状态逻辑
}

// 定义具体状态类A
type ConcreteStateA struct {}

// 实现处理状态逻辑方法
func (s *ConcreteStateA) Handle(context *Context) {
    fmt.Println("Current state is A")
    context.SetState(&ConcreteStateB{}) // 切换到下一个状态
}

// 定义具体状态类B
type ConcreteStateB struct {}

// 实现处理状态逻辑方法
func (s *ConcreteStateB) Handle(context *Context) {
    fmt.Println("Current state is B")
    context.SetState(&ConcreteStateA{}) // 切换到下一个状态
}

// 定义上下文类
type Context struct {
    state State // 持有当前状态对象
}

// 实现设置状态方法
func (c *Context) SetState(state State) {
    c.state = state // 设置新状态
}

// 实现请求方法
func (c *Context) Request() {
    c.state.Handle(c) // 调用当前状态对象的处理方法
}

// 测试代码
func main() {
    // 创建上下文对象，并设置初始状态
    c := &Context{state: &ConcreteStateA{}}

    // 调用请求方法，观察不同状态下的行为
    c.Request()
    c.Request()
    c.Request()
}
```

输出

```sh
Current state is A
Current state is B
Current state is A
```

## 总结

状态模式是一种将对象的行为与其内部状态关联的设计模式，它可以实现对象在运行时根据不同的状态切换不同的行为。状态模式适用于对象的行为取决于其状态，或者对象有多个状态，并且这些状态之间的转换逻辑复杂的场景。