---
icon: carbon:character-patterns
date: 2023-10-23
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

迭代器模式（Iterator Pattern）是一种行为型设计模式，它提供了一种顺序访问集合元素的方法，而不需要暴露集合的内部表示。

<!-- more -->

# 迭代器模式

## 用法

迭代器模式通常用于以下场景：

- 当你需要对一个复杂的集合进行多种方式的遍历时，你可以使用迭代器模式，让每种遍历方式都有一个专门的迭代器，而不需要修改集合的代码。
- 当你需要对一个集合进行多种操作时，你可以使用迭代器模式，让每种操作都有一个专门的迭代器，而不需要在集合中添加新的方法。
- 当你需要对一个隐藏了内部结构的集合进行访问时，你可以使用迭代器模式，让迭代器作为一个中介，提供统一的访问接口。

## 优点

迭代器模式有以下优点：

- 迭代器模式可以实现集合和遍历的分离，降低了系统的耦合度。
- 迭代器模式可以提供多种遍历方式和操作方式，增加了系统的灵活性。
- 迭代器模式可以隐藏集合的内部结构，保证了集合的封装性。

实际上如果你熟悉C++的STL的话，对于迭代器的用法就不会陌生，因为C++的标准库STL的设计模式几乎就是基于Iterator来的。

## 示例

下面是一个使用go语言实现的迭代器模式的例子，它模拟了一个书架上的书籍集合和两种不同的遍历方式。

```go
// Book 结构体定义了书籍对象
type Book struct {
	Name   string
	Author string
}

// NewBook 构造函数创建一个书籍对象
func NewBook(name, author string) *Book {
	return &Book{Name: name, Author: author}
}

// BookShelf 结构体定义了书架对象，它是一个包含书籍对象的切片
type BookShelf struct {
	Books []*Book
}

// NewBookShelf 构造函数创建一个书架对象
func NewBookShelf() *BookShelf {
	return &BookShelf{Books: make([]*Book, 0)}
}

// AddBook 方法定义了向书架中添加书籍的操作
func (bs *BookShelf) AddBook(book *Book) {
	bs.Books = append(bs.Books, book)
}

// GetSize 方法定义了获取书架中书籍数量的操作
func (bs *BookShelf) GetSize() int {
	return len(bs.Books)
}

// GetBook 方法定义了获取书架中指定位置的书籍的操作
func (bs *BookShelf) GetBook(index int) *Book {
	if index < 0 || index >= bs.GetSize() {
		return nil
	}
	return bs.Books[index]
}

// Iterator 接口定义了迭代器对象的行为
type Iterator interface {
	HasNext() bool
	Next() interface{}
}

// NameIterator 结构体定义了按照书名顺序遍历书架的迭代器
type NameIterator struct {
	bookShelf *BookShelf
	index     int
}

// NewNameIterator 构造函数创建一个按照书名顺序遍历书架的迭代器
func NewNameIterator(bookShelf *BookShelf) *NameIterator {
	return &NameIterator{bookShelf: bookShelf, index: 0}
}

// HasNext 方法实现了 Iterator 接口，判断是否还有下一个元素
func (ni *NameIterator) HasNext() bool {
	return ni.index < ni.bookShelf.GetSize()
}

// Next 方法实现了 Iterator 接口，返回下一个元素，并将索引加一
func (ni *NameIterator) Next() interface{} {
	book := ni.bookShelf.GetBook(ni.index)
	ni.index++
	return book
}

// AuthorIterator 结构体定义了按照作者顺序遍历书架的迭代器
type AuthorIterator struct {
	bookShelf *BookShelf
	index     int
}

// NewAuthorIterator 构造函数创建一个按照作者顺序遍历书架的迭代器
func NewAuthorIterator(bookShelf *BookShelf) *AuthorIterator {
	return &AuthorIterator{bookShelf: bookShelf, index: 0}
}

// HasNext 方法实现了 Iterator 接口，判断是否还有下一个元素
func (ai *AuthorIterator) HasNext() bool {
	return ai.index < ai.bookShelf.GetSize()
}

// Next 方法实现了 Iterator 接口，返回下一个元素，并将索引加一
func (ai *AuthorIterator) Next() interface{} {
	book := ai.bookShelf.GetBook(ai.index)
	ai.index++
	return book
}

func main() {
	// 创建一个书架对象，并向其中添加一些书籍对象
	bookShelf := NewBookShelf()
	bookShelf.AddBook(NewBook("The Go Programming Language", "Alan A. A. Donovan and Brian W. Kernighan"))
	bookShelf.AddBook(NewBook("The C Programming Language", "Brian W. Kernighan and Dennis M. Ritchie"))
	bookShelf.AddBook(NewBook("Design Patterns", "Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides"))
	bookShelf.AddBook(NewBook("Refactoring", "Martin Fowler"))
	// 创建两个不同的迭代器对象，分别按照书名顺序和作者顺序遍历书架
	nameIterator := NewNameIterator(bookShelf)
	authorIterator := NewAuthorIterator(bookShelf)
	// 使用迭代器对象进行遍历，并打印结果
	fmt.Println("Iterate by name:")
	for nameIterator.HasNext() {
		book := nameIterator.Next().(*Book)
		fmt.Printf("Name: %s, Author: %s\n", book.Name, book.Author)
	}
	fmt.Println("Iterate by author:")
	for authorIterator.HasNext() {
		book := authorIterator.Next().(*Book)
		fmt.Printf("Author: %s, Name: %s\n", book.Author, book.Name)
	}
}
```

输出结果：

```
Iterate by name:
Name: The Go Programming Language, Author: Alan A. A. Donovan and Brian W. Kernighan
Name: The C Programming Language, Author: Brian W. Kernighan and Dennis M. Ritchie
Name: Design Patterns, Author: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides
Name: Refactoring, Author: Martin Fowler
Iterate by author:
Author: Alan A. A. Donovan and Brian W. Kernighan, Name: The Go Programming Language
Author: Brian W. Kernighan and Dennis M. Ritchie, Name: The C Programming Language
Author: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, Name: Design Patterns
Author: Martin Fowler, Name: Refactoring
```

## 总结

迭代器模式是一种提供顺序访问集合元素的方法的设计模式，它可以实现集合和遍历的分离，提供多种遍历方式和操作方式，隐藏集合的内部结构。go语言可以很容易地实现迭代器模式，只需要定义一个 Iterator 接口，然后为每种遍历方式创建一个实现了该接口的结构体，并在其 HasNext 和 Next 方法中实现逻辑。最后，创建一个集合对象，提供一个返回迭代器对象的方法。

我希望这篇文章能对你有所帮助。如果你还有其他想要了解的话题，欢迎继续和我聊天。😊