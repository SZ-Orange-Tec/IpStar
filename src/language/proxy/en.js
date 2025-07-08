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

  Show_as_text: "Show as text",
  Show_as_table: "Show as table",
  Copy_to_clipboard: "Copy to clipboard",

  Server: "Server",
  Port: "Port",
  User: "User",
  Password: "Password",
  No_data: "No data",
  At_the_end: "At the end",

  Buy_now: "Buy now",

  proxy_spec: {
    duration_tip:
      "When using a proxy, you can set the IP's lifespan and use the proxy throughout that time. Since it's a resident proxy, its lifespan can range from a few hours to several days.",
    list_tip: {
      front: "Each line in the following list is a set of proxy parameters. If you don't know how to use it, please ",
      btn: "click here",
      back: " for help",
    },
    api_tip: {
      front: "You can also obtain the proxy channels via APIs, please check the ",
      btn: "API reference",
    },
    no_order: "您没有订单信息",
  },
}
