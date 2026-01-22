import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
import productList from "../components/productList/zh"
import paypopup from "../components/pay_popup/zh"
export default {
  ...menu,
  ...navbar,
  ...productList,
  ...paypopup,

  Plans: "套餐",
  Get_Proxy: "获取代理",
  Billing: "订单",
  Proxy_List: "代理列表",

  // ip 管理
  Please_Enter: "请输入",
  All_Locations: "所有位置",
  Search: "搜索",
  Address: "地址",
  Port: "端口",
  Number: "数量",
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
  Allocating: "分配中",
  Copy_Success: "复制成功！",

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

  static_spec: {
    des: "静态住宅代理是标准住宅代理的高速、高可靠性替代方案。升级静态住宅，今天购买就可以解除封锁。",
    ip_remark: "请输入 IP 或备注",

    allocate_tip: "正在努力为您调配中...由于当前库存火爆，大概需要 2 小时才能完成分配，感谢您的理解！",
  },
}
