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


命令模式（Command Pattern）是一种行为型设计模式，它将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。


<!-- more -->

# 命令模式

## 定义

命令模式通常用于以下场景：

- 当你需要将发出请求的对象和执行请求的对象解耦时，你可以使用命令模式，让中间的命令对象充当他们之间的桥梁。
- 当你需要在不同的时刻指定、排列和执行请求时，你可以使用命令模式，让命令对象充当请求的容器，而且可以对它们进行保存、传递和调用。
- 当你需要支持撤销、恢复功能时，你可以使用命令模式，让命令对象负责在执行操作之前保存状态，并在撤销操作时恢复状态。
- 当你需要支持事务功能时，你可以使用命令模式，让命令对象作为事务中的原子操作，并在出现错误时回滚操作。

## 示例

```go
// Command 接口定义了执行操作的方法
type Command interface {
	Execute()
}

// TVReceiver 结构体定义了电视机接收者
type TVReceiver struct {
	Channel int
}

// NewTVReceiver 构造函数创建一个电视机接收者
func NewTVReceiver() *TVReceiver {
	return &TVReceiver{Channel: 1}
}

// TurnOn 方法定义了打开电视机的操作
func (tv *TVReceiver) TurnOn() {
	fmt.Println("Turn on the TV")
}

// TurnOff 方法定义了关闭电视机的操作
func (tv *TVReceiver) TurnOff() {
	fmt.Println("Turn off the TV")
}

// SwitchChannel 方法定义了切换频道的操作
func (tv *TVReceiver) SwitchChannel(channel int) {
	tv.Channel = channel
	fmt.Printf("Switch the channel to %d\n", tv.Channel)
}

// OnCommand 结构体定义了打开电视机的命令
type OnCommand struct {
	Receiver *TVReceiver
}

// NewOnCommand 构造函数创建一个打开电视机的命令
func NewOnCommand(receiver *TVReceiver) *OnCommand {
	return &OnCommand{Receiver: receiver}
}

// Execute 方法实现了 Command 接口，调用接收者的 TurnOn 方法
func (c *OnCommand) Execute() {
	c.Receiver.TurnOn()
}

// OffCommand 结构体定义了关闭电视机的命令
type OffCommand struct {
	Receiver *TVReceiver
}

// NewOffCommand 构造函数创建一个关闭电视机的命令
func NewOffCommand(receiver *TVReceiver) *OffCommand {
	return &OffCommand{Receiver: receiver}
}

// Execute 方法实现了 Command 接口，调用接收者的 TurnOff 方法
func (c *OffCommand) Execute() {
	c.Receiver.TurnOff()
}

// ChannelCommand 结构体定义了切换频道的命令
type ChannelCommand struct {
	Receiver *TVReceiver
	Channel  int
}

// NewChannelCommand 构造函数创建一个切换频道的命令
func NewChannelCommand(receiver *TVReceiver, channel int) *ChannelCommand {
	return &ChannelCommand{Receiver: receiver, Channel: channel}
}

// Execute 方法实现了 Command 接口，调用接收者的 SwitchChannel 方法
func (c *ChannelCommand) Execute() {
	c.Receiver.SwitchChannel(c.Channel)
}

// Invoker 结构体定义了命令的调用者
type Invoker struct {
	On      Command
	Off     Command
	Channel Command
}

// NewInvoker 构造函数创建一个命令的调用者
func NewInvoker(on, off, channel Command) *Invoker {
	return &Invoker{On: on, Off: off, Channel: channel}
}

// CallOn 方法定义了调用打开电视机的命令的操作
func (i *Invoker) CallOn() {
	i.On.Execute()
}

// CallOff 方法定义了调用关闭电视机的命令的操作
func (i *Invoker) CallOff() {
	i.Off.Execute()
}

// CallChannel 方法定义了调用切换频道的命令的操作
func (i *Invoker) CallChannel() {
	i.Channel.Execute()
}

func main() {
	// 创建一个电视机接收者
	tv := NewTVReceiver()
	// 创建三个命令对象，分别对应打开、关闭和切换频道的操作
	on := NewOnCommand(tv)
	off := NewOffCommand(tv)
	channel := NewChannelCommand(tv, 3)
	// 创建一个命令调用者，将命令对象传入
	invoker := NewInvoker(on, off, channel)
	// 调用者执行各种操作
	invoker.CallOn()
	invoker.CallChannel()
	invoker.CallOff()
}
```

## 总结

命令模式是一种将请求封装为对象的设计模式，它可以实现请求的参数化、排队、日志记录、撤销、恢复和事务等功能。命令模式可以降低系统的耦合度，增加系统的灵活性和可扩展性。go语言可以很容易地实现命令模式，只需要定义一个 Command 接口，然后为每个具体的请求创建一个实现了该接口的结构体，并在其 Execute 方法中调用接收者的相应方法。最后，创建一个 Invoker 结构体，将各个命令对象传入，并在其方法中调用命令对象的 Execute 方法。

