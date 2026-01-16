import header from "../components/header/en"
import productList from "../components/productList/en"
import paypopup from "../components/pay_popup/en"
import footer from "../components/footer/en"
import headerGift from "../components/headerGift/en"
import question from "../components/question/en"
export default {
  ...header,
  ...productList,
  ...footer,
  ...paypopup,
  ...headerGift,
  ...question,

  FAQ: "FAQ",

  pricing_spec: {
    residential: {
      title: "Residential Proxies Plans",
      des: "Embrace the Global Web: 190+ Countries of Residential IPs",
    },
    unlimited: {
      title: "Unlimited Residential Proxies Plans",
      des: "Unlimited IP addresses, high bandwidth, no data caps—tailored for large-scale data collection.",
    },
    mobile: {
      title: "Phone Proxies Plans",
      des: "Over 2 million premium mobile IPs, worldwide coverage. Get reliable access and conquer complex network environments.",
    },
    data_center: {
      title: "Data Center Proxies Plans",
      des: "With high-quality datacenter proxies, you get low latency and stable connections to keep your operations running smoothly and efficiently.",
    },
    rotation: {
      title: "Rotation Residential Proxies Plans",
      des: "Real residential IPs, auto-rotating for uninterrupted data collection and network access.",
    },
    static: {
      title: "Static Residential Proxies",
      des: "Static residential proxies are a fast, highly reliable alternative to standard residential proxies. Upgrade to static residential—unblock access with a purchase today.",
    },

    plan_title: "Total Data Control",
    plan_desc: "Easily track your data usage in real-time. Our dashboard helps you monitor proxy stats and stay on budget.",
    plan_tag1: "Real-Time Monitoring",
    plan_tag2: "Usage Statistics",
    plan_tag3: "Custom Data Caps",
    plan_tag4: "Sub-user Permissions",

    resource_title: "Premium Global Proxies",
    resource_desc:
      "Access tens of millions of premium, continuously updated household IPs from 190+ countries. High speed, low latency, and maximum privacy.",
    resource_tag1: "Global Coverage",
    resource_tag2: "Stable & Reliable",
    resource_tag3: "Fast & Responsive",
    resource_tag4: "Secure & Private",

    code_title: "Code Integration",
    code_desc:
      "Integrate with our API using multiple programming languages. We provide code examples and detailed API parameter descriptions to help you get started quickly.",
  },
}
