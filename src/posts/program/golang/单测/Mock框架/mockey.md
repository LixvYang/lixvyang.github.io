---
icon: edit
date: 2023-09-02
isOriginal: true
# cover: /assets/images/cover1.jpg
category:
  - tutorial
tag:
  - golang
  - mockey
  - UT
---

在单元测试中我们经常需要用到Mock功能，简单来说就是直接模拟我们需要测试方法中的一些接口、函数、方法的返回值，让我们更容易去写Unit Test。

<!-- more -->

# Mockey 教程

mock在单元测试中非常重要，mock可以理解为构建一个替换的功能，可以是完整接口的替换，又或者是某个类下方法的替换。

本文介绍一下Go语言里字节开源的的Mockey框架。

https://github.com/bytedance/mockey

在github的README下有一个一句话值得注意:

:::info 信息
The bottom layer is monkey patch realized by rewriting function instructions at runtime.
:::

由此我们可以理解，mockey其实是通过在运行时重写函数指令实现的monkey patch。

mockey支持的功能如下

1. mock 函数和方法
    - 基础功能
        - 普通/可变参数函数
        - 普通/可变参数方法
        - 嵌套结构体方法
        - 私有类型的导出方法（不同包下）
    - 高级功能
        - mock 后执行原函数
        - goroutine 条件过滤
        - 增量改变 mock 行为
        - 获取原函数执行次数
        - 获取 mock 函数执行次数
2. mock 变量
    - 普通变量
    - 函数变量

## 安装

```go
go get github.com/bytedance/mockey@latest
```

## 快速开始

```go
import (
	"fmt"
	"testing"

	. "github.com/bytedance/mockey"
	. "github.com/smartystreets/goconvey/convey"
)

func Foo(in string) string {
	return in
}

type A struct{}

func (a A) Foo(in string) string { return in }

var Bar = 0

func TestMockXXX(t *testing.T) {
	PatchConvey("TestMockXXX", t, func() {
		Mock(Foo).Return("c").Build()   // mock函数 
		Mock(A.Foo).Return("c").Build() // mock方法 
		MockValue(&Bar).To(1)           // mock变量 

		So(Foo("a"), ShouldEqual, "c")        // 断言`Foo`成功mock 
		So(new(A).Foo("b"), ShouldEqual, "c") // 断言`A.Foo`成功mock 
		So(Bar, ShouldEqual, 1)               // 断言`Bar`成功mock 
	})
	// `PatchConvey`外自动释放mock
	fmt.Println(Foo("a"))        // a
	fmt.Println(new(A).Foo("b")) // b
	fmt.Println(Bar)             // 0
}
```

本质上上面的代码最核心的就这三行MockXX函数:

```go
    Mock(Foo).Return("c").Build()   // mock函数 
		Mock(A.Foo).Return("c").Build() // mock方法 
		MockValue(&Bar).To(1)           // mock变量 
```

我们要做的就只有在Mock函数里填入希望Mock的函数、方法，然后填入我们希望返回的对应的Return值==(这里的Return类型需要与前面的Mock里的返回值相对应)==，最后我们调用Build就可以完成，非常简单。

整个函数在PatchConvey局部函数作用域里，不需要defer来释放。

由此你也发现了，Mockey不像Gomock一样会模拟整个接口来进行单测，反而是通过更精细化的函数或者某个类的方法来进行单测，针对开发人员提升单测速度非常友好。

### Mock变量

```go
var Bar = 0
MockValue(&Bar).To(10).Build() // mock方法 		
```

MockValue()里是需要变量提供地址的

::: warning
注意：Go语言中常量会内联优化，所以你是不可以取到一个常量的地址的。比如这样..

```go
const MAX_INT = 1e10
println(&MAX_INT)
```
==所以事实上你也是不可以Mock来修改常量的,因为你取不到它的地址:)==
:::

接下来就需要一个`To`来设置mock的新值:

```go
// main.go
var MAX_INT = 2 << 10

func main() {
	fmt.Println(&MAX_INT)
}
```

```go
package main

import (
	"testing"

	. "github.com/bytedance/mockey"
	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/assert"
)

//go:noinline
func TestMockXXX(t *testing.T) {
	PatchConvey("TestOK1", t, func() {
		MockValue(&MAX_INT).To(10)
		So(MAX_INT, ShouldEqual, 10)
		PatchConvey("TestOK2", func() {
			MockValue(&MAX_INT).To(20)
			So(MAX_INT, ShouldEqual, 20)
		})
	})
	assert.Equal(t, MAX_INT, 2<<10)
	if MAX_INT != 2<<10 {
		t.Error("t != 2<<10")
	}
}
```

运行 `go test -gcflags="all=-l -N"  -v -run=TestMockXXX  `,(实际上我们注释了//go:noinline)，也就不需要-gcflags="all=-l -N"了

```go
➜  demo_ut_go go test -v -run=TestMockXXX
=== RUN   TestMockXXX

  TestOK1 ✔
    TestOK2 ✔


2 total assertions

--- PASS: TestMockXXX (0.00s)
PASS
ok      main       0.351s
```

取消mock能力？

实际上不仅仅有Patch,还有UnPatch能力..

```go
PatchConvey("TestOK1", t, func() {
		MockValue(&MAX_INT).To(10)
		So(MAX_INT, ShouldEqual, 10)
		PatchConvey("TestOK2", func() {
			MockValue(&MAX_INT).UnPatch()
			// 错误
			So(MAX_INT, ShouldEqual, 20)
			// 正确
			So(MAX_INT, ShouldEqual, 10)
		})
})
```

### Mock函数 & 方法

我们在Mock函数/方法时需要分三步进行：
1. 明确Mock的函数/方法
2. 明确返回值
3. Build

所以你在示例里看到Mock的函数/方法就可以这样表示:

```go
Mock(Foo).Return("c").Build()   // mock函数 
Mock(A.Foo).Return("c").Build() // mock方法 
```

接下来我们来讲解每一个详细步骤的使用方式,针对Mock函数，我们需要传入我们需要mock的对象，比如对方法就是Foo,对类别函数就是A.Foo,对指针类型方法就是(*A).Bar。

```go
package main

import (
	"fmt"
	"testing"

	. "github.com/bytedance/mockey"
	. "github.com/smartystreets/goconvey/convey"
)

//go:noinline
func Foo(a string) string {
	fmt.Println(a)
	return a
}

type A struct{}

func (a A) Foo(s string) string {
	fmt.Println(s)
	return s
}

func (a *A) Bar(s string) string {
	fmt.Println(s)
	return s
}

//go:noinline
func Test_Mock(t *testing.T) {
	PatchConvey("testXXX", t, func() {
		Mock(A.Foo).Return("11").Build()
		Mock((*A).Bar).Return("22").Build()
		Mock(Foo).Return("33").Build()

		So(Foo(""), ShouldEqual, "33")
		mockA := &A{}
		So(mockA.Foo(""), ShouldEqual, "11")
		So(mockA.Bar(""), ShouldEqual, "22")
	})
}
```

```go
// 测试
go test -gcflags="all=-l -N" -v -run=Test_Mock
```

我们还可以Mock函数和设置条件:

当我们限定我们的mock只有达到一定条件才触发时，可以使用When()方法。

而且我们还可以统计被Mock的函数/方法的调用次数`MockTimes()`，和原函数的调用次数`Times()`。

如果我们没有对函数/方法指定When，那么二者被调用的次数应该是相同的。

```go
  PatchConvey("Testxxx", t, func() {
		m := Mock(Foo).When(func(a string) bool { return a == "a" }).Return("c").Build()
		So(Foo("a"), ShouldEqual, "c")
		So(m.Times(), ShouldEqual, 1)
		So(m.MockTimes(), ShouldEqual, 1)
		Foo("c")
		So(m.Times(), ShouldEqual, 2)
		// 这里的Foo("c") 没有触发上面的When(func(a string) bool { return a == "a" }) 所以MockTimes是 1
		So(m.MockTimes(), ShouldEqual, 1)
	})
```

甚至我们还可以自己来关闭mock代理, 和之前的变量一样通过Patch和UnPatch来关闭Mocker。

## 禁用内联优化

::: danger
使用monkey、patch等库需要我们禁止内联，否则可能导致mock失败
:::

我们上面曾经用过

```go
go test -gcflags="all=-l -N" -v -run=TestXXX
```

但其实可以在单测的代码加注释`//go:noinline`告诉编译器自己取消内联优化.

## 重复Mock问题

在同一个PatchConvey里重复mock一个函数会报错，所以需要的话可以重新开一个Patch去Mock。