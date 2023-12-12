---
icon: carbon:tool-kit
date: 2023-12-12
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - goreleaser
  - tool
---

# samber/lo 包提升我们代码中的迭代质量

`github.com/samber/lo`是基于go1.18版本之后的Lodash的工具库，Lodash则是一个一致性、模块化、高性能的JavaScript实用工具库，用于提升开发者效率，提高原生JavaScript方法的性能，在业界赫赫有名。

lo 项目开始时作为一个有新泛型实现的实验，在某些方面可能看起来像Lodash。作者曾使用go-funk包进行编码，但go-funk使用反射（reflection），因此不是类型安全的，使用不当可能还会导致panic。

<!-- more -->

## 下载

通常情况下我们使用go的包都是通过`go get xxx`来获取:

```go
go get https://github.com/samber/lo@v1
```

::: warning
lo@v2版本正在开发中...
:::

通常不涉及并发情况下使用一般是:

`github.com/samber/lo`

并发情况则是使用(并发会使用到锁，所以数据量很大会导致性能问题):

`github.com/samber/lo/parallel`

## 使用

lo库本身支持的方法有许多，我们只需要记住当我们需要遍历map/slice时在绝大多数情况下都是可以使用到本库就可以,例如:

如果我们想遍历一个切片则可以:

```go
    type Person struct {
		Name string
		Age  int64
	}

	var matchPersons []Person

	lo.ForEach([]Person{{
		Name: "Lixv",
		Age:  21,
	}, {}}, func(item Person, index int) {
		if item.Name == "Lixv" {
			matchPersons = append(matchPersons, item)
		}
	})
	fmt.Println(matchPersons)
    }})
```

而ForEach在代码库中这是这样的形式:

```go
func ForEach[T any](collection []T, iteratee func(item T, index int)) {
	for i, item := range collection {
		iteratee(item, i)
	}
}
```

可以看到这样的实现及其优雅，如果我们想自己写各种遍历实现就会针对不同的类型写很多功能相同的函数。

其实也可以通过`parallel.ForEach`进行,只不过会在遍历过程中有阻塞过程:

```go
func ForEach[T any](collection []T, iteratee func(item T, index int)) {
	var wg sync.WaitGroup
	wg.Add(len(collection))

	for i, item := range collection {
		go func(_item T, _i int) {
			iteratee(_item, _i)
			wg.Done()
		}(item, i)
	}

	wg.Wait()
}
```

其实也有各种各样的功能，例如：

```go
import "github.com/samber/lo"

lo.Times(3, func(i int) string {
    return strconv.FormatInt(int64(i), 10)
})
```

可以实现这样的形式:

```go
res := lo.Times(3, func(index int) int {
	return index * 10
})
fmt.Println(res)

# [0 10 20]
```

代码的实现是这样的:

```go
// Times invokes the iteratee n times, returning an array of the results of each invocation.
// The iteratee is invoked with index as argument.
// Play: https://go.dev/play/p/vgQj3Glr6lT
func Times[T any](count int, iteratee func(index int) T) []T {
	result := make([]T, count)

	for i := 0; i < count; i++ {
		result[i] = iteratee(i)
	}

	return result
}
```

## 总结

学习工具可以提高我们的效率，这样的工具使用多了对我们的代码也会有质量上的提升，希望我们一起学习工具来提升我们的代码能力:)