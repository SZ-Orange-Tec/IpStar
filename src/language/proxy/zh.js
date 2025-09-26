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

  Show_as_text: "显示为文本",
  Show_as_table: "显示为表格",
  Copy_to_clipboard: "复制到剪贴板",

  Server: "服务器",
  Port: "端口",
  User: "用户",
  Password: "密码",
  No_data: "没有数据",
  At_the_end: "到这里结束",

  Buy_now: "立即购买",

  proxy_spec: {
    duration_tip: "当您使用代理时，您可以设置IP的有效期，并在有效期内使用该代理。由于它是常驻代理，因此有效期的范围可以从几个小时到几天不等。",
    list_tip: {
      front: "每行都是一组代理参数。如果您不知道如何使用它，请点击",
      btn: "这里",
      back: "获取帮助",
    },
    api_tip: {
      front: "您也可以通过API获取代理通道，请查看",
      btn: "API参考",
    },
    no_order: "You have no order information",
  },
}
