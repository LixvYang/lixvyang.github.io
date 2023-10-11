---
icon: mdi:state-machine
cover: /assets/images/program/fsm/order-fsm.png
date: 2023-10-07
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - FSM
---

有限状态机简称FSM(finite state machine),属于一看很高大上的概念(有着很深的理论背景),但其实真的不难理解，而且学会了就爱不释手，因为它解决某些问题真是太好用了。

简单来说，通过定义某个实例的一系列状态，当实例触发某些行为就可以在一系列状态中来回转换。

<!-- more -->

:::tip 参考
本教程参考 [欢迎进入编程世界——有限状态机](https://github.com/neolee/wop/blob/master/p2-b-fsm.ipynb)教程，感谢作者
:::

## 什么是有限状态机

其实我们身边到处都是有限状态机的例子，比如你现在看本文的显示器屏幕，就有两个状态:亮和熄。屏幕可以从两种状态之间自由转换:

```sequence 显示器状态机
亮 ->> 熄: 0 关闭
熄 ->> 亮: 1 打开
```

在这里我们的"亮"和"熄"就是"状态(state)"，箭头表示的就是状态之间可以发生"转换(transition)"，而剪头上标注的文字代表触发状态转换的"输入(input)"，这几本就是一个状态机的基本概念了。

显示器只有两个状态,没什么意思，我们来看一个最常见的红绿灯：

```sequence 
title 红绿灯状态机

绿灯->>黄灯: 1 
note left of 黄灯: 45s定时器
黄灯->>红灯: 1 
note left of 红灯: 3s定时器
红灯->>绿灯: 1 
note right of 绿灯: 60s定时器
```
这里有:

- 有三种状态：绿，黄，红；
- 状态转换是受限的，绿只能转黄，黄只能转红，红只能转绿；诸如黄转绿这样的状态转换是不允许的；
- 状态转换的输入条件很简单，接收到 1 就转换到下一个状态。

简单来说，有限状态机就是一台预先定义好了各种状态的一组状态的机器，当机器接收到一个指令之后就根据指令内容查一张预先定义好的表:

1. 检查当前状态是否符合预期，即处于当前状态的机器是否接收具体指令
2. 如果不接受，比如红灯状态接受到了2，那么什么都不会发生
3. 如果接受，再检查表中“当前状态x该指令”对应的目标状态是什么，然后把机器状态转换为目标状态

至于何时发送指令给状态机，那是由外部系统决定的，比如红绿灯的例子里，外部系统是几个定时器，时间到了就发信号给有限状态机切换状态。

有了现实生活中的例子打底，我们现在可以来看看抽象的“有限状态机（FSM）”是怎么定义的了。

![fsm3.png](/assets/images/program/fsm/fsm3.png)

上图所示, 每个FSM都包含五个要素:

- Q 包含了有限个状态(states)的集合
- ∑ 包含了有限个、非空的有效输入(input)的集合
- q0 起始状态
- F 包含了所有“结束状态（final states）”的集合，这个名字容易误解，它的作用和有限状态机的具体类型及面对的问题有关，我们可以简单理解为“标记出来有特别含义的状态的集合”就可以了，注意这个集合可以是空的。
- δ 一系列转换函数（transition functions），定义了什么样的当前状态结合什么输入可以变成什么目标状态，通常可以定义为一张二维表

在计算机编程领域FSM最广泛的应用之一就是流程与行为控制(flow and behavior control)，简单来说就是管理:

- 某个状态下什么能做什么不能做
- 做了什么会变成另一个状态

现实世界中有许多应用FSM的地方，我们日常生活中最常用的就有电商系统的订单系统:

我们用过淘宝天猫的都知道，一个订单从创建开始就要经历好几个状态，中间也有不同的操作可以进行，下面是一个比较典型的流程设计，经过简化，并以“状态”的视角来描述:

![order-fsm.png](/assets/images/program/fsm/order-fsm.png)

在这个状态机中包含着一系列状态和对应的状态转换行为，还有一系列操作没有展开，比如订单取消到订单退款的细节..

流程说明:

- 当买家点击下单时订单生成，处于“已创建”状态；
- 这个状态下的正常操作是“支付”，如果输入“支付成功”会进入下一个状态“已支付”，“支付失败”或者没有任何操作则停在本状态；
- 这个状态下其他可选操作包括“修改”、“取消”等，分别会去到订单修改和订单取消子流程（这里略去细节）；
- 支付成功后进入处于“已支付”状态；
- 这个状态下需要等待商家发货，商家输入“已发货”会进入下一个状态“配送中”；
- 这个状态下不能修改订单了，但仍然可以取消订单；
- 商家发货后进入“配送中”状态；
- 当配送到货，买家签收成功输入则进入下一个状态“已签收”；如果配送失败（买家不在家之类的情况）则留在“配送中”状态（另外择时重新送货）；
- 这个状态下已不能修改和取消订单，但是可以发起退货申请，进入退货子流程（这里略去细节）；
- 买家签收后进入“已签收”状态；
- 买家满意，确认订单完成则进入最后状态“已完成”，订单生命周期结束；
- 否则买家可以发起退货进入退货子流程（略）。

从这里我们可以看到，实际业务系统中状态和转换的规则相当复杂（我们这还是大大简化的版本），每个状态下允许的操作和可能转换的下一个状态都是严格受控的，现在我们思考一下，我们可以如何用程序来实现这样的流程呢？

## 利用有限状态机编写易于维护的代码

回忆我们之前提到的，流程和行为控制（flow and behavior control）的关键是管理：

- 某个状态下什么能做什么不能做
- 做了什么会变成另一个状态

最简单的方式是写一堆`if...else`的判断规则：

```go
package main

type OrderState int

const (
	CREATE OrderState = iota
	PAID
	DELIVERING
	RECEIVED
	DONE
	CANCELLING
	RETURNING
	CLOSED
)

type Order struct {
	state OrderState
}

func NewOrder() *Order {
	return &Order{
		state: CREATE,
	}
}

func (o *Order) can_pay() bool {
	return o.state == CREATE
}

func (o *Order) can_deliver() bool {
	return o.state == PAID
}

func (o *Order) can_cancel() bool {
	return o.state == CREATE || o.state == PAID
}

func (o *Order) can_receive() bool {
	return o.state == DELIVERING
}

func (o *Order) payment_service() bool {
	// 调用 RPC 接口完成支付
	return false
}

func (o *Order) pay() bool {
	if o.can_pay() {
		ok := o.payment_service()
		if ok {
			o.state = PAID
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}
func (o *Order) cancel() bool {
	if o.can_cancel() {
		o.state = CANCELLING
		// 取消订单，申请审批和清理数据，如果顺利成功再——
		o.state = CLOSED
	} else {
		return false
	}
	return false
}
// 还有一大堆操作的函数，每一个里面都要判断状态是不是可以做想做操作
// 然后根据执行的情况修改 o.state 为对应的新状态
```

这样的代码非常冗长和重复，难以维护且难以修改，设想一下，假设在上面的基础上再增加一个状态，要连带修改不确定几处地方，做完这样的修改还需要相应修改所有的测试用例，累就不说了，关键是容易出错。

有限状态机实际上是这些“八股”的通用实现，然后提供一个非常简洁的接口供我们使用。有兴趣的话可以自己尝试用 Golang 写一个 FSM 的实现出来，只做最基本功能的话也不是很难，但我们实际上没必要自己写, Golang也有不少FSM的第三方实现，比如 `github.com/looplab/fsm` 这个库，我们就可以用它来展示一下上面的流程如何用 FSM 来实现:

```go
package main

import (
	"context"
	"fmt"

	"github.com/looplab/fsm"
)

func main() {
	order := fsm.NewFSM(
		"created",
		fsm.Events{
			{Name: "pay", Src: []string{"created"}, Dst: "paid"},
			{Name: "deliver", Src: []string{"paid"}, Dst: "delivering"},
			{Name: "receive", Src: []string{"delivering"}, Dst: "received"},
			{Name: "confirm", Src: []string{"received"}, Dst: "done"},

			{Name: "cancel", Src: []string{"received", "paid"}, Dst: "cancelling"},
			{Name: "return", Src: []string{"delivering", "received"}, Dst: "returning"},
			{Name: "close", Src: []string{"cancelling", "returning"}, Dst: "closed"},
		},
		fsm.Callbacks{
			"before_pay": func(_ context.Context, e *fsm.Event) {
				fmt.Println("支付服务申请中……")
				// 发送 before_pay 服务
			},
			"paid": func(_ context.Context, e *fsm.Event) {
				fmt.Println("支付成功")
			},
			"after_deliver": func(_ context.Context, e *fsm.Event) {
				fmt.Println("已通知用户：商品配送中")
			},
			"cancel": func(ctx context.Context, e *fsm.Event) {
				fmt.Println("订单取消")
				e.Cancel()
			},
			"return": func(ctx context.Context, e *fsm.Event) {
				fmt.Println("订单返回")
				e.Cancel()
			},
			"close": func(ctx context.Context, e *fsm.Event) {
				fmt.Println("订单关闭")
				e.Cancel()
			},
		},
	)

	fmt.Println(order.Current())

	err := order.Event(context.Background(), "pay")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(order.Current())

	err = order.Event(context.Background(), "deliver")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(order.Current())

	err = order.Event(context.Background(), "receive")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(order.Current())

	err = order.Event(context.Background(), "confirm")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(order.Current())
}
```

```go
// 输出
go run main.go
created
支付服务申请中……
支付成功
paid
已通知用户：商品配送中
delivering
received
done
```

除了具体业务执行的代码，上面基本上完整实现了流程控制的部分，值得注意的是，借助 FSM 的实现，不仅简洁易懂，而且易于维护，假定我们需要对流程规则进行修改，或者在某些状态转换的前后添加一些操作，我们通常都只需要修改一处代码，而不用到处找哪里还要改。

## 小结

以上介绍了重要的数据模型“有限状态机（FSM）”，需要理解其背后的现实世界模型、具体应用及其带来的好处。

FSM 是对程序中一组的状态进行管理的工具；
FSM 能够精简程序里的逻辑判断，我们只需要陈述规则，FSM 自动管理什么可以什么不可以；
尝试体会和理解 FSM 背后的抽象思维方式，如何从特定问题中抽象出可以普遍应用的通用工具。

# Go 实现有限状态机

通过以上的讲解，你应该可以看清楚有限状态机的运行以及使用过程，那么我们接下来使用Go语言写一个最简单的FSM:

这只是一个差不多50行的代码，所以很简陋，但是可以将状态机的最基础使用包含:

```go
package main

import (
	"errors"
	"fmt"
)

type Transition struct {
	from  string
	to    string
	event string
}

type StateMachine struct {
	state       string
	transitions []Transition
	handleEvent func(fromState string, toState string, args []interface{}) error
}

func NewStateMachine(init string, transitions []Transition, handleEvent func(fromState string, toState string, args []interface{}) error) *StateMachine {
	return &StateMachine{
		state:       init,
		transitions: transitions,
		handleEvent: handleEvent,
	}
}

func (m *StateMachine) changeState(state string) {
	m.state = state
}

func (m *StateMachine) findTransMatching(fromState string, event string) *Transition {
	for _, v := range m.transitions {
		if v.from == fromState && v.event == event {
			return &v
		}
	}
	return nil
}

func (m *StateMachine) Trigger(event string, args ...interface{}) (err error) {
	trans := m.findTransMatching(m.state, event)
	if trans == nil {
		err = errors.New("转换状态失败: 未找到trans")
		return
	}

	if trans.event == "" {
		err = errors.New("未找到具体的event")
		return
	}

	err = m.handleEvent(m.state, trans.to, args)
	if err != nil {
		err = errors.New("转换状态失败: 未找到handleEvent")
		return
	}

	m.changeState(trans.to)

	return
}

func main() {
	transitions := make([]Transition, 0)
	transitions = append(transitions, Transition{
		from:  "create",
		to:    "running",
		event: "start",
	})
	transitions = append(transitions, Transition{
		from:  "running",
		to:    "end",
		event: "work",
	})

	fsm := NewStateMachine("create", transitions, func(fromState string, toState string, args []interface{}) error {
		switch toState {
		case "end":
			fmt.Println("工作结束")
		}
		return nil
	})
	fsm.Trigger("start")
	fsm.Trigger("work")

	fmt.Println(fsm.state)
}
```


代码仓库地址: [https://github.com/LixvYang/bilibili-go-tutorial/tree/main/fsm](https://github.com/LixvYang/bilibili-go-tutorial/tree/main/fsm)