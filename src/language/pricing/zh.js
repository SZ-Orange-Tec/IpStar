import header from "../components/header/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
import footer from "../components/footer/zh"
import headerGift from "../components/headerGift/zh"
import question from "../components/question/zh"

export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,
  ...headerGift,
  ...question,

  FAQ: "常见问题",

  pricing_spec: {
    residential: {
      title: "住宅代理 定价",
      des: "拥抱全球网络：拥有200+国家真实住宅IP的强大优势",
    },
    unlimited: {
      title: "不限量住宅代理 定价",
      des: "无限IP提取，高带宽不限流量——为大规模数据采集量身打造。",
    },
    mobile: {
      title: "移动手机代理 定价",
      des: "200万+高质量移动IP，全球覆盖。提供高成功率的网络访问，轻松应对复杂网络环境。",
    },
    data_center: {
      title: "静态数据中心代理 定价",
      des: "用高质量数据中心代理，低延迟无断连，确保您的业务持续高效运行",
    },
    rotation: {
      title: "轮换住宅代理 定价",
      des: "真实住宅IP，自动轮换，让数据采集与网络访问畅通无阻。",
    },

    plan_title: "全方位流量管理解决方案",
    plan_desc: "轻松管理数据使用量，提供全面的流量管理面板，实时统计数据让您精准监控住宅代理的使用情况，从而有效避免超出预算。",
    plan_tag1: "实时流量监控",
    plan_tag2: "流量消耗明细",
    plan_tag3: "自定义流量上限",
    plan_tag4: "子账号权限管理",

    resource_title: "全球顶级优质代理资源",
    resource_desc: "我们提供千万级优质住宅代理IP池，实时更新来自200多个国家的真实家庭住宅IP，确保高效率、低延迟，同时保障数据安全，维护超高私密性。",
    resource_tag1: "海量选择，全球覆盖",
    resource_tag2: "实时更新，稳定可靠",
    resource_tag3: "高效连接，快速响应",
    resource_tag4: "数据安全，隐私保护",

    code_title: "轻松实现多种代码集成",
    code_desc: "提供多种编程语言的爬虫示例及详尽的API参数说明，支持快速集成与应用",
  },
}
