import menu from "../components/menu/zh"
import navbar from "../components/navbar/zh"
export default {
  ...menu,
  ...navbar,

  account_spec: {
    account_manage: "账号管理",
    sub_account: "子账号",
    new_sub_account: "新建子账号",
    all: "全部",
    normal: "正常",
    disabled: "禁用",
    edit: "编辑",

    account: "登录账号",
    password: "登录密码",
    proxy_account: "代理用户名",
    proxy_password: "代理密码",
    remain_traffic: "剩余流量",
    total_traffic: "累计消耗额",
    remark: "备注",
    status: "状态",
    operation: "操作",
    no_traffic: "当前没有可用的动态代理IP池，请先 {buy}",
    to_buy: "购买流量",
    empty: "暂无数据",

    obtain_proxy: "手动提取",
    generate_doc: "生成文档",
    reset_proxy: "重置账密",
    reset: "一键重置",

    reset_info_title: "修改子账号",
    assign_traffic_title: "分配子账号流量",
    reset_proxy_title: "重置子账号账密",
    share_traffic: "共享流量",
    yes: "是",
    no: "否",
    share_traffic_des: "子账号是否和主账号共享流量，选择“是”将会关闭手动分配流量功能。",
    allocable: "可分配",
    allocable_traffic: "可分配流量",
    assign_traffic: "分配流量",
    assign_traffic_placeholder: "请输入分配流量",
    confirm: "确定",
    cancel: "取消",

    detail: "详情",
    usage: "使用情况",
    assign_record: "分配记录",
    realtime: "实时数据",

    use_time: "使用时间",
    assign_time: "分配时间",
    traffic: "流量",

    no_data: "暂无数据",
  },
}
