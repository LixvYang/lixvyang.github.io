---
icon: logos:rust
date: 2023-09-03
isOriginal: true
headerDepth: 4
category:
  - rust
tag:
  - rust
---

声明一个全局变量在其他语言中看起来非常简单，但是在Rust中，由于生命周期特性，让这个本应该特别简单的概念使用起来无比复杂...

<!-- more -->

# Rust 全局变量

:::info
当我们说一个变量是全局变量的时候，这意味着这是一个变量，并且作用域是全局，整个代码库都可以识别到。
:::

在某些场景下，我们需要一些全局变量来简化代码的设计，比如可以有一个静态的变量最大值、存储不断变大的ID等等。

首先我们可以确定的是：全局变量的生命周期一定是`'static`,但是不代表它需要用`static`来声明，例如常量、字符串字面值就不需要`static`显式声明，原因是它们在编译时就直接进入二进制可执行文件中了。

由此我们可以分类一下，有编译期就初始化的全局变量，也有运行时才初始化的全局变量...

## 编译期初始化

我们大多数使用的全局变量都只需在编译时期初始化就可以了,比如
1. 针对某一类变量的最大值(比如Linux系统下最长文件名是255字节)
2. 任务状态值(创建、运行、失败、重试等...)
3. ...

### 静态常量

全局常量可以在程序的任意部分使用，在其他模块中定义，则加上包名即可:

```rust
const MAX_ID: usize = usize::MAX/3;
fn main() {
    println!("最大ID: {}", MAX_ID);
}
```

常量和普通变量的区别:

- 关键字是const,不是let
- 常量的类型不可以省略
- 定义常量的命名规则类似C语言，规范是全部使用大写
- 常量可以在任意作用域中使用，其生命周期可能会贯穿整个程序的生命周期，所以编译器可能会在别的地方使用常量时，直接将其==内联(直接将常量字段赋值)==到代码中
- 常量的赋值不可以用变量(使用当前时间)
- 常量不允许重复定义

### 静态变量

静态变量允许声明一个全局的变量，用于全局数据的统计，例如用一个变量统计当前的请求次数等:

```rust
static mut REQUEST_RECV: unsize = 0;
fn main() {
  unsafe {
    REQUEST_RECV += 1;
    assert_eq!(REQUEST_RECV, 1);
  }
}
```

Rust要求必须使用`unsafe`的语法块才能访问和修改`static`变量，因为这种使用方式不安全。

和常量相同，定义静态变量时，必须赋值为编译器就可以计算出的值(常量表达式/数学表达式)，不能时运行时才能计算出的值(当前时间)

==静态变量和常量的区别==
- 静态变量不会被内联，在程序中静态变量只有一个实例，所有引用都会指向同一个地址
- 存储在静态变量中的值必须实现Sync trait

### 原子类型

上面的静态变量其实不具备线程安全性

但是原子类型可以

```rust
use std::sync::atomic::{AtomicUsize, Ordering};
static REQUEST_RECV: AtomicUsize = AtomicUsize::new(0);

fn main() {
    for _ in 0..100 {
        REQUEST_RECV.fetch_add(1, Ordering::Relaxed);
    }
    println!("current request recv: {}", REQUEST_RECV.load(Ordering::Relaxed));
}
```

实现一个简单的全局ID:

```rust
use std::sync::atomic::{Ordering, AtomicUsize};

struct Factory{
    factory_id: usize,
}

static GLOBAL_ID_COUNTER: AtomicUsize = AtomicUsize::new(0);
const MAX_ID: usize = usize::MAX / 2;

fn generate_id()->usize{
    // 检查两次溢出，否则直接加一可能导致溢出
    let current_val = GLOBAL_ID_COUNTER.load(Ordering::Relaxed);
    if current_val > MAX_ID{
        panic!("Factory ids overflowed");
    }
    let next_id = GLOBAL_ID_COUNTER.fetch_add(1, Ordering::Relaxed);
    if next_id > MAX_ID{
        panic!("Factory ids overflowed");
    }
    next_id
}

impl Factory{
    fn new()->Self{
        Self{
            factory_id: generate_id()
        }
    }
}
```

## 运行期初始化

以上的静态初始化有一个致命问题:无法使用函数进行静态初始化，例如你想声明一个全局的`Mutex`锁：

```rust
use std::sync::Mutex;
static NAMES: Mutex<String> = Mutex::new(String::from("Rust"));

fn main() {
    let v = NAMES.lock().unwrap();
    println!("{}", v);    
}
```

运行后报错:

```
calls in statics are limited to constant functions, tuple structs and tuple variants
  = note: consider wrapping this expression in `Lazy::new(|| ...)` from the `once_cell` crate: https://crates.io/crates/once_cell
```
但是又必须声明时就对NAMES进行初始化，此时我们就可以用`lazy_static`包来解决这个问题。

### lazy_static

`lazy_static`时社区提供的用于懒加载静态变量的宏，一句话：可以让我们在运行期再初始化静态变量。

```rust
use std::sync::Mutex;
use lazy_static::lazy_static;
lazy_static! {
    static ref NAMES: Mutex<String> = Mutex::new(String::from("Rust"));
}

fn main() {
    let mut v = NAMES.lock().unwrap();
    v.push_str(", Myth");
    println!("{}", v);    
}
```

当然使用`lazy_static`访问静态变量时，会有一定的性能损失，因为其内部实现了一个底层的`sync::Once`,每次访问变量时，都执行一次原子指令确认静态变量的初始化是否完成。

`lazy_static`宏，匹配的是`static ref`,所以定义的静态变量都是不可变的引用。

```rust
use lazy_static::lazy_static;
use std::collections::HashMap;

lazy_static! {
    static ref HASHMAP: HashMap<u32, &'static str> = {
        let mut m = HashMap::new();
        m.insert(0, "foo");
        m.insert(1, "bar");
        m.insert(2, "baz");
        m
    };
}

fn main() {
    // 首次访问`HASHMAP`的同时对其进行初始化
    println!("The entry for `0` is \"{}\".", HASHMAP.get(&0).unwrap());

    // 后续的访问仅仅获取值，再不会进行任何初始化操作
    println!("The entry for `1` is \"{}\".", HASHMAP.get(&1).unwrap());
}
```
`lazy_static`直到运行到main中的第一行代码时，才进行懒加载。

### Box::leak

Box::leak可以用于全局变量，可以用于在运行期初始化，将变量改变为全局静态分配。

比如上面的例子，我们可以通过`Box::leak`将局部变量分配道堆上，来将其==全局化==。

我们先来看一个不使用懒加载，也不使用Box::leak的例子:

```rust
#[derive(Debug)]
struct Config {
    a: String,
    b: String,
}
static mut CONFIG: Option<&mut Config> = None;

fn main() {
    unsafe {
        CONFIG = Some(&mut Config {
            a: "A".to_string(),
            b: "B".to_string(),
        });

        println!("{:?}", CONFIG)
    }
}
```

以上的代码我们声明了一个全局动态配置的CONFIG，并且其值初始化为`None`,然后在程序运行后，给这个全局静态变量赋值，结果当然是报错了，怎么可以将一个局部变量赋值给全局变量....

所以贴心的Rust给我们提供了`Box::leak`方法，主动将一个变量从内存中泄漏到堆上，然后将其生命周期改变为`'static`...

```rust
#[derive(Debug)]
struct Config {
    a: String,
    b: String
}
static mut CONFIG: Option<&mut Config> = None;

fn main() {
    let c = Box::new(Config {
        a: "A".to_string(),
        b: "B".to_string(),
    });

    unsafe {
        // 将`c`从内存中泄漏，变成`'static`生命周期
        CONFIG = Some(Box::leak(c));
        println!("{:?}", CONFIG);
    }
}
```

### 从函数中返回全局变量？

问题又来了，如果我们需要在运行期，从一个函数返回一个全局变量该如何做？例如：

```rust
#[derive(Debug)]
struct Config {
    a: String,
    b: String,
}
static mut CONFIG: Option<&mut Config> = None;

fn init() -> Option<&'static mut Config> {
    Some(&mut Config {
        a: "A".to_string(),
        b: "B".to_string(),
    })
}


fn main() {
    unsafe {
        CONFIG = init();

        println!("{:?}", CONFIG)
    }
}
```
报错跟之前大同小异，还是生命周期引起的，依然可以用Box::leak来解决:

```rust
#[derive(Debug)]
struct Config {
    a: String,
    b: String,
}
static mut CONFIG: Option<&mut Config> = None;

fn init() -> Option<&'static mut Config> {
    let c = Box::new(Config {
        a: "A".to_string(),
        b: "B".to_string(),
    });

    Some(Box::leak(c))
}


fn main() {
    unsafe {
        CONFIG = init();

        println!("{:?}", CONFIG)
    }
}
```

## 标准库中的 OnceCell

在 Rust 标准库中提供 lazy::OnceCell 和 lazy::SyncOnceCell 两种 Cell，前者用于单线程，后者用于多线程，它们用来存储堆上的信息，并且具有最多只能赋值一次的特性。 如实现一个多线程的日志组件 Logger:
```rust
#![feature(once_cell)]

use std::{lazy::SyncOnceCell, thread};

fn main() {
    // 子线程中调用
    let handle = thread::spawn(|| {
        let logger = Logger::global();
        logger.log("thread message".to_string());
    });

    // 主线程调用
    let logger = Logger::global();
    logger.log("some message".to_string());

    let logger2 = Logger::global();
    logger2.log("other message".to_string());

    handle.join().unwrap();
}

#[derive(Debug)]
struct Logger;

static LOGGER: SyncOnceCell<Logger> = SyncOnceCell::new();

impl Logger {
    fn global() -> &'static Logger {
        // 获取或初始化 Logger
        LOGGER.get_or_init(|| {
            println!("Logger is being created..."); // 初始化打印
            Logger
        })
    }

    fn log(&self, message: String) {
        println!("{}", message)
    }
}
```
以上代码我们声明了一个 global() 关联函数，并在其内部调用 get_or_init 进行初始化 Logger，之后在不同线程上多次调用 Logger::global() 获取其实例：
```
Logger is being created...
some message
other message
thread message
```
可以看到，Logger is being created... 在多个线程中使用也只被打印了一次。

## 总结

Rust有很多方式创建一个全局变量，由于Rust的语言特性，导致声明全局变量的时候某些地方会有些坑，更多的需要我们在实战中不断积累。

[参考]
1. https://course.rs/advance/global-variable.html