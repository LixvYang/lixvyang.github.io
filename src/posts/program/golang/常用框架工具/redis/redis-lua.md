---
icon: basil:edit-solid
date: 2023-09-11
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - redis
---

我们在分布式环境中使用redis的时候，不可避免会使用到redis的Lua脚本来保证redis的原子性，本文的首要目标就是帮助大家在go语言中使用redis lua脚本，以及在在脚本下的debug等。

redis环境可以使用在本地下载的，也可以使用docker启动一个redis，下面的示例中使用会docker启动一个redis实例。

<!-- more -->
# Go语言中使用redis lua脚本

## Docker启动redis

## 什么是lua脚本

redis lua脚本的原子性，不支持ACID

## redis中lua脚本的debug

## Go语言操作redis

## 总结