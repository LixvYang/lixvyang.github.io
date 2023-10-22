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

访问者模式是一种行为型设计模式，它定义了一个作用于某个对象结构中的各个元素的操作，可以在不改变各个元素的类的前提下，定义作用于这些元素的新操作。访问者模式可以将数据结构和数据操作分离，实现对复杂对象结构的扩展。

<!-- more -->

# 访问者模式

## 用法

访问者模式的用法有以下几种：

- 当一个对象结构包含多个类型的对象，而且需要对这些对象执行不同的操作时，可以使用访问者模式。
- 当一个对象结构需要增加新的操作，而且这些操作不依赖于对象结构的具体类型时，可以使用访问者模式。
- 当一个对象结构需要提供多种不同的遍历方式时，可以使用访问者模式来封装这些遍历方式。

访问者模式的优点有以下几种：
- 访问者模式可以实现对象结构和操作的解耦，提高了代码的可维护性和可扩展性。
- 访问者模式可以实现对对象结构中各个元素的统一处理，增加了代码的复用性和一致性。
- 访问者模式可以实现对对象结构中各个元素的动态访问，增加了代码的灵活性和适应性。

## 示例

```go
// 定义抽象元素类
type Element interface {
    Accept(visitor Visitor) // 接受访问者
}

// 定义具体元素类A
type ConcreteElementA struct {
    name string // 元素名称
}

// 实现接受访问者方法
func (e *ConcreteElementA) Accept(visitor Visitor) {
    visitor.VisitConcreteElementA(e) // 调用访问者对自己的访问方法
}

// 实现获取名称方法
func (e *ConcreteElementA) GetName() string {
    return e.name // 返回元素名称
}

// 定义具体元素类B
type ConcreteElementB struct {
    name string // 元素名称
}

// 实现接受访问者方法
func (e *ConcreteElementB) Accept(visitor Visitor) {
    visitor.VisitConcreteElementB(e) // 调用访问者对自己的访问方法
}

// 实现获取名称方法
func (e *ConcreteElementB) GetName() string {
    return e.name // 返回元素名称
}

// 定义抽象访问者类
type Visitor interface {
    VisitConcreteElementA(element *ConcreteElementA) // 访问具体元素A
    VisitConcreteElementB(element *ConcreteElementB) // 访问具体元素B
}

// 定义具体访问者类A
type ConcreteVisitorA struct {}

// 实现访问具体元素A方法
func (v *ConcreteVisitorA) VisitConcreteElementA(element *ConcreteElementA) {
    fmt.Println("ConcreteVisitorA visits", element.GetName())
}

// 实现访问具体元素B方法
func (v *ConcreteVisitorA) VisitConcreteElementB(element *ConcreteElementB) {
    fmt.Println("ConcreteVisitorA visits", element.GetName())
}

// 定义具体访问者类B
type ConcreteVisitorB struct {}

// 实现访问具体元素A方法
func (v *ConcreteVisitorB) VisitConcreteElementA(element *ConcreteElementA) {
    fmt.Println("ConcreteVisitorB visits", element.GetName())
}

// 实现访问具体元素B方法
func (v *ConcreteVisitorB) VisitConcreteElementB(element *ConcreteElementB) {
    fmt.Println("ConcreteVisitorB visits", element.GetName())
}

// 定义对象结构类
type ObjectStructure struct {
    elements []Element // 持有元素对象的切片
}

// 实现添加元素方法
func (o *ObjectStructure) Add(element Element) {
    o.elements = append(o.elements, element) // 将元素添加到切片中
}

// 实现移除元素方法
func (o *ObjectStructure) Remove(element Element) {
    for i, e := range o.elements {
        if e == element { // 找到要移除的元素
            o.elements = append(o.elements[:i], o.elements[i+1:]...) // 从切片中移除该元素
            break
        }
    }
}

// 实现接受访问者方法
func (o *ObjectStructure) Accept(visitor Visitor) {
    for _, e := range o.elements { // 遍历所有元素
        e.Accept(visitor) // 调用元素的接受访问者方法
    }
}

// 测试代码
func main() {
    // 创建对象结构对象，并添加元素对象
    o := &ObjectStructure{}
    o.Add(&ConcreteElementA{name: "ElementA"})
    o.Add(&ConcreteElementB{name: "ElementB"})

    // 创建访问者对象，并访问对象结构中的元素
    a := &ConcreteVisitorA{}
    b := &ConcreteVisitorB{}
    o.Accept(a)
    o.Accept(b)
}
```

输出结果：

```
ConcreteVisitorA visits ElementA
ConcreteVisitorA visits ElementB
ConcreteVisitorB visits ElementA
ConcreteVisitorB visits ElementB
```

## 总结

访问者模式是一种将对对象结构中各个元素的操作封装在不同的访问者类中，并使它们可以在不改变元素类的前提下，定义对这些元素的新操作的设计模式，它可以实现对象结构和操作的分离，实现对复杂对象结构的扩展。访问者模式适用于对象结构包含多个类型的对象，而且需要对这些对象执行不同的操作，或者需要增加新的操作，或者需要提供多种不同的遍历方式的场景。
