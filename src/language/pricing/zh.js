import header from "../components/header/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
import footer from "../components/footer/zh"
export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,

  pricing_spec: {
    des: "真实住宅IP 覆盖全球 200+ 国家\n价格最低 {price}",
    des_slot: "0.25/GB",
    payment: "我们支持多种支付方式",
    popular: "最受欢迎国家",

    world_span: "国家和地区",
    // support: " <span class='primary_text'>200+</span> 更多国家",
  },
}
