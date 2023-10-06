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

每一门语言的错误处理都很重要，重要到可能成为被喷的点比如 Go 的 `if err != nil `，比起 Go， Rust的错误处理可谓是集百家之长。

<!-- more -->

# Rust错误处理

任何语言的错误处理基本可以分为两大部分:

- 可恢复的(recoverable)
- 不可恢复的(unrecoverable)

对于前者而言，我们可能只需要打印日志提醒用户——此处代码发生了错误而已。
可对于后者，这种错误很可能就是程序崩溃(BUG)的前兆,比如项目初始化失败、找不到配置文件、访问数组索引越界等等，我们要对这类错误立即处理。

大多数语言对于这两者的处理是很模糊的，并经常采用统一的异常来处理。

比如Go语言的错误处理一般就是:

```go
if err != nil {
    log.Error().("Error",err).Msg("")
    return err
}
```

而Rust没有异常，相反，它有`Result<T, E>`类型来处理可恢复的错误；使用`panic!`宏来处理程序遇到的不可恢复的错误。

我们先讲解`panic!`这类处理不可恢复的错误，因为比较简单:stuck_out_tongue_winking_eye:

下面的示例借鉴(Copy)Rust Book，没办法...写的示例确实好:+1:

## `panic!`处理不可恢复的错误:scream:

panic顾名思义就是直译就是恐慌的意思，会让程序直接退出。

有两种情况会导致panic，一种是程序异常(比如访问数组索引越界)，另一种是自己手动`panic`。

```rust
fn main() {
    panic!("main panic!!!");
}
```

这段程序会直接输出:
```
$ cargo run
   Compiling panic v0.1.0 (file:///projects/panic)
    Finished dev [unoptimized + debuginfo] target(s) in 0.25s
     Running `target/debug/panic`
thread 'main' panicked at 'main panic!!!', src/main.rs:2:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

最后两行是`panic`调用的错误信息，第一行显示了 panic 提供的信息并指明了源码中 panic 出现的位置：src/main.rs:2:5 表明这是 src/main.rs 文件的第二行第五个字符。也就是我们手动`panic!("main panic!!!");`的这一行代码。

我们还可以通过panic后的backtrace追踪出错信息。

使用 panic! 的 backtrace

让我们来看看另一个因为我们代码中的 bug 引起的别的库中 panic! 的例子，而不是直接的宏调用。

```rust
fn main() {
    let v = vec![1, 2, 3];

    v[99];
}
```

这里尝试访问 vector 的第一百个元素（这里的索引是 99 因为索引从 0 开始），不过它只有三个元素。这种情况下 Rust 会 panic。[] 应当返回一个元素，不过如果传递了一个无效索引，就没有可供 Rust 返回的正确的元素。

:::info
在C语言中，这样的尝试是未知的(不会直接报错)，所以会有潜在的安全漏洞。
:::

为了保护程序远离这类漏洞，如果尝试读取一个索引不存在的元素，Rust 程序会crash:

```rust
cargo run

   Compiling panic v0.1.0 (file:///projects/panic)
    Finished dev [unoptimized + debuginfo] target(s) in 0.27s
     Running `target/debug/panic`
thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', src/main.rs:4:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

错误指向 main.rs 的第 4 行，这里我们尝试访问索引 99。

下面的说明（note）行提醒我们可以设置 RUST_BACKTRACE 环境变量来得到一个 backtrace。

backtrace 是一个执行到目前位置所有被调用的函数的列表。Rust 的 backtrace 跟其他语言中的一样：阅读 backtrace 的关键是从头开始读直到发现你编写的文件。

这就是问题的发源地。这一行往上是你的代码所调用的代码；往下则是调用你的代码的代码。这些行可能包含核心 Rust 代码，标准库代码或用到的 crate 代码。让我们将 RUST_BACKTRACE 环境变量设置为任何不是 0 的值来获取 backtrace 看看。示例展示了与你看到类似的输出：

```rust
RUST_BACKTRACE=1 cargo run

    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/ownership`
thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', src/main.rs:4:5
stack backtrace:
   0: rust_begin_unwind
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/std/src/panicking.rs:593:5
   1: core::panicking::panic_fmt
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/panicking.rs:67:14
   2: core::panicking::panic_bounds_check
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/panicking.rs:162:5
   3: <usize as core::slice::index::SliceIndex<[T]>>::index
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/slice/index.rs:258:10
   4: core::slice::index::<impl core::ops::index::Index<I> for [T]>::index
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/slice/index.rs:18:9
   5: <alloc::vec::Vec<T,A> as core::ops::index::Index<I>>::index
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/alloc/src/vec/mod.rs:2690:9
   6: ownership::main
             at ./src/main.rs:4:5
   7: core::ops::function::FnOnce::call_once
             at /rustc/eb26296b556cef10fb713a38f3d16b9886080f26/library/core/src/ops/function.rs:250:5
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
```

你实际看到的输出可能因不同的操作系统和 Rust 版本而有所不同。

我们的

```rust
6: ownership::main
             at ./src/main.rs:4:5
```

可以看到具体出现问题的行数，其他的可能是rust标准库、crate的代码。

## `Result<T, E>`处理可恢复的错误 :confused:

大部分错误其实没有严重到需要程序立即退出。比如一个函数可以打开某个文件夹里的文件，但此时这个文件不存在，那么就需要返回错误让调用方先创建这个文件再次执行。而不是让整个进程中止。

我们先来回忆一下`Result`的枚举类型是什么:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

T 和 E 是泛型类型参数。具体来说Result是一个盲盒，如果结果没问题，那就是返回`T`类型的OK(T),如果结果有错误那就返回`E`类型的Err(E),二选一。

让我们调用一个返回 Result 的函数，因为它打开一个文件，并且可能会失败：

```rust
// src/main.rs

use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");
}
```

`File::open`返回的是`Result<T, E>`.如果调用成功，则泛型参数 T 会被 File::open 的实现放入成功返回值的类型 std::fs::File，这是一个文件句柄。

错误返回值使用的 E 的类型是 std::io::Error。这些返回类型意味着 File::open 调用可能成功并返回一个可以读写的文件句柄。

这个函数调用也可能会失败：例如，也许文件不存在，或者可能没有权限访问这个文件。File::open 函数需要一个方法在告诉我们成功与否的同时返回文件句柄或者错误信息。这些信息正好是 Result 枚举所代表的。

当 File::open 成功时，greeting_file_result 变量将会是一个包含文件句柄的 Ok 实例。当失败时，greeting_file_result 变量将会是一个包含了更多关于发生了何种错误的信息的 Err 实例。

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };
}
```

注意与 Option 枚举一样，Result 枚举和其成员也被导入到了 prelude 中，所以就不需要在 match 分支中的 Ok 和 Err 之前指定 Result::。

这里我们告诉 Rust 当结果是 Ok 时，返回 Ok 成员中的 file 值，然后将这个文件句柄赋值给变量 greeting_file。match 之后，我们可以利用这个文件句柄来进行读写。

match 的另一个分支处理从 File::open 得到 Err 值的情况。在这种情况下，我们选择调用 panic! 宏。如果当前目录没有一个叫做 hello.txt 的文件，当运行这段代码时会看到如下来自 panic! 宏的输出：

```rust
$ cargo run
   Compiling error-handling v0.1.0 (file:///projects/error-handling)
    Finished dev [unoptimized + debuginfo] target(s) in 0.73s
     Running `target/debug/error-handling`
thread 'main' panicked at 'Problem opening the file: Os { code: 2, kind: NotFound, message: "No such file or directory" }', src/main.rs:8:23
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

实际上我们还可以对错误信息进行处理。

不管 File::open 是因为什么原因失败都会 panic!。

我们真正希望的是对不同的错误原因采取不同的行为：如果 File::open 因为文件不存在而失败，我们希望创建这个文件并返回新文件的句柄。如果 File::open 因为任何其他原因失败，例如没有打开文件的权限，我们仍然希望 panic!。让我们看看下面的代码示例，其中 match 增加了另一个分支：

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    };
}
```

是的...我们还可以通过匹配error的类型进一步match。。。

### 不处理Result

如果针对这类`Result`不想处理，如果返回错误值接`panic`，那我们就可以用`unwrap`和`expect`。

match 能够胜任它的工作，不过它可能有点冗长并且不总是能很好的表明其意图。`Result<T, E>` 类型定义了很多辅助方法来处理各种情况。其中之一叫做 `unwrap`，它的实现就类似于 match 语句。如果 Result 值是成员 Ok，unwrap 会返回 Ok 中的值。如果 Result 是成员 Err，unwrap 会为我们调用 panic!。这里是一个实践 unwrap 的例子：

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}
```

如果调用这段代码时不存在 hello.txt 文件，我们将会看到一个 unwrap 调用 panic! 时提供的错误信息：

真男人的代码特别稳定，要么一直运行，要么直接panic...

```rust
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: Os {
code: 2, kind: NotFound, message: "No such file or directory" }',
src/main.rs:4:49
```

expect 与 unwrap 的使用方式一样，不同之处是可以添加错误信息:

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}
```

```rust
thread 'main' panicked at 'hello.txt should be included in this project: Error
{ repr: Os { code: 2, message: "No such file or directory" } }',
src/libcore/result.rs:906:4
```

### 传播错误

当编写一个其实先会调用一些可能会失败的操作的函数时，除了在这个函数中处理错误外，还可以选择让调用者知道这个错误并决定该如何处理。这被称为 传播（propagating）错误，这样能更好的控制代码调用，因为比起你代码所拥有的上下文，调用者可能拥有更多信息或逻辑来决定应该如何处理错误。

展示了一个从文件中读取用户名的函数。如果文件不存在或不能读取，这个函数会将这些错误返回给调用它的代码：

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

这个函数可以编写成更加简短的形式，不过我们以大量手动处理开始以便探索错误处理；在最后我们会展示更短的形式。让我们看看函数的返回值：Result<String, io::Error>。这意味着函数返回一个 Result<T, E> 类型的值，其中泛型参数 T 的具体类型是 String，而 E 的具体类型是 io::Error。

如果这个函数没有出任何错误成功返回，函数的调用者会收到一个包含 String 的 Ok 值 —— 函数从文件中读取到的用户名。如果函数遇到任何错误，函数的调用者会收到一个 Err 值，它储存了一个包含更多这个问题相关信息的 io::Error 实例。这里选择 io::Error 作为函数的返回值是因为它正好是函数体中那两个可能会失败的操作的错误返回值：File::open 函数和 read_to_string 方法。

函数体以调用 File::open 函数开始。接着使用 match 处理返回值 Result如果 File::open 成功了，模式变量 file 中的文件句柄就变成了可变变量 username_file 中的值，接着函数继续执行。在 Err 的情况下，我们没有调用 panic!，而是使用 return 关键字提前结束整个函数，并将来自 File::open 的错误值（现在在模式变量 e 中）作为函数的错误值传回给调用者。

所以如果 username_file 中有了一个文件句柄，该数接着在变量 username 中创建了一个新 String 并调用文件句柄 username_file 的 read_to_string 方法来将文件的内容读取到 username 中。read_to_string 方法也会返回一个 Result，因为它可能会失败，哪怕是 File::open 已经成功了。所以我们需要另一个 match 来处理这个 Result：如果 read_to_string 成功了，那么这个函数就成功了，并返回文件中的用户名，它现在位于被封装进 Ok 的 username 中。如果read_to_string 失败了，则像之前处理 File::open 的返回值的 match 那样返回错误值。不过并不需要显式地调用 return，因为这是函数的最后一个表达式。

调用这个函数的代码最终会得到一个包含用户名的 Ok 值，或者一个包含 io::Error 的 Err 值。我们无从得知调用者会如何处理这些值。例如，如果他们得到了一个 Err 值，他们可能会选择 panic! 并使程序崩溃、使用一个默认的用户名或者从文件之外的地方寻找用户名。我们没有足够的信息知晓调用者具体会如何尝试，所以将所有的成功或失败信息向上传播，让他们选择合适的处理方法。

这种传播错误的模式在 Rust 是如此的常见，以至于 Rust 提供了 ? 问号运算符来使其更易于处理。

### 传播错误的简写：? 运算符

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

简单吧，它实现了和上面代码相同的功能。

? 运算符消除了大量样板代码并使得函数的实现更简单。我们甚至可以在 ? 之后直接使用链式方法调用来进一步缩短代码。

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
```

下面展示了一个使用 fs::read_to_string 的更为简短的写法：

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

将文件读取到一个字符串是相当常见的操作，所以 Rust 提供了名为 fs::read_to_string 的函数，它会打开文件、新建一个 String、读取文件的内容，并将内容放入 String，接着返回它。当然，这样做就没有展示所有这些错误处理的机会了，所以我们最初就选择了艰苦的道路。

Option也可以用?操作符号。

? 运算符只能被用于返回值与 ? 作用的值相兼容的函数。因为 ? 运算符被定义为从函数中提早返回一个值，这与 match 表达式有着完全相同的工作方式。match 作用于一个 Result 值，提早返回的分支返回了一个 Err(e) 值。函数的返回值必须是 Result 才能与这个 return 相兼容。

