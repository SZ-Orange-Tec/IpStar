import header from "../components/header/zh"
import footer from "../components/footer/zh"
import headerGift from "../components/headerGift/zh"
import question from "../components/question/zh"
export default {
  ...header,
  ...footer,
  ...headerGift,
  ...question,

  IP_Address: "IP地址",
  Search: "查找",
  Country: "国家",
  Latitude: "纬度",
  Longitude: "经度",
  Mobile: "手机",
  Usage_Type: "使用类型",
  Region: "地区",
  City: "城市",
  ISP: "ISP",
  Domain: "域",
  Connection_Type: "线路",
  Browser: "浏览器",

  ipaddress_spec: {
    title: "IP地址查找",
    desc: "对查找特定IP地址的详细信息感兴趣吗?",

    ip1_title: "IP地址查找",
    ip1_desc:
      "“IP”代表互联网协议。它是一套控制互联网连接的指导方针、规则和条例。每个IP地址都是一串数字，用来识别互联网上的设备。这可以是个人电脑、智能手机、平板电脑、游戏机、智能家电和其他能够连接到互联网的设备。最常用的IP地址格式为4个数字(0 ~ 255)，中间用点分隔。每当您连接到互联网时，您的ISP都会为您提供一个IP地址，用于识别和识别您。",
    ip2_title: "什么是IP地址?",
    ip2_desc:
      "“IP”代表互联网协议。它是一套控制互联网连接的指导方针、规则和条例。每个IP地址都是一串数字，用来识别互联网上的设备。这可以是个人电脑、智能手机、平板电脑、游戏机、智能家电和其他能够连接到互联网的设备。最常用的IP地址格式为4个数字(0 ~ 255)，中间用点分隔。每当您连接到互联网时，您的ISP都会为您提供一个IP地址，用于识别和识别您。",

    info_title: "IP地址能揭示什么?",
    info_desc:
      "IP地址可以显示很多有趣的细节。值得注意的是，我们的IP地址检查器不会显示任何个人身份信息，因此它完全符合所有相关的隐私要求，如CCPA和GDPR。以下是您使用我们的IP检查工具获得的信息:",
    info_dot1: "位置(国家、地区、城市)",
    info_dot2: "经纬度",
    info_dot3: "ISP",
    info_dot4: "域",
    info_dot5: "IP地址类型",
  },
}
