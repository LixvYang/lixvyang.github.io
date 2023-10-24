import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  // title: "离心的Blog",
  // description: "vuepress-theme-hope 的博客演示",
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
      appId: 'S7W5WW4R69',
      apiKey: '71b178d183129aa73a06734f811ba079',
      indexName: 'yanglixin'
    }),
  ]
});
