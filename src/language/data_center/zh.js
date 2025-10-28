import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
export default {
  ...menu,
  ...navbar,
  ...productList,
  ...paypopup,

  Price: "定价",
  Get_Proxy: "获取代理",
  Billing: "订单",
  Management: "管理",

  // ip 管理
  Please_Enter: "请输入",
  Normal: "正常",
  Abnormal: "异常",
  All_Locations: "所有位置",
  Search: "搜索",
  Ip_Address: "IP 地址",
  Port: "端口",
  Locations: "位置",
  Username: "用户名",
  Password: "密码",
  API_link: "API 链接",
  Purchase_time: "购买时间",
  Remark: "备注",

  // billing 表格
  Order_number: "订单号",
  Product_name: "产品名称",
  IP_quantity: "IP 数量",
  Duration: "有效期",
  Order_amount: "订单金额",
  Payment_time: "支付时间",
  Expiration_time: "过期时间",
  Status: "状态",
  Action: "操作",

  data_center_spec: {
    des: "用高质量数据中心代理，低延迟无断连，确保您的业务持续高效运行",
  },
}
