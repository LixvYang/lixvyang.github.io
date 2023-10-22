---
icon: carbon:character-patterns
date: 2023-10-20
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

观察者模式是一种行为型设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，当主题对象的状态发生变化时，它会通知所有观察者对象，使它们能够自动更新自己。

<!-- more -->

# 观察者模式

## 用法

观察者模式的用法有以下几种：

- 当一个对象的状态需要被其他对象实时关注时，可以使用观察者模式。
- 当一个对象需要通知其他对象，而又不想与其他对象产生紧密的耦合时，可以使用观察者模式。
- 当一个抽象模型有两个方面，其中一个方面依赖于另一个方面，可以将这两个方面封装在独立的对象中，使它们可以各自独立地改变和复用时，可以使用观察者模式。

观察者模式的优点有以下几种：

- 观察者模式可以实现对象之间的动态联动，实现数据的实时更新和同步。
- 观察者模式可以实现对象之间的松耦合，增强对象的重用性和独立性。
- 观察者模式可以实现抽象层的封装，隐藏了主题对象和观察者对象之间的具体实现细节。

## 示例

```go
// 定义抽象主题类
type Subject interface {
    Attach(observer Observer) // 添加观察者
    Detach(observer Observer) // 移除观察者
    Notify() // 通知观察者
}

// 定义抽象观察者类
type Observer interface {
    Update(subject Subject) // 更新状态
}

// 定义具体主题类
type ConcreteSubject struct {
    state int // 内部状态
    observers []Observer // 持有观察者对象的切片
}

// 实现添加观察者方法
func (s *ConcreteSubject) Attach(observer Observer) {
    s.observers = append(s.observers, observer) // 将观察者添加到切片中
}

// 实现移除观察者方法
func (s *ConcreteSubject) Detach(observer Observer) {
    for i, o := range s.observers {
        if o == observer { // 找到要移除的观察者
            s.observers = append(s.observers[:i], s.observers[i+1:]...) // 从切片中移除该观察者
            break
        }
    }
}

// 实现通知观察者方法
func (s *ConcreteSubject) Notify() {
    for _, o := range s.observers { // 遍历所有观察者
        o.Update(s) // 调用观察者的更新方法
    }
}

// 实现获取状态方法
func (s *ConcreteSubject) GetState() int {
    return s.state // 返回当前状态
}

// 实现设置状态方法
func (s *ConcreteSubject) SetState(state int) {
    s.state = state // 设置新状态
    s.Notify() // 通知所有观察者
}

// 定义具体观察者类A
type ConcreteObserverA struct {
    state int // 内部状态
}

// 实现更新状态方法
func (o *ConcreteObserverA) Update(subject Subject) {
    o.state = subject.GetState() // 从主题对象中获取新状态
    fmt.Println("ConcreteObserverA state:", o.state)
}

// 定义具体观察者类B
type ConcreteObserverB struct {
    state int // 内部状态
}

// 实现更新状态方法
func (o *ConcreteObserverB) Update(subject Subject) {
    o.state = subject.GetState() // 从主题对象中获取新状态
    fmt.Println("ConcreteObserverB state:", o.state)
}

// 测试代码
func main() {
    // 创建具体主题对象，并设置初始状态
    s := &ConcreteSubject{state: 0}
    fmt.Println("Subject state:", s.state)

    // 创建具体观察者对象，并添加到主题对象中
    a := &ConcreteObserverA{}
    b := &ConcreteObserverB{}
    s.Attach(a)
    s.Attach(b)

    // 改变主题对象的状态，并通知所有观察者
    s.SetState(1)
    s.SetState(2)
}
```

输出:

```sh
Subject state: 0
ConcreteObserverA state: 1
ConcreteObserverB state: 1
ConcreteObserverA state: 2
ConcreteObserverB state: 2
```

## 总结

观察者模式是一种将对象状态的变化通知给其他对象的设计模式，它可以实现对象之间的动态联动，实现数据的实时更新和同步。观察者模式适用于对象状态需要被其他对象实时关注，或者需要通知其他对象，而又不想与其他对象产生紧密的耦合的场景。