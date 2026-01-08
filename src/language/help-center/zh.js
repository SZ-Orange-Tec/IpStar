import header from "../components/header/zh"
import footer from "../components/footer/zh"
import headerGift from "../components/headerGift/zh"
export default {
  ...header,
  ...footer,
  ...headerGift,

  Quick_Start_Guide: "快速入门指南",
  Frequently_Asked_Questions: "常见问题解答",
  User_Guide: "用户指南",
  Contact_Us: "联系我们",

  User_Pass_Auth: "账密提取",
  API_Auth: "API提取",

  Learn_More: "了解更多",

  help_spec: {
    title: "在这里，我们为您提供帮助与支持",
    quick_desc: "什么是住宅代理以及如何使用住宅代理？",
    quick_title: "Hi，欢迎使用IPStar平台！",
    quick_desc: "轻松创建、部署和管理您的IP，帮助您快速、高效的获取数据源。",
    quick_step1: "01.注册账号",
    quick_step2: "02.购买您需要的IP类型",
    quick_step3: "03.进入 {pwd_auth} 和 {api_auth} 页面",
    quick_step4: "04.选择对应的地区以及对应的协议类型",

    ques_title: "常见问题解答",
    ques_desc: "整理可能遇到的常见问题并解答，方便快速解决问题",
    ques1_ask: "如何注册？",
    ques1_answer: "您需要准备一封有效的电子邮件，然后转到管理控制台进行注册。\n帐户激活后，您可以登录管理控制台以购买服务。",
    ques2_ask: "如何通过 IpStar API 获取 IP?",
    ques2_answer:
      '购买产品后，您可以在控制台中的"获得代理"菜单中按需要提取 IP，IpStar 同时提供了用于获取 IP 代理通道的 API，这些 API 对于不同的编程语言非常方便。购买产品后，API 引用将显示在管理控制台的“API 引用”菜单项中。获得代理 IP 后，您现在可以将其集成到程序中。',
    ques3_ask: "如何购买？",
    ques3_answer:
      "登录管理控制台后，您可以单击左侧导航【产品】菜单项，进入代理凭据和产品包管理页面.\n在【购买】选项页面中，有许多可选套餐。您可以根据业务需要选择合适的包装和数量。单击“购买”为您生成采购订单。\n付款订单完成后，您可以看到“获取代理”和“获取代理API”菜单。根据API描述，您可以轻松访问我们的服务。",
    ques4_ask: "什么是IP白名单?",
    ques4_answer: "IpStar 提供白名单选项。应用白名单策略可以增强您的业务安全性并降低服务风险。您可以在管理控制台的帐户设置中找到白名单管理菜单。",
    ques5_ask: "如何购买代理服务？",
    ques5_answer:
      "如果您已经注册，请登录我们的网站，进入控制台，找到产品菜单，或直接单击以下链接：\n{product_link}\n或者您可以单击以下链接并重定向到定价页面以查看我们的产品：\n{pricing_link}",
    ques6_ask: "付款后多久才能收到代理余额或激活我的新帐户？",
    ques6_answer: "您应该在付款后立即拿到。当您完成付款后，返回程序并刷新您的 IP 余额，然后它将显示。",
    ques7_ask: "如果提取的IP地址无法使用怎么办？",
    ques7_answer: "我们保证大部分的IP可用。如果发生这种情况，请更换另一个 IP 通道。IpStar 只收取有效 IP 的费用，这意味着无效 IP 不会产生费用。",
    ques8_ask: "使用您的网站在线支付安全吗？",
    ques8_answer:
      "我们知道这对您的重要性，实际上，我们委托权威的第三方支付平台处理支付交易。这些平台包括Stripe、Payal和Coingate，这些平台是世界知名、安全性高且值得信赖的。我们只与第三方支付平台互动，不直接处理您的付款。当您准备付款时，您在网页上看到的要求您填写付款信息（如信用卡号）的界面是由权威第三方支付平台提供的界面集成组件，包括我们在内的任何人都无法收集您的信息，因此您的付款行为是绝对安全的。",
    ques9_ask: "如何切换到另一个IP?",
    ques9_answer:
      "您可以通过三种方式切换 IP 地址：\n(1) 在获得的代理列表中重新选择 IP 地址通道。\n(2) 调用用于切换 IP 的特殊 API。有关详细信息，请参阅 API 文档。\n(3) 自定义代理用户名。\nIpStar 的代理用户格式通常为“user-ipstr-0-county-N”，这是一个实际示例：“u20247cwjfp-6Kv3RsAYBc-0-BR-N”，您可以将“ipstr”的第二段更改为另一个随机字符串以更改 IP 地址。同时，您可以将“country”的第四段更改为另一个国家代码来切换国家，并且在切换国家时，必须同时修改“ipstr”，否则修改将无效。",
    ques10_ask: "IpStar 的 IP 池有多大?",
    ques10_answer: "IpStar 拥有9000多万个住宅 IP 地址，并定期更新以提供最干净的 IP 池。",

    guide_des: "高级指南，了解IPStar Proxy 如何与系统和软件集成",
    guide1_ask: "安卓",
    guide1_answer:
      "IpStar 支持 Android 中几乎所有的代理应用程序，如 Postern 和 v2rayNG。这里我们以 v2rayNG 为例，学习如何在 android APP 中设置设置和集成代理",
    guide2_ask: "Windows",
    guide2_answer: "谷歌搜索“proxifer”进行下载，官方网站的下载地址（付费）：\n {link} \n我们包括了免费的中文破解版{more}",
    guide3_ask: "IOS",
    guide3_answer: "使用美国苹果 ID 登录应用商店，搜索“shadow locker”（俗称小火箭）进行下载和安装",
    guide4_ask: "源代码示例",

    contact_title: "找不到您需要的东西？",
    contact1_title: "通过电子邮件联系我们",
    contact1_answer: "support{'@'}ipstar.io",
    contact2_title: "关注我们",
    contact2_answer: "TG 频道",
    contact3_title: "在线支持",
    contact3_answer: "开始聊天",
  },
}
