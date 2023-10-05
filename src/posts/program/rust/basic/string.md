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

一个语言中字符串的地位可以类比英语中==动词==的地位(想想动词有多少种变体就知道了)

<!-- more -->

# Rust 字符串

Rust语言中字符串相当于新手练级中相当大的一个Boss了，因为其内容涵盖很广泛，而且会涉及许多==前置引用==，涉及许多你之后才会了解到的概念，比如生命周期、链式编程...

但是，首先，我们先来一道开胃菜:

```rust
fn main() {
    let my_name = "Pascal";
    greet(my_name);
}

fn greet(name: String) {
    println!("Hello, {}!", name);
}
```
你猜猜这能不能通过编译呢？

当然不可以了-.-

编译器会报错，说明我们需要一个String类型的字符串而不是`&str`类型的字符串：

```rust
greet(my_name);
  |     ----- ^^^^^^^- help: try using a conversion method: `.to_string()`
  |     |     |
  |     |     expected `String`, found `&str`
  |     arguments to this function are incorrect
```
所以这里就遇到了一个典型的前置引用-------啥是切片？？？

## 切片(Slice)

切片在Go语言中非常流行，切片允许你引用集合中部分连续的元素序列，而不用饮用整个集合。

对于字符串而言，切片就是对`String`类型中某一部分的饮用而已，看起来像这样:

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

hello没有引用整个`String s`,而是引用了s的一部分，通过`[0..5]`的方式来指定的。

这就是创建切片的语法，使用`[]`包括序列，和其他语言一样，左闭右开,即`[0..5]`是元素中`0 1 2 3 4`的集合。

![](https://pic1.zhimg.com/80/v2-69da917741b2c610732d8526a9cc86f5_1440w.jpg)

在Rust中使用.. range序列语法时，如果想从0开始，可以用如下方式:

```rust
let s = String::from("hello");

let slice = &s[0..2];
let slice = &s[..2];
```

同样的，如果你的切片想要包含`String`的最后一个字节，就可以这样使用:

```rust
let s = String::from("hello");

let len = s.len();
let slice = &s[4..len];
let slice = &s[4..];
```

你也可以截取完整的 String 切片：

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[0..len];
let slice = &s[..];
```

:::info
在对字符串使用切片语法时需要格外小心，切片的索引必须落在字符之间的边界位置，也就是 UTF-8 字符的边界，例如中文在 UTF-8 中占用三个字节，下面的代码就会崩溃：

```rust
let s = "中国人";
let a = &s[0..2];
println!("{}",a);
```

因为我们只取 s 字符串的前两个字节，但是本例中每个汉字占用三个字节，因此没有落在边界处，也就是连 中 字都取不完整，此时程序会直接崩溃退出，如果改成 &s[0..3]，则可以正常通过编译。 因此，当你需要对字符串做切片索引操作时，需要格外小心这一点。
:::

字符串切片的类型标识是`&str`,因此我们可以这样声明一个函数，输入`String`类型，返回它的切片：`fn first_word(s: &String) -> &str`。

有了切片就可以这样写:

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // error!

    println!("the first word is: {}", word);
}
fn first_word(s: &String) -> &str {
    &s[..1]
}
```
编译器报错如下：

```rust
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
  --> src/main.rs:18:5
   |
16 |     let word = first_word(&s);
   |                           -- immutable borrow occurs here
17 |
18 |     s.clear(); // error!
   |     ^^^^^^^^^ mutable borrow occurs here
19 |
20 |     println!("the first word is: {}", word);
   |                                       ---- immutable borrow later used here

```
借用的规则:当我们已经有了一个可变借用时，无法再拥有一个不可变借用。因为clear需要清空`String`,所以它需要一个可变借用，而之后的`println!`又需要一个不可变借用，所以编译无法通过。

### 其他切片

不仅仅字符串可以有切片，数组等其他类型也有:

```rust
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];
    assert_eq!(slice, &[2, 3]);
```

该数组切片的类型是 &[i32]，数组切片和字符串切片的工作方式是一样的，例如持有一个引用指向原始数组的某个元素和长度。

## 字符串的字面量是切片

之前提到过字符串字面量，但是没有提到它的类型:

```rust
let s = "Helllo,world!";
```

实际上s的类型是&str,因此实际上可以这样声明:

```rust
let s: &str = "Hello,world";
```

该切片指向了程序可执行文件中的某个点，这也是为什么字符串字面量是不可变的，因为 &str 是一个不可变引用。

了解完切片，可以进入本节的正题了。

## 什么是字符串？

顾名思义，字符串是由字符组成的连续集合，但是在上一节中我们提到过，Rust 中的字符是 Unicode 类型，因此每个字符占据 4 个字节内存空间，但是在字符串中不一样，字符串是 UTF-8 编码，也就是字符串中的字符所占的字节数是变化的(1 - 4)，这样有助于大幅降低字符串所占用的内存空间。

Rust 在语言级别，只有一种字符串类型： str，它通常是以引用类型出现 &str，也就是上文提到的字符串切片。虽然语言级别只有上述的 str 类型，但是在标准库里，还有多种不同用途的字符串类型，其中使用最广的即是 String 类型。

str 类型是硬编码进可执行文件，也无法被修改，但是 String 则是一个可增长、可改变且具有所有权的 UTF-8 编码字符串，当 Rust 用户提到字符串时，往往指的就是 String 类型和 &str 字符串切片类型，这两个类型都是 UTF-8 编码。

除了 String 类型的字符串，Rust 的标准库还提供了其他类型的字符串，例如 OsString， OsStr， CsString 和 CsStr 等，注意到这些名字都以 String 或者 Str 结尾了吗？它们分别对应的是具有所有权和被借用的变量。

## String与&str的转换

在之前的代码中，已经见到好几种从 &str 类型生成 String 类型的操作：

String::from("hello,world")
"hello,world".to_string()
那么如何将 String 类型转为 &str 类型呢？答案很简单，取引用即可：

fn main() {
    let s = String::from("hello,world!");
    say_hello(&s);
    say_hello(&s[..]);
    say_hello(s.as_str());
}

fn say_hello(s: &str) {
    println!("{}",s);
}
实际上这种灵活用法是因为 deref 隐式强制转换。

## 字符串索引

在其它语言中，使用索引的方式访问字符串的某个字符或者子串是很正常的行为，但是在 Rust 中就会报错：

```rust
   let s1 = String::from("hello");
   let h = s1[0];
```

该代码会产生如下错误：

```rust
3 |     let h = s1[0];
  |             ^^^^^ `String` cannot be indexed by `{integer}`
  |
  = help: the trait `Index<{integer}>` is not implemented for `String`
```

深入字符串内部
字符串的底层的数据存储格式实际上是[ u8 ]，一个字节数组。对于 let hello = String::from("Hola"); 这行代码来说，Hola 的长度是 4 个字节，因为 "Hola" 中的每个字母在 UTF-8 编码中仅占用 1 个字节，但是对于下面的代码呢？

```rust
let hello = String::from("中国人");
```

如果问你该字符串多长，你可能会说 3，但是实际上是 9 个字节的长度，因为大部分常用汉字在 UTF-8 中的长度是 3 个字节，因此这种情况下对 hello 进行索引，访问 &hello[0] 没有任何意义，因为你取不到 中 这个字符，而是取到了这个字符三个字节中的第一个字节，这是一个非常奇怪而且难以理解的返回值。

### 字符串的不同表现形式

现在看一下用梵文写的字符串 “नमस्ते”, 它底层的字节数组如下形式：

[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164,
224, 165, 135]
长度是 18 个字节，这也是计算机最终存储该字符串的形式。如果从字符的形式去看，则是：

['न', 'म', 'स', '्', 'त', 'े']
但是这种形式下，第四和六两个字母根本就不存在，没有任何意义，接着再从字母串的形式去看：

["न", "म", "स्", "ते"]
所以，可以看出来 Rust 提供了不同的字符串展现方式，这样程序可以挑选自己想要的方式去使用，而无需去管字符串从人类语言角度看长什么样。

还有一个原因导致了 Rust 不允许去索引字符串：因为索引操作，我们总是期望它的性能表现是 O(1)，然而对于 String 类型来说，无法保证这一点，因为 Rust 可能需要从 0 开始去遍历字符串来定位合法的字符。

## 字符串切片

前文提到过，字符串切片是非常危险的操作，因为切片的索引是通过字节来进行，但是字符串又是 UTF-8 编码，因此你无法保证索引的字节刚好落在字符的边界上，例如:

```rust
let hello = "中国人";
let s = &hello[0..2];
```

运行上面的程序，会直接造成崩溃：

```rust
thread 'main' panicked at 'byte index 2 is not a char boundary; it is inside '中' (bytes 0..3) of `中国人`', src/main.rs:4:14
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

这里提示的很清楚，我们索引的字节落在了 中 字符的内部，这种返回没有任何意义。

因此在通过索引区间来访问字符串时，需要格外的小心，一不注意，就会导致你程序的崩溃！

## 操作字符串

由于String是可变的字符串，所以介绍一下对Rust字符串的修改、添加、删除等方法：

### Push(追加)

在字符串尾部可以使用`push()`方法追加字符`char`,也可以使用`push_str()`方法追加字符串字面量。这两个方法都是在原有的字符串追加的，并不会返回新的字符串。由于字符串追加操作要==修改原来的字符串==，则该字符串必须是可变的，即字符串变量必须由 mut 关键字修饰。

```rust
fn main() {
    let mut s = String::from("Hello ");

    s.push_str("rust");

    println!("追加字符串 push_str() -> {}", s);

    s.push('!');
    println!("追加字符 push() -> {}", s);
}
```

代码运行结果:

```rust
追加字符串 push_str() -> Hello rust
追加字符 push() -> Hello rust!
```

### Insert(插入)

可以使用`insert()`方法插入单个字符`char`,也可以使用`insert_str()`方法插入字符串字面量，与`push`方法不同，这俩方法需要两个参数`(1.插入的索引、2.插入的字符（串))`，索引从0开始计数，如果发生越界则会发生错误。由于字符串插入操作需要修改原来的字符串，所以字符串也必须是`mut`。

```rust
fn main() {
    let mut s = String::from("Hello rust");

    s.insert(5, ',');
    println!("插入字符 insert() -> {}", s);
    s.insert_str(6, "I like");
    println!("插入字符串 insert_str() -> {}", s);
}
```

结果:

```rust
插入字符 insert() -> Hello, rust
插入字符串 insert_str() -> Hello,I like rust
```

### Replace(替换)

如果想要把字符串中的某个字符串替换成其他字符串，那可以使用`replace()`方法。与替换有关的方法有三个:

1. replace

`replace`方法可用于`String`和`&str`类型。`replace()`方法接受两个参数，第一个参数是要被替换的字符串，第二个参数是新的字符串。该方法会替换所有匹配到的字符串。==该方法会返回一个新的字符串==，不是操作原来的字符串。

```rust
    let string_replace = String::from("I like rust. Learning rust is my favorite!");
    let new_string_replace = string_replace.replace("rust", "RUST");
    dbg!(new_string_replace);
```

结果:

```rust
new_string_replace = "I like RUST. Learning RUST is my favorite!"
```

2. replacen

`replacen`方法接受三个参数，前两个和`replace`一样，第三个参数则表示替换的个数，该方法仍然是==返回新的字符串，而不是操作原来的字符串==。

```rust
    let string_replace = "I like rust. Learning rust is my favorite!";
    let new_string_replacen = string_replace.replacen("rust", "RUST", 1);
    dbg!(new_string_replacen);
```

结果：

```rust
new_string_replacen = "I like RUST. Learning rust is my favorite!"
```

3. replace_range

该方法仅适用于`String`类型，接受两个参数，第一个是替换的字符串的范围，第二个是新的字符串，该方法是直接操作原有的字符串，不会返回新的字符串，需要用`mut`关键字修饰。

```rust
    let mut string_replace_range = String::from("I like rust!");
    string_replace_range.replace_range(7..8, "R");
    dbg!(string_replace_range);
```

结果:

```rust
string_replace_range = "I like Rust!"
```

### Delete(删除)

与字符串删除相关的方法有4个，分别是`pop`、`remove`、`truncate`、`clear`,这四个方法仅适用于`String`类型。

1. `pop` -- 删除并返回字符串中最后一个字符

该方法直接操作原有字符串。但返回值是一个`Option`类型，如果字符串为空，则返回`None`：

```rust
fn main() {
    let mut string_pop = String::from("rust pop 中文!");
    let p1 = string_pop.pop();
    let p2 = string_pop.pop();
    dbg!(p1);
    dbg!(p2);
    dbg!(string_pop);
}
```

结果：

```rust
p1 = Some(
   '!',
)
p2 = Some(
   '文',
)
string_pop = "rust pop 中"
```
2. `remove` --- 删除并返回字符串中指定位置的字符

该方法是直接操作原来的字符串。但是存在返回值，其返回值是删除位置的字符串，只接受一个参数，表示该字符起始的索引位置。remove() 方法是按照字节来处理字符串的，如果参数所给的位置不是合法的字符边界，则会发生错误。

```rust
fn main() {
    let mut string_remove = String::from("测试remove方法");
    println!(
        "string_remove 占 {} 个字节",
        std::mem::size_of_val(string_remove.as_str())
    );
    // 删除第一个汉字
    string_remove.remove(0);
    // 下面代码会发生错误
    // string_remove.remove(1);
    // 直接删除第二个汉字
    // string_remove.remove(3);
    dbg!(string_remove);
}
```

结果

```rust
string_remove 占 18 个字节
string_remove = "试remove方法"
```

3. truncate —— 删除字符串中从指定位置开始到结尾的全部字符

该方法是直接操作原来的字符串。无返回值。该方法 truncate() 方法是按照字节来处理字符串的，如果参数所给的位置不是合法的字符边界，则会发生错误。

```rust
fn main() {
    let mut string_truncate = String::from("测试truncate");
    string_truncate.truncate(3);
    dbg!(string_truncate);
}
```

结果：

```rust
string_truncate = "测"
```

4、clear —— 清空字符串

该方法是直接操作原来的字符串。调用后，删除字符串中的所有字符，相当于 truncate() 方法参数为 0 的时候。

示例代码如下：

```rust
fn main() {
    let mut string_clear = String::from("string clear");
    string_clear.clear();
    dbg!(string_clear);
}
```
代码运行结果：

```rust
string_clear = ""
```

### Concatenate(连接)

1、使用 + 或者 += 连接字符串

使用 + 或者 += 连接字符串，要求右边的参数必须为字符串的切片引用（Slice）类型。其实当调用 + 的操作符时，相当于调用了 std::string 标准库中的 add() 方法，这里 add() 方法的第二个参数是一个引用的类型。因此我们在使用 +， 必须传递切片引用类型。不能直接传递 String 类型。+ 是返回一个新的字符串，所以变量声明可以不需要 mut 关键字修饰。

```rust
fn main() {
    let string_append = String::from("hello ");
    let string_rust = String::from("rust");
    // &string_rust会自动解引用为&str
    let result = string_append + &string_rust;
    let mut result = result + "!"; // `result + "!"` 中的 `result` 是不可变的
    result += "!!!";

    println!("连接字符串 + -> {}", result);
}
```
代码运行结果：

```rust
连接字符串 + -> hello rust!!!!
```

add() 方法的定义：

```rust
fn add(self, s: &str) -> String
```
因为该方法涉及到更复杂的特征功能，因此我们这里简单说明下：

```rust
fn main() {
    let s1 = String::from("hello,");
    let s2 = String::from("world!");
    // 在下句中，s1的所有权被转移走了，因此后面不能再使用s1
    let s3 = s1 + &s2;
    assert_eq!(s3,"hello,world!");
    // 下面的语句如果去掉注释，就会报错
    // println!("{}",s1);
}
```

self 是 String 类型的字符串 s1，该函数说明，只能将 &str 类型的字符串切片添加到 String 类型的 s1 上，然后返回一个新的 String 类型，所以 let s3 = s1 + &s2; 就很好解释了，将 String 类型的 s1 与 &str 类型的 s2 进行相加，最终得到 String 类型的 s3。

由此可推，以下代码也是合法的：

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

// String = String + &str + &str + &str + &str
let s = s1 + "-" + &s2 + "-" + &s3;
```

### 使用 format! 连接字符串

format! 这种方式适用于 String 和 &str 。format! 的用法与 print! 的用法类似。

示例代码如下：

```rust
fn main() {
    let s1 = "hello";
    let s2 = String::from("rust");
    let s = format!("{} {}!", s1, s2);
    println!("{}", s);
}
```

代码运行结果：

```rust
hello rust!
```

## 字符串转义

我们可以通过转义的方式 \ 输出 ASCII 和 Unicode 字符。

```rust
fn main() {
    // 通过 \ + 字符的十六进制表示，转义输出一个字符
    let byte_escape = "I'm writing \x52\x75\x73\x74!";
    println!("What are you doing\x3F (\\x3F means ?) {}", byte_escape);

    // \u 可以输出一个 unicode 字符
    let unicode_codepoint = "\u{211D}";
    let character_name = "\"DOUBLE-STRUCK CAPITAL R\"";

    println!(
        "Unicode character {} (U+211D) is called {}",
        unicode_codepoint, character_name
    );

    // 换行了也会保持之前的字符串格式
    // 使用\忽略换行符
    let long_string = "String literals
                        can span multiple lines.
                        The linebreak and indentation here ->\
                        <- can be escaped too!";
    println!("{}", long_string);
}
```

当然，在某些情况下，可能你会希望保持字符串的原样，不要转义：

```rust
fn main() {
    println!("{}", "hello \\x52\\x75\\x73\\x74");
    let raw_str = r"Escapes don't work here: \x3F \u{211D}";
    println!("{}", raw_str);

    // 如果字符串包含双引号，可以在开头和结尾加 #
    let quotes = r#"And then I said: "There is no escape!""#;
    println!("{}", quotes);

    // 如果还是有歧义，可以继续增加，没有限制
    let longer_delimiter = r###"A string with "# in it. And even "##!"###;
    println!("{}", longer_delimiter);
}
```

## 操作 UTF-8 字符串

前文提到了几种使用 UTF-8 字符串的方式，下面来一一说明。

### 字符

如果你想要以 Unicode 字符的方式遍历字符串，最好的办法是使用 chars 方法，例如：

```rust
for c in "中国人".chars() {
    println!("{}", c);
}
```

输出如下

```rust
中
国
人
```

### 字节

这种方式是返回字符串的底层字节数组表现形式：

```rust
for b in "中国人".bytes() {
    println!("{}", b);
}
```

输出如下：

```rust
228
184
173
229
155
189
228
186
186
```

### 获取子串

想要准确的从 UTF-8 字符串中获取子串是较为复杂的事情，例如想要从 holla中国人नमस्ते 这种变长的字符串中取出某一个子串，使用标准库你是做不到的。 你需要在 crates.io 上搜索 utf8 来寻找想要的功能。

可以考虑尝试下这个库：utf8_slice。

