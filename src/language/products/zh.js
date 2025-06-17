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

  product_spec: {
    purchase: "购买后如何使用 ?",
    no: "你没有流量余额",
  },
}
