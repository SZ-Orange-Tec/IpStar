import header from "../components/header/en"
import footer from "../components/footer/en"
import headerGift from "../components/headerGift/en"

export default {
  ...header,
  ...footer,
  ...headerGift,

  Quick_Start_Guide: "Quick Start Guide",
  Frequently_Asked_Questions: "Frequently Asked Questions",
  User_Guide: "User Guide",
  Contact_Us: "Contact Us",

  User_Pass_Auth: "User & Pass Auth",
  API_Auth: "API Auth",

  Learn_More: "Learn More",

  help_spec: {
    title: "What can we help you with?",
    guide_desc: "What is a residential proxy and how do you use one?",
    quick_title: "Hi, welcome to the IPStar platform!",
    quick_desc: "Easily create, deploy, and manage your IPs to help you quickly and efficiently access data sources.",
    quick_step1: "01. Register an account",
    quick_step2: "02. Purchase the IP type you need",
    quick_step3: "03. Enter the {pwd_auth} and {api_auth} page",
    quick_step4: "04. Select the corresponding region and protocol type",

    ques_title: "Frequently Asked Questions",
    ques_desc: "Compilation of common questions and their answers to facilitate quick problem resolution.",
    ques1_ask: "How do I register?",
    ques1_answer:
      "You need to prepare a valid email, and then go to the Management Console to register.\nAfter account activation, you can sign in to the Management Console to purchase services.",
    ques2_ask: "How do I obtain an IP address via the IpStar API?",
    ques2_answer:
      'After purchasing the product, you can extract IP as needed from the "Obtain Proxy" menu in the console.  IpStar also provides APIs for obtaining IP proxy channels, which are convenient for different programming languages. The API reference will be displayed in the "API Reference" menu item of your management console after you purchase the products.After obtaining the proxy IP, you can now integrate its into your source-code.',
    ques3_ask: "How do I make a purchase?",
    ques3_answer:
      "After signing in the Management Console, you can click the left navigation 【Products】menu item to enter the proxy credentials and product package management page \nIn the 【Purchase】 option page, there are many optional packages. You can select the appropriate package and quantity according to your business needs. Click purchase to generate a purchase order for you.\nAfter the payment order is completed, you can see the Obtain Proxies and Obtain Proxy APIs menu, According to the APIs description, you can easily access our services.",
    ques4_ask: "What is an IP whitelist?",
    ques4_answer:
      "IpStar provides a white list option. Applying the white list strategy can enhance the security of your business and reduce the risk of services.You can find the white list management menu in the account settings of the management console.",
    ques5_ask: "How do I purchase proxy services?",
    ques5_answer:
      "If you have registered, please log in to our website, enter the console, find the Products menu, or directly click the following link:\n{product_link}\nor you can click the follow link and redirect to the pricing page to check our products:\n{pricing_link}",
    ques6_ask: "How long after payment will I receive my proxy balance or have my new account activated?",
    ques6_answer:
      "You should get it instantly after the payment was made. When you done with payment, go Back to program and refresh your IP balance, then it will show.",
    ques7_ask: "What should I do if the retrieved IP address is unusable?",
    ques7_answer:
      "We guarantee that most of the IP is available. If this happens, please replace another IP channel. IpStar only charges for valid IP, which means invalid IP will not cost.",
    ques8_ask: "Is it safe to make online payments via your website?",
    ques8_answer:
      "We know how important it is to you, actually, we entrust authoritative third-party payment platforms to handle payment transactions. These platforms include Stripe, Payal and Coingate, which are well-known,high-security and trusted in the world. We only interact with third-party payment platforms, not directly process your payment. When you are ready to pay, the interface you see on the web page that requires you to fill in payment information (such as credit card number) is an interface integration component provided by an authoritative third-party payment platform, your information cannot be collected by anyone, so your payment behavior is absolutely safe.",
    ques9_ask: "How do I switch to another IP address?",
    ques9_answer:
      'You can switch IP addresses in three ways:\n(1) Re-select an IP address Channel in the obtained proxy list.\n(2) Call the special API for switching IP. Please see the API documentation for details.\n(3) Custom proxy user name.\nThe proxy user format of IpStar is generally "user-ipstr-0-county-N", This is a practical example: "u20247cwjfp-6Kv3RsAYBc-0-BR-N", You can change the second segment of "ipstr" to another random string to change the IP address. At the same time, you can change the fourth segment of "country" to another country code to switch countries, and when switching countries, you must modify "ipstr" at the same time, otherwise the modification will not be effective.',
    ques10_ask: "How large is IpStar's IP pool?",
    ques10_answer: "IpStar has more than 20 million + residential IP addresses and is regularly updated to provide the cleanest IP pool.",

    guide_des: "Advanced Guide: Understanding How IPStar Proxy Integrates with Systems and Software",
    guide1_ask: "Android",
    guide1_answer:
      "IpStar supports almost all proxy APPs in Android, such as Postern and v2rayNG. Here we take v2rayNG as an example to learn how to setup settings and integrate proxy in android APP",
    guide2_ask: "Windows",
    guide2_answer:
      'Google searches "proxifer" to download, Download address of official website (paid):\n{link}\nWe have included a free cracked version of Chinese{more}',
    guide3_ask: "IOS",
    guide3_answer: 'Log in to the appstore with the US Apple ID, search for "shadow locker" (commonly known as small rocket) to download and install',
    guide4_ask: "Source code examples",

    contact_title: "Can't find what you're looking for?",
    contact1_title: "Contact us by email",
    contact1_answer: "support{'@'}ipstar.io",
    contact2_title: "Follow us",
    contact2_answer: "TG channel",
    contact3_title: "Online support",
    contact3_answer: "Start chat",
  },
}
