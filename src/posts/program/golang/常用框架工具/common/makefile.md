---
icon: basil:edit-solid
date: 2023-09-28
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - makefile
---

我们经常可以在C/C++项目中看到Makefie，Makefile是一个非常重要的项目自动化管理工具，它用于描述项目如何编译、安装、测试等任务。

但是在Go的程序中却很少使用到，原因是Go的命令本身已经非常简单，`CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main`，就可以编译出任意平台可运行的程序，但在Go程序中使用Makefile本身就可以帮助我们不需要手动输入上述的语法，可以极大简化项目编译的过程。

<!-- more -->

# Makefile在Go程序中的应用

## make简介

`make`命令默认会查找名为Makefile或makefile的文件来获取构建规则然后执行对应的规则，一般来说主流的操作系统都会内置了`make`命令。

## Makefile简介

Makefile定义一系列规则，让我们不必每次都输入相同的命令，例如你每次想运行go程序都需要输入`go build -o main && ./main`,那么你就可以将这个规则写入`Makefile`文件，然后每次执行`make run`:

```makefile
run:
  go build -o main && ./main
```

通过这个简单的示例，你也看到了编写Makefile文件的规则:

```makefile
[target] ... : [prerequisites] ...
<tab>[command]
    ...
    ...
```

其中：

targets：表示目标,即需要构建的产品,如可执行文件、文档等。
prerequisites：表示目标的依赖,通常是源代码文件等。只有在依赖更新后,目标才需要重建。
tab: 命令行必须使用tab缩进,不能使用空格。这是Makefile关键语法。
command: 命令行具体执行的命令

所以这个简单的Makefile展示了Makefile的基本语法结构:

```makefile
目标:依赖
<tab>命令
```

###  Makefile 在Go程序中使用

我发现Go程序里使用Makefile中写的最好的是[李文周的博客](https://www.liwenzhou.com/posts/Go/makefile/),这里也借用他的实例代码来做演示吧:

```makefile
.PHONY: all build run gotool clean help

BINARY="bluebell"

all: gotool build

build:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ${BINARY}

run:
	@go run ./

gotool:
	go fmt ./
	go vet ./

clean:
	@if [ -f ${BINARY} ] ; then rm ${BINARY} ; fi

help:
	@echo "make - 格式化 Go 代码, 并编译生成二进制文件"
	@echo "make build - 编译 Go 代码, 生成二进制文件"
	@echo "make run - 直接运行 Go 代码"
	@echo "make clean - 移除二进制文件和 vim swap files"
	@echo "make gotool - 运行 Go 工具 'fmt' and 'vet'"
```

其中：

BINARY="bluebell"是定义二进制文件名称。
.PHONY用来定义伪目标。不创建目标文件，而是去执行这个目标下面的命令。

## goreleaser 一键发布你的Go代码

[goreleaser 一键发布你的Go代码](./goreleaser.md)

引用:
[李文周的博客](https://www.liwenzhou.com/posts/Go/makefile/)

