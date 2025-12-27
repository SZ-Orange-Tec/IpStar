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
  Expiration_time: "过期时间",
  Normal: "正常",
  Expired: "已过期",
  No_Data: "暂无数据",
  Renewal: "续费",
  All: "全部",
  Export: "导出",
  List_of_Proxies: "代理列表",

  // billing 表格
  Order_Number: "订单号",
  Product_Name: "产品名称",
  IP_Quantity: "IP 数量",
  Bandwidth: "带宽",
  Concurrency: "并发数",
  Order_Date: "订单日期",
  Payment_Date: "支付日期",
  Validity_Period: "有效期",
  Order_Amount: "订单金额",
  Status: "状态",
  Action: "操作",
  Never_Expire: "永久有效",
  Days: "天",
  Timeout: "超时",
  Unpaid: "未支付",
  Paid: "已支付",
  Pay: "支付",

  data_center_spec: {
    des: "用高质量数据中心代理，低延迟无断连，确保您的业务持续高效运行",
    ip_remark: "请输入 IP 或备注",
  },
}
