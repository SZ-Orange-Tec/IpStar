import header from "../components/header/en"
import productList from "../components/productList/en"
import paypopup from "../components/pay_popup/en"
import footer from "../components/footer/en"
export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,

  pricing_spec: {
    des: "Real Residential IPs cover 200+ countries\nLowest price {price}",
    des_slot: "0.25/GB",
    payment: "We support multiple payment methods",
    popular: "Most Popular Countries",

    world_span: "Countries And Districts",
    // support: " <span class='primary_text'>200+</span> More Countries",
  },
}
