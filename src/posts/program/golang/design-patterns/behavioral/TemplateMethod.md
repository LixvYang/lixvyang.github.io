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

模板方法模式是一种行为型设计模式，它定义了一个算法的骨架，将一些步骤延迟到子类中实现。模板方法模式可以让子类在不改变算法结构的情况下，重新定义算法的某些步骤。

<!-- more -->

# 模版模式

当你希望在某个算法中的特定点上提供挂钩，以便其他人可以扩展该算法而无需更改其结构时，可以使用模板方法模式。

## 用法

- 代码复用：你可以将相同的代码放在超类的一个公共方法中。
- 扩展性：子类可以通过重写部分算法来实现新的行为。
- 控制：父类可以控制子类的执行顺序。

## 示例


```go
package main

import "fmt"

// Game 是一个抽象类
type Game interface {
	Start()
	End()
	Play()
}

// Chess 是 Game 的一个具体实现
type Chess struct{}

func (c *Chess) Start() {
	fmt.Println("Chess game started!")
}

func (c *Chess) End() {
	fmt.Println("Chess game ended!")
}

func (c *Chess) Play() {
	c.Start()
	fmt.Println("Playing chess...")
	c.End()
}

// Main
func main() {
	var game Game = &Chess{}
	game.Play()
}
```

## 总结

模板方法模式是一种非常有用的设计模式，它提供了一种优雅的方式来处理某些需要高度灵活性和可扩展性的问题。在Go语言中，我们可以通过接口和结构体来实现这个模式。这种模式允许我们在不改变算法结构的情况下，通过子类改变算法中的某些步骤。这使得我们可以将变化的部分放在子类中，保持超类的稳定和一致。总的来说，这是一种非常强大且灵活的设计模式。