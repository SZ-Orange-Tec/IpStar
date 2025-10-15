import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
export default {
  ...menu,
  ...navbar,

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

  Buy_now: "立即购买",

  Copy: "复制",
  Curl_Command: "Curl 命令",

  proxy_spec: {
    duration_tip: "当您使用代理时，您可以设置IP的有效期，并在有效期内使用该代理。由于它是常驻代理，因此有效期的范围可以从几个小时到几天不等。",

    api_tip: {
      front: "您也可以通过API获取代理通道，请查看",
      btn: "API参考",
    },
    no_order: "You have no order information",
  },
}
