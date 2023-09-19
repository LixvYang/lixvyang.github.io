import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  // title: "离心的Blog",
  description: "vuepress-theme-hope 的博客演示",
  shouldPrefetch: false,
  theme,
  markdown: {
    headers: {
      level: [2, 3, 4, 5, 6],
    },
  },
  plugins: [
    searchProPlugin({
      // 配置选项
      indexContent: true,
      hotReload :true,
      customFields: [
        {
          getter: (page: any) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page: any) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ]
    }),
    docsearchPlugin({
      appId: '5I34SG8VKV',
      apiKey: '788c42d869d00858b1ec2122d06c6d2d',
      indexName: 'lixvyangio'
    })
  ]
});
