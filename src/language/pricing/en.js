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

  pricing_spec: {
    title: "Residential Proxies Pricing",
    des: "Access the Global Web: The Power of 200+ Countries of Residential IPs.",

    plan_title: "Total Data Control",
    plan_desc: "Easily track your data usage in real-time. Our dashboard helps you monitor proxy stats and stay on budget.",
    plan_tag1: "Real-Time Monitoring",
    plan_tag2: "Usage Statistics",
    plan_tag3: "Custom Data Caps",
    plan_tag4: "Sub-user Permissions",

    resource_title: "Premium Global Proxies",
    resource_desc:
      "Access tens of millions of premium, continuously updated household IPs from 200+ countries. High speed, low latency, and maximum privacy.",
    resource_tag1: "Global Coverage",
    resource_tag2: "Stable & Reliable",
    resource_tag3: "Fast & Responsive",
    resource_tag4: "Secure & Private",

    code_title: "Code Integration",
    code_desc:
      "Integrate with our API using multiple programming languages. We provide code examples and detailed API parameter descriptions to help you get started quickly.",
  },
}
