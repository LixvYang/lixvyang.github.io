import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as r,c as o,b as a,d as i,a as s,f as l,e as p}from"./app-bcd0bfdb.js";const c={},d=a("h1",{id:"为什么我们坚持使用-ruby-on-rails",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#为什么我们坚持使用-ruby-on-rails","aria-hidden":"true"},"#"),i(" 为什么我们坚持使用 Ruby on Rails")],-1),h={href:"https://about.gitlab.com/blog/2022/07/06/why-were-sticking-with-ruby-on-rails/",target:"_blank",rel:"noopener noreferrer"},b=a("p",null,"GitLab 首席执行官兼联合创始人 Sid Sijbrandij 为 Ruby on Rails 提供了案例。",-1),g=p('<p>当David Heinemeier Hansson创建Ruby on Rails（访谈）时，他受到了他在PHP和Java方面的经验的指导。一方面，他不喜欢 Java 的冗长和僵化使 Java Web 框架变得复杂且难以使用，但他欣赏它们的结构完整性。另一方面，他喜欢PHP最初的易接近性，但不太喜欢这样的项目往往会变成泥潭。</p><figure><img src="https://about.gitlab.com/images/blogimages/ruby1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>似乎这些都是排他性的选择：你要么变得平易近人而凌乱，要么结构合理而难以使用，选择你的毒药。我们过去常常对服务器级操作系统（如Unix）和客户端操作系统（如Windows和MacOS）进行非常相似，但同样困难的区分，前者稳定但难以使用，后者易于理解，但经常崩溃。</p><p>每个人都接受了这种二分法，认为这是上帝赐予的，直到 NeXT 在坚实的 Unix 基础之上放置了一个美丽、平易近人且黄油般流畅的 GUI。如今，“服务器级”Unix 不仅可以运行漂亮的 GUI 桌面，还可以运行大多数手机和智能手表。</p><p>因此，事实证明，除了历史偶然性之外，可接近性和崩溃性实际上并没有联系，而 Web 框架中的可接近性和混乱性也是如此：它们是独立的轴。</p><figure><img src="https://about.gitlab.com/images/blogimages/ruby2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这些独立的轴在右下角开辟了一个非常理想的空旷点：一个平易近人、结构良好的 Web 框架。凭借其坚实的、可元可编程的 Smalltalk 传统和良好的 Unix 集成，Ruby 被证明是 DHH 用 Rails 填补表格右下角的理想工具：一个非常平易近人、高效且结构良好的 Web 框架。</p><figure><img src="https://about.gitlab.com/images/blogimages/ruby3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当 GitLab 联合创始人 Dmitriy Zaporozhets 决定开发用于运行他（和您的）版本控制服务器的软件时，他也具有 PHP 背景。但他没有坚持使用熟悉的东西，而是选择了 Rails。Dmitry 的选择可能是有先见之明的，也可能是偶然的，但它对 GitLab 非常有帮助，部分原因是 David 成功地实现了他对 Rails 的目标：平易近人和良好的架构。</p><h2 id="为什么选择模块化" tabindex="-1"><a class="header-anchor" href="#为什么选择模块化" aria-hidden="true">#</a> 为什么选择模块化？</h2><p>在上一节中，假设模块化是一个理想的属性，但正如我们也看到的，只是假设事物是危险的。那么，为什么，在什么情况下，模块化实际上是可取的呢？</p><p>在他1971年的论文“关于将系统分解为模块时使用的标准”中，David L. Parnas给出了模块化系统的以下（期望的）好处：</p><ul><li>开发时间应该“缩短，因为每个模块上都有独立的团队工作，几乎不需要沟通。</li><li>应该可以“在一个模块中进行剧烈的更改或改进，而不改变其他模块”。</li><li>应该可以一次研究一个模块的系统。</li></ul><p>弗雷德·布鲁克斯（Fred Brooks）后来在《神话人物月》（The Mythical Man Month）一书中强调了减少沟通需求的重要性，额外的沟通开销是“在软件项目后期增加人员会使其更晚”这句老话的主要原因之一。</p><h2 id="我们不需要微服务" tabindex="-1"><a class="header-anchor" href="#我们不需要微服务" aria-hidden="true">#</a> 我们不需要微服务</h2><p>模块化通常既难以捉摸，又受到高度追捧，大多数系统的默认架构是“泥巴大球”。因此，设计师从可以说是现存最大的软件系统中汲取灵感是可以理解的：万维网，它必然是模块化的，它不能以任何其他方式运行。</p><p>使用单独的进程组织本地软件系统，使用 REST 架构样式组合的微服务确实有助于通过操作系统强制实施模块边界，但成本很高。这是实现模块化的一种非常严厉的方法。</p><p>运行现在的无偿分布式系统的困难和成本是巨大的，其中一些性能和可靠性问题记录在众所周知的分布式计算谬误中。简而言之，性能和可靠性成本是巨大的，因为需要纳秒且永远不会失败的函数调用被慢三到六个数量级的网络操作所取代，并且确实会失败。如果必须在几乎没有工具支持的情况下跨多个服务跟踪故障，那么故障的诊断就会变得更加困难。您需要一个相当复杂的 DevOps 组织才能成功运行微服务。如果你的规模无论如何都需要这种复杂性，这并没有真正的区别，但很可能你不是谷歌。</p><p>但是，即使你认为自己可以管理所有这些，也要注意，所有这些意外的复杂性都建立在问题的原始基本复杂性之上，微服务并不能降低复杂性。而且，即使是人们所希望的模块化改进也没有得到丝毫保证，通常情况下，你会得到一个分布式的泥球。</p><h2 id="单体架构" tabindex="-1"><a class="header-anchor" href="#单体架构" aria-hidden="true">#</a> 单体架构</h2><p>通过使好的架构变得平易近人且富有成效，Rails 使 GitLab 能够开发一个模块化的单体架构。模块化单体与分布的泥球完全相反：一个结构良好、架构良好、高度模块化的程序，作为单个进程运行，并且尽可能无聊。</p><p>尽管将 GitLab 构建为一个整体对我们来说非常有益，但我们对这种结构并不教条。建筑遵循需求，而不是相反。虽然 Rails 对于我们的目的来说是优秀的技术，但它确实有一些缺点，其中之一就是性能。幸运的是，大多数代码库中只有一小部分实际上对性能至关重要。我们使用自己用 Go 编写的 gitaly 守护进程来处理实际的 git 操作，并使用 PostgreSQL 来处理非仓库持久性。</p><h2 id="开放核心" tabindex="-1"><a class="header-anchor" href="#开放核心" aria-hidden="true">#</a> 开放核心</h2><p>最后但并非最不重要的一点是，我们的模块化单体将我们的 Open Core 商业模式从一个美好的理论变成了实际的现实。虽然 Rails 本身并不能做到这一点，但那将是我们出色的贡献者和工程师，它确实奠定了适当的基础。</p><p>为了获得开源的真正好处，可用的源代码必须对贡献者来说是平易近人的。为了在面对来自各种来源的贡献时保持架构的完整性，并在开放和封闭组件之间保持清晰的分界线，代码必须结构良好。听起来很熟悉？</p><p>有一个合适的插件接口不是更好吗？或者更好的是，一个以微服务为模型的服务接口？一句话：不。这些方法不仅带来了部署和集成障碍，远远超出了“我对源代码进行了小改动”的范畴，而且它们往往过于严格地执行架构约束。预测所有未来的扩展点是一件愚蠢的事情，幸运的是我们没有开始，也不必这样做。</p><p>通过我们无聊的模块化单体，用户和其他第三方开发人员可以并且确实为核心产品做出了贡献，这为我们提供了巨大的杠杆作用，再加上无与伦比的创新速度和可扩展性。</p>',27);function u(m,f){const e=n("ExternalLinkIcon");return r(),o("div",null,[d,a("p",null,[i("本文翻译自: "),a("a",h,[i("为什么我们坚持使用 Ruby on Rails"),s(e)])]),b,l(" more "),g])}const R=t(c,[["render",u],["__file","Why-we-re-sticking-with-Ruby-on-Rails.html.vue"]]);export{R as default};