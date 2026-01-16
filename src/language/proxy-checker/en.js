import header from "../components/header/en"
import footer from "../components/footer/en"
import headerGift from "../components/headerGift/en"
import question from "../components/question/en"

export default {
  ...header,
  ...footer,
  ...headerGift,
  ...question,

  Protocol: "Protocol",
  Target_URL: "Target URL",
  Timeout: "Timeout",
  Add_Proxy: "Add Proxy",
  Proxy: "Proxy",
  Speed: "Speed",
  Status: "Status",
  Action: "Action",
  Test: "Test",
  Download_Invalid_List: "Download Invalid List",
  Download_Valid_List: "Download Valid List",
  Invalid_List: "Invalid List",
  Valid_List: "Valid List",
  Free_Trial: "Free Trial",
  FAQ: "FAQ",

  Submit: "Submit",
  Cancel: "Cancel",
  Succeeded: "Succeeded",
  Failed: "Failed",

  proxy_checker_spec: {
    title: "Proxy Checker",
    desc: "Select proxy type, enter target website URL and timeout duration. After importing proxies, click “Test”.",
    list_tip: "Your list of agents is empty.",

    tool_title: "Free Proxy Checker Tool",
    tool_desc:
      "Effortlessly test any proxy using IpStar's free online proxy detection tool. Verify IP addresses, locations, and speeds with just a few clicks.",
    tool_dot_title: "By using our proxy checker, you can:",
    tool_dot1: "Inspect proxies and swiftly filter out valid ones.",
    tool_dot2: "Test proxy servers online to assess connection status and response times.",
    tool_dot3: "Export lists of proxies in good condition, poor condition, or all tested proxies.",

    why_title: "IpStar Proxy Checker: Why Use It?",
    why_desc:
      "IpStar Proxy Checker is a free, user-friendly tool designed to optimise your proxy ecosystem. It helps you swiftly identify proxies that are available, secure, and suitable for your tasks, thereby saving time, reducing risks, and significantly boosting success rates. Crucially, IpStar supports specifying target URLs, ensuring tested proxies are perfectly compatible with particular websites.",

    proxy_title: "Agency services catering to diverse requirements",
    proxy_desc: "We offer a variety of proxy types to meet your specific needs.",
    residential_des: "Residential proxies provide real IP addresses from residential locations, ensuring anonymity and privacy.",
    residential_adv1: "Over 90 million premium residential proxies",
    residential_adv2: "190+ countries and 100+ cities",
    residential_adv3: "Super anonymous and lightning-fast speed",
    unlimited_des: "Unlimited residential proxies offer a vast pool of IP addresses, allowing for unlimited access to the internet.",
    unlimited_adv1: "90M+ Global Residential IPs",
    unlimited_adv2: "Scalable Bandwidth & Concurrency",
    unlimited_adv3: "Full YouTube/GitHub Support",
    phone_des: "Phone proxies enable you to access the internet using mobile phone numbers, perfect for bypassing geo-restrictions.",
    phone_adv1: "2M+ IPs in 30+ Countries",
    phone_adv2: "3G/4G/5G/LTE Mobile Proxy Network",
    phone_adv3: "99.9% Uptime",
    data_center_des: "Data center proxies offer stable and high-speed connections, ideal for businesses that require consistent performance.",
    data_center_adv1: "Premium Static IPs",
    data_center_adv2: "Starting at ${price}/IP",
    data_center_adv3: "HTTP/SOCKS5 Supported",
    rotation_des: "With our customer support team, you can rely on us to provide prompt and helpful assistance whenever you need it.",
    rotation_adv1: "Global Geolocation Coverage",
    rotation_adv2: "Unlimited Sub-account Creation",
    rotation_adv3: "99.99% Connection Success Rate",

    static_title: "Static Residential Proxy",
    static_desc:
      "Global ISP active static IP resource pool, 100% simulating genuine human browsing behaviour, delivering a pristine proxy environment with exceptionally high weighting.",
    static_adv1: "Authentic ISP residential proxy IP addresses",
    static_adv2: "Purely dedicated, zero tolerance for misuse",
    static_adv3: "Permanent static IP addresses, unlimited traffic",

    try_title: "Check your proxies for {free} now.",
    free: "free",

    faq1_ask: "What is a proxy checker?",
    faq1_desc: "IpStar's proxy checker is a tool for testing proxy IP performance. It detects the type, speed, and online status of proxy IPs.",
    faq2_ask: "How do I check a proxy server address?",
    faq2_desc:
      "There are numerous methods to verify proxy servers; utilising our proxy checker is one such approach, enabling one-click detection of proxy availability and security.",
    faq3_ask: "Can I test multiple proxies simultaneously using the proxy checker?",
    faq3_desc: "Yes, IpStar's proxy checker supports batch import, allowing concurrent testing of multiple proxies.",

    add_proxy_tip: "The following formats are supported for the agency type field:",
    ip_error: "The placeholder string portion does not conform to the format!",
  },
}
