import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
import combo_popup from "../components/combo_popup/zh"
export default {
  ...menu,
  ...navbar,
  ...combo_popup,

  Construction: "构造",
  Reference: "参考",
  Count: "数量",
  Country: "国家",
  Protocol: "协议",
  Duration: "时长",
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

  Simplified: "精简",

  Prompt: "提示",
  OK: "确认",
  Cancel: "取消",

  api_spec: {
    url: "您的专属API URL",
    base: "（IP地址检测基于ipinfo.io）",
    placeholder: "点击上方按钮生成API链接",
    note1:
      "您可以在浏览器中打开此链接，也可以在代码中请求此链接以获取IP代理访问点，每次请求将返回不同的IP访问点，如果需要更多灵活性，请查看API参考文档和演示源代码",
    note2: "对于此链接的重复请求，请每次将参数“rd”更改为不同的随机字符串；否则，返回的通道将不会改变。",

    upgrade_tip: {
      front: "查看完整的api说明请先",
      btn: "购买产品",
    },
    buy: "购买服务会员可见",
    combo: "帐密组合",
  },
}
