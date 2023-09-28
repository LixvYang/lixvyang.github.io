const e=JSON.parse('{"key":"v-438e754c","path":"/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/redis/redis-lua.html","title":"Go语言中使用redis lua脚本","lang":"zh-CN","frontmatter":{"icon":"edit","date":"2023-09-11T00:00:00.000Z","isOriginal":true,"category":["tutorial"],"tag":["golang","redis"],"description":"我们在分布式环境中使用redis的时候，不可避免会使用到redis的Lua脚本来保证redis的原子性，本文的首要目标就是帮助大家在go语言中使用redis lua脚本，以及在在脚本下的debug等。 redis环境可以使用在本地下载的，也可以使用docker启动一个redis，下面的示例中使用会docker启动一个redis实例。","head":[["meta",{"property":"og:url","content":"https://yanglixin.com/posts/program/golang/%E5%B8%B8%E7%94%A8%E6%A1%86%E6%9E%B6%E5%B7%A5%E5%85%B7/redis/redis-lua.html"}],["meta",{"property":"og:title","content":"Go语言中使用redis lua脚本"}],["meta",{"property":"og:description","content":"我们在分布式环境中使用redis的时候，不可避免会使用到redis的Lua脚本来保证redis的原子性，本文的首要目标就是帮助大家在go语言中使用redis lua脚本，以及在在脚本下的debug等。 redis环境可以使用在本地下载的，也可以使用docker启动一个redis，下面的示例中使用会docker启动一个redis实例。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-28T06:28:55.000Z"}],["meta",{"property":"article:author","content":"离心"}],["meta",{"property":"article:tag","content":"golang"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:published_time","content":"2023-09-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-28T06:28:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Go语言中使用redis lua脚本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-11T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-28T06:28:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"离心\\"}]}"]]},"headers":[{"level":2,"title":"Docker启动redis","slug":"docker启动redis","link":"#docker启动redis","children":[]},{"level":2,"title":"什么是lua脚本","slug":"什么是lua脚本","link":"#什么是lua脚本","children":[]},{"level":2,"title":"redis中lua脚本的debug","slug":"redis中lua脚本的debug","link":"#redis中lua脚本的debug","children":[]},{"level":2,"title":"Go语言操作redis","slug":"go语言操作redis","link":"#go语言操作redis","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1695474286000,"updatedTime":1695882535000,"contributors":[{"name":"lixin","email":"lixin@lixins-MacBook-Pro.local","commits":2}]},"readingTime":{"minutes":0.57,"words":172},"filePathRelative":"posts/program/golang/常用框架工具/redis/redis-lua.md","localizedDate":"2023年9月11日","excerpt":"<p>我们在分布式环境中使用redis的时候，不可避免会使用到redis的Lua脚本来保证redis的原子性，本文的首要目标就是帮助大家在go语言中使用redis lua脚本，以及在在脚本下的debug等。</p>\\n<p>redis环境可以使用在本地下载的，也可以使用docker启动一个redis，下面的示例中使用会docker启动一个redis实例。</p>\\n","autoDesc":true}');export{e as data};