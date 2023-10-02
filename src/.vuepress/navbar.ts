import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "Golang笔记", icon: "file-icons:go-old", link: "/posts/program/golang/" },
  { text: "思考", icon: "icons8:idea", link: "/posts/thinking/" },
  { text: "归档", icon: "teenyicons:archive-outline", link: "/archives" },
  {
    text: "关于",
    icon: "material-symbols:info-outline",
    link: "/intro/",
  },
]);
