export default {
  dom: [
    {
      h1: "Getting Started",
      p: "Ipflare provides you with a high-quality proxy IP service.",
    },
    {
      h1: "How to use Ipflare proxy",
      p: "You can click to view the available integration methods.",
    },
    {
      h1: "FAQ",
      p: "You can solve your problem by looking at the FAQs.",
    },
  ],
  Getting: [
    [
      {
        title: "How to register ?",
        id: 1,
        p: [
          {
            txt: "You need to prepare a valid email, and then go to the Management Console to register.",
          },
          {
            txt: "After account activation, you can sign in to the Management Console to purchase services.",
          },
        ],
      },
      {
        title: "How to obtain IP through IPflare API ?",
        id: 3,
        p: [
          {
            txt: 'After purchasing the product, you can extract IP as needed from the "Obtain Proxy" menu in the console.  IPflare also provides APIs for obtaining IP proxy channels, which are convenient for different programming languages. The API reference will be displayed in the "API Reference" menu item of your management console after you purchase the products.After obtaining the proxy IP, you can now integrate its into your source-code.',
          },
        ],
      },
    ],
    [
      {
        title: "How to purchase ?",
        id: 2,
        p: [
          {
            txt: "After signing in the Management Console, you can click the left navigation 【Products】menu item to enter the proxy credentials and product package management page ",
          },
          {
            txt: "In the 【Purchase】 option page, there are many optional packages. You can select the appropriate package and quantity according to your business needs. Click purchase to generate a purchase order for you.",
          },
          {
            txt: "After the payment order is completed, you can see the Obtain Proxies and Obtain Proxy APIs menu, According to the APIs description, you can easily access our services.",
          },
        ],
      },
      {
        title: "What is a IP Whitelist ?",
        id: 4,
        p: [
          {
            txt: "Ipflare provides a white list option. Applying the white list strategy can enhance the security of your business and reduce the risk of services.You can find the white list management menu in the account settings of the management console.",
          },
        ],
      },
    ],
  ],
  Integration: [
    [
      {
        title: "Android",
        id: 1,
        p: [
          {
            txt: "IPflare supports almost all proxy APPs in Android, such as Postern and v2rayNG. Here we take v2rayNG as an example to learn how to setup settings and integrate proxy in android APP",
            type: "followUp",
            idx: "1-0",
          },
        ],
      },
      {
        title: "Windows",
        id: 3,
        p: [
          {
            txt: 'Google searches "proxifer" to download, Download address of official website (paid):',
          },
          {
            txt: "https://www.proxifier.com/",
            type: "a",
            url: "https://www.proxifier.com/",
          },
          {
            txt: "We have included a free cracked version of Chinese",
            type: "followUp",
            idx: "1-2",
          },
        ],
      },
    ],
    [
      {
        title: "IOS",
        id: 2,
        p: [
          {
            txt: 'Log in to the appstore with the US Apple ID, search for "shadow locker" (commonly known as small rocket) to download and install',
            type: "followUp",
            idx: "1-1",
          },
        ],
      },
      {
        title: "Source code examples",
        id: 4,
        type: "download",
      },
    ],
  ],
  FAQ: [
    [
      {
        title: "How to purchase proxy services?",
        id: 1,
        p: [
          {
            txt: "If you have registered, please log in to our website, enter the console, find the Products menu, or directly click the following link:",
          },
          {
            txt: "https://www.ipflare.com/#/products",
            type: "a",
            url: "https://www.ipflare.com/#/products",
          },
          {
            txt: "or you can click the follow link and redirect to the pricing page to check our products:",
          },
          {
            txt: "https://www.ipflare.com/#/pricing",
            type: "a",
            url: "https://www.ipflare.com/#/pricing",
          },
        ],
      },
      {
        title: "How long does it take to receive the proxy balance or get my new account activated after the payment?",
        id: 3,
        p: [
          {
            txt: "You should get it instantly after the payment was made. When you done with payment, go Back to program and refresh your IP balance, then it will show.",
          },
        ],
      },
      {
        title: "What if the extracted IP address cannot be used?",
        id: 5,
        p: [
          {
            txt: "We guarantee that most of the IP is available. If this happens, please replace another IP channel. Ipflare only charges for valid IP, which means invalid IP will not cost.",
          },
        ],
      },
    ],
    [
      {
        title: "Is it safe to pay online using your website?",
        id: 2,
        p: [
          {
            txt: "We know how important it is to you, actually, we entrust authoritative third-party payment platforms to handle payment transactions. These platforms include Stripe, Payal and Coingate, which are well-known,high-security and trusted in the world. We only interact with third-party payment platforms, not directly process your payment. When you are ready to pay, the interface you see on the web page that requires you to fill in payment information (such as credit card number) is an interface integration component provided by an authoritative third-party payment platform, your information cannot be collected by anyone, so your payment behavior is absolutely safe.",
          },
        ],
      },
      {
        title: "How to switch to another IP?",
        id: 4,
        p: [
          {
            txt: "You can switch IP addresses in three ways:",
          },
          {
            txt: "(1) Re-select an IP address Channel in the obtained proxy list.",
          },
          {
            txt: "(2) Call the special API for switching IP. Please see the API documentation for details.",
          },
          {
            txt: "(3) Custom proxy user name.",
          },
          {
            txt: 'The proxy user format of IPflare is generally "user-ipstr-0-county-N", This is a practical example: "u20247cwjfp-6Kv3RsAYBc-0-BR-N", You can change the second segment of "ipstr" to another random string to change the IP address. At the same time, you can change the fourth segment of "country" to another country code to switch countries, and when switching countries, you must modify "ipstr" at the same time, otherwise the modification will not be effective.',
          },
        ],
      },
      {
        title: "How large is the IP pool of Ipflare?",
        id: 6,
        p: [
          {
            txt: "Ipflare has more than 20 million + residential IP addresses and is regularly updated to provide the cleanest IP pool.",
          },
        ],
      },
    ],
  ],
}
