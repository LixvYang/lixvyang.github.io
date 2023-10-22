---
icon: carbon:character-patterns
date: 2023-10-23
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

中介者模式是一种行为型设计模式，它定义了一个对象，用于封装一组对象之间的交互。中介者模式使得各个对象不需要显式地相互引用，从而降低了它们之间的耦合度。

<!-- more -->

# 中介者模式

## 用法

中介者模式的用法有以下几种：

- 当一组对象之间的通信方式复杂且难以理解时，可以使用中介者模式来简化它们之间的交互。
- 当一个对象需要与多个其他对象进行协作时，可以使用中介者模式来减少对象之间的依赖关系。
- 当一个系统需要在运行时动态地改变对象之间的交互方式时，可以使用中介者模式来实现灵活的变化。

中介者模式的优点有以下几种：

- 中介者模式可以降低系统的复杂度，提高系统的可维护性和可扩展性。
- 中介者模式可以实现对象之间的松耦合，增强对象的重用性和独立性。
- 中介者模式可以实现对象之间的一致性和协调性，保证系统的整体性和一致性。

## 示例

```go
// 定义抽象同事类
type Colleague interface {
    SetMediator(mediator Mediator) // 设置中介者
    Send(message string) // 发送消息
    Receive(message string) // 接收消息
}

// 定义抽象中介者类
type Mediator interface {
    Register(colleague Colleague) // 注册同事
    Relay(colleague Colleague, message string) // 转发消息
}

// 定义具体同事类A
type ColleagueA struct {
    mediator Mediator // 持有中介者引用
}

// 实现设置中介者方法
func (c *ColleagueA) SetMediator(mediator Mediator) {
    c.mediator = mediator
}

// 实现发送消息方法
func (c *ColleagueA) Send(message string) {
    c.mediator.Relay(c, message) // 通过中介者转发消息
}

// 实现接收消息方法
func (c *ColleagueA) Receive(message string) {
    fmt.Println("ColleagueA received:", message)
}

// 定义具体同事类B
type ColleagueB struct {
    mediator Mediator // 持有中介者引用
}

// 实现设置中介者方法
func (c *ColleagueB) SetMediator(mediator Mediator) {
    c.mediator = mediator
}

// 实现发送消息方法
func (c *ColleagueB) Send(message string) {
    c.mediator.Relay(c, message) // 通过中介者转发消息
}

// 实现接收消息方法
func (c *ColleagueB) Receive(message string) {
    fmt.Println("ColleagueB received:", message)
}

// 定义具体中介者类
type ConcreteMediator struct {
    colleagues []Colleague // 持有同事对象的集合
}

// 实现注册同事方法
func (m *ConcreteMediator) Register(colleague Colleague) {
    m.colleagues = append(m.colleagues, colleague)
    colleague.SetMediator(m) // 设置同事的中介者为自己
}

// 实现转发消息方法
func (m *ConcreteMediator) Relay(colleague Colleague, message string) {
    for _, c := range m.colleagues {
        if c != colleague { // 转发给除自己以外的所有同事
            c.Receive(message)
        }
    }
}

// 测试代码
func main() {
    // 创建具体同事对象
    a := &ColleagueA{}
    b := &ColleagueB{}

    // 创建具体中介者对象，并注册同事对象
    m := &ConcreteMediator{}
    m.Register(a)
    m.Register(b)

    // 同事对象通过中介者进行通信
    a.Send("Hello, I am A.")
    b.Send("Hi, I am B.")
}
```

输出:

```sh
ColleagueB received: Hello, I am A.
ColleagueA received: Hi, I am B.
```

## 总结

中介者模式是一种将对象之间的交互封装到一个中心对象的设计模式，它可以简化对象之间的通信，降低系统的耦合度，提高系统的可维护性和可扩展性。中介者模式适用于对象之间的交互方式复杂且难以理解，或者需要在运行时动态地改变对象之间的交互方式的场景。