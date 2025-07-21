import header from "../components/header/en"
import productList from "../components/productList/en"
import paypopup from "../components/pay_popup/en"
import footer from "../components/footer/en"
import headerGift from "../components/headerGift/en"
export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,
  ...headerGift,

  pricing_spec: {
    des: "Real Residential IPs cover 200+ countries\nPlans From {price}",
    // des_slot: "0.25/GB",
    payment: "We support multiple payment methods",
    popular: "Most Popular Countries",

    world_span: "Countries And Districts",
    // support: " <span class='primary_text'>200+</span> More Countries",
  },
}
