import menu from "../components/menu/en"
import navbar from "../components/navbar/en"
export default {
  ...menu,
  ...navbar,

  Country: "Country",
  Protocol: "Protocol",
  Duration: "Duration",
  Count: "Count",
  Extract: "Extract",

  Copy_Information: "Copy Information",
  Copy_Curl: "Copy Curl",

  No_data: "No data",
  At_the_end: "At the end",

  Server: "Server",
  Port: "Port",
  User: "User",
  Password: "Password",
  Link_Information: "Link Information",

  Buy_now: "Buy now",

  Copy: "Copy",
  Curl_Command: "Curl",

  proxy_spec: {
    duration_tip:
      "When using a proxy, you can set the IP's lifespan and use the proxy throughout that time. Since it's a resident proxy, its lifespan can range from a few hours to several days.",

    api_tip: {
      front: "You can also obtain the proxy channels via APIs, please check the ",
      btn: "API reference",
    },
    no_order: "您没有订单信息",

    subscript: "Subscription required",
    unlock_title: "Unlock Manual Obtain",
    unlock_desc: "After unlocking, you can extract proxy channels via APIs.",
  },
}
