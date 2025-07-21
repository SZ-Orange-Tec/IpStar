import header from "../components/header/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
import footer from "../components/footer/zh"
import headerGift from "../components/headerGift/zh"
export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,
  ...headerGift,

  pricing_spec: {
    des: "真实住宅IP 覆盖全球 200+ 国家\n套餐 {price} 起",
    // des_slot: "0.25/GB",
    payment: "我们支持多种支付方式",
    popular: "最受欢迎国家",

    world_span: "国家和地区",
    // support: " <span class='primary_text'>200+</span> 更多国家",
  },
}
