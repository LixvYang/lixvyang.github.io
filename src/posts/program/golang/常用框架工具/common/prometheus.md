---
icon: edit
date: 2023-09-28
cover: /assets/images/program/prometheus/grafana-3.png
headerDepth: 4
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - prometheus
---

最近在公司做监控方面的工作，接触到了Prometheus、Grafana等云服务产品，特地在此记录下来学习到的知识和使用过程

<!-- more -->

# 万字长文带你入门 Prometheus

本文首先会简单介绍一下Prometheus是啥，然后会用Go语言写一些程序上报一些接口数据到Prometheus上，接着通过Grafana展示出来，也算简单了解下云原生的知识了。

本文所用到的所有的库/组件会通过Docker来启动，没用Docker也不用害怕，只是个工具入门就可以了，我们本文用到的也只是最简单的部分。

## 简介

我们先来简单解释一下啥是Prometheus以及它是怎么来的。

我们知道K8s是由Google的Brog系统演变而来的，Prometheus就是受Brog的监控系统Brogmon启发而来。由前Google的工程师开发，2012年创建、2017年发布Prometheus2.0。

Prometheus是新一代云原生监控系统，社区非常活跃，目前已经有超过650位贡献者并且有超过120+第三方集成(K8s、Etcd、Consul、MySQL等等)，目标是达成针对长期趋势分析、告警、数据可视化的目的。

优势：

已于管理，核心只有一个二进制文件，不存在任何第三方依赖。唯一需要的就是本地磁盘，不会有潜在级联故障的风险。Prometheus是一个时序数据库，基于Pull模型的架构方式，可以在任何地方(本地电脑、开发环境、测试环境)搭建我们的监控系统。对于一些复杂情况，还可以使用Prometheus服务发现(Service Discovery)的能力动态管理监控目标。

数据可以通过Pull的方式获取(例如可以在你的服务下开放一个提供数据端口供Prometheus不断拉取获得)，也可以通过Prometheus提供的`Pushgateway`由我们的应用程序提供推送数据到Pushgateway，接着Pushgateway再推送到Prometheus获得。

采集到的数据指标(metric)保存在内置的时间序列数据库中(TSDB)，所有的样本出了基本的指标名称之外，还包含描述样本的标签`label`:

```sh
http_request_status{code='200',content_path='/api/path', environment='produment'} => [value1@timestamp1,value2@timestamp2...]
http_request_status{code='200',content_path='/api/path2', environment='produment'} => [value1@timestamp1,value2@timestamp2...]
```

每一条时间序列都是由指标名称(Metrics Name)和一系列标签(Labels)组成，每条时间序列按照时间的先后顺序存储一系列的样本值。标签的维度可能来源于我们需要监控的对象，比如我们需要监控某个接口的错误码，那么我们就可以用这样的标签`code='1001','endpoint'='/api/hello'`。

内置了强大的PromQL语言可以实现对采集指标的查询、聚合，同时也可以应用到数据可视化(Grafana)以及告警中，通过PromQL可以回答以下问题:

- 在过去一段时间中95%应用延迟时间的分布范围？
- 预测在4小时后，磁盘空间占用大致会是什么情况？
- CPU占用率前5位的服务有哪些？(过滤)

### 环境准备

#### Prometheus Server

Prometheus 其实就是我们上述所说的最简单的二进制文件，但我们选择通过Docker来启动,首先我们需要准备我们的prometheus.yaml配置文件，放到`~/data/prometheus/prometheus.yaml`:

```yaml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  - job_name: 'pushgateway'
    static_configs:
      - targets: ['host.docker.internal:9092']
        labels:
          instance: pushgateway
  - job_name: 'node'
    static_configs:
      - targets: ['host.docker.internal:9100']
```

这里我们只需要了解`global`和`scrape_configs`配置，global是全局配置，例如:

- `global`下配置 `scrape_interval: 15s`，意思是抓取间隔是15s一次
- `scrape_configs`下的配置是具体的抓取数据的任务，`job_name: 名称`,`targets: 抓取目标地址`

:::tip
由于我们的Prometheus程序是通过Docker启动的，所以想访问我们我们的job`pushgateway`和`node`本机的端口程序需要通过`host.docker.internal`...意思是我们的pushgateway和node俩任务的数据源不是通过Docker启动的，而是通过我本机来启动的
:::

将这个文件放入`~/data/prometheus/prometheus.yaml`就可以了(你可以随便放，只要Docker启动prometheus的时候路径对得上就OK)，接着我们就通过Docker启动Prometheus:

```sh
docker run -it \
    -p 9090:9090 \
    -v /Users/$YOURHOME/data/prometheus/prometheus.yaml:/etc/prometheus/prometheus.yml \
    prom/prometheus \
```

如果没问题，打开`localhost:9090`就可以看到界面了

#### Pushgateway

当我们想采集我们的应用程序的数据时直接上报Prometheus是不可以的，但是我们应用程序的数据可以上报给Pushgateway，然后Prometheus可以从Pushgateway抓取数据，四舍五入等于我们的应用程序上报数据到Prometheus了.......:(

这里需要区分主机

我们从本机(MacOS Arm64)来启动Pushgateway:

```sh
wget https://github.com/prometheus/pushgateway/releases/download/v1.6.2/pushgateway-1.6.2.darwin-arm64.tar.gz
tar xzvf pushgateway-1.6.2.darwin-arm64.tar.gz
mv pushgateway-1.6.2.darwin-arm64 /usr/local/pushgateway
```

接着启动:

```sh
pushgateway --web.listen-address 0.0.0.0:9092
```

不出意外打开`localhost:9092`就可以看到对应数据了

![pushgateway-data.png](/assets/images/program/prometheus/pushgateway-data.png)

::: info
当然，你也可以通过Docker来启动`Pushgateway`,但是需要重新写之前的Prometheus配置文件和启动Prometheus Server了

```sh
docker pull prom/pushgateway
docker run -d -p 9091:9091 prom/pushgateway
# 收集指标地址需要从 host.docker.internal:9092 改成 172.30.12.167:9092
```
:::

#### Node Exporter

在Prometheus的架构设计中，Prometheus Server并不直接服务监控特定的目标，其主要任务负责数据的收集，存储并且对外提供数据查询支持。

因此为了能够能够监控到某些东西，如主机的CPU使用率，我们需要使用到Exporter。Prometheus周期性的从Exporter暴露的HTTP服务地址（通常是/metrics）拉取监控样本数据。

从上面的描述中可以看出Exporter可以是一个相对开放的概念，其可以是一个独立运行的程序独立于监控目标以外，也可以是直接内置在监控目标中。只要能够向Prometheus提供标准格式的监控样本数据即可。

这里为了能够采集到主机的运行指标如CPU, 内存，磁盘等信息。我们可以使用[Node Exporter](https://github.com/prometheus/node_exporter)。

Node Exporter同样采用Golang编写，并且不存在任何的第三方依赖，只需要下载，解压即可运行。可以从https://prometheus.io/download/获取最新的node exporter版本的二进制包。

```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.darwin-amd64.tar.gz
tar -xzf node_exporter-1.6.1.darwin-amd64.tar.gz

cd node_exporter-1.6.1.darwin-amd64
cp node_exporter-1.6.1.darwin-amd64/node_exporter /usr/local/bin/
./node_exporter
```

启动成功后，可以看到以下输出：

```sh
INFO[0000] Listening on :9100        source="node_exporter.go:76"
```

打开`http://localhost:9100/metrics`,可以看到当前node exporter获取到的当前主机的所有监控数据，如下所示：

![node-exporter-data.png](/assets/images/program/prometheus/node-exporter-data.png)

你会发现每一个监控指标之前都会有一段类似于如下形式的信息：

```sh
# HELP node_cpu Seconds the cpus spent in each mode.
# TYPE node_cpu counter
node_cpu{cpu="cpu0",mode="idle"} 375209.421875
# HELP node_load1 1m load average.
# TYPE node_load1 gauge
node_load1 3.0703125
```

其中HELP用于解释当前指标的含义，TYPE则说明当前指标的数据类型。

在上面的例子中node_cpu的注释表明当前指标是cpu0上idle进程占用CPU的总时间，CPU占用时间是一个只增不减的度量指标，从类型中也可以看出node_cpu的数据类型是计数器(counter)，与该指标的实际含义一致。

又例如node_load1该指标反映了当前主机在最近一分钟以内的负载情况，系统的负载情况会随系统资源的使用而变化，因此node_load1反映的是当前状态，数据可能增加也可能减少，从注释中可以看出当前指标类型为仪表盘(gauge)，与指标反映的实际含义一致。

除了这些以外，在当前页面中根据物理主机系统的不同，你还可能看到如下监控指标：

- node_boot_time：系统启动时间
- node_cpu：系统CPU使用量
- nodedisk*：磁盘IO
- nodefilesystem*：文件系统用量
- node_load1：系统负载
- nodememeory*：内存使用量
- nodenetwork*：网络带宽
- node_time：当前系统时间
- go_*：node exporter中go相关指标
- process_*：node exporter自身进程相关运行指标

由于我们上面的的prometheus.yaml已经启动并且抓取了9100端口的数据，所以访问`localhost:9090`是可以找到这些数据的:

![prometheus-node-data.png](/assets/images/program/prometheus/prometheus-node-data.png)

#### Grafana

:::tip
Grafana可以在教程后面需要时再开启
:::

```sh
docker run -d -p 3000:3000 --name=grafana grafana/grafana-enterprise
```

访问http://localhost:3000就可以进入到Grafana的界面中，默认情况下使用账户账号:admin、密码:admin进行登录。

在Grafana首页中显示默认的使用向导，包括：安装、添加数据源、创建Dashboard、邀请成员、以及安装应用和插件等主要流程:

![grafana-1.png](/assets/images/program/prometheus/grafana-1.png)

导入 Prometheus 的数据源，注意地址为: `http://host.docker.internal:9090`:

![grafana-2.png](/assets/images/program/prometheus/grafana-2.png)

然后就可以启动并且保存指标了:

```sh
avg without(cpu) (rate(node_cpu[2m]))
```

![grafana-3.png](/assets/images/program/prometheus/grafana-3.png)

---

下面我们来了解一下Promethes的四种数据类型

### 四种数据类型

Prometheus的数据类型有四种:

1. Counter：只增不减的计数器
2. Gauge：可增可减的仪表盘
3. Histogram 数据分布情况
4. Summary 数据分布情况

#### Counter：只增不减的计数器

Counter只增不减，除非系统发生重制。常见的监控指标有:http请求总数(统计QPS)，cpu使用率，都是Counter类型的监控指标，==一般定义Counter类型指标时推荐使用_total作为后缀==

例如通过rate函数获取HTTP请求量的增长率:

:::tip
rate(http_requests_total[5m])

PromQL中直接内置了rate(v range-vector)函数，rate函数可以直接计算区间向量v在时间窗口内平均增长速率。
换句话说上面的PromQL可以替换成 increase(http_request_total[5m]) / 300也就是在5分钟的总请求次数/300秒
:::

查询当前系统中，访问量前10的HTTP地址：

:::tip
topk(10, http_requests_total)
:::

#### Gauge：可增可减的仪表盘

与Counter不同，Gauge类型的指标侧重于反应系统的当前状态。因此这类指标的样本数据可增可减。常见指标如：node_memory_MemFree（主机当前空闲的内容大小）、node_memory_MemAvailable（可用内存大小）都是Gauge类型的监控指标。

通过Gauge指标，用户可以直接查看系统的当前状态：

node_memory_MemFree

对于Gauge类型的监控指标，通过PromQL内置函数delta()可以获取样本在一段时间返回内的变化情况。例如，计算CPU温度在两个小时内的差异：

:::tip
delta(cpu_temp_celsius{host="zeus"}[2h])
:::

还可以使用deriv()计算样本的线性回归模型，甚至是直接使用predict_linear()对数据的变化趋势进行预测。例如，预测系统磁盘空间在4个小时之后的剩余情况：

:::tip
predict_linear(node_filesystem_free{job="node"}[1h], 4 * 3600)
:::

#### 使用Histogram和Summary分析数据分布情况

大多数情况下我们通常倾向于某些量化指标的平均值，比如CPU平均值，页面平均响应时间。但这样的平均值弊端也很明显，例如一个接口的响应时间大多数情况下都在100毫秒以内，但就是有个别请求需要10s，这回导致某些接口的响应时间远远超过平均数，这种现象叫做肥尾效应。

为了区分是平均的慢还是肥尾的慢，最简单的方式就是按照请求延迟的范围进行分组。

例如，统计延迟在0~10ms之间的请求数有多少而10~20ms之间的请求数又有多少。

通过这种方式可以快速分析系统慢的原因。Histogram和Summary都是为了能够解决这样问题的存在，通过Histogram和Summary类型的监控指标，我们可以快速了解监控样本的分布情况。

例如，指标prometheus_tsdb_wal_fsync_duration_seconds的指标类型为Summary。 它记录了Prometheus Server中wal_fsync处理的处理时间，通过访问Prometheus Server的/metrics地址，可以获取到以下监控样本数据：

```sh
# HELP prometheus_tsdb_wal_fsync_duration_seconds Duration of WAL fsync.
# TYPE prometheus_tsdb_wal_fsync_duration_seconds summary
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.5"} 0.012352463
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.9"} 0.014458005
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.99"} 0.017316173
prometheus_tsdb_wal_fsync_duration_seconds_sum 2.888716127000002
prometheus_tsdb_wal_fsync_duration_seconds_count 216
```

从上面的样本中可以得知当前Prometheus Server进行wal_fsync操作的总次数为216次，耗时2.888716127000002s。其中中位数（quantile=0.5）的耗时为0.012352463，9分位数（quantile=0.9）的耗时为0.014458005s。

在Prometheus Server自身返回的样本数据中，我们还能找到类型为Histogram的监控指标prometheus_tsdb_compaction_chunk_range_bucket。

```sh
# HELP prometheus_tsdb_compaction_chunk_range Final time range of chunks on their first compaction
# TYPE prometheus_tsdb_compaction_chunk_range histogram
prometheus_tsdb_compaction_chunk_range_bucket{le="100"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="400"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="1600"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="6400"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="25600"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="102400"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="409600"} 0
prometheus_tsdb_compaction_chunk_range_bucket{le="1.6384e+06"} 260
prometheus_tsdb_compaction_chunk_range_bucket{le="6.5536e+06"} 780
prometheus_tsdb_compaction_chunk_range_bucket{le="2.62144e+07"} 780
prometheus_tsdb_compaction_chunk_range_bucket{le="+Inf"} 780
prometheus_tsdb_compaction_chunk_range_sum 1.1540798e+09
prometheus_tsdb_compaction_chunk_range_count 780
```

与Summary类型的指标相似之处在于Histogram类型的样本同样会反应当前指标的记录的总数(以_count作为后缀)以及其值的总量（以_sum作为后缀）。不同在于Histogram指标直接反应了在不同区间内样本的个数，区间通过标签len进行定义。

同时对于Histogram的指标，我们还可以通过histogram_quantile()函数计算出其值的分位数。不同在于Histogram通过histogram_quantile函数是在服务器端计算的分位数。 而Sumamry的分位数则是直接在客户端计算完成。

因此对于分位数的计算而言，Summary在通过PromQL进行查询时有更好的性能表现，而Histogram则会消耗更多的资源。反之对于客户端而言Histogram消耗的资源更少。在选择这两种方式时用户应该按照自己的实际场景进行选择。

### 上报数据的方式

上报数据有两种一种是通过pull的方式，prometheus自动从配置文件的指定源去拉取数据，另一种是从我们的应用程序上报到pushgateway，然后从pushgateway推送数据:

## Go语言监控数据上报


下面我来通过具体的go程序来演示一下:

:::info
具体的数据展示环节需要配置相应的环境,grafana、prometheus、pushgateway。
:::

下面我通过Go语言来展示两种上报数据的类型:

首先是通过pull模式，prometheus自动从配置文件的指定源去拉取数据，我们只需要给prometheus提供源源不断的数据源:

<!-- ```go
package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	r := gin.Default()
	r.GET("/metrics", func(c *gin.Context) {
		handler := promhttp.Handler()
		handler.ServeHTTP(c.Writer, c.Request)
	})
	err := r.Run(":8081")
	if err != nil {
		log.Fatalln(err)
	}
}
``` -->

<Replit link="https://replit.com/@lixin3/demoprometheus#pull_for_prometheus/main.go" />

我们上面这段程序的意思是在8081端口提供数据，然后在我们的`prometheus.yaml`配置中新增对应的配置项来pull抓取8081端口`/metrics`的数据:

```yaml
  - job_name: go-gin-test
    static_configs:
      - targets: ['host.docker.internal:8081']
```

于是你可以看到的结果是:

![gin-prometheus-data-1.png](/assets/images/program/prometheus/gin-prometheus-data-1.png)
![gin-prometheus-data-2.png](/assets/images/program/prometheus/gin-prometheus-data-2.png)

这是我们提供对应的端口，然后prometheus程序不断去拉取数据的方式。

还有另一种就是通过讲数据推送push到pushgateway,然后prometheus去pushgateway拉取数据的方式，下面我通过Go语言的实例来分别讲解推送数据的方式，以及顺便讲解prometheus，Counter、Gauge、Histogram数据类型的常见应用。

### 接口QPS监控

我们要查看接口的QPS的话，我们的应用程序需要上报什么数据呢？其实很简单，只需要在程序里定义一个计数器，在接口处，每次进来一个请求以后加1之后即可，为了更加合理的使用prometheus, 我们在程序中定义一个Counter计数器变量, 不同的接口根据不同的label来区分不同的数据. 代码如下:



### 接口耗时监控





### 接口错误码监控


## Grafana监控

### 简介

### 画图类型

## 总结



参考:

[Prometheus Book](https://yunlzheng.gitbook.io/)