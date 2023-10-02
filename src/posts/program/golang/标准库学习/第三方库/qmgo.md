---
icon:  meteocons:wind-snow-fill
date: 2023-09-14
isOriginal: true
headerDepth: 4
category:
  - tutorial
tag:
  - golang
  - mongo
  - qmgo
---

我大七牛提供的`qmgo`最好用了...

<!-- more -->

# Go操作Mongo最便捷的方式

本篇文章分为三个部分:

1. 介绍MongoDB
2. 使用Docker启动MongoDB(有手就行,没手让AI帮忙也行)
3. 在Go语言实操使用Qmgo摆弄MongoDB

## 介绍MongoDB

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案，MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

NoSQL(NoSQL = Not Only SQL )，意即"不仅仅是SQL"。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

### 相关概念

| SQL术语/概念 | Mongo术语/概念 | 解释/说明 |
| -------- | -------- | -------- |
| database | database | 数据库 |
| table | collection | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | filed | 数据字段/域 |
| index | index | 索引 |
| table joins	 | database | 表连接,MongoDB不支持 |
| primary key	 | primary key	 | 主键,MongoDB自动将_id字段设置为主键 |

### MongoDB安装以及简单上手

我们使用Docker来安装MongoDB，Docker可以很方便地启动MongoDB、Redis、MySQL等常见的组件，用起来很简单:

::: tip
当然首先你得确保你已经启动了Docker
:::

```sh
# 拉取Mongo6.0版本镜像
docker pull mongo:6.0

# 启动运行mongo 
# docker中的名称是 mongodb
# 自己主机端口号是27017 容器内对应的端口号也是27017
# -d 是设置容器以守护进程方式运行
# 想使用volumn持久化的话可以代替使用下面的两个命令
# docker create volumn mongodb
# docker run -p 27017:27017 --name mongodb -v mongodb:/data/db -d mongo
docker run -p 27017:27017 --name mongodb -d mongo

# 紧接着就可以通过以下命令行进入了mongo了
docker exec -it mongodb mongosh
```
## Go语言操作Mongo

`Qmgo`是一款Go语言的`MongoDB`驱动器，它基于官方提供的[Mongo官方驱动器](https://github.com/mongodb/mongo-go-driver)开发实现，同时使用了更简便易懂的接口设计，比如参考了[mgo](https://github.com/go-mgo/mgo)的链式调用。

- Qmgo让您以更优雅的姿势使用MongoDB的新特性。

- Qmgo是从mgo迁移到新MongoDB driver的第一选择，对代码的改动影响最小。

### 要求

- Go 1.10 及以上。
- MongoDB 2.6 及以上。

### 功能

- 文档的增删改查, 均支持官方driver支持的所有options
- Sort、limit、count、select、distinct
- 事务
- Hooks
- 自动化更新的默认和定制fields
- 预定义操作符
- 聚合Aggregate、索引操作、cursor
- validation tags 基于tag的字段验证
- 可自定义插件化编程

### 安装

推荐方式是使用go mod，通过在源码中import github.com/qiniu/qmgo 来自动安装依赖。

当然，通过下面方式同样可行：

```go
go get github.com/qiniu/qmgo
```

### Usage

#### 开始

`import`并新建连接

```go
import(
    "context"

    "github.com/qiniu/qmgo"
)

ctx := context.Background()
client, err := qmgo.NewClient(ctx, &qmgo.Config{Uri: "mongodb://localhost:27017"})
db := client.Database("class")
coll := db.Collection("user")
```

如果你的连接是指向固定的 database 和 collection，我们推荐使用下面的更方便的方法初始化连接，后续操作都基于cli而不用再关心 database 和 collection:

```go
cli, err := qmgo.Open(ctx, &qmgo.Config{Uri: "mongodb://localhost:27017", Database: "class", Coll: "user"})
```

:::info
后面都会基于cli来举例，如果你使用第一种传统的方式进行初始化，根据上下文，将cli替换成client、db 或 coll即可
:::

在初始化成功后，请defer来关闭连接:

```go
defer func() {
    if err = cli.Close(ctx); err != nil {
        panic(err)
    }
}()
```

#### 创建索引

做操作前，我们先初始化一些数据：

```go

type UserInfo struct {
    Name   string `bson:"name"`
    Age    uint16 `bson:"age"`
    Weight uint32 `bson:"weight"`
}

var userInfo = UserInfo{
    Name:   "xm",
    Age:    7,
    Weight: 40,
}
```

#### 创建索引

```go
cli.CreateOneIndex(context.Background(), options.IndexModel{Key: []string{"name"}})
cli.CreateIndexes(context.Background(), []options.IndexModel{{Key: []string{"id2", "id3"}}})
```

#### 插入一个文档

```go
// insert one document
result, err := cli.InsertOne(ctx, userInfo)
```

#### 查找一个文档

```go
    // find one document
  one := UserInfo{}
  err = cli.Find(ctx, bson.M{"name": userInfo.Name}).One(&one)
```

#### 删除文档

```go
err = cli.Remove(ctx, bson.M{"age": 7})
```

#### 插入多条数据

```go
// multiple insert
var userInfos = []UserInfo{
    UserInfo{Name: "a1", Age: 6, Weight: 20},
    UserInfo{Name: "b2", Age: 6, Weight: 25},
    UserInfo{Name: "c3", Age: 6, Weight: 30},
    UserInfo{Name: "d4", Age: 6, Weight: 35},
    UserInfo{Name: "a1", Age: 7, Weight: 40},
    UserInfo{Name: "a1", Age: 8, Weight: 45},
}
result, err = cli.Collection.InsertMany(ctx, userInfos)
```

#### 批量查找`Sort`和`Limit`

```go
// find all 、sort and limit
batch := []UserInfo{}
cli.Find(ctx, bson.M{"age": 6}).Sort("weight").Limit(7).All(&batch)
```

#### Count

```go
count, err := cli.Find(ctx, bson.M{"age": 6}).Count()
```

#### Update

```go
// UpdateOne one
err := cli.UpdateOne(ctx, bson.M{"name": "d4"}, bson.M{"$set": bson.M{"age": 7}})

// UpdateAll
result, err := cli.UpdateAll(ctx, bson.M{"age": 6}, bson.M{"$set": bson.M{"age": 10}})
```

#### Select

```go
err := cli.Find(ctx, bson.M{"age": 10}).Select(bson.M{"age": 1}).One(&one)
```

#### Aggregate

```go
matchStage := bson.D{{"$match", []bson.E{{"weight", bson.D{{"$gt", 30}}}}}}
groupStage := bson.D{{"$group", bson.D{{"_id", "$name"}, {"total", bson.D{{"$sum", "$age"}}}}}}
var showsWithInfo []bson.M
err = cli.Aggregate(context.Background(), Pipeline{matchStage, groupStage}).All(&showsWithInfo)
```

#### 建立连接时支持所有 mongoDB 的Options

```go
poolMonitor := &event.PoolMonitor{
    Event: func(evt *event.PoolEvent) {
        switch evt.Type {
        case event.GetSucceeded:
            fmt.Println("GetSucceeded")
        case event.ConnectionReturned:
            fmt.Println("ConnectionReturned")
        }
    },
}

opt := options.Client().SetPoolMonitor(poolMonitor)  // more options use the chain options.
cli, err := Open(ctx, &Config{Uri: URI, Database: DATABASE, Coll: COLL}, opt)
```

#### [事务](https://github.com/qiniu/qmgo/wiki/Transactions)

```go
callback := func(sessCtx context.Context) (interface{}, error) {
    // 重要：确保事务中的每一个操作，都使用传入的sessCtx参数
    if _, err := cli.InsertOne(sessCtx, bson.D{{"abc", int32(1)}}); err != nil {
        return nil, err
    }
    if _, err := cli.InsertOne(sessCtx, bson.D{{"xyz", int32(999)}}); err != nil {
        return nil, err
    }
    return nil, nil
}
result, err = cli.DoTransaction(ctx, callback)
```

#### 预定义操作符

```go
// aggregate
matchStage := bson.D{{operator.Match, []bson.E{{"weight", bson.D{{operator.Gt, 30}}}}}}
groupStage := bson.D{{operator.Group, bson.D{{"_id", "$name"}, {"total", bson.D{{operator.Sum, "$age"}}}}}}
var showsWithInfo []bson.M
err = cli.Aggregate(context.Background(), Pipeline{matchStage, groupStage}).All(&showsWithInfo)
```

#### Hooks

Qmgo 灵活的 [hooks](https://github.com/qiniu/qmgo/wiki/Hooks--(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)):

```go
type User struct {
    Name         string    `bson:"name"`
    Age          int       `bson:"age"`
}
func (u *User) BeforeInsert(ctx context.Context) error {
    fmt.Println("before insert called")
    return nil
}
func (u *User) AfterInsert(ctx context.Context) error {
    fmt.Println("after insert called")
    return nil
}

u := &User{Name: "Alice", Age: 7}
_, err := cli.InsertOne(context.Background(), u)
```

#### 自动化更新fields

Qmgo支持2种方式来自动化更新特定的字段

- 默认 fields

在文档结构体里注入 `field.DefaultField`, `Qmgo` 会自动在更新和插入操作时更新 `createAt`、`updateAt` and `_id` field的值.

```go
type User struct {
    field.DefaultField `bson:",inline"`
    
    Name string `bson:"name"`
    Age  int    `bson:"age"`
}

u := &User{Name: "Lucas", Age: 7}
_, err := cli.InsertOne(context.Background(), u)
// tag为createAt、updateAt 和 _id 的字段会自动更新插入
```

- Custom fields

可以自定义field名, Qmgo 会自动在更新和插入操作时更新他们.

```go
type User struct {
    Name string `bson:"name"`
    Age  int    `bson:"age"`

    MyId         string    `bson:"myId"`
    CreateTimeAt time.Time `bson:"createTimeAt"`
    UpdateTimeAt int64     `bson:"updateTimeAt"`
}
// 指定自定义field的field名
func (u *User) CustomFields() field.CustomFieldsBuilder {
    return field.NewCustom().SetCreateAt("CreateTimeAt").SetUpdateAt("UpdateTimeAt").SetId("MyId")
}

u := &User{Name: "Lucas", Age: 7}
_, err := cli.InsertOne(context.Background(), u)
// CreateTimeAt、UpdateTimeAt and MyId 会自动更新并插入DB 

// 假设Id和ui已经初始化
err = cli.ReplaceOne(context.Background(), bson.M{"_id": Id}, &ui)
// UpdateTimeAt 会被自动更新
```
[例子介绍](https://github.com/qiniu/qmgo/blob/master/field_test.go)

[自动化 fields 详情介绍](https://github.com/qiniu/qmgo/wiki/Automatically-update-fields)

#### `Validation tags` 基于tag的字段验证

功能基于[go-playground/validator](https://github.com/go-playground/validator)实现。

所以Qmgo支持所有[go-playground/validator 的struct验证规则](https://github.com/go-playground/validator#usage-and-documentation)，比如：

```go
type User struct {
    FirstName string            `bson:"fname"`
    LastName  string            `bson:"lname"`
    Age       uint8             `bson:"age" validate:"gte=0,lte=130" `    // Age must in [0,130]
    Email     string            `bson:"e-mail" validate:"required,email"` //  Email can't be empty string, and must has email format
    CreateAt  time.Time         `bson:"createAt" validate:"lte"`          // CreateAt must lte than current time
    Relations map[string]string `bson:"relations" validate:"max=2"`       // Relations can't has more than 2 elements
}
```

本功能只对以下API有效： `InsertOne`、`InsertyMany`、`Upsert`、`UpsertId`、`ReplaceOne`

插件化编程

实现以下方法
```go
func Do(ctx context.Context, doc interface{}, opType operator.OpType, opts ...interface{}) error{
  // do anything
}
```
调用middleware包的Register方法，注入Do Qmgo会在支持的操作执行前后调用Do
```go
middleware.Register(Do)
```

[Example](https://github.com/qiniu/qmgo/blob/master/middleware/middleware_test.go])

Qmgo的hook、自动更新field和validation tags都基于plugin的方式实现