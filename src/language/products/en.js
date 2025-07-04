import menu from "../components/menu/en"
import navbar from "../components/navbar/en"
import productList from "../components/productList/en"
import paypopup from "../components/pay_popup/en"
export default {
  ...menu,
  ...navbar,
  ...productList,
  ...paypopup,

  Buy_now: "Buy now",

  Size: "Size",
  Price: "Price",
  Status: "Status",
  Consume: "Consume",
  Duration: "Duration",
  Start_date: "Start date",
  Expire_date: "Expire date",

  Available: "Available",
  Used_up: "Used up",
  Expired: "Expired",
  Unlimited: "Unlimited",

  product_spec: {
    purchase: "How to use after purchase ?",
    no: "You don't have a traffic balance.",
  },
}
