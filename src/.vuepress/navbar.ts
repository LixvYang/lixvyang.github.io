import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "技术", icon: "note", link: "/posts/program/golang/" },
  { text: "思考", icon: "creative", link: "/posts/thinking/" },
  { text: "归档", icon: "discover", link: "/archives" },
  {
    text: "关于",
    icon: "info",
    link: "/intro/",
  },
]);
