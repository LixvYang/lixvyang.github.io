---
icon: edit
date: 2023-09-02
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - mockey
---

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

### 安装

```go
go get github.com/bytedance/mockey@latest
```

### 快速开始

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