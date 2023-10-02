---
icon: basil:edit-solid
date: 2023-09-11
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - log
  - gin
  - zerolog
---

gin框架是是目前Go Web领域中最受欢迎的框架，凭借其简单易用性使我们可以迅速构建Web应用。

但是gin框架内部的日志中间件不支持持久化日志，本文就来使用zerolog来写一个gin的中间件，来介绍在gin的项目中如何配置和使用zerolog并日志归档。

<!-- more -->

# gin框架中使用zerolog日志库

[Zerolog日志库介绍](../../常用框架工具/zerolog/zerolog.md)


我们在基于gin开发应用时，经常会使用专业的日志库来记录项目中的日志，比如`zap`、`logrus`等

但其实gin框架本身自带一个默认中间件`gin.Logger()`

### gin默认中间件

首先我们先来看一个最简单的gin项目:

```go
func main() {
	r := gin.Default()
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
      "Hello", "Lixin",
    })
	})
	r.Run()
}
```

`gin.Default()`源码:

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())
	return engine
}
```

可以看到在我们使用gin.Default时，默认使用了`Logger(), Recovery()`两个中间件，Logger是将日志输出到标准输出(也就是输出到默认终端)，Recovery()是在程序panic的时恢复服务并返回500响应。

## 基于zerolog的Logger和Recovey中间件

实际上我们可以参照gin框架自带的`Logger`和`Recovery`中间件实现(非常简单)，使用我们的日志库来接收gin框架自身的日志输出。

```go
func GinLogger(logger zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery
		cost := time.Since(start)
		defer logger.Info().
			Int("status", c.Writer.Status()).
			Str("method", c.Request.Method).
			Str("path", path).
			Str("query", query).
			Str("ip", c.ClientIP()).
			Str("user-agent", c.Request.UserAgent()).
			Str("errors", c.Errors.ByType(gin.ErrorTypePrivate).String()).
			Dur("cost", cost).Send()

		c.Next()
	}
}

// GinRecovery recovers possible project panic
func GinRecovery(logger zerolog.Logger, stack bool) gin.HandlerFunc {
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				httpRequest, _ := httputil.DumpRequest(c.Request, false)
				if brokenPipe {
					logger.
						Error().
						Str("path", c.Request.URL.Path).
						Any("error", err).
						Str("request", string(httpRequest)).
						Send()

					// If the connection is dead, we can't write a status to it.
					c.Error(err.(error)) // nolint: errcheck
					c.Abort()
					return
				}

				if stack {
					errors.New(string(debug.Stack()))
					logger.
						Error().
						Stack().
						Err(errors.New(string(debug.Stack()))).
						Str("error", "[Recovery from panic]").
						Str("request", string(httpRequest)).
						Send()

				} else {
					logger.
						Error().
						Str("error", "[Recovery from panic]").
						Any("error", err).
						Str("request", string(httpRequest)).
						Send()
				}
				c.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		c.Next()
	}
}
```

:::tip
如果你不想自己实现一遍，也可以用我已经封装好的库 <HopeIcon icon="launch"  /> [https://github.com/LixvYang/ginzero](ginzero)
:::

不过其实，在我们真实的企业级项目中，应该给每个日志加上一个可追踪的xid，方便我们查看代码流程是否正确以及查找问题:

```go
import "github.com/rs/xid"

func GinXid(logger zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		xid := xid.New().String()
		logger.UpdateContext(func(c zerolog.Context) zerolog.Context {
			return c.Str("xid", xid)
		})
		c.Header("xid", xid)
		c.Set("logger", logger)
		c.Next()
	}
}
```

接着在我们开发我们的gin接口时，就可以通过下述代码来获取我们的zlog了:

```go
zlog := c.MustGet("logger").(zerolog.Logger) 
```

## 在真实gin项目中使用zerolog

想要在我们的真实生产环境中使用，我们还需要再加上日志切割、日志备份功能，这样就可以做到一个可以在真实生产环境中使用的日志了，我们可以使用lumberjack库帮助我们实现日志备份的功能。

下面我们就来完成日志初始化和日志备份的功能，来完善我们在gin框架下使用zerolog的功能。

```go
// Configuration for logging
type Config struct {
	// Enable console logging
	ConsoleLoggingEnabled bool
	// EncodeLogsAsJson makes the log framework log JSON
	EncodeLogsAsJson bool
	// FileLoggingEnabled makes the framework log to a file
	// the fields below can be skipped if this value is false!
	FileLoggingEnabled bool
	// Directory to log to to when filelogging is enabled
	Directory string
	// Filename is the name of the logfile which will be placed inside the directory
	Filename string
	// MaxSize the max size in MB of the logfile before it's rolled
	MaxSize int
	// MaxBackups the max number of rolled files to keep
	MaxBackups int
	// MaxAge the max age in days to keep a logfile
	MaxAge int
	// Level the zerolog Level
	Level int
}

var Lg zerolog.Logger

// Configure sets up the logging framework
//
// In production, the container logs will be collected and file logging should be disabled. However,
// during development it's nicer to see logs as text and optionally write to a file when debugging
// problems in the containerized pipeline
//
// The output log file will be located at /var/log/service-xyz/service-xyz.log and
// will be rolled according to configuration set.
func InitLogger(config Config) {
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack
	zerolog.TimeFieldFormat = time.RFC3339Nano

	var logLevel = zerolog.Level(config.Level)
	if config.Level < -1 || config.Level > 7 {
		logLevel = zerolog.InfoLevel // default to INFO
	}

	var writers []io.Writer

	if config.ConsoleLoggingEnabled {
		writers = append(writers, zerolog.ConsoleWriter{
			Out:        os.Stderr,
			TimeFormat: time.RFC3339,
			FieldsExclude: []string{
				"user_agent",
				"git_revision",
				"go_version",
			}})
	}

	if config.FileLoggingEnabled {
		writers = append(writers, newRollingFile(config))
	}
	mw := io.MultiWriter(writers...)

	var gitRevision string

	buildInfo, ok := debug.ReadBuildInfo()
	if ok {
		for _, v := range buildInfo.Settings {
			if v.Key == "vcs.revision" {
				gitRevision = v.Value
				break
			}
		}
	}

	Lg = zerolog.New(mw).
		Level(zerolog.Level(logLevel)).
		With().
		Str("git_revision", gitRevision).
		Str("go_version", buildInfo.GoVersion).
		Timestamp().
		Logger()

	Lg.Info().
		Bool("fileLogging", config.FileLoggingEnabled).
		Bool("jsonLogOutput", config.EncodeLogsAsJson).
		Str("logDirectory", config.Directory).
		Str("fileName", config.Filename).
		Int("maxSizeMB", config.MaxSize).
		Int("maxBackups", config.MaxBackups).
		Int("maxAgeInDays", config.MaxAge).
		Msg("logging configured")
}

func newRollingFile(config Config) io.Writer {
	if err := os.MkdirAll(config.Directory, 0744); err != nil {
		log.Error().Err(err).Str("path", config.Directory).Msg("can't create log directory")
		return nil
	}

	return &lumberjack.Logger{
		Filename:   path.Join(config.Directory, config.Filename),
		MaxBackups: config.MaxBackups, // files
		MaxSize:    config.MaxSize,    // megabytes
		MaxAge:     config.MaxAge,     // days
	}
}

func GinLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery
		cost := time.Since(start)
		defer Lg.Info().
			Int("status", c.Writer.Status()).
			Str("method", c.Request.Method).
			Str("path", path).
			Str("query", query).
			Str("ip", c.ClientIP()).
			Str("user-agent", c.Request.UserAgent()).
			Str("errors", c.Errors.ByType(gin.ErrorTypePrivate).String()).
			Dur("cost", cost).Send()

		c.Next()
	}
}

// GinRecovery recovers possible project panic
func GinRecovery(stack bool) gin.HandlerFunc {
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				httpRequest, _ := httputil.DumpRequest(c.Request, false)
				if brokenPipe {
					Lg.
						Error().
						Str("path", c.Request.URL.Path).
						Any("error", err).
						Str("request", string(httpRequest)).
						Send()

					// If the connection is dead, we can't write a status to it.
					c.Error(err.(error)) // nolint: errcheck
					c.Abort()
					return
				}

				if stack {
					errors.New(string(debug.Stack()))
					Lg.
						Error().
						Stack().
						Err(errors.New(string(debug.Stack()))).
						Str("error", "[Recovery from panic]").
						Str("request", string(httpRequest)).
						Send()

				} else {
					Lg.
						Error().
						Str("error", "[Recovery from panic]").
						Any("error", err).
						Str("request", string(httpRequest)).
						Send()
				}
				c.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		c.Next()
	}
}
```

所有代码我将上传到github仓库中。