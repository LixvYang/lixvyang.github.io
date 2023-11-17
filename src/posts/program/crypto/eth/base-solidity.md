---
icon: cryptocurrency-color:eth
date: 2023-09-14
isOriginal: true
category:
  - notes
tag:
  - ethereum
---

<!-- more -->

# Solidity基础学习

学习Solidity 最简单的方式就是通过在线的[Remix](https://remix.ethereum.org/)学习，如果运行的代码没问题，那么就可以编译通过，反之就是代码有问题。

Solidity的基础数据类型:`boolean`、`uint`、`int`、`address`、`bytes`。

基础函数：

变量有四种不同的可见域:
- public 任何都可见
- private  本合约可看
- external 外部合约可看
- internal 内部合约+继承本合约可看

pure、view不会消耗gas。

evm有六种存储数据的方式:
- stack
- memory
- storage
- calldata
- code
- logs

calldata合memory的区别是如果最终不想改变变量名，就使用calldata


