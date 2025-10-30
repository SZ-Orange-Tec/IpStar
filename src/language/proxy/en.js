import menu from "../components/menu/en"
import navbar from "../components/navbar/en"
export default {
  ...menu,
  ...navbar,

  User_Pass_Auth: "User & Pass Auth",
  API_Auth: "API",
  Options: "Options",
  Starting_from: "Starting from ",

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
  Copy: "Copy",
  Curl_Command: "Curl",
  Account: "Account",
  Buy_now: "Buy now",

  Format: "Format",
  Simplified: "Simplified",
  Generate: "Generate",
  Link: "Link",
  Copy_link: "Copy link",
  Open_link: "Open link",
  Note: "Note",
  Parameter: "Parameter",
  Declaration: "Declaration",
  Example: "Example",
  Result: "Result",

  proxy_spec: {
    duration_tip:
      "When using a proxy, you can set the IP's lifespan and use the proxy throughout that time. Since it's a resident proxy, its lifespan can range from a few hours to several days.",

    url: "Your exclusive API URL",
    base: "(IP address detection is based on ipinfo.io)",
    placeholder: "Click the button above to generate an API link",
    note1: "Open this link in your browser or your code to get a new IP proxy each time. For more options, see the API docs and demo.",
    note2: 'For each request, change the "rd" parameter to a random value to get a new channel.',
    upgrade_tip: {
      front: "To view the complete API documentation, please ",
      btn: "purchase the product",
    },
    buy: "Membership visibility post-purchase",

    combo: "Account and password",
    // subscript: "Subscription required",
    // unlock_title: "Unlock Manual Obtain",
    // unlock_desc: "After unlocking, you can extract proxy channels via APIs.",
    no_buy: "Insufficient balance",
  },
}
