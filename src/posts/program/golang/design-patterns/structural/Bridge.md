---
icon: carbon:character-patterns
date: 2023-10-17
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---


桥接模式是一种结构型设计模式,它能将抽象部分与实现部分分离开来,使得两者可以独立变化。桥接模式建立一个桥接结构去搭起抽象部分和实现部分,从而可以保持各部分的独立性和优势。

<!-- more -->

# 桥接模式

桥接模式的主要作用是:

桥接模式能将抽象部分和实现部分分离,它们可以独立地变化。

消除永久绑定关系,提高系统的可扩展性,客户端不需要重新编译代码就可以扩展新的实现类。

桥接模式提高了抽象和实现的独立性,有利于系统的分层设计。

桥接模式符合开闭原则,在抽象和实现中任意一方改变,都不影响另一方。

## 实现

例如我们现在有两台电脑，一台Mac和一台Windows，另外还有两台打印机，任意电脑都可使用两台打印机，所以这四台机器的排列组合值是4个。

抽象层是计算机，实施层是打印机。

这两个层次可以通过==桥接==进行沟通，其中抽象层(计算机)包含对实施层(打印机)的引用。抽象层和实施层均可独立开发不受影响。

```go
// computer.go
type Computer interface {
    Print()
    SetPrinter(Printer)
}
```

```go
// mac.go
type Mac struct {
    printer Printer
}

func (m *Mac) Print() {
    fmt.Println("Print request for mac")
    m.printer.PrintFile()
}

func (m *Mac) SetPrinter(p Printer) {
    m.printer = p
}
```

```go
// windows.go
type Windows struct {
    printer Printer
}

func (w *Windows) Print() {
    fmt.Println("Print request for windows")
    w.printer.PrintFile()
}

func (w *Windows) SetPrinter(p Printer) {
    w.printer = p
}
```

```go
// printer.go
type Printer interface {
    PrintFile()
}
```

```go
// epson.go
type Epson struct {
}

func (p *Epson) PrintFile() {
    fmt.Println("Printing by a EPSON Printer")
}
```

```go
// hp.go
type Hp struct {
}

func (p *Hp) PrintFile() {
    fmt.Println("Printing by a HP Printer")
}
```

```go
// main.go
package main

import "fmt"

func main() {

    hpPrinter := &Hp{}
    epsonPrinter := &Epson{}

    macComputer := &Mac{}

    macComputer.SetPrinter(hpPrinter)
    macComputer.Print()
    fmt.Println()

    macComputer.SetPrinter(epsonPrinter)
    macComputer.Print()
    fmt.Println()

    winComputer := &Windows{}

    winComputer.SetPrinter(hpPrinter)
    winComputer.Print()
    fmt.Println()

    winComputer.SetPrinter(epsonPrinter)
    winComputer.Print()
    fmt.Println()
}
```

结果:

```sh
Print request for mac
Printing by a HP Printer

Print request for mac
Printing by a EPSON Printer

Print request for windows
Printing by a HP Printer

Print request for windows

```

## 总结

桥接器作为结构型设计模式，可以将业务逻辑拆分为不同的结构层次，从而独立开发，抽象层一般可以将对自己的调用委派给实现的对象。所有的实现部分都有一个通用接口， 因此它们能在抽象部分内部相互替换。