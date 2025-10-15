import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
export default {
  ...menu,
  ...navbar,

  Note: "注意",
  Password: "密码",

  Copy: "复制",
  Regenerate: "重新生成",

  Notes: "备注",
  Date: "日期",
  Manage: "管理",
  Delete: "删除",
  At_the_end: "在末尾",
  Save: "保存",
  Prompts: "提示",

  Old_password: "旧密码",
  New_password: "新密码",
  Repeat_new_password: "重复新密码",
  Add_to: "添加到",
  OK: "确定",
  Cancel: "取消",

  whitelist_spec: {
    add_whitelist: "添加白名单",
    ip_tip: "请输入IP地址...",
    notes: "备注（可选）",
    notes_tip: "请输入备注信息...",

    popover: "API 密钥为程序请求 API 提供授权。更改 API 密钥后，您需要修改程序才能继续运行。",

    white_tip1: "白名单的当前策略为可自行决定是否应用。",
    white_tip2: "当您将一个或多个IP地址添加到白名单中时，您请求我们的代理服务的网络公网IP地址将仅限于白名单中的IP地址，其他地方的代理服务将不可用。",

    verify: "我们需要验证您的身份。",
    input_password: "请输入密码",
    confirm_delete: "您确认要删除吗",
  },
}
