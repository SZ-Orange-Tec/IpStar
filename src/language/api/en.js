import menu from "../components/menu/en"
import navbar from "../components/navbar/en"
export default {
  ...menu,
  ...navbar,

  Construction: "Construction",
  Reference: "Reference",
  Count: "Count",
  Country: "Country",
  Protocol: "Protocol",
  Duration: "Duration",
  Format: "Format",
  Generate: "Generate",
  Link: "Link",
  Copy_link: "Copy link",
  Open_link: "Open link",
  Note: "Note",
  Parameter: "Parameter",
  Declaration: "Declaration",
  Example: "Example",
  Result: "Result",

  Simplified: "Simplified",

  Prompt: "Prompt",
  OK: "OK",
  Cancel: "Cancel",

  api_spec: {
    url: "Your exclusive API URL",
    base: "(IP address detection is based on ipinfo.io)",
    placeholder: "Click the button above to generate an API link",
    note1:
      "You can open this link in your browser or request this link in your code to get the IP proxy access point, each request will return a different IP access point, if you need more flexibility, please check the API reference documentation and demo source code",
    note2:
      "For repeated requests to this link, change the parameter 'rd' to a different random string each time; otherwise, the returned channel will not change.",
    upgrade_tip: {
      front: "To view the complete API documentation, please ",
      btn: "purchase the product",
    },
    buy: "Membership visibility post-purchase",
  },
}
