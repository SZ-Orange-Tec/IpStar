import header from "../components/header/zh"
import footer from "../components/footer/zh"
import headerGift from "../components/headerGift/zh"
import question from "../components/question/zh"
export default {
  ...header,
  ...footer,
  ...headerGift,
  ...question,

  Protocol: "协议",
  Target_URL: "目标网址",
  Timeout: "超时时间",
  Add_Proxy: "添加代理",
  Proxy: "代理",
  Speed: "速度",
  Status: "状态",
  Action: "操作",
  Test: "测试",
  Download_Invalid_List: "下载无效列表",
  Download_Valid_List: "下载有效列表",
  Invalid_List: "无效列表",
  Valid_List: "有效列表",
  Free_Trial: "开始免费试用",
  FAQ: "常见问题",

  Submit: "提交",
  Cancel: "取消",
  Succeeded: "成功",
  Failed: "失败",

  proxy_checker_spec: {
    title: "代理检查器",
    desc: "选择代理类型，填写目标网站 URL 与超时时间，导入代理后点击“测试”。",
    list_tip: "您的代理列表为空~",

    tool_title: "免费代理检测工具",
    tool_desc: "使用 IpStar 免费的在线代理检测工具轻松测试任何代理。只需点击几下即可验证IP地址、位置和速度。",
    tool_dot_title: "通过使用我们的代理检查器，您可以",
    tool_dot1: "检查代理并迅速筛选出有效的代理。",
    tool_dot2: "在线测试代理服务器以评估连接状态和响应速度。",
    tool_dot3: "导出状态良好、状态不佳或所有经过测试的代理列表。",

    why_title: "为什么需要使用 IpStar 代理检查器？",
    why_desc:
      "IpStar 代理检查器是一款免费且用户友好的工具，专为优化代理生态系统而设计。它能帮助您快速识别可用、安全且适合您任务的代理，从而节省时间、降低风险并显著提升成功率。最关键的是，IpStar支持指定目标网址，确保测试代理与特定网站完美兼容。",

    proxy_title: "满足各类需求的代理服务",
    proxy_desc: "使用易于操作、高质量且经济实惠的代理IP基础设施开启您的旅程。",
    residential_des: "高稳定性的全球网络，可用率达99.7%。流量不过期，按需付费，为您的跨区域业务提供可靠连接。",
    residential_adv1: "9000万+优秀住宅代理",
    residential_adv2: "190+的位置",
    residential_adv3: "超级匿名和闪电般的速度",
    unlimited_des: "190+国家地区真实住宅IP，专属代理服务器，无限流量，支持超高并发请求。",
    unlimited_adv1: "9000万+住宅 IP，覆盖全球190+地区",
    unlimited_adv2: "灵活的并发和带宽管理，轻松扩展",
    unlimited_adv3: "支持 YouTube/Github/音视频代理",
    phone_des: "全球真实移动设备IP资源池，4G/5G网络原生出口，保障业务高稳定性与高可用性，支持公开数据分析与多元化业务需求。",
    phone_adv1: "3百万+IPs覆盖30多个国家",
    phone_adv2: "3G/4G/5G/LTE 移动代理网络",
    phone_adv3: "99.9%成功率",
    data_center_des: "高性价比的数据中心IP网络。提供充足带宽与稳定低延退连接，助力企业实现商业洞察、应用测试与性能监控。",
    data_center_adv1: "高级静态 IP",
    data_center_adv2: "价格低至 ${price}/IP",
    data_center_adv3: "HTTP/socks5",
    rotation_des: "我们提供精准匹配多样化需求的IP解决方案，并配备强大的技术支持团队，7x24小时响应，保障业务稳定运行。",
    rotation_adv1: "全球地理位置覆盖",
    rotation_adv2: "无限制创建子账户",
    rotation_adv3: "99.99%的连接成功率",

    static_title: "静态住宅代理",
    static_desc: "全球ISP活跃静态IP资源池，100%模拟真人访问行为，提供极高权重的纯净代理环境。",
    static_adv1: "真实ISP住宅代理IP地址",
    static_adv2: "纯净独享，拒绝滥用",
    static_adv3: "永久静态IP地址，不限制流量",

    try_title: "立即{free}检查代理。",
    free: "免费",

    faq1_ask: "什么是代理检查器？",
    faq1_desc: "IpStar的代理检查工具是一种用于测试代理IP性能的工具。该工具检测代理IP的类型、速度和在线状态。",
    faq2_ask: "如何检查代理服务器地址？",
    faq2_desc: "检查代理服务器有很多种方法，使用我们的代理检查器是其中一种，一键检测代理可用性和安全性。",
    faq3_ask: "我可以使用代理检查器同时测试多个代理吗？",
    faq3_desc: "可以，IpStar代理检查器支持批量导入，同时测试多个代理。",

    add_proxy_tip: "代理类型支持以下填写格式：",
    ip_error: "代理字符串部分不符合格式！",
  },
}
