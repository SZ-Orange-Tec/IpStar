import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
export default {
  ...menu,
  ...navbar,
  ...productList,
  ...paypopup,

  Buy_now: "立即购买",

  Size: "总量",
  Price: "价格",
  Status: "状态",
  Consume: "消耗",
  Duration: "有效期",
  Start_date: "生效时间",
  Expire_date: "过期时间",

  Available: "可用",
  Used_up: "已用完",
  Expired: "已过期",
  Unlimited: "不限量",

  Feature_List: "功能特色",
  Never_Expires: "永不过期",

  product_spec: {
    title: "住宅代理 定价",
    des: "拥抱全球网络：拥有200+国家真实住宅IP的强大优势",

    purchase: "购买后如何使用 ?",
    no: "您没有流量余额",

    guide_title: "住宅代理",
    guide_des: "9000万+安全住宅代理，高匿名性和低检测率。适用于各种使用场景。",
    lowest: "低至：",
    feature_title1: "全球覆盖",
    feature_desc1: "访问覆盖全球所有国家的分布式代理网络。",
    feature_title2: "99.99%在线率",
    feature_desc2: "IPStar拥有全球最高的连接成功率。",
    feature_title3: "多种协议支持",
    feature_desc3: "可选择 HTTP/SOCKS5 协议执行请求。",
    feature_title4: "高成功率",
    feature_desc4: "我们的技术和代理网络保障高请求成功率",
  },
}
