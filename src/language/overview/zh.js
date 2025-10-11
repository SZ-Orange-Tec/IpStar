import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
export default {
  ...menu,
  ...navbar,
  Notifications: "通知",
  Details: "详情",

  Date: "日期",
  Traffic: "流量",
  Type: "类型",

  Load: "负载",

  Excellent: "优",
  Good: "良好",
  Average: "一般",
  Low: "低",
  Medium: "中",
  High: "高",

  Online: "在线",

  overview_spec: {
    Residual_Traffic: "剩余的流量",
    Consumption_Today: "今天的消耗",
    Total_IPs_Available: "当前在线 IP 总数",

    Number_of_new_Ips: "新增 IP 数",
    Number_Of_IPs: "IP 总数",
    Number_Of_Requests: "请求总数",

    Country_or_Region: "国家或地区",
    Country_Code: "国家代码",
    Number_of_country_IPs: "国家 IP 数量",
    Network_Status: "网络状况",

    View_More: "查看更多",

    consumption: "消耗",
    recharge: "充值",
    rewards: "奖励",

    welcome1: "欢迎！",
    welcome2: "让我们快速验证您的代理服务器配置、连接和速度。",
    port: "主机端口：",
    proxy_user: "代理用户名：",
    proxy_pass: "代理密码：",
    test1: "测试示例",
    test2: "测试命令为CURL示例，您可以将其粘贴到命令行中以快速测试您的代理设置。",
    way: "详细的IP提取方式，您可以试试",

    day_compare: "分天对比",
    hour_compare: "分小时报表",
  },
}
