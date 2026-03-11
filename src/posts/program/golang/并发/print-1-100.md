---
icon: grommet-icons:golang
date: 2026-03-11
isOriginal: true
category:
  - golang
tag:
  - golang
  - concurrency
---

常见八股文 考察对channel的掌握程度

<!-- more -->

# N个goutine 交替打印1-100

```go
package main

import (
	"fmt"
    "sync"
)

func main() {
	ch1 := make(chan struct{})
	ch2 := make(chan struct{})
	var wg sync.WaitGroup

	wg.Add(2)

	go func() {
		defer wg.Done()
		for i := 1; i <= 100; i += 2 {
			<-ch1
			fmt.Println(i)
			if i+1 <= 100 {
				ch2 <- struct{}{}
			}
		}
	}()

	go func() {
		defer wg.Done()
		for i := 2; i <= 100; i += 2 {
			<-ch2
			fmt.Println(i)
			if i+1 <= 100 {
				ch1 <- struct{}{}
			}
		}
	}()

	ch1 <- struct{}{}
	wg.Wait()
}
```

进阶版？多个goutine？其实多个channel就可以做到 make 一个channel数组

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	n := 5   // goroutine 数
	m := 23  // 打印到 m（包含 m），且 m > n

	ch := make([]chan struct{}, n)
	for i := range ch {
		ch[i] = make(chan struct{})
	}

	var (
		wg   sync.WaitGroup
		once sync.Once
		done = make(chan struct{})

		cur = 0 // 当前要打印的数；因为令牌保证同一时刻只有一个 goroutine 进来，所以不需要锁
	)

	worker := func(id int) {
		defer wg.Done()

		next := (id + 1) % n

		for {
			select {
			case <-done:
				return
			case <-ch[id]:
				// 拿到令牌后进入临界区
				if cur > m {
					once.Do(func() { close(done) })
					return
				}

				fmt.Printf("g%d: %d\n", id, cur)
				cur++

				// 把令牌交给下一个（如果 done 关闭了就别再阻塞发送）
				select {
				case <-done:
					return
				case ch[next] <- struct{}{}:
				}
			}
		}
	}

	wg.Add(n)
	for i := 0; i < n; i++ {
		go worker(i)
	}

	// 启动：把令牌先交给 0 号 goroutine
	ch[0] <- struct{}{}

	wg.Wait()
}
```

