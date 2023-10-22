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

备忘录模式是一种行为型设计模式，它可以在不破坏对象的封装性的前提下，保存和恢复对象的内部状态。备忘录模式可以实现对象的撤销、回滚、恢复等功能。

<!-- more -->

# 备忘录模式

备忘录模式的用法有以下几种：

- 当需要保存对象的历史状态，以便在需要时恢复到某个状态时，可以使用备忘录模式。
- 当需要提供对象的快照，以便在发生错误或异常时，可以恢复到之前的状态时，可以使用备忘录模式。
- 当需要实现对象的撤销、重做、事务等功能时，可以使用备忘录模式。

备忘录模式的优点有以下几种：

- 备忘录模式可以保护对象的封装性，不暴露对象的内部结构和实现细节。
- 备忘录模式可以实现对象状态的管理和控制，提高对象的可靠性和安全性。
- 备忘录模式可以实现对象状态的历史记录和回溯，增加对象的功能性和灵活性。

## 示例

```go
package main

import "fmt"

// 定义发起者
type Originator struct {
	state string // 内部状态
}

// 实现创建方法
func (o *Originator) CreateMemento() *Memento {
	return &Memento{state: o.state} // 返回一个包含当前状态的备忘录
}

// 实现恢复备忘录方法
func (o *Originator) RestoreMemento(m *Memento) {
	o.state = m.state // 从备忘录中恢复状态
}

// 实现显示状态方法
func (o *Originator) ShowState() {
	fmt.Println("Originator state:", o.state)
}

// 定义备忘录类
type Memento struct {
	state string // 保存的状态
}

// 定义管理者类
type Caretaker struct {
	mementos []*Memento // 持有备忘录对象的切片
}

// 实现保存备忘录方法
func (c *Caretaker) SaveMemento(m *Memento) {
	c.mementos = append(c.mementos, m) // 将备忘录添加到切片中
}

// 实现获取备忘录方法
func (c *Caretaker) GetMemento(index int) *Memento {
	if index >= 0 && index < len(c.mementos) { // 检查索引是否有效
		return c.mementos[index] // 返回指定索引的备忘录
	}
	return nil // 返回空值
}

// 测试代码
func main() {
	// 创建发起人对象，并设置初始状态
	o := &Originator{state: "ON"}
	o.ShowState()

	// 创建管理者对象，并保存发起人的状态
	c := &Caretaker{}
	c.SaveMemento(o.CreateMemento())

	// 改变发起人的状态，并继续保存
	o.state = "OFF"
	o.ShowState()
	c.SaveMemento(o.CreateMemento())

	// 再次改变发起人的状态，并继续保存
	o.state = "ON"
	o.ShowState()
	c.SaveMemento(o.CreateMemento())

	// 从管理者对象中获取备忘录，并恢复发起人的状态
	o.RestoreMemento(c.GetMemento(0)) // 恢复到第一个状态
	o.ShowState()
	o.RestoreMemento(c.GetMemento(1)) // 恢复到第二个状态
	o.ShowState()
}
```

## 总结

备忘录模式是一种将对象状态保存到外部对象中，并在需要时从外部对象中恢复的设计模式，它可以实现对象状态的历史记录和回溯，实现对象的撤销、回滚、恢复等功能。备忘录模式适用于需要保存和恢复对象状态，或者需要提供对象的快照的场景。