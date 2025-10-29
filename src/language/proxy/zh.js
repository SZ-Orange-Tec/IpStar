import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
export default {
  ...menu,
  ...navbar,

  User_Pass_Auth: "账密提取",
  API_Auth: "API提取",
  Options: "筛选项",

  Country: "国家",
  Protocol: "协议",
  Duration: "有效期",
  Count: "数量",
  Extract: "提取",
  Copy_Information: "复制信息",
  Copy_Curl: "复制全部URL",
  No_data: "没有数据",
  At_the_end: "到这里结束",
  Server: "服务器",
  Port: "端口",
  User: "用户名",
  Password: "密码",
  Link_Information: "链接信息",
  Copy: "复制",
  Curl_Command: "Curl 命令",
  Account: "账号",
  Buy_now: "立即购买",

  Format: "格式",
  Generate: "生成",
  Link: "链接",
  Copy_link: "复制链接",
  Open_link: "打开链接",
  Note: "注意",
  Parameter: "参数",
  Declaration: "声明",
  Example: "示例",
  Result: "结果",

  proxy_spec: {
    duration_tip: "当您使用代理时，您可以设置IP的有效期，并在有效期内使用该代理。由于它是常驻代理，因此有效期的范围可以从几个小时到几天不等。",

    url: "您的专属API URL",
    base: "（IP地址检测基于ipinfo.io）",
    placeholder: "点击上方按钮生成API链接",
    note1: "在浏览器或代码中请求此链接，每次均可获得一个新IP代理。更多选项，请参阅API文档和演示。",
    note2: "对于此链接的重复请求，请每次将参数“rd”更改为不同的随机字符串；否则，返回的通道将不会改变。",

    upgrade_tip: {
      front: "查看完整的api说明请先",
      btn: "购买产品",
    },
    buy: "购买服务会员可见",
    combo: "帐密组合",

    // subscript: "需要订阅",
    // unlock_title: "解锁API提取",
    // unlock_desc: "解锁后，您可以通过手动提取代理通道。",
    no_buy: "流量不足",
  },
}
