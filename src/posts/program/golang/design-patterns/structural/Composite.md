---
icon: carbon:character-patterns
date: 2023-10-18
isOriginal: true
category:
  - tutorial
tag:
  - golang
  - design-patterns
---

组合模式描述了对象的部分-整体层次结构,将对象组合成树状结构以表示“整体-部分”的层次关系。它使得用户对单个对象和组合对象的使用具有一致性。

<!-- more -->

# 组合模式

明确整体和部分对象,部分对象实现共同的接口,整体对象包含部分对象,提供实现整体业务的方法。

## 用法

让我们试着用一个操作系统文件系统的例子来理解组合模式。 文件系统中有两种类型的对象： 文件和文件夹。 在某些情形中， 文件和文件夹应被视为相同的对象。 这就是组合模式发挥作用的时候了。

想象一下， 你需要在文件系统中搜索特定的关键词。 这一搜索操作需要同时作用于文件和文件夹上。 对于文件而言， 其只会查看文件的内容； 对于文件夹则会在其内部的所有文件中查找关键词。

```go
// component.go
type Component interface {
    search(string)
}
```

```go
// folder.go
type Folder struct {
    components []Component
    name       string
}

func (f *Folder) search(keyword string) {
    fmt.Printf("Serching recursively for keyword %s in folder %s\n", keyword, f.name)
    for _, composite := range f.components {
        composite.search(keyword)
    }
}

func (f *Folder) add(c Component) {
    f.components = append(f.components, c)
}
```

```go
// file.go
type File struct {
    name string
}

func (f *File) search(keyword string) {
    fmt.Printf("Searching for keyword %s in file %s\n", keyword, f.name)
}

func (f *File) getName() string {
    return f.name
}
```

```go
// main.go
package main

func main() {
    file1 := &File{name: "File1"}
    file2 := &File{name: "File2"}
    file3 := &File{name: "File3"}

    folder1 := &Folder{
        name: "Folder1",
    }

    folder1.add(file1)

    folder2 := &Folder{
        name: "Folder2",
    }
    folder2.add(file2)
    folder2.add(file3)
    folder2.add(folder1)

    folder2.search("rose")
}
```

输出:
```sh
Serching recursively for keyword rose in folder Folder2
Searching for keyword rose in file File2
Searching for keyword rose in file File3
Serching recursively for keyword rose in folder Folder1
Searching for keyword rose in file File1
```


## 总结

组合模式作为结构模式可以将对象组合成树状的结构，并可以将成员对象抽象成接口像独立对象一样使用它们。


