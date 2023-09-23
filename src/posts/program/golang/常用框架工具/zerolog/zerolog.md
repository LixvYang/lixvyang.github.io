---
icon: edit
date: 2023-09-11
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - log
  - zerolog
---

[Zerolog](https://github.com/rs/zerolog)是一个高性能、零分配的Go日志库。它在记录日志的时候不需要在堆上分配内存，所以也不需要垃圾回收，可以以完全零分配的方式使用，便于在初始化记录器对象后，不会在堆上分配其他对象，从而防止触发垃圾回收器。

<!-- more -->

# Go 语言使用zerolog日志库


## 安装
zerolog可以通过以下命令安装到你的Go项目中:

```go
go get -u github.com/rs/zerolog/log
```

## 入门

该库提供了一个预配置的全局可用的记录器，你可以通过软件包(zerolog/log)导入并在当前项目中使用。

```go
package main

import (
	"github.com/rs/zerolog/log"
)

func main() {
	log.Info().Msg("Hello Zerolog")
	log.Info().Msg("来自全局Zerolog配置器")
}

```

以上程序可以将JSON格式的数据输出到控制台:

```go
{"level":"info","time":"2023-09-11T14:39:44+08:00","message":"Hello Zerolog"}
{"level":"info","time":"2023-09-11T14:39:44+08:00","message":"来自全局Zerolog配置器"}
```

## 日志级别

日志级别有以下几种，优先级逐渐提高:

```go
type Level int8

const (
    // TRACE （-1）：用于跟踪代码执行路径
	TraceLevel Level = -1
    // DEBUG （0）：对程序故障排除有用的消息
	DebugLevel Level = iota
    // INFO （1）：描述应用正常运行的消息
	InfoLevel
    // WARNING （2）：用于记录可能需要稍后检查的事件
	WarnLevel
    // ERROR （3）：特定操作的错误消息
	ErrorLevel
    // FATAL （4）：应用程序无法恢复的严重错误。 os.Exit(1) 在记录消息后调用
	FatalLevel
    // PANIC （5）：与 类似 FATAL ，但 panic() 改为调用
	PanicLevel
)
```

默认情况下，全局配置器的最低级别是`Trace`，但是你可以通过调用`zerolog`包提供的`SetGlobalLevel()`函数来设置打印日志的最低级别

如果我们设置最低级别是zerolog.ErrorLevel,那么Trace、Debug、Info、Warn级别的日志就不会打印了:

```go
package main

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	log.Info().Msg("Hello Zerolog")
	log.Error().Msg("来自全局Zerolog配置器")
}
```

输出:

```go
{"level":"error","time":"2023-09-11T14:44:52+08:00","message":"来自全局Zerolog配置器"}
```

## Zerolog API

Zerolog提供了一个简单的结构化的日志记录API，以便于我们使用。Logger类型表示写入某个`io.Writer`，全局记录器`zerolog/log`默认的接口为`os.Stderr`,你可以使用`zerolog.New()`方法来创建一个新的自定义的Logger：

```go
package main

import (
	"os"

	"github.com/rs/zerolog"
)

func main() {
	logger := zerolog.New(os.Stdout)
	logger.Debug().Msg("Hello new logger")
}
```
输出:

```go
{"level":"debug","message":"Hello new logger"}
```

类似的我们可以通过在初始化时指定对应的级别来设置可打印日志的最低级别,如果我们初始化logger成这样，那么就不会打印对应的信息了:

```go
	logger := zerolog.New(os.Stdout).Level(zerolog.InfoLevel)
```

### 将日志中加上对应信息

当我们使用log加上对应的级别`Info()`、`Debug()`时，返回级别其实是`zerolog.Event`,Event提供了一些方法可以让我们为我们的信息添加进入一些`键值对`对，以便日志条目包含足够的数据。比如，在记录服务器上的资源创建时，可以包括用户ID或客户端信息（如 IP 地址，设备信息），以便以后通过此类属性轻松过滤日志。 比如当查询日志时可以通过`grep`命令去过滤信息。

该Event类型的大多数方法都返回指向的Event指针，这样方便我们使用函数式编程方式将所有必要的上下文添加到Event。之后我们必须调用`Msgf()`、`MsgFunc()`、`Send()`来完成Event的打印. 通常，我们使用方法 Msg()用于通过向日志条目添加 message 字段来关闭Event。

```go
logger.Info().
  Str("name", "lixin").
  Int("age", 21).
  Msg("login!")
```
输出
```go
{"level":"info","name":"lixin","age":21,"message":"login!"}
```
如果想要省略`message`字段,那么可以通过`Msg("")`或者`Send()`:

```go
logger.Info().
  Str("name", "lixin").
  Int("age", 21).
  Msg("")

logger.Info().
  Str("name", "lixin").
  Int("age", 21).
  Send()
```

输出

```go
{"level":"info","name":"lixin","age":21}
{"level":"info","name":"lixin","age":21}
```

::: warning
请注意，必须在最后调用一个事件调用关闭方法(Send/Msg/MsgFunc)， zerolog.Event以便记录相应的条目。如果未使用这些方法，则不会记录日志。
:::

```go
logger.Info().
  Str("name", "lixin").
  Int("age", 21)
```

输出为空

```go
```

::: warning
除此之外，一次Event，一次Msg/Send，防止出现日志意外情况:
:::

```go
logger := zerolog.New(os.Stdout)
	event := logger.Debug()
	event.Msg("Info message")
	event.Msg("Info message")
```
输出
```go
{"level":"debug","message":"Info message"}
{"level":"debug","message":"Info message"}
,"message":"Info message"}
```

这也是函数链式编程的好处，如果你可以使用链式编程，那么上述的问题就不会发生。

## 配置日志记录器的全局信息

::: info
在上一节中，我们了解了如何使用 zerolog.Event 类型上的方法向日志中添加相关属性信息。

我们这一部分将更进一步，向你展示如何将属性数据信息添加到自身Logger，以确保此类数据包含在全局记录器生成的所有后续日志中。
:::

我们可以使用返回Context的With()方法。可以让我们通过类似于 zerolog.Event 类型上的字段方法以键值对的形式向记录器添加其他属性。然后，在将必要的数据添加到上下文后，必须调用该方法 Logger() 以返回具有更新了上下文的新 Logger 对象，比如添加Timestamp()的Logger对象:

```go
logger := zerolog.
		New(os.Stdout).
		With().
		Timestamp().
		Logger()

	logger.
		Info().
		Msg("Info message")

	logger.
		Error().
		Str("user", "lixin").
		Send()
```

输出:

```go
{"level":"info","time":"2023-09-11T16:08:46+08:00","message":"Info message"}
{"level":"error","user":"lixin","time":"2023-09-11T16:08:46+08:00"}
```

上面的代码段将该`time`字段添加到生成`logger`的所有记录中，因为所有日志记录都应包含时间戳。你还可以将文件和行号添加到所有日志条目(添加Caller)，如下所示：

```go
logger := zerolog.
		New(os.Stdout).
		With().
		Timestamp().
		Caller().
		Logger()

	logger.
		Info().
		Msg("Info message")

	logger.
		Error().
		Str("user", "lixin").
		Send()
```

```go
{"level":"info","time":"2023-09-11T16:12:21+08:00","caller":"/Users/lixin/code/demo_zlog/main.go:19","message":"Info message"}
{"level":"error","user":"lixin","time":"2023-09-11T16:12:21+08:00","caller":"/Users/lixin/code/demo_zlog/main.go:24"}
```

又由于方法Logger()返回一个全新的Logger，所以你可以使用该方法With()实现子记录器，这些记录器使用相关元数据注释特定范围内的所有日志Logger，以将它们与其他记录区分开来。下面是一个示例：

```go
var logger = zerolog.New(os.Stdout).With().Time("time", time.Now()).Logger()

func main() {
	mainLogger := logger.With().Str("service", "main").Logger()
	mainLogger.Info().Msg("main logger")

	auth()
	user()
}

func auth() {
	authLogger := logger.With().Str("service", "auth").Logger()
	authLogger.Info().Msg("auth logger")
}

func user() {
	userLogger := logger.With().Str("service", "user").Logger()
	userLogger.Info().Msg("user logger")
}
```
输出:
```go
{"level":"info","time":"2023-09-11T16:18:58+08:00","service":"main","message":"main logger"}
{"level":"info","time":"2023-09-11T16:18:58+08:00","service":"auth","message":"auth logger"}
{"level":"info","time":"2023-09-11T16:18:58+08:00","service":"user","message":"user logger"}
```

除了`With`方式添加属性信息外，还有`UpdateContext()`方法:

```go
    logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
	logger.UpdateContext(func(c zerolog.Context) zerolog.Context {
		return c.Str("name", "lixin").Int("age", 21)
	})

	logger.Info().Msg("info message")
```
输出
```go
{"level":"info","name":"lixin","age":21,"time":"2023-09-11T16:22:05+08:00","message":"info message"}
```

## 美化你的日志信息

在开发环境中，我们可能想要gin框架那样简单美观的日志信息，这样就可以轻松发现各种异常事件，zerolog提供了一个控制台编写器类型，用于解析原始JSON条目，并将其以彩色格式输出。

```go
	buildInfo, _ := debug.ReadBuildInfo()
	cpuProfile := runtime.NumCPU()
	numGoroutine := runtime.NumGoroutine()

	logger := zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC1123}).
		Level(zerolog.TraceLevel).
		With().
		Timestamp().
		Caller().
		Int("pid", os.Getpid()).
		Str("go_version", buildInfo.GoVersion).
		Int("cpu_num", cpuProfile).
		Int("goroutine_num", numGoroutine).
		Logger()

	logger.Trace().Msg("trace message")
	logger.Debug().Msg("debug message")
	logger.Info().Msg("info message")
	logger.Warn().Msg("warn message")
	logger.Error().Msg("error message")
	logger.WithLevel(zerolog.FatalLevel).Msg("fatal message")
	logger.WithLevel(zerolog.PanicLevel).Msg("panic message")
```

输出

```go
Mon, 11 Sep 2023 16:35:35 CST TRC main.go:28 > trace message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST DBG main.go:29 > debug message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST INF main.go:30 > info message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST WRN main.go:31 > warn message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST ERR main.go:32 > error message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST FTL main.go:33 > fatal message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
Mon, 11 Sep 2023 16:35:35 CST PNC main.go:34 > panic message cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=10562
```

![zlog1.png](/assets/images/program/zlog/zlog1.png)

还可以使用 ConsoleWriter 类型上提供的选项来自定义输出的外观和格式：

```go
    buildInfo, _ := debug.ReadBuildInfo()
	cpuProfile := runtime.NumCPU()
	numGoroutine := runtime.NumGoroutine()

	logger := zerolog.New(zerolog.ConsoleWriter{
		Out:        os.Stderr,
		TimeFormat: time.RFC3339,
		FormatLevel: func(i interface{}) string {
			return strings.ToUpper(fmt.Sprintf("[%s]", i))
		},
		FormatMessage: func(i interface{}) string {
			return fmt.Sprintf("| %s |", i)
		},
		FormatCaller: func(i interface{}) string {
			return filepath.Base(fmt.Sprintf("%s", i))
		},
		PartsExclude: []string{
			zerolog.TimestampFieldName,
		},
	}).
		Level(zerolog.TraceLevel).
		With().
		Timestamp().
		Caller().
		Int("pid", os.Getpid()).
		Str("go_version", buildInfo.GoVersion).
		Int("cpu_num", cpuProfile).
		Int("goroutine_num", numGoroutine).
		Logger()

	logger.Trace().Msg("trace message")
	logger.Debug().Msg("debug message")
	logger.Info().Msg("info message")
	logger.Warn().Msg("warn message")
	logger.Error().Msg("error message")
	logger.WithLevel(zerolog.FatalLevel).Msg("fatal message")
	logger.WithLevel(zerolog.PanicLevel).Msg("panic message")
```
输出:
```go
[TRACE] main.go:46 | trace message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[DEBUG] main.go:47 | debug message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[INFO] main.go:48 | info message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[WARN] main.go:49 | warn message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[ERROR] main.go:50 | error message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[FATAL] main.go:51 | fatal message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
[PANIC] main.go:52 | panic message | cpu_num=10 go_version=go1.19.12 goroutine_num=1 pid=11202
```
![zlog2.png](/assets/images/program/zlog/zlog2.png)

不要在生产环境中使用， ConsoleWriter会影响日志记录速度。提供它只是为了帮助在开发应用程序时更易于阅读日志。您可以判断配置是否是开发环境来判断是否启用 ConsoleWriter 输出：

```go
var output io.Writer = zerolog.ConsoleWriter{...}
if viper.GetString("GO_ENV") != "development" {
  output = os.Stderr
}
```

## Zerolog的流控采样

采样(Sampling)是一种故意放弃重复日志条目的技术,这样只保留并处理其中的一部分,而不牺牲从日志信息。这对于高访问量应用程序产生大量记录很有用,如果保存每个记录,则会导致过度的存储和处理成本,这可能不是理想的。采样(Simpling)解决这个问题,通过防止相同的日志每秒记录数百或数千次,从而防止资源被无必要地耗尽。它能避免因保存每一条重复日志而导致的存储和计算成本过高的问题。

以下是使用 Zerolog 对日志进行采样的最基本方法：

```go
    log := zerolog.New(os.Stdout).
        With().
        Timestamp().
        Logger().
        Sample(&zerolog.BasicSampler{N: 5})

    for i := 1; i <= 10; i++ {
        log.Info().Msgf("%d message :", i)
    }
```

在此配置的BasicSampler Logger使得每个日志在五次中仅记录一次。这在for循环中演示，其中INFO消息通常会记录十次，但由于采样，它只记录两次：

```go
{"level":"info","time":"2023-09-11T17:00:28+08:00","message":"1 message"}
{"level":"info","time":"2023-09-11T17:00:28+08:00","message":"6 message"}
```

Zerolog提供了其他更复杂的采样器。例如， BurstSampler 可用于限制在一定时间内记录的日志数：

```go
l := zerolog.New(os.Stdout).
		With().
		Timestamp().
		Logger().
		Sample(&zerolog.BurstSampler{
			Burst:  3,
			Period: 1 * time.Second,
		})

	for i := 1; i <= 10; i++ {
		if i == 5 || i == 9 {
			time.Sleep(1 * time.Second)
		}
		l.Info().Msgf("a message from the gods: %d", i)
		l.Warn().Msgf("warn message: %d", i)
		l.Error().Msgf("error message: %d", i)
	}
```

在这里，配置 BurstSampler 限制每秒 Logger 生成三个的日志。本来会在指定范围内记录的所有其他记录都将被丢弃。上面的 for 循环应该记录 30 条消息而不进行采样，但由于上面的配置，它只记录了9条消息：

```go
{"level":"info","time":"2023-09-11T17:03:26+08:00","message":"a message from the gods: 1"}
{"level":"warn","time":"2023-09-11T17:03:26+08:00","message":"warn message: 1"}
{"level":"error","time":"2023-09-11T17:03:26+08:00","message":"error message: 1"}
{"level":"info","time":"2023-09-11T17:03:27+08:00","message":"a message from the gods: 5"}
{"level":"warn","time":"2023-09-11T17:03:27+08:00","message":"warn message: 5"}
{"level":"error","time":"2023-09-11T17:03:27+08:00","message":"error message: 5"}
{"level":"info","time":"2023-09-11T17:03:28+08:00","message":"a message from the gods: 9"}
{"level":"warn","time":"2023-09-11T17:03:28+08:00","message":"warn message: 9"}
{"level":"error","time":"2023-09-11T17:03:28+08:00","message":"error message: 9"}
```

您还可以只将采样应用于特定级别，如下所示：

```go
    burstSampler := &zerolog.BurstSampler{
		Burst:       3,
		Period:      1 * time.Second,
		NextSampler: &zerolog.BasicSampler{N: 5},
	}

	l := zerolog.New(os.Stdout).
		With().
		Timestamp().
		Logger().
		Sample(zerolog.LevelSampler{
			WarnSampler: burstSampler,
			InfoSampler: burstSampler,
		})

	for i := 1; i <= 10; i++ {
		if i == 5 || i == 9 {
			time.Sleep(1 * time.Second)
		}
		l.Info().Msgf("a message from the gods: %d", i)
		l.Warn().Msgf("warn message: %d", i)
		l.Error().Msgf("error message: %d", i)
	}
```

在这里，将仅对 和 WARN 日志 INFO 进行采样，而其他日志将照常记录，从而生成以下输出：

```go
{"level":"info","time":"2023-09-11T17:14:41+08:00","message":"a message from the gods: 1"}
{"level":"warn","time":"2023-09-11T17:14:41+08:00","message":"warn message: 1"}
{"level":"error","time":"2023-09-11T17:14:41+08:00","message":"error message: 1"}
{"level":"info","time":"2023-09-11T17:14:41+08:00","message":"a message from the gods: 2"}
{"level":"warn","time":"2023-09-11T17:14:41+08:00","message":"warn message: 2"}
{"level":"error","time":"2023-09-11T17:14:41+08:00","message":"error message: 2"}
{"level":"error","time":"2023-09-11T17:14:41+08:00","message":"error message: 3"}
{"level":"error","time":"2023-09-11T17:14:41+08:00","message":"error message: 4"}
{"level":"info","time":"2023-09-11T17:14:42+08:00","message":"a message from the gods: 5"}
{"level":"warn","time":"2023-09-11T17:14:42+08:00","message":"warn message: 5"}
{"level":"error","time":"2023-09-11T17:14:42+08:00","message":"error message: 5"}
{"level":"info","time":"2023-09-11T17:14:42+08:00","message":"a message from the gods: 6"}
{"level":"warn","time":"2023-09-11T17:14:42+08:00","message":"warn message: 6"}
{"level":"error","time":"2023-09-11T17:14:42+08:00","message":"error message: 6"}
{"level":"error","time":"2023-09-11T17:14:42+08:00","message":"error message: 7"}
{"level":"error","time":"2023-09-11T17:14:42+08:00","message":"error message: 8"}
{"level":"info","time":"2023-09-11T17:14:43+08:00","message":"a message from the gods: 9"}
{"level":"warn","time":"2023-09-11T17:14:43+08:00","message":"warn message: 9"}
{"level":"error","time":"2023-09-11T17:14:43+08:00","message":"error message: 9"}
{"level":"info","time":"2023-09-11T17:14:43+08:00","message":"a message from the gods: 10"}
{"level":"warn","time":"2023-09-11T17:14:43+08:00","message":"warn message: 10"}
{"level":"error","time":"2023-09-11T17:14:43+08:00","message":"error message: 10"}
```

## Zerolog钩子🪝

Zerolog 提供了一种通过 Hook 接口挂接到日志记录过程的方法，该接口定义如下：

```go
type Hook interface {
    // Run runs the hook with the event.
    Run(e *zerolog.Event, level zerolog.Level, message string)
}
```

在具体类型上实现Hook接口时，可以使用该方法 Logger.Hook()将其应用于Logger以便在每次记录日志时执行其Run()方法。然后，您可以根据事件的日志级别或其他一些条件运行不同的操作。

下面是将记录在 FATAL 级别或更高级别的消息发送到Mixin/企业微信通道的示例：

```go

var wg sync.WaitGroup

type MsgHook struct{}

func (t *MsgHook) Run(
	e *zerolog.Event,
	level zerolog.Level,
	message string,
) {
	if level >= zerolog.FatalLevel {
		wg.Add(1)
		go func() {
			_ = notify("", message)
			wg.Done()
		}()
	}
}

func notify(title, msg string) error {
	MsgService := New(
		"<Your app token>",
	)
	MsgService.AddReceivers("<chat id>")
	ctx, cancel := context.WithTimeout(
		context.Background(),
		30*time.Second,
	)
	defer cancel()

	// Send to Mixin / 企业微信 / Telegram
	return SendXX(ctx, title, msg)
}

func main() {
	logger := zerolog.New(os.Stdout).
		Level(zerolog.TraceLevel).
		With().
		Timestamp().
		Logger().Hook(&MsgHook{})

	logger.Error().Msg("error message")
	logger.WithLevel(zerolog.FatalLevel).Msg("fatal message")
	logger.WithLevel(zerolog.PanicLevel).Msg("panic message")

	wg.Wait()
}
```
上面的程序创建了一个 MsgHook 实现接口的类型 zerolog.Hook。它的方法检查正在记录的消息的级别，如果它Run()比该FATAL级别还严重，则将其发送到通道。如果您运行该程序（替换上面突出显示的占位符后），您将观察到每条日志消息都打印到控制台，并且FATAL 和 PANIC 日志也会发送到配置的通道。

## Zerolog错误处理

错误处理是确保快速检测和修复错误的最重要的事情之一，因此日志记录框架必须配备齐全才能令人满意地执行此操作。Zerolog提供了一些帮助程序来记录错误，我们将在本节中演示这些程序。

使用Zerolog记录错误的最简单方法是在ERROR级别记录并在Err()生成的zerolog.Event, 这会向日志条目添加一个 error 属性，其中包含相关错误的详细信息：

```go
logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
logger.Error().
	Err(errors.New("err happened")).
	Send()
```
输出
```go
{"level":"error","error":"err happened","time":"2023-09-11T17:25:44+08:00"}
```
您可以通过更改以下 zerolog.ErrorFieldName 值将错误的字段名称更改为其他值：

```go
zerolog.ErrorFieldName = "错误信息"
logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
logger.Error().
	Err(errors.New("err happened")).
	Send()
```
输出:
```go
{"level":"error","错误信息":"err happened","time":"2023-09-11T17:26:40+08:00"}
```

虽然上面的输出提供了有关所发生错误的详细信息，但它没有显示导致错误的代码执行路径，这对于调试问题至关重要。您可以通过 Event 上 Stack() 的方法在错误日志中包含堆栈跟踪来解决此问题，但在它生效之前，必须分配给 zerolog.ErrorStackMarshaler 可以从错误中提取堆栈跟踪的函数。您可以将 pkg/errors 与 zerolog/pkgerrors 帮助程序结合使用，以将堆栈跟踪添加到错误日志中，如下所示：

```go
package main

import (
	"github.com/pkg/errors"
	"github.com/rs/zerolog/pkgerrors"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack
	log.Error().Stack().Err(errors.New("seems we have an error here")).Msg("")
}
```
输出
```go
{"level":"error","stack":[{"func":"main","line":"14","source":"main.go"},{"func":"main","line":"250","source":"proc.go"},{"func":"goexit","line":"1172","source":"asm_arm64.s"}],"error":"seems we have an error here","time":"2023-09-11T17:54:28+08:00"}
```

:::warning
注意这里引入的包是`"github.com/pkg/errors"`不是`"errors"`,这里是个坑。
:::

还可以使用FATAL或者PANIC级别记录应用程序无法恢复的特别严重的错误。注意，在FATAL级别记录会导致程序立即退出，PANIC 级别在记录消息后将调用panic()。

```go
    logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
	err := errors.New("failed to connect to database")
	logger.Fatal().Err(err).Msg("something fatal happened!")
```
输出
```go
{"level":"fatal","error":"failed to connect to database","time":"2023-09-11T17:43:26+08:00","message":"something fatal happened!"}
exit status 1
```

如果要在不分别调用 os.Exit(1) 和 panic() 的情况下记录 FATAL 或 PANIC 级别消息，则必须使用如下所示 WithLevel() 的方法：

```go
    logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
	err := errors.New("failed to connect to database")
	logger.WithLevel(zerolog.FatalLevel).Err(err).Msg("something fatal happened!")
```

程序不会立即退出，但仍会在适当的级别记录事件：

```go
{"level":"fatal","error":"failed to connect to database","time":"2023-09-11T17:44:25+08:00","message":"something fatal happened!"}
```

## 持久化日志

使用 Zerolog 存入文件的选项与使用标准库日志包时几乎相同。由于可以将 io.Writer 实现接口的类型传递给 zerolog.New() 方法，因此只要使用适当的权限打开文件，任何 os.File 实例都将按预期工作。

```go
package main

import (
	"os"

	"github.com/rs/zerolog"
)

func main() {
	file, err := os.OpenFile(
		"zlog.log",
		os.O_APPEND|os.O_CREATE|os.O_WRONLY,
		0664,
	)
	if err != nil {
		panic(err)
	}

	defer file.Close()

	logger := zerolog.New(file).With().Timestamp().Logger()

	logger.Info().Msg("Info message")
}
```
查看日志:
```go
➜  demo_zlog go run main.go
➜  demo_zlog cat zlog.log   
{"level":"info","time":"2023-09-11T17:45:51+08:00","message":"Info message"}
```

## Gin框架中zerolog的应用

[gin框架中使用zerolog日志库](../gin/gin-use-zerolog.md)