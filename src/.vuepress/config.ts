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
    // searchProPlugin({
    //   // 配置选项
    //   indexContent: true,
    //   hotReload: true,
    //   customFields: [
    //     {
    //       getter: (page: any) => page.frontmatter.category,
    //       formatter: "分类：$content",
    //     },
    //     {
    //       getter: (page: any) => page.frontmatter.tag,
    //       formatter: "标签：$content",
    //     },
    //   ],
    // }),
    searchProPlugin({
      indexContent: true, // 索引全部内容
      customFields: [
        // 为分类和标签添加索引
        {
          formatter: "分类：$content",
          getter: (page) =>
            page.frontmatter.category as string | string[] | null,
        },
        {
          formatter: "标签：$content",
          getter: (page) => page.frontmatter.tag as string | string[] | null,
        },
      ],
    }),
    docsearchPlugin({
      appId: "S7W5WW4R69",
      apiKey: "da3fd975b0316462c00bf839b9b9c655",
      indexName: "yanglixin",
    }),
  ],
});
