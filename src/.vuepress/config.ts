import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "离心的Blog",
  description: "vuepress-theme-hope 的博客演示",
  shouldPrefetch: false,
  theme,
  plugins: [
    searchProPlugin({
      // 配置选项
      indexContent: true,
      hotReload :true,
    }),
  ]
});
