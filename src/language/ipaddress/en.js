import header from "../components/header/en"
import footer from "../components/footer/en"
import headerGift from "../components/headerGift/en"
import question from "../components/question/en"

export default {
  ...header,
  ...footer,
  ...headerGift,
  ...question,

  IP_Address: "IP Address",
  Search: "Search",
  Country: "Country",
  Latitude: "Latitude",
  Longitude: "Longitude",
  Mobile: "Mobile",
  Usage_Type: "Usage Type",
  Region: "Region",
  City: "City",
  ISP: "ISP",
  Domain: "Domain",
  Connection_Type: "Connection Type",
  Browser: "Browser",

  ipaddress_spec: {
    title: "IP Address Lookup",
    desc: "Interested in finding detailed information about a specific IP address?",

    ip1_title: "",
    ip1_desc:
      '"IP" stands for Internet Protocol. It is a set of rules and guidelines that govern internet connections. Each IP address is a string of numbers used to identify devices on the internet—whether it\'s a personal computer, smartphone, tablet, gaming console, smart home appliance, or any other internet-connected device. The most common format for IP addresses consists of four numbers (0–255) separated by dots. Whenever you connect to the internet, your ISP assigns you an IP address to identify and locate your device.',
    ip2_title: "What Is an IP Address?",
    ip2_desc:
      '"IP" stands for Internet Protocol, which is essentially a set of rules for how devices connect online. An IP address is a unique string of numbers assigned to each internet-connected device—such as a computer, smartphone, tablet, or smart gadget. Usually, it is made up of four numbers between 0 and 255, separated by dots. Every time you go online, your Internet Service Provider gives your device an IP address so it can be identified and recognized.',

    info_title: "What can an IP address reveal?",
    info_desc:
      "IP addresses can show many interesting details. Notably, our IP address checker does not display any personally identifiable information, so it fully complies with all relevant privacy requirements such as CCPA and GDPR. Here is the information you can get using our IP lookup tool:",
    info_dot1: "Location (country, region, city)",
    info_dot2: "Latitude and longitude",
    info_dot3: "ISP",
    info_dot4: "Domain",
    info_dot5: "IP address type",
  },
}
