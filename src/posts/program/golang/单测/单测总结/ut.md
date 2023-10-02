---
icon: basil:edit-solid
date: 2023-09-18
isOriginal: true
# cover: /assets/images/cover1.jpg
category:
  - tutorial
tag:
  - golang
  - UT
---

这里总结了我到目前为止在go单测方面的所有姿势，等待补充.

<!-- more -->

# Go 单测总结

## 单测

Go 单测离不开`go test` 命令的，编写测试代码和普通的go代码过程语法是类似的。

go test命令是按照一定约定和组织测试代码的驱动二进制程序。在包目录下，所有以`_test.go`的文件go test测试的部分，并且执行go build不会被编译到最终的二进制文件中去。

在`*_test.go`文件中有三种类型的函数，单元测试函数、基准测试函数和示例函数。

| 类型 | 格式 | 作用 |
| --- | --- | --- |
| 测试函数 | 函数名前缀为Test | 测试程序的一些逻辑行为是否正确 |
| 基准函数 | 函数名前缀为Benchmark | 测试函数的性能 |
| 示例函数 | 函数名前缀为Example | 为文档提供示例文档 |

### 单测函数

每个测试函数必须导入`testing`包，测试函数的基本格式（签名）如下：

```go
func Test_Name(t *testing.T) {
	...
}
```

其中参数t是用于报告和附加日志信息的作用，比如：

- 每个测试通过后需要通过t.Logf()/t.Errorf()/t.Fatal()等方法报告结果。
- 系列方法来验证测试期望,如t.Equal()、t.NotEqual()等。
- 当断言失败时,t.Fatal()/t.Error()会使当前测试直接失败并停止。
- t对象可以保存每个测试的详细信息,如名称、时间等。

测试函数示例：

通常我们在编写代码的时候，会有很多一个个的小函数、结构体、方法、接口，来组成最终代码依赖的东西，我们需要确保这些组件都是可以有保障地可以运行，单测（unit test）就是利用各种方法测试单元组件的程序，他将结果与预期输出进行比较。

接下来，我们定义一个quicksort包，写入quickSort快排程序函数，实现如下：

```go
func quickSort(arr []int) []int {
	separateSort(arr,0,len(arr)-1)
  return arr
}

func separateSort(arr []int,start,end int)  {
	if start >= end {
		return
	}
	i := partition(arr, start, end)
	separateSort(arr, start, i-1)
	separateSort(arr, i+1, end)
}

func partition(arr []int, start, end int) int {
	// 选取最后一位当对比数字
	pivot := arr[end]

	var i = start
	for j := start; j < end; j++ {
		if arr[j] < pivot {
			if !(i == j) {
				// 交换位置 	
				arr[i], arr[j] = arr[j], arr[i]
			}
			i++
		}
	}
	
	arr[i], arr[end] = arr[end], arr[i]

	return i	
}
```

接着在对应的包下创建一个quicksort_test.go测试文件，并定义一个测试函数：

```go
// quicksort_test.go
package main

import (
	"reflect"
	"testing"
)

func Test_QuickSort(t *testing.T) {
	got := quickSort([]int{8, 7, 6, 5, 4, 3, 2, 1}) // 程序输出的结果
	want := []int{1, 2, 3, 4, 5, 6, 7, 8}           // 期望的结果
	if !reflect.DeepEqual(want, got) {              // 因为slice不能比较直接，借助反射包中的方法比较
		t.Errorf("expected:%v, got:%v", want, got) // 测试失败输出错误提示
	}
}
```

此时包下的文件:

```go
ls -l                 
total 24
-rw-r--r--  1 lixin  staff   26 Aug 21 14:42 go.mod
-rw-r--r--  1 lixin  staff  590 Aug 21 14:42 quicksort.go
-rw-r--r--  1 lixin  staff  428 Aug 21 14:44 quicksort_test.go
```

在quicksort包目录下执行`go test 命令`，结果:

```go
➜  demo_ut_go$ go test              
PASS
ok      quicksort       0.337s
```

一个测试用例感觉不太够，我们再写一个:

```go
func Test_partition(t *testing.T) {
	got := partition([]int{8, 5, 4, 6, 7, 1, 2, 3}, 0, 7) // 程序输出的结果
	want := 2                                             // 期望的结果
	if !reflect.DeepEqual(want, got) {
		t.Errorf("expected:%v, got:%v", want, got) // 测试失败输出错误提示
	}
}

```

我们可以为`go test`命令添加`-v`参数，查看测试函数名称和运行时间：

```go
➜  demo_ut_go go test -v
=== RUN   Test_QuickSort
--- PASS: Test_QuickSort (0.00s)
=== RUN   Test_partition
    quicksort_test.go:20: expected:0, got:2
--- FAIL: Test_partition (0.00s)
FAIL
exit status 1
FAIL    quicksort       0.319s
```

这次我们可以清楚看到 `Test_partition` 这个函数单测用例没有成功，还可以再 go test 后加run参数，它对应一个正则表达式，只有跟函数名对的上的才会被 go test 执行

```go
➜  demo_ut_go go test -v -run=Sort
=== RUN   Test_QuickSort
--- PASS: Test_QuickSort (0.00s)
PASS
ok      quicksort       0.436s
```

### 测试组

通常我们写单测用例不会只写一个，但是我们也不会一个一个去写单测用例，而是用ut group的形式去写, 比如这样:

```go
func Test_QuickSort(t *testing.T) {
	type args struct {
		input []int
	}

	tests := []struct {
		name string
		args args
		want []int
	}{
		{
			name: "success",
			args: args{
				input: []int{8, 7, 6, 5, 4, 3, 2, 1},
			},
			want: []int{1, 2, 3, 4, 5, 6, 7, 8},
		},
		{
			name: "test success",
			args: args{
				input: []int{},
			},
			want: []int{},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := quickSort(tt.args.input); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("quickSort() = %v, want %v", got, tt.want)
			}
		})
	}
}
```

### 测试覆盖率

Go提供内置功能来检查你的代码覆盖率。我们可以使用`go test -cover`来查看测试覆盖率。例如：

```go
➜  demo_ut_go go test -cover
PASS
coverage: 100.0% of statements
ok      quicksort       0.331s
```

Go还额外提供一个-coverprofile参数，可以将相关信息输入到一个文件中，然后执行go tool cover -html=c.out打开:

```go
➜  demo_ut_go go test -cover -coverprofile=c.out
PASS
coverage: 100.0% of statements
ok      quicksort       0.263s
➜  demo_ut_go go tool cover -html=c.out
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04f135b1-a740-4274-b9f4-7697fcb8bed3/Untitled.png)

绿色表示语句被覆盖了，而红色表示没有

### **基准测试**

基准测试俗称压测：

```go
func Benchmark_Name(b *testing.B){
    // ...
}
```

基准测试以`Benchmark`为前缀，需要一个`*testing.B`类型的参数b，基准测试必须要执行`b.N`次，这样的测试才有对照性，`b.N`的值是系统根据实际情况去调整的，从而保证测试的稳定性。

我们为上述的quickSort包提供压测如下:

```go
func Benchmark_quickSort(b *testing.B) {
	for i := 0; i < b.N; i++ {
		quickSort([]int{8, 7, 6, 5, 4, 3, 2, 1})
	}
}
```

基准测试不会默认执行，需要加-bench参数:

```go
➜  demo_ut_go go test -bench=quick              
goos: darwin
goarch: arm64
pkg: quicksort
Benchmark_quickSort-10          24164910                49.55 ns/op
PASS
ok      quicksort       2.673s
```

Benchmark_quickSort-10表示对quickSort函数进行基准测试，10表示GOMAXPROCS的值，这对兵法基准测试非常重要，24164910和49.55 ns/op表示24164910次调用耗时平均值为49.55 ns。

我们还可以为基准测试添加`-benchmem`参数，来获得内存分配的统计数据。

```go
➜  demo_ut_go go test -bench=quick -benchmem 
goos: darwin
goarch: arm64
pkg: quicksort
Benchmark_quickSort-10          24359230                49.65 ns/op            0 B/op          0 allocs/op
PASS
ok      quicksort       2.429s
```

其中，`0 B/op`表示每次操作内存分配了0字节 ,`0 allocs/op`则表示每次操作进行了0次内存分配。 

## 网络测试

之前的篇幅，我们讲了单元测试和基础测试，但是在实际业务中场景会非常复杂，无论是server端对外提供服务还是我们依赖其他人的服务，我们通常都不想在测试过程中去真正建立网络连接，这一部分就来介绍两种方法来mock网络测试:

### **httptest**

在Web开发场景下的单元测试，如果涉及到HTTP请求推荐大家使用Go标库 `net/http/httptest` 进行测试，能够显著提高测试效率。

在这一小节，我们以常见的gin框架为例，演示如何为http server编写单元测试。

假设我们的业务逻辑是搭建一个http server端，对外提供HTTP服务。我们编写了一个`helloHandler`函数，用来处理用户请求。

```go
// gin.go
package httptest_demo

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Param 请求参数
type Param struct {
	Name string `json:"name"`
}

// helloHandler /hello请求处理函数
func helloHandler(c *gin.Context) {
	var p Param
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg": "we need a name",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"msg": fmt.Sprintf("hello %s", p.Name),
	})
}

// SetupRouter 路由
func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.POST("/hello", helloHandler)
	return router
}

func main() {
	ch := make(chan struct{})
	r := SetupRouter()

	r.Run(":8080")
	<-ch
}
```

我们直接运行这个函数, 发生curl网络请求:

```go
➜  demo_ut_go curl  -X POST 'http://127.0.0.1:8080/hello' -d '{"name":"lixin"}'
{"msg":"hello lixin"}
```

现在我们需要为`helloHandler`函数编写单元测试，这种情况下我们就可以使用`httptest`这个工具mock一个HTTP请求和响应记录器，让我们的server端接收并处理我们mock的HTTP请求，同时使用响应记录器来记录server端返回的响应内容。

单元测试的示例代码如下：

```go
// gin_test.go
package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_helloHandler(t *testing.T) {
	// 定义两个测试用例
	tests := []struct {
		name   string
		param  string
		expect string
	}{
		{"base case", `{"name": "yanglixin"}`, "hello yanglixin"},
		{"bad case", "", "we need a name"},
	}

	r := SetupRouter()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// mock一个HTTP请求
			req := httptest.NewRequest(
				"POST",                      // 请求方法
				"/hello",                    // 请求URL
				strings.NewReader(tt.param), // 请求参数
			)
			// mock一个响应记录器
			w := httptest.NewRecorder()
			// 让server端处理mock请求并记录返回的响应内容
			r.ServeHTTP(w, req)
			// 校验状态码是否符合预期
			assert.Equal(t, http.StatusOK, w.Code)
			// 解析并检验响应内容是否复合预期
			var resp map[string]string
			err := json.Unmarshal([]byte(w.Body.String()), &resp)
			assert.Nil(t, err)
			assert.Equal(t, tt.expect, resp["msg"])
		})
	}
}
```

执行单元测试，查看测试结果。

```go
➜  demo_ut_go go test -v -run=Test_helloHandler    
=== RUN   Test_helloHandler
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] POST   /hello                    --> quicksort.helloHandler (3 handlers)
=== RUN   Test_helloHandler/base_case
[GIN] 2023/08/21 - 15:27:45 | 200 |     297.625µs |       192.0.2.1 | POST     "/hello"
=== RUN   Test_helloHandler/bad_case
[GIN] 2023/08/21 - 15:27:45 | 200 |       4.291µs |       192.0.2.1 | POST     "/hello"
--- PASS: Test_helloHandler (0.00s)
    --- PASS: Test_helloHandler/base_case (0.00s)
    --- PASS: Test_helloHandler/bad_case (0.00s)
PASS
ok      quicksort       0.651s
```

这就是httptest在HTTP Server服务中为请求处理函数编写单元测试的用例了。

### **gock**

上面的示例介绍了如何在HTTP Server服务类场景下为请求处理函数编写单元测试，那么如果我们是在代码中请求外部API的场景（比如通过API调用其他服务获取返回值）又该怎么编写单元测试呢？

例如，我们有以下业务逻辑代码，依赖外部API：`http://qiniu.com/post`提供的数据。

```go
package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

// api.go

// ReqParam API请求参数
type ReqParam struct {
	X int `json:"x"`
}

// Result API返回结果
type Result struct {
	Value int `json:"value"`
}

func GetResultByAPI(x, y int) int {
	p := &ReqParam{X: x}
	b, _ := json.Marshal(p)

	// 调用其他服务的API
	resp, err := http.Post(
		"http://qiniu.com/post",
		"application/json",
		bytes.NewBuffer(b),
	)
	if err != nil {
		return -1
	}
	body, _ := ioutil.ReadAll(resp.Body)
	var ret Result
	if err := json.Unmarshal(body, &ret); err != nil {
		return -1
	}
	// 这里是对API返回的数据做一些逻辑处理
	return ret.Value + y
}
```

在对类似上述这类业务代码编写单元测试的时候，如果不想在测试过程中真正去发送请求或者依赖的外部接口还没有开发完成时，我们可以在单元测试中对依赖的API进行mock。

使用`gock`对外部API进行mock，即mock指定参数返回约定好的响应内容。 下面的代码中mock了两组数据，组成了两个测试用例。

```go
// api_test.go
package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gopkg.in/h2non/gock.v1"
)

func TestGetResultByAPI(t *testing.T) {
	defer gock.Off() // 测试执行后刷新挂起的mock

	// mock 请求外部api时传参x=1返回100
	gock.New("http://qiniu.com").
		Post("/post").
		MatchType("json").
		JSON(map[string]int{"x": 1}).
		Reply(200).
		JSON(map[string]int{"value": 100})

	// 调用我们的业务函数
	res := GetResultByAPI(1, 1)
	// 校验返回结果是否符合预期
	assert.Equal(t, res, 101)

	// mock 请求外部api时传参x=2返回200
	gock.New("http://qiniu.com").
		Post("/post").
		MatchType("json").
		JSON(map[string]int{"x": 2}).
		Reply(200).
		JSON(map[string]int{"value": 200})

	// 调用我们的业务函数
	res = GetResultByAPI(2, 2)
	// 校验返回结果是否符合预期
	assert.Equal(t, res, 202)

	assert.True(t, gock.IsDone()) // 断言mock被触发
}
```

执行上面写好的单元测试，看一下测试结果。

```bash
➜  demo_ut_go   go test -v -run=TestGetResultByAPI
=== RUN   TestGetResultByAPI
--- PASS: TestGetResultByAPI (0.00s)
PASS
ok      quicksort       0.582s
```

测试结果和预期的完全一致。

## MySQL和Redis单测

我们在上一部分介绍了httptest和gock工具进行网络测试，除了网络依赖之外，我们在开发中也会经常用到各种数据库，比如常见的MySQL和Redis等。本部分就分别举例来演示如何在编写单元测试的时候对MySQL和Redis进行mock。

### **go-sqlmock**

[sqlmock](https://github.com/DATA-DOG/go-sqlmock) 是一个实现 `sql/driver` 的mock库。它不需要建立真正的数据库连接就可以在测试中模拟任何 sql 驱动程序的行为。使用它可以很方便的在编写单元测试的时候mock sql语句的执行结果。

```go
// 安装
go get github.com/DATA-DOG/go-sqlmock
```

**使用示例**

这里使用的是`go-sqlmock`官方文档中提供的基础示例代码。 在下面的代码中，我们实现了一个`recordStats`函数用来记录用户浏览商品时产生的相关数据。具体实现的功能是在一个事务中进行以下两次SQL操作： 

- 在`products`表中将当前商品的浏览次数+1 

- 在`product_viewers`表中记录浏览当前商品的用户id

```go
// app.go
package main

import "database/sql"

// recordStats 记录用户浏览产品信息
func recordStats(db *sql.DB, userID, productID int64) (err error) {
	// 开启事务
	// 操作views和product_viewers两张表
	tx, err := db.Begin()
	if err != nil {
		return
	}

	defer func() {
		switch err {
		case nil:
			err = tx.Commit()
		default:
			tx.Rollback()
		}
	}()

	// 更新products表
	if _, err = tx.Exec("UPDATE products SET views = views + 1"); err != nil {
		return
	}
	// product_viewers表中插入一条数据
	if _, err = tx.Exec(
		"INSERT INTO product_viewers (user_id, product_id) VALUES (?, ?)",
		userID, productID); err != nil {
		return
	}
	return
}

func main() {
	// 注意：测试的过程中并不需要真正的连接
	db, err := sql.Open("mysql", "root@/blog")
	if err != nil {
		panic(err)
	}
	defer db.Close()
	// userID为1的用户浏览了productID为5的产品
	if err = recordStats(db, 1 /*some user id*/, 5 /*some product id*/); err != nil {
		panic(err)
	}
}
```

现在我们需要为代码中的`recordStats`函数编写单元测试，但是又不想在测试过程中连接真实的数据库进行测试。这个时候我们就可以像下面示例代码中那样使用`sqlmock`工具去mock数据库操作。

```go
package main

import (
	"fmt"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
)

// TestShouldUpdateStats sql执行成功的测试用例
func TestShouldUpdateStats(t *testing.T) {
	// mock一个*sql.DB对象，不需要连接真实的数据库
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	// mock执行指定SQL语句时的返回结果
	mock.ExpectBegin()
	mock.ExpectExec("UPDATE products").WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec("INSERT INTO product_viewers").WithArgs(2, 3).WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	// 将mock的DB对象传入我们的函数中
	if err = recordStats(db, 2, 3); err != nil {
		t.Errorf("error was not expected while updating stats: %s", err)
	}

	// 确保期望的结果都满足
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}

// TestShouldRollbackStatUpdatesOnFailure sql执行失败回滚的测试用例
func TestShouldRollbackStatUpdatesOnFailure(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	mock.ExpectBegin()
	mock.ExpectExec("UPDATE products").WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec("INSERT INTO product_viewers").
		WithArgs(2, 3).
		WillReturnError(fmt.Errorf("some error"))
	mock.ExpectRollback()

	// now we execute our method
	if err = recordStats(db, 2, 3); err == nil {
		t.Errorf("was expecting an error, but there was none")
	}

	// we make sure that all expectations were met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}
```

上面的代码中，定义了一个执行成功的测试用例和一个执行失败回滚的测试用例，确保我们代码中的每个逻辑分支都能被测试到，提高单元测试覆盖率的同时也保证了代码的健壮性。

执行单元测试，看一下最终的测试结果。

```go
➜  demo_ut_go go test -v -run=TestShould
=== RUN   TestShouldUpdateStats
--- PASS: TestShouldUpdateStats (0.00s)
=== RUN   TestShouldRollbackStatUpdatesOnFailure
--- PASS: TestShouldRollbackStatUpdatesOnFailure (0.00s)
PASS
ok      quicksort       0.624s
```

可以看到两个测试用例的结果都符合预期，单元测试通过。

在很多使用ORM工具的场景下，也可以使用`go-sqlmock`库mock数据库操作进行测试。

### **miniredis**

除了经常用到MySQL外，Redis在日常开发中也会经常用到。接下来的这一小节，我们将一起学习如何在单元测试中mock Redis的相关操作。

[miniredis](https://github.com/alicebob/miniredis)是一个纯go实现的用于单元测试的redis server。它是一个简单易用的、基于内存的redis替代品，它具有真正的TCP接口，你可以把它当成是redis版本的`net/http/httptest`。

当我们为一些包含Redis操作的代码编写单元测试时就可以使用它来mock Redis操作。

```go
// 安装. 这里以github.com/go-redis/redis库为例，编写了一个包含若干Redis操作的DoSomethingWithRedis函数。
go get github.com/alicebob/miniredis/v2
```

```bash
// redis_op.go
package main

import (
	"context"
	"strings"
	"time"

	"github.com/go-redis/redis/v8" // 注意导入版本
)

const (
	KeyValidWebsite = "app:valid:website:list"
)

func DoSomethingWithRedis(rdb *redis.Client, key string) bool {
	// 这里可以是对redis操作的一些逻辑
	ctx := context.TODO()
	if !rdb.SIsMember(ctx, KeyValidWebsite, key).Val() {
		return false
	}
	val, err := rdb.Get(ctx, key).Result()
	if err != nil {
		return false
	}
	if !strings.HasPrefix(val, "https://") {
		val = "https://" + val
	}
	// 设置 blog key 五秒过期
	if err := rdb.Set(ctx, "blog", val, 5*time.Second).Err(); err != nil {
		return false
	}
	return true
}
```

下面的代码是我使用`miniredis`库为`DoSomethingWithRedis`函数编写的单元测试代码，其中`miniredis`不仅支持mock常用的Redis操作，还提供了很多实用的帮助函数，例如检查key的值是否与预期相等的`s.CheckGet()`和帮助检查key过期时间的`s.FastForward()`。

```go
	// redis_op_test.go
package main

import (
	"testing"
	"time"

	"github.com/alicebob/miniredis/v2"
	"github.com/go-redis/redis/v8"
)

func TestDoSomethingWithRedis(t *testing.T) {
	// mock一个redis server
	s, err := miniredis.Run()
	if err != nil {
		panic(err)
	}
	defer s.Close()

	// 准备数据
	s.Set("lixin", "yanglixin.com")
	s.SAdd(KeyValidWebsite, "lixin")

	// 连接mock的redis server
	rdb := redis.NewClient(&redis.Options{
		Addr: s.Addr(), // mock redis server的地址
	})

	// 调用函数
	ok := DoSomethingWithRedis(rdb, "lixin")
	if !ok {
		t.Fatal()
	}

	// 可以手动检查redis中的值是否复合预期
	if got, err := s.Get("blog"); err != nil || got != "https://yanglixin.com" {
		t.Fatalf("'blog' has the wrong value")
	}
	// 也可以使用帮助工具检查
	s.CheckGet(t, "blog", "https://yanglixin.com")

	// 过期检查
	s.FastForward(5 * time.Second) // 快进5秒
	if s.Exists("blog") {
		t.Fatal("'blog' should not have existed anymore")
	}
}
```

执行执行测试，查看单元测试结果：

```go
➜  demo_ut_go go test -v -run=TestDoSomethingWithRedis
=== RUN   TestDoSomethingWithRedis
--- PASS: TestDoSomethingWithRedis (0.00s)
PASS
ok      quicksort       0.597s
```

`miniredis`基本上支持绝大多数的Redis命令，大家可以通过查看文档了解更多用法。

当然除了使用`miniredis`搭建本地redis server这种方法外，还可以使用各种打桩工具对具体方法进行打桩。在编写单元测试时具体使用哪种mock方式还是要根据实际情况来决定。

## GoMock 模拟接口行为

这是我很久之前在bilibili录的视频GoMock 视频。

https://www.bilibili.com/video/BV1Qs4y1m7ic/?spm_id_from=333.337.search-card.all.click

GoMock是go官方提供的一款Mock工具，方便开发人员模拟接口行为做测试的工具。

比如我们有一个Person接口下的Eat方法，我们就可以模拟这个接口

```go
ctrl := gomock.NewController(t)
mockPerson := mocks.NewMockPerson(ctrl)
mockPerson. EXPECT(). Eat().Return("lixin is sleep")
```

在这里我们就使用gomock创建一个mockPerson，去模拟person接口的行为 后续方便去做单测

打开安装https://github.com/golang/mock

```go
go install github.com/golang/mock/mockgen@v1.6.0
```

输入mockgen查看是否下载在$GOPATH/bin 目录下基本用法步骤

首先选定一个mock的demo目录

比如说叫gomock-learn,然后在此目录下创建对应的mod，然后引入对应的gomock包

```go
go mod init gomock-learn
go get github.com/golang/mock
```

接下来创建两个目录person和student分别用来放对应的接口和代码。

```go
// person.go
package person

type Person interface {
	Eat(food string) string
	Sleep(name string) string
}
```

```go
// student.go
package student

import "gomock-learn/person"

type Student struct {
	p    person.Person
	Name string
}

func (p *Student) Eat(food string) string {
	return p.p.Eat(food)
}

func (p *Student) Sleep() string {
	return p.p.Sleep(p.Name)
}
```

接着你要创建一个mocks目录，不然如果没有mock目录的话用mockgen命令行会失败

使用方法，直接在相应的目录下执行以下命令

```go
mockgen -destination mocks/mock_person.go -package=mocks gomock-learn/person Person
```

这里需要注意的是我们必须自己创建mocks目录因为GoMock不会自动帮我们创建，当它发现mocks目录不存在时会返回一个错误。以下是对mockgen命令参数的说明：

```go
 -destination=mocks/mock_person.go：将自动生成的mock代码存储到文件mocks/mock_person.go中。-

package=mocks：将生成的mock代码放置到mocks包中。

gomock-learn/person：为这个包生成mock代码。

Person：为这个接口生成mock代码。这个参数是个必填参数，我们需要显式地指定要生成mock代码的接口。如果需要指定多个接口，可以将接口通过逗号连接起来，比如：Person1,Person2。
```

结合go-generate使用GoMock, 在对应的接口前加入注释

```go
//go:generate mockgen -destination mocks/mock_person.go -package=mocks gomock-learn/person Person

type Person interface {
	Eat(food string) string
	Sleep(name string) string
}
```

然后在对应的目录下输入

```go
go generate ./
```

可以发现就在对应的mocks目录下里有一个mock_xx.go函数，这个函数里面就是我们可以Mock的数据。

此时的目录是这样的

```go
├── go.mod
├── go.sum
├── mocks
│   └── mock_person.go
├── person
│   └── person.go
└── student
    ├── student.go
    └── student_test.go
```

使用参数匹配, 有时候你可能不太确定调用mock时指定的参数，所以有一个对应的Matcher来代表一个mock方法可以接受的参数范围，比如gomock.Eq(x)指定传入值必须等于x。

以下是GoMock中一些预定义的matcher：

```go
    gomock.Any()：匹配任何类型的任何值
    gomock.Eq(x)：匹配使用反射reflect.DeepEqual与x相等的值gomock.Nil()：匹配等于nil的值
    gomock.Not(m)：（这里的m是一个Matcher）匹配同m不匹配的值
    gomock.Not(x)：（这里的x不是Matcher）匹配使用反射reflect.DeepEqual与x不相等的值
```

如果我们希望第一个参数必须是x，那么我们就用

```go
mockDoer.EXPECT().DoSomething(gomock.Eq(x), "Hello GoMock")
```

具体例子

```go
func Test_Eat(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockPerson := mocks.NewMockPerson(ctrl)

	mockPerson.
		EXPECT().
		Eat("Apple").Times(1)

	testStudent := Student{Name: "lixin", p: mockPerson}
	testStudent.Eat("Apple")
}
```

```go
func Test_Sleep(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockPerson := mocks.NewMockPerson(ctrl)
	testStudent := Student{Name: "lixin", p: mockPerson}

	mockPerson.
		EXPECT().
		Sleep("lixin").Return("lixin is sleep").Do(func(name string) {
		fmt.Printf("%s is sleep!\\n", name)
	})

	if testStudent.Sleep() != "lixin is sleep" {
		t.Error("Error!!!!!")
	}
}
```

断言调用顺序, 有时候我们期望控制一些mock流程的顺序，这里有一个例子调用After的方法

```go
func Test_Eat(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockPerson := mocks.NewMockPerson(ctrl)

	first := mockPerson.EXPECT().Eat("xxx")

	mockPerson.
		EXPECT().
		Eat("Apple").
		After(first)

	testStudent := Student{Name: "lixin", p: mockPerson}
	testStudent.Eat("xxx")
	testStudent.Eat("Apple")
}

```

指定mock行为, 比如说可以在执行完毕后加一个Do函数去做一些事情。

## ****使用monkey打桩****

在这一篇中我们将介绍一个更强大的打桩工具——`monkey`，它支持为任意函数及方法进行打桩。

[monkey](https://github.com/bouk/monkey)是一个Go单元测试中十分常用的打桩工具，它在运行时通过汇编语言重写可执行文件，将目标函数或方法的实现跳转到桩实现，其原理类似于热补丁。

monkey库很强大，但是使用时需注意以下事项：

- monkey不支持内联函数，在测试的时候需要通过命令行参数`gcflags=-l`关闭Go语言的内联优化。
- monkey不是线程安全的，所以不要把它用到并发的单元测试中。

```go
// 安装
go get bou.ke/monkey
```

**使用示例**

假设你们公司中台提供了一个用户中心的库`varys`，使用这个库可以很方便的根据uid获取用户相关信息。但是当你编写代码的时候这个库还没实现，或者这个库要经过内网请求但你现在没这能力，这个时候要为`MyFunc`编写单元测试，就需要做一些mock工作。

```go
// func.go
func MyFunc(uid int64)string{
	u, err := varys.GetInfoByUID(uid)
	if err != nil {
		return "welcome"
	}

	// 这里是一些逻辑代码...

	return fmt.Sprintf("hello %s\n", u.Name)
}
```

我们使用`monkey`库对`varys.GetInfoByUID`进行打桩。

```go
// func_test.go

func TestMyFunc(t *testing.T) {
	// 对 varys.GetInfoByUID 进行打桩
	// 无论传入的uid是多少，都返回 &varys.UserInfo{Name: "lixin"}, nil
	monkey.Patch(varys.GetInfoByUID, func(int64)(*varys.UserInfo, error) {
		return &varys.UserInfo{Name: "lixin"}, nil
	})
	ret := MyFunc(123)
	if !strings.Contains(ret, "lixin"){
		t.Fatal()
	}
}
```

执行单元测试：`go test -run=TestMyFunc -v -gcflags=-l`

输出：

```bash
=== RUN   TestMyFunc
--- PASS: TestMyFunc (0.00s)
PASS
ok      monkey_demo     0.009s
```

除了对函数进行mock外`monkey`也支持对方法进行mock。

```go
// method.go
type User struct {
	Name string
	Birthday string
}

// CalcAge 计算用户年龄
func (u *User) CalcAge() int {
	t, err := time.Parse("2006-01-02", u.Birthday)
	if err != nil {
		return -1
	}
	return int(time.Now().Sub(t).Hours()/24.0)/365
}

// GetInfo 获取用户相关信息
func (u *User) GetInfo()string{
	age := u.CalcAge()
	if age <= 0 {
		return fmt.Sprintf("%s很神秘，我们还不了解ta。", u.Name)
	}
	return fmt.Sprintf("%s今年%d岁了，ta是我们的朋友。", u.Name, age)
}
```

如果我们为`GetInfo`编写单元测试的时候`CalcAge`方法的功能还未完成，这个时候我们可以使用monkey进行打桩。

```go
// method_test.go
func TestUser_GetInfo(t *testing.T) {
	var u = &User{
		Name:     "lixin",
		Birthday: "2002-12-20",
	}

	// 为对象方法打桩
	monkey.PatchInstanceMethod(reflect.TypeOf(u), "CalcAge", func(*User)int {
		return 18
	})

	ret := u.GetInfo()  // 内部调用u.CalcAge方法时会返回18
	if !strings.Contains(ret, "朋友"){
		t.Fatal()
	}
}
```

执行单元测试：

```bash
❯ go test -run=User -v
=== RUN   TestUser_GetInfo
--- PASS: TestUser_GetInfo (0.00s)
PASS
ok      monkey_demo     0.012s
```

`monkey`基本上能满足我们在单元测试中打桩的任何需求。

社区中还有一个参考monkey库实现的[gomonkey](https://github.com/agiledragon/gomonkey)库，原理和使用过程基本相似，这里就不再啰嗦了。除此之外社区里还有一些其他打桩工具如[GoStub](https://github.com/prashantv/gostub)等。

## ****编写可测试的代码****

编写可测试的代码比写UT更重要，实际上编写可测试的代码需要我们在写代码的时候就注意。

假设我们现在有一个根据时间判断报警信息发送速率的模块，白天工作时间允许大量发送报警信息，而晚上则减小发送速率，凌晨不允许发送报警短信。

```go
// judgeRate 报警速率决策函数
func judgeRate() int {
	now := time.Now()
	switch hour := now.Hour(); {
	case hour >= 8 && hour < 20:
		return 10
	case hour >= 20 && hour <= 23:
		return 1
	}
	return -1
}
```

这个函数内部使用了`time.Now()`来获取系统的当前时间作为判断的依据，看起来很合理。

但是这个函数现在隐式包含了一个不确定因素——时间。在不同的时刻我们调用这个函数都可能会得到不一样的结果。想象一下，我们该如何为这个函数编写单元测试呢？

如果不修改系统时间，那么我们就无法为这个函数编写单元测试，这个函数成了“不可测试的代码”（当然可以使用打桩工具对`time.Now`进行打桩，但那不是本文要强调的重点）。

接下来我们该如何改造它？

我们通过为函数传参数的方式传入需要判断的时刻，具体实现如下。

```go
// judgeRateByTime 报警速率决策函数
func judgeRateByTime(now time.Time) int {
	switch hour := now.Hour(); {
	case hour >= 8 && hour < 20:
		return 10
	case hour >= 20 && hour <= 23:
		return 1
	}
	return -1
}
```

这样我们不仅解决了函数与系统时间的紧耦合，而且还扩展了函数的功能，现在我们可以根据需要获取任意时刻的速率值。为改造后的`judgeRateByTime`编写单元测试也更方便了。

```go
func Test_judgeRateByTime(t *testing.T) {
	tests := []struct {
		name string
		arg  time.Time
		want int
	}{
		{
			name: "工作时间",
			arg:  time.Date(2022, 2, 18, 11, 22, 33, 0, time.UTC),
			want: 10,
		},
		{
			name: "晚上",
			arg:  time.Date(2022, 2, 18, 22, 22, 33, 0, time.UTC),
			want: 1,
		},
		{
			name: "凌晨",
			arg:  time.Date(2022, 2, 18, 2, 22, 33, 0, time.UTC),
			want: -1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := judgeRateByTime(tt.arg); got != tt.want {
				t.Errorf("judgeRateByTime() = %v, want %v", got, tt.want)
			}
		})
	}
}
```

### 接口抽象进行解耦

同样是函数中隐式依赖的问题，假设我们实现了一个获取店铺客单价的需求，它完成的功能就像下面的示例函数。

```go
// GetAveragePricePerStore 每家店的人均价
func GetAveragePricePerStore(storeName string) (int64, error) {
	res, err := http.Get("https://qiniu.com/api/orders?storeName=" + storeName)
	if err != nil {
		return 0, err
	}
	defer res.Body.Close()

	var orders []Order
	if err := json.NewDecoder(res.Body).Decode(&orders); err != nil {
		return 0, err
	}

	if len(orders) == 0 {
		return 0, nil
	}

	var (
		p int64
		n int64
	)

	for _, order := range orders {
		p += order.Price
		n += order.Num
	}

	return p / n, nil
}

```

在之前的章节中我们介绍了如何为上面的代码编写单元测试，但是我们如何避免每次单元测试时都发起真实的HTTP请求呢？亦或者后续我们改变了获取数据的方式（直接读取缓存或改为RPC调用）这个函数该怎么兼容呢？

我们将函数中获取数据的部分抽象为接口类型来优化我们的程序，使其支持模块化的数据源配置。

```go
// OrderInfoGetter 订单信息提供者
type OrderInfoGetter interface {
	GetOrders(string) ([]Order, error)
}

```

然后定义一个API类型，它拥有一个通过HTTP请求获取订单数据的`GetOrders`方法，正好实现`OrderInfoGetter`接口。

```go
// HttpApi HTTP API类型
type HttpApi struct{}

// GetOrders 通过HTTP请求获取订单数据的方法
func (a HttpApi) GetOrders(storeName string) ([]Order, error) {
	res, err := http.Get("https://qiniu.com/api/orders?storeName=" + storeName)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var orders []Order
	if err := json.NewDecoder(res.Body).Decode(&orders); err != nil {
		return nil, err
	}
	return orders, nil
}

```

将原来的 `GetAveragePricePerStore` 函数修改为以下实现。

```go
// GetAveragePricePerStore 每家店的人均价
func GetAveragePricePerStore(getter OrderInfoGetter, storeName string) (int64, error) {
	orders, err := getter.GetOrders(storeName)
	if err != nil {
		return 0, err
	}

	if len(orders) == 0 {
		return 0, nil
	}

	var (
		p int64
		n int64
	)

	for _, order := range orders {
		p += order.Price
		n += order.Num
	}

	return p / n, nil
}

```

经过这番改动之后，我们的代码就能很容易地写出单元测试代码。例如，对于不方便直接请求的HTTP API, 我们就可以进行 mock 测试。

```go
// Mock 一个mock类型
type Mock struct{}

// GetOrders mock获取订单数据的方法
func (m Mock) GetOrders(string) ([]Order, error) {
	return []Order{
		{
			Price: 20300,
			Num:   2,
		},
		{
			Price: 642,
			Num:   5,
		},
	}, nil
}

func TestGetAveragePricePerStore(t *testing.T) {
	type args struct {
		getter    OrderInfoGetter
		storeName string
	}
	tests := []struct {
		name    string
		args    args
		want    int64
		wantErr bool
	}{
		{
			name: "mock test",
			args: args{
				getter:    Mock{},
				storeName: "mock",
			},
			want:    12062,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := GetAveragePricePerStore(tt.args.getter, tt.args.storeName)
			if (err != nil) != tt.wantErr {
				t.Errorf("GetAveragePricePerStore() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("GetAveragePricePerStore() got = %v, want %v", got, tt.want)
			}
		})
	}
}

```

### 依赖注入代替隐式依赖

我们可能经常会看到类似下面的代码，在应用程序中使用全局变量的方式引入日志库或数据库连接实例等。

```go
package main

import (
	"github.com/sirupsen/logrus"
)

var log = logrus.New()

type App struct{}

func (a *App) Start() {
	log.Info("app start ...")
}

func (a *app) Start() {
	a.Logger.Info("app start ...")

	// ...
}

func main() {
	app := &App{}
	app.Start()
}

```

上面的代码中 App 中通过引用全局变量的方式将依赖项硬编码到代码中，这种情况下我们在编写单元测试时如何 mock log 变量呢？

此外这样的代码还存在一个更严重的问题——它与具体的日志库程序强耦合。当我们后续因为某些原因需要更换另一个日志库时，我们该如何修改代码呢？

我们应该将依赖项解耦出来，并且将依赖注入到我们的 App 实例中，而不是在其内部隐式调用全局变量。

```go
type App struct {
	Logger
}

func (a *App) Start() {
	a.Logger.Info("app start ...")
	// ...
}

// NewApp 构造函数，将依赖项注入
func NewApp(lg Logger) *App {
	return &App{
		Logger: lg, // 使用传入的依赖项完成初始化
	}
}

```

上面的代码就很容易 mock log实例，完成单元测试。

依赖注入就是指在创建组件（Go 中的 struct）的时候接收它的依赖项，而不是它的初始化代码中引用外部或自行创建依赖项。

```go
// Config 配置项结构体
type Config struct {
	// ...
}

// LoadConfFromFile 从配置文件中加载配置
func LoadConfFromFile(filename string) *Config {
	return &Config{}
}

// Server server 程序
type Server struct {
	Config *Config
}

// NewServer Server 构造函数
func NewServer() *Server {
	return &Server{
    // 隐式创建依赖项
		Config: LoadConfFromFile("./config.toml"),
	}
}

```

上面的代码片段中就通过在构造函数中隐式创建依赖项，这样的代码强耦合、不易扩展，也不容易编写单元测试。我们完全可以通过使用依赖注入的方式，将构造函数中的依赖作为参数传递给构造函数。

```go
// NewServer Server 构造函数
func NewServer(conf *Config) *Server {
	return &Server{
		// 隐式创建依赖项
		Config: conf,
	}
}

```

不要隐式引用外部依赖（全局变量、隐式输入等），而是通过依赖注入的方式引入依赖。经过这样的修改之后，构造函数`NewServer` 的依赖项就很清晰，同时也方便我们编写 mock 测试代码。

使用依赖注入的方式能够让我们的代码看起来更清晰，但是过多的构造函数也会让主函数的代码迅速膨胀，好在Go 语言提供了一些依赖注入工具（例如 [wire](https://github.com/google/wire) ，可以帮助我们更好的管理依赖注入的代码。

### SOLID原则

最后补充一个程序设计的`SOLID`原则，我们在程序设计时践行以下几个原则会帮助我们写出可测试的代码。

| 首字母 | 指代 | 概念 |
| --- | --- | --- |
| S | 单一职责原则 | 每个类都应该只有一个职责。 |
| O | 开闭原则 | 一个软件实体，如类、模块和函数应该对扩展开放，对修改关闭。 |
| L | 里式替换原则 | 认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的”的概念。 |
| I | 接口隔离原则 | 许多特定于客户端的接口优于一个通用接口。 |
| D | 依赖反转原则 | 应该依赖抽象，而不是某个具体示例。 |

有时候在写代码之前多考虑一下代码的设计是否符合上述原则。