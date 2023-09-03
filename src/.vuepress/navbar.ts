import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  { text: "思考", icon: "creative", link: "/posts/thinking/" },
  { text: "归档", icon: "discover", link: "/archives" },
  {
    text: "关于",
    icon: "info",
    link: "/intro/",
  },
]);
