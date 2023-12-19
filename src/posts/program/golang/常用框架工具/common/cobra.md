---
icon: carbon:tool-kit
date: 2023-12-19
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - cobra
---

你自己写代码经常会`go run xxx.go`,但是如果一个仓库下有一个`cmd`目录并且之下会有很多`main`函数，那么你每次启动都会`go run cmd/xxx.go xxxx`,这样做很ugly,有没有办法让启动程序更优雅美观一些呢？当然是有的，社区有很成熟的命令行库程序，例如今天我们来介绍的Cobra.

<!-- more -->

# Cobra 系统化你的命令行程序

Cobra是Go的一个Cli框架，为Go语言程序提供现代强大的命令行程序。

提供一些特别强大的功能(官网的功能描述):

- 基于子命令的简单 CLI：app server、app fetch 等
- 完全符合 POSIX 标准的标志（包括短版本和长版本）
- 嵌套子命令
- 全局、局部和级联标志
- 轻松生成应用程序和应用程序带有 cobra init appname & 的命令cobra add cmdname
- 智能建议（app srver...您的意思是app server吗？）
- 自动生成命令和标志的帮助
- 自动帮助标记识别-h、--help等
- 为您的应用程序自动生成 bash 自动完成功能
- 为您的应用程序自动生成手册页
- 命令别名，以便您可以在不破坏它们的情况下进行更改
- 灵活定义您自己的帮助、用法等。

实际上有很多成熟的项目在使用cobra，例如`kubectl`、`hugo`等等。

下载也非常简单，在自己的项目中集成就可以了.

`go get -u github.com/spf13/cobra/cobra`

&

```go
import "github.com/spf13/cobra"
```

其中我们只需要理解三个核心的概念就可以完全掌握cobra了:

1. Commands 描述行为
2. Args  命令行参数
3. Flags 命令行选项

一般的格式为:

```sh
APPNAME COMMAND ARG --FLAG
```

举一个大家都会用的命令:

```bash
# 创建xxx分支
# git 是APPNAME 
# checkout 表示 COMMAND 表示行为
# ARG 是 xxx 表示checkout的参数是xxx
# -b 是 flags 是命令行的选项
git checkout -b xxx
```

其实这个概念理解了，就只需要按照文档跑一遍就会使用cobra了。

### 入门过程

最近cobra的api发生了变化，之前文章的用法都失败了，但没关系我们只需要跟着文档跑就可以了。

要使用cobra创建自定义命令行的程序，你首先需要在本地创建一个`go.mod`,接着就可以使用cobra命令行来创建程序了:

:::tip
对了，记得事先下载cobra-cli命令
```go
go install github.com/spf13/cobra-cli@latest
```
:::

```sh
go mod init cobra-test
# 使用cobra
cobra-cli init  cobra_test
```

下面你的程序应该长这个样子:

```
├── cobra_test
│   ├── LICENSE
│   ├── cmd
│   │   └── root.go
│   └── main.go
├── go.mod
└── go.sum
```

理论上讲你可以在当前目录下创建很多可运行的main程序，但一般情况下只需要一个main程序，接着往主要的main程序添加命令启动各个服务就好。

所以我们把cobra_test目录下的所有程序移动到当前目录下:

```sh
mv ./cobra_test/* ./
```

下面你就可以开始`go run main.go`了

```sh
➜  demo_cobra go run main.go        
A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.
```

如果你想添加不同的命令还可以继续做，比如要一个echo服务，cmd目录下就可以加一个echo文件，只需要在文件里编写逻辑就好:

```
➜  demo_cobra cobra-cli add echo        
echo created at /Users/lixin/code/demo_code/demo_cobra
➜  demo_cobra tree .
.
├── LICENSE
├── cmd
│   ├── echo.go
│   └── root.go
├── go.mod
├── go.sum
└── main.go
```

### 为命令添加具体的功能

到目前为止，我们一共为 cobra_demo 程序添加了两个 Command，分别是 rootCmd(cobra init 命令默认生成)echoCmd。

打开文件 root.go ，找到变量 rootCmd 的初始化过程并修改 Run 方法：

```go
Run: func(cmd *cobra.Command, args []string) {
    fmt.Println("cobra demo program")
},
```

接着运行go run main.go就变化了

```sh
go run main.go
cobra demo program
```

### 为 Command 添加选项(flags)

选项(flags)用来控制 Command 的具体行为。根据选项的作用范围，可以把选项分为两类：

- persistent
- local

对于 persistent 类型的选项，既可以设置给该 Command，又可以设置给该 Command 的子 Command。对于一些全局性的选项，比较适合设置为 persistent 类型，比如控制输出的 verbose 选项：

```go
var Verbose bool
rootCmd.PersistentFlags().BoolVarP(&Verbose, "verbose", "v", false, "verbose output")
```

local 类型的选项只能设置给指定的 Command，比如下面定义的 source 选项：

```go
var Source string
rootCmd.Flags().StringVarP(&Source, "source", "s", "", "Source directory to read from")

var Name string
rootCmd.Flags().StringVarP(&Name, "name", "n", "", "user name (required)")
rootCmd.MarkFlagRequired("name")
```

命令行参数(arguments)

首先我们来搞清楚命令行参数(arguments)与命令行选项的区别(flags/options)。以常见的 ls 命令来说，其命令行的格式为：

```sh
ls [OPTION]... [FILE]…
```

其中的 OPTION 对应本文中介绍的 flags，以 - 或 -- 开头；而 FILE 则被称为参数(arguments)或位置参数。一般的规则是参数在所有选项的后面，上面的 … 表示可以指定多个选项和多个参数。

cobra 默认提供了一些验证方法：

NoArgs - 如果存在任何位置参数，该命令将报错
ArbitraryArgs - 该命令会接受任何位置参数
OnlyValidArgs - 如果有任何位置参数不在命令的 ValidArgs 字段中，该命令将报错
MinimumNArgs(int) - 至少要有 N 个位置参数，否则报错
MaximumNArgs(int) - 如果位置参数超过 N 个将报错
ExactArgs(int) - 必须有 N 个位置参数，否则报错
ExactValidArgs(int) 必须有 N 个位置参数，且都在命令的 ValidArgs 字段中，否则报错
RangeArgs(min, max) - 如果位置参数的个数不在区间 min 和 max 之中，报错

比如要让 Command echo 至少有一个位置参数，可以这样初始化它：

```go
var cmdTimes = &cobra.Command{
    Use: …
    Short: …
    Long: …
    Args: cobra.MinimumNArgs(1),
    Run: …
}
```

### 一个完整的 demo

我们在前面创建的代码的基础上，为 image 命令添加行为(打印信息到控制台)，并为它添加一个子命令 cmdTimes，下面是更新后的 image.go 文件的内容(本文 demo 的完整代码请参考这里)：

```go
package cmd

import (
    "fmt"

    "github.com/spf13/cobra"
    "strings"
)

// echoCmd represents the echo command
var echoCmd = &cobra.Command{
    Use:   "echo",
    Short: "Print echo information",
    Long: "Print all echo information",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("echo one is ubuntu 16.04")
        fmt.Println("echo two is ubuntu 18.04")
        fmt.Println("echo args are : " + strings.Join(args, " "))
    },
}

var echoTimes int
var cmdTimes = &cobra.Command{
    Use:   "times [string to echo]",
    Short: "Echo anything to the screen more times",
    Long: `echo things multiple times back to the user by providing
a count and a string.`,
    Args: cobra.MinimumNArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
        for i := 0; i < echoTimes; i++ {
            fmt.Println("Echo: " + strings.Join(args, " "))
        }
    },
}

func init() {
    rootCmd.AddCommand(echoCmd)
    cmdTimes.Flags().IntVarP(&echoTimes, "times", "t", 1, "times to echo the input")
    echoCmd.AddCommand(cmdTimes)
}
```

```sh
go run main.go
$ ./cobrademo echo hello
$ ./cobrademo echo times -t=3 world
```

因为我们为 cmdTimes 命令设置了 Args: cobra.MinimumNArgs(1)，所以必须为 times 子命令传入一个参数，不然 times 子命令会报错：


### 在 Commnad 执行前后执行额外的操作

Command 执行的操作是通过 Command.Run 方法实现的，为了支持我们在 Run 方法执行的前后执行一些其它的操作，Command 还提供了额外的几个方法，它们的执行顺序如下：

1. PersistentPreRun
2. PreRun
1. Run
2. PostRun
3. PersistentPostRun

修改 rootCmd 的初始化代码如下：

```go
var rootCmd = &cobra.Command{
    Use:   "cobrademo",
    Short: "sparkdev's cobra demo",
    Long: "the demo show how to use cobra package",
    PersistentPreRun: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Inside rootCmd PersistentPreRun with args: %v\n", args)
    },
    PreRun: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Inside rootCmd PreRun with args: %v\n", args)
    },
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Printf("cobra demo program, with args: %v\n", args)
    },
    PostRun: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Inside rootCmd PostRun with args: %v\n", args)
    },
    PersistentPostRun: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Inside rootCmd PersistentPostRun with args: %v\n", args)
    },
}
```

## 总结
cobra 是一个非常实用(流行)的包，很多优秀的开源应用都在使用它，包括 Docker 和 Kubernetes 等等。当我们熟悉了 cobra 包的基本用法后，再去看 Docker 等应用的命令行工具的格式，是不是就很容易理解了！

