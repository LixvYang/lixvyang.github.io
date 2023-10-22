---
icon: carbon:character-patterns
date: 2023-10-16
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

适配器是一种结构型设计模式，它能使不兼容的接口匹配和工作。

<!-- more -->

# 适配器模式

例如我们知道美国、欧洲、中国的充电器接口和插座电源标准都不太一样，这时候如果我们去欧洲，那么我们可以通过一个适配器转换将我们在中国的插口转换为在欧洲电源上的充电。

简单来说，适配器可以充当两个对象之间的中间封装层，用于接受一个对象的调用将其转换为另一个接口对象可以识别的接口。

## 用处

当我们希望使用一个类时，但其接口与其他代码不兼容，我们这时候就可以使用适配器来解决:适配器允许我们创建一个中间层类，可以作为代码与遗留类、第三方类提供接口的转换器。

但是代码会变得比较复杂，因为我们会多加一系列接口和类，有时候还得更改原服务类来解决。

## 实现

例如我们目前有个解释器，只接受JSON格式的输入，但于此同时，我们有一些YAML格式的数据，想通过===适配器==进行转换，我们就可以这样解决。

我们这里有一个只接受JSON格式的客户端的代码，用于接收一个JSON对象来分析。

但是某些情况下我们可能希望输入YAML格式的数据，这时候就可以通过适配器来解决。


```go
// client.go
type Client struct {
}

func (c *Client) InputIntoJson(d DataFormat) {
	fmt.Println("Client input json format data.")
	d.InputIntoJson()
}
```

```go
// format.go
type DataFormat interface {
	InputIntoJson()
}
```

```go
// json.go
type JSONFormat struct {
}

func (j *JSONFormat) InputIntoJson() {
	fmt.Println("JSONFormat input json")
}
```

```go
// yaml.go
type YAMLFormat struct{}

func (f *YAMLFormat) InputIntoYAML() {
	fmt.Println("input into yaml.")
}
```


```go
// yamlAdapter.go
type YAMLFormatAdapter struct {
	yamlFormat *YAMLFormat
}

func (w *YAMLFormatAdapter) InputIntoJson() {
	w.yamlFormat.InputIntoYAML()
	fmt.Println("Adapter converts yaml to JSON.")
}
```

```go
// main.go
func main() {
	c := Client{}

	json := &JSONFormat{}
	c.InputIntoJson(json)

	yaml := &YAMLFormat{}
	yamlFormatAdapter := &YAMLFormatAdapter{
		yaml,
	}
	c.InputIntoJson(yamlFormatAdapter)
}
```

输出：

```go
Client input json format data.
JSONFormat input json
Client input json format data.
input into yaml.
Adapter converts yaml to JSON.
```

## 总结

适配器模式是一种结构型设计模式,它能使不兼容的接口匹配和工作。适配器模式在接口不兼容的情况下,使用一个适配器作为中间件,来连接目标接口和适配的接口,从而使原本不匹配的接口可以一起工作。

适配器模式的主要作用是:

- 把一个类的接口转换成客户希望的另一个接口,使原本接口不兼容的类可以一起工作。
- 通过适配器和适配接口,可以让原本不兼容的类工作在一起,提高了类的复用性。
- 可以将目标类和适配者类解耦,提高程序的灵活性。
- 符合开闭原则,在不修改原有代码的情况下,增加了新的接口适配功能。