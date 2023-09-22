---
icon: snow
date: 2023-09-14
isOriginal: true
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



`Qmgo`是一款Go语言的`MongoDB`驱动器，它基于官方提供的[Mongo官方驱动器](https://github.com/mongodb/mongo-go-driver)开发实现，同时使用了更简便易懂的接口设计，比如参考了[mgo](https://github.com/go-mgo/mgo)的链式调用。

- Qmgo让您以更优雅的姿势使用MongoDB的新特性。

- Qmgo是从mgo迁移到新MongoDB driver的第一选择，对代码的改动影响最小。

## 要求

- Go 1.10 及以上。
- MongoDB 2.6 及以上。

