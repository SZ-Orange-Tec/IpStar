export default {
  Username: "",
  User_password: "",

  combo_spec: {
    title: "Confidential Access Method Documentation",

    title1: "Getting Proxy User Information",
    title2: "Proxy User Format Description",
    title3: "IP Pool Service Address",
    title4: "Example of Actual Proxy Parameters",

    find_your_info: "First, find your agent user password information in {position}",
    position: "Console -> Settings",
    example_userinfo: "Example proxy user info",
    username: "Proxy username",
    password: "Proxy user password",

    proxy_format: "Proxy user format is usually",
    ipstr: "IP string, change this part to switch IP address",
    keeptime: "Input duration (minutes), 0 means no time limit",
    country: "Country code (e.g., US, BR, etc.)",
    suffix: "Fixed suffix",

    combo_example: "Actual example",
    warn: 'Important note: When switching countries, you must also change "ipstr"; otherwise, the change won\'t work.',

    ip_pool:
      "Here are the available IP pool service addresses (each entry is an independent IP pool, and it's recommended to randomly fetch from multiple addresses at the same time).",
    port: "port",

    proxy_expample: "proxy example",
  },
}
