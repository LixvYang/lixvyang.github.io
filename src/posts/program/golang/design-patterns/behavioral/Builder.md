---
icon: carbon:character-patterns
date: 2023-10-10
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

建造者模式是一种创建型设计模式,它可以将一个复杂对象的构建与它的表示分离,使得同样的构建过程可以创建不同的表示。

<!-- more -->

# 建造者模式
 
## 定义

建造者模式的主要作用有:

封装一个复杂对象的创建过程。客户端不需要知道复杂对象的内部结构,只需要指定需要的属性就可以构建一个复杂对象。

可以更精细地控制对象的创建过程。可以通过不同的建造者创建不同的产品对象。

将复杂对象的创建代码与业务逻辑代码分离,提高复用性和灵活性。

## 用处

Go语言中实现建造者模式的主要步骤:

定义一个Builder接口,指定需要实现的方法,如BuildPartA()、BuildPartB()等。

实现Builder接口,创建具体的建造者,实现接口中的方法以构建产品的各个部件。

定义一个Director结构体,在其中定义一个方法,该方法会使用Builder接口构建完整的产品对象。

Director通过Builder接口与不同的具体建造者交互,以构建完整的产品对象。

建造者模式的主要优点是:

- 封装复杂对象的创建过程
- 分离复杂对象的创建和表示
- 实现创建过程与表示分离

建造者模式的主要缺点:

- 建造者模式比直接创建复杂对象更加复杂
- 建造者与Director之间存在紧密的依赖

相比建造者模式,Go语言更推荐使用函数选项模式。因为函数选项模式可以实现类似的功能,但是语法更简单,不需要引入多余的接口和类型,更符合Go语言的简洁风格。函数选项模式可以通过闭包和高阶函数实现,语法轻量且易于使用。

所以在Go语言中实现复杂对象的创建,更推荐使用函数选项模式,而不是较重且复杂的建造者模式。函数选项模式可以实现建造者模式的优点,同时代码更简洁。

## 实现

```go
package builder

type Gender int

const (
	Men Gender = iota
	Women
)

type Person struct {
	Name   string
	Age    int
	Gender Gender
	Phone  int
}

type PersonConfig struct {
	Age    int
	Gender Gender
	Phone  int
}

const (
	defaultAge    = 20
	defaultGender = Men
	defaultPhone  = 12306
)

func NewPerson(name string, config *PersonConfig) *Person {
	p := &Person{
		name,
		defaultAge,
		defaultGender,
		defaultPhone,
	}

	if config.Age != defaultAge {
		p.Age = config.Age
	}

	if config.Phone != defaultPhone {
		p.Phone = config.Phone
	}

	if config.Gender != defaultGender {
		p.Gender = config.Gender
	}

	return p
}

func (p *Person) SetAge(age int) {
	p.Age = age
}

func (p *Person) SetName(name string) {
	p.Name = name
}

func (p *Person) SetPhone(phone int) {
	p.Phone = phone
}

func (p *Person) SetGender(Gender Gender) {
	p.Gender = Gender
}
```

## 另一种实现

但其实Go语言中并不推荐传统的建造者模式，更推荐函数选项模式。

```go

type OptionFunc func(*Person)

func WithPhone(phone int) OptionFunc {
	return func(p *Person) {
		p.Phone = phone
	}
}

func WithGender(gender Gender) OptionFunc {
	return func(p *Person) {
		p.Gender = gender
	}
}

func WithAge(age int) OptionFunc {
	return func(p *Person) {
		p.Age = age
	}
}

func NewPerson2(name string, optionFunc ...OptionFunc) *Person {
	p := &Person{
		Name: name,
	}

	for _, o := range optionFunc {
		o(p)
	}

	return p
}
```

## 总结

使用工厂模式的一些优点是降低耦合度、可扩展性和灵活性。缺点是多了一层抽象层，导致代码增多，实现复杂。

总的来说，当需要将对象创建代码与消费者代码分离，以及需要动态添加新的派生产品类时，工厂模式是非常有用的。它非常适合需要运行时配置灵活性和多态性的场景。