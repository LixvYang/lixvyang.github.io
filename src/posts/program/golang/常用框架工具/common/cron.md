---
icon: carbon:tool-kit
date: 2023-12-02
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - air
  - gin
---

定时任务是我们经常使用到的库，Linux crontab 是用来定期执行程序的命令。

<!-- more -->

# cron定时任务

crontab是 Linux 下的一个定时任务调度工具，可以定时来处理我们的任务。

我们也可以使用 go 语言来实现类似的定时管理。

比如我想实现一个每天凌晨 1 点扫描某个数据库的所有任务执行。那我们就可以这样去实现:

```go
go func() {
		for {
			now := time.Now()
			var next time.Time
			if now.Hour() < 1 || now.Hour() == 1 {
				next = now
			} else {
				next = now.Add(time.Hour * 24)
			}

			// 每日凌晨 1 点执行任务
			next = time.Date(next.Year(), next.Month(), next.Day(), 1, 0, 0, 0, next.Location())

			if now.Unix() > next.Unix() {
				next = now.Add(time.Hour * 24)
				next = time.Date(next.Year(), next.Month(), next.Day(), 1, 0, 0, 0, next.Location())
			}

			logger.Info("UpdateOndutys Now=%s Next=%s", now, next)
			timer := time.NewTimer(next.Sub(now))

			select {
			case ts := <-timer.C:
				logger.Info("Start UpdateOnduty_7day ts=%s", ts.String())
                timer.Stop()
			}
		}
	}()
```

## 定时任务

可以看到当我们不想使用第三方库来实现cron的时候，往往就需要考虑很多方面，比如定时器执行时的时机，定时器的启动和取消，判断当前时间以及服务重启后的定时器失效问题。

但是如果使用第三方库就可以将思绪放在如何构建定时任务具体的细节而不是考虑如何写定时任务上。
 
## 使用 robfig/cron 库

robfig/cron/v3是Go目前社区最受欢迎的cron库

我们下面会学习这个cron库的使用，以及熟悉常见的cron任务描述写法。

### 安装

```go
go get -u github.com/robfig/cron/v3
```

### 使用

```go
package main

import (
  "fmt"
  "time"

  "github.com/robfig/cron/v3"
)

func main() {
  c := cron.New()

  c.AddFunc("@every 1s", func() {
    fmt.Println("tick every 1 second")
  })

  c.Start()
  select{}
}
```

cron库使用起来非常简单，创建 `cron` 对象，这个对象用于管理定时任务，调用 cron 对象的`AddFunc`来向管理器中添加定时任务，AddFunc 接收两个参数，第一个参数是我们cron触发时间的规则(比如每秒一次)，第二个参数是具体执行任务的参数。

值得注意的是`cron.New()`函数可以添加一些可选项，比如我们可以像其传入时区等等。

例如

```go
  nyc, _ := time.LoadLocation("Asia/China")
  c := cron.New(cron.WithLocation(nyc))
```

### 时间格式

AddFunc 的第一个参数的时间格式与linux下的crontab非常相似，由一个有五个域的字符串组成,例如`0 * * * *`(每小时触发一次)。

这 5 个域含义依次为：

- Minutes：分钟，取值范围[0-59]，支持特殊字符* / , -；
- Hours：小时，取值范围[0-23]，支持特殊字符* / , -；
- Day of month：每月的第几天，取值范围[1-31]，支持特殊字符* / , - ?；
- Month：月，取值范围[1-12]或者使用月份名字缩写[JAN-DEC]，支持特殊字符* / , -；
- Day of week：周历，取值范围[0-6]或名字缩写[JUN-SAT]，支持特殊字符* / , - ?。

特殊字符的含义如下:

- *：使用*的域可以匹配任何值，例如将月份域（第 4 个）设置为*，表示每个月；
/：用来指定范围的步长，例如将小时域（第 2 个）设置为3-59/15表示第 3 分钟触发，以后每隔 15 分钟触发一次，因此第 2 次触发为第 18 分钟，第 3 次为 33 分钟。。。直到分钟大于 59；
- ,：用来列举一些离散的值和多个范围，例如将周历的域（第 5 个）设置为MON,WED,FRI表示周一、三和五；
- -：用来表示范围，例如将小时的域（第 1 个）设置为9-17表示上午 9 点到下午 17 点（包括 9 和 17）；
- ?：只能用在月历和周历的域中，用来代替*，表示每月/周的任意一天。

了解规则之后，我们可以定义任意时间：

- 30 * * * *：分钟域为 30，其他域都是*表示任意。每小时的 30 分触发；
- 30 3-6,20-23 * * *：分钟域为 30，小时域的3-6,20-23表示 3 点到 6 点和 20 点到 23 点。3,4,5,6,20,21,22,23 时的 30 分触发；
- 0 0 1 1 *：1（第 4 个） 月 1（第 3 个） 号的 0（第 2 个） 时 0（第 1 个） 分触发。

### 预定义规则

以上规则和linux下的一模一样，但本库使用 go 语言定义了一些宏方便我们使用:

- @yearly：也可以写作@annually，表示每年第一天的 0 点。等价于0 0 1 1 *；
- @monthly：表示每月第一天的 0 点。等价于0 0 1 * *；
- @weekly：表示每周第一天的 0 点，注意第一天为周日，即周六结束，周日开始的那个 0 点。等价于0 0 * * 0；
- @daily：也可以写作@midnight，表示每天 0 点。等价于0 0 * * *；
- @hourly：表示每小时的开始。等价于0 * * * *。

### 定时器

```go
@every <duration>
```

含义为每隔duration触发一次会调用time.ParseDuration()函数解析，所以ParseDuration支持的格式都可以。例如1h30m10s，感觉这个和time.Timer类似。


### Job 接口

除了 AddFunc之外，我们还还可以通过实现Job接口，来为我们的类实现定时任务逻辑

```go
// cron.go
type Job interface {
  Run()
}
```

我们可以定义一个结构来实现Job接口：

```go
type Foo struct {
  Bar string
}

func (g *Foo) Run() {
  fmt.Println("Hello ", g.Bar)
}

func main() {
  c := cron.New()
  c.AddJob("@every 1s", Foo{Bar:"lixin"})
  c.Start()

  time.Sleep(5 * time.Second)
}
```

:::warning
cron会创建一个新的 goroutine 来执行触发回调。如果这些回调需要并发访问一些资源、数据，我们需要显式地做同步，避免数据竞态问题。
:::


---

本文参考
1. https://darjun.github.io/2020/06/25/godailylib/cron/



