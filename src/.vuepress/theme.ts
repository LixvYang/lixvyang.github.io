import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";

export default hopeTheme({
  darkmode: "toggle",
  fullscreen: true,
  hostname: "https://yanglixin.com",
  themeColor: true,
  author: "离心",
  copyright: "Lixin © 2020-2023",

  iconAssets: "iconfont",
  breadcrumb: false,
  sidebar: false,
  // navbar: false,
  // logo: "/assets/images/wechatAvatar.png",

  repo: "lixvyang",

  docsDir: "src",

  navbar,
  
  // sidebar,

  footer: "本站博客未经授权禁止转载",

  displayFooter: true,

  blog: {
    avatar: "/assets/images/wechatAvatar.png",
    roundAvatar: true,
    description: "长期持续分享学习内容",
    medias: {
      BiliBili: "https://space.bilibili.com/520711550",
      Email: "lixin@tutamail.com",
      GitHub: "https://github.com/lixvyang",
      Twitter: "https://twitter.com/Lixv28332301",
    },
  },


  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },
  favicon: "/favicon.ico",
  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  plugins: {
    blog: true,
    comment: {  
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "LixvYang/blog-comments",
      repoId: "R_kgDOJpRLYg",
      category: "Announcements",
      categoryId: "DIC_kwDOJpRLYs4CW1R-",
    },
    

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    components: {
      components: [
        "Replit",
        "Share",
        "BiliBili",
        "Badge",
        "FontIcon"
      ],
    },
    pwa: {
      cachePic: true,
      cacheHTML: true,
      maxSize: 1024 * 1024 * 20,
      maxPicSize: 1024 * 1024 * 5,
      appendBase: true,

      update: 'disable',
    },
    photoSwipe: {
      locales: {
        "/": {
          // 覆盖分享标签文字
          close: "关闭",
          fullscreen: "打开",
        },
      },
    },
  },
});
