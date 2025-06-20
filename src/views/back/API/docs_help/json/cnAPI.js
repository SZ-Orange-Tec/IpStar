export default [
  {
    type: "bigParagraph",
    titleType: "h3",
    title: "1. 基本API",
    id: "basic_api",
    a: ["http://service.ipstar.io/v1/"],
    aIdx: 0,
    text: ["请求地址:"],
  },
  {
    type: "request",
    titleType: "h3",
    title: "1.1 obtain_proxy_endpoints",
    id: "obtain_proxy_endpoints",
    content: [
      {
        span: "描述",
        p: "获取网络代理接入点信息(获取ip代理通道)",
      },
      {
        span: "方法",
        p: "POST/GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "请求示例",
    codeText: `{
      Apikey: '598f6bb74621d373c5de76832627bade',
      Session: '',
      Protocol: 1,
      Count: 2,
      Keeptime: 0,
      Autoswitch: 0,
      Region: 'US',
      Resptype: 0,
      Sign: '098f6bcd4621d373cade4e832627b4f6'
    }`,
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: '',
      Data: [
        {
          Server: 'ups1.tomato-end.co',
          Port: 58429,
          User: '_652_YlLVi4daYc_90_DE_N: ur7e8h',
          Pass: 'ur7e8h',
          Ptype: 'http'
        },
        {
          Server: 'ups1.tomato-end.co',
          Port: 43521,
          User: '_652_UONoViBR5l_90_DE_N',
          Pass: 'ur7e8h',
          Ptype: 'http'
        }
      ]
    }`,
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例，当Resptype=1时",
    codeText: `{
      Code: 0,
      Msg: '',
      Data: [
        'ups1. tomato end. co: 58429: _652_YlLVi4daYc_90_DE_N: ur7e8h',
        'ups1. tomato end. co: 43521, u652_UONoViBR5l_90_DE_N: ur7e8h'
      ]
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Apikey", "Yes", "String", "请求API的授权密钥。注册完成后，可以在平台的账号设置信息中找到。"],
      [
        "Session",
        "No",
        "String",
        "如果同一用户的多个线程同时调用API，可以使用session参数指定会话名(一个互不重复的字符串)，以确保每个线程获得的通道不重复",
      ],
      ["Protocol", "Yes", "Int", "代理协议0:socks5, 1: http/https"],
      ["Count", "Yes", "Int", "获取一次代理通道数，最大值为5000"],
      ["Keeptime", "No", "Int", "IP保持不变的时间。0表示没有限制"],
      ["Autoswitch", "No", "Int", "当该值为1时，在keeptime后会自动修改IP"],
      ["Region", "No", "String", "区域代码参见区域代码表。如果该值为空，则表示它是在全球范围内随机获得的。"],
      ["Restype", "No", "Int", "指定返回数据的格式。当该变量的值为0时，返回json数据;否则，将返回简短格式的数据。"],
      ["Sign", "Yes", "String", "符号= md5 (apiky +协议+数+地区)"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "成功返回0，否则返回错误码"],
      ["Msg", "错误消息"],
      ["Data", "返回包含所有代理访问点的数组"],
      ["Server", "网络代理接入点服务器"],
      ["Port", "接入点端口"],
      ["User", "用户名"],
      ["Pass", "密码"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "1.2 whitelist/getlist",
    id: "whitelist_getlist",
    content: [
      {
        span: "描述",
        p: "获取白名单列表。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/whitelist/getlist?apikey=598f6bb74621d373c5de76832627bade",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: '',
      Data: [{
        Ip: '29.33.144.33',
        Notes: 'remark1'
      }, {
        Ip: '29.33.147.36',
        Notes: 'remark2'
      }]
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "请求参数说明",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [["Apikey", "Yes", "String", "Apikey为您的帐户"]],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "成功返回0，否则返回错误码"],
      ["Msg", "错误消息"],
      ["Data", "返回一个包含所有白名单ip的数组"],
      ["Ip", "白名单IP地址"],
      ["Notes", "IP地址备注"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "1.3 whitelist/add",
    id: "whitelist_add",
    content: [
      {
        span: "描述",
        p: "添加IP地址到白名单中",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/whitelist/add?apikey=598f6bb74621d373c5de76832627bade&ip=26.34.124.33&notes=remark1",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "请求参数说明",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Apikey", "Yes", "String", "Apikey为您的帐户"],
      ["Ip", "Yes", "String", "需要加入白名单的IP地址"],
      ["Notes", "No", "String", "讲话"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "如果成功则返回0，否则返回错误码"],
      ["Msg", "错误消息"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "1.4 whitelist/remove",
    id: "whitelist_remove",
    content: [
      {
        span: "描述",
        p: "从白名单中删除IP地址",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/ whitelist/remove?apikey=598f6bb74621d373c5de76832627bade&ip=26.34.124.33",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Apikey", "Yes", "String", "Apikey为您的帐户"],
      ["Ip", "Yes", "String", "IP从白名单中删除"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "如果成功则返回0，否则返回错误码"],
      ["Msg", "错误消息"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "1.5 whitelist/clear",
    id: "whitelist_clear",
    content: [
      {
        span: "描述",
        p: "清空空白列表",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/ whitelist/clear?apikey=598f6bb74621d373c5de76832627bade",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "请求参数说明",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [["Apikey", "Yes", "String", "Apikey为您的帐户"]],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "如果成功则返回0，否则返回错误码"],
      ["Msg", "错误消息"],
    ],
  },
  // 2.partner API
  {
    type: "bigParagraph",
    titleType: "h3",
    title: "2. 合作伙伴的API",
    id: "partner_api",
    a: ["", "", "http://service.ipstar.io/v1/xxxx/xxxx/"],
    aIdx: 2,
    pIdx: 3,
    text: [
      "这是一套深度合作客户的高级api。要使用这套api，您必须成为我们的销售代理。这组api提供的功能可以让用户在平台上维护自己的子用户，比如添加自己的下游客户，包括修改、删除、充值等功能，这样你就可以轻松地把我们的服务卖给自己的客户",
      "如果您需要做我们的销售代理，请联系我们。",
      "请求地址:",
      "请与我们联系这组api的实际请求URL。",
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.1 login",
    id: "login",
    content: [
      {
        span: "描述",
        p: "主账号登录",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/ login? user=6189&password=123456",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: {
        Usercode: '6189',
        Username: 'customer test',
        Token: '7c65949698ad5cae50ab2b8e052733f3'
      }
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["User", "Yes", "String", "您的帐户代码或电子邮件"],
      ["Password", "Yes", "String", "您登录的帐户密码"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "如果成功则返回0，否则返回错误码"],
      ["Msg", "错误消息"],
      ["Token", "用户在服务器上的登录凭证将被以下所有api使用"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.2 add_sub_user",
    id: "add_sub_user",
    content: [
      {
        span: "描述",
        p: "添加一个子用户附加到您的主帐户，并由您管理。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/add_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=user180&password=usub1&cust_name=subuser1&proxy_user=prxuxx&proxy_pass=123456&status=1",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      ["Cust_ Code", "Yes", "String", "子用户号码，不能重复，否则会添加失败"],
      ["Password", "Yes", "String", "子用户帐号密码"],
      ["Proxy_ User", "Yes", "String", "代理用户名，以及使用代理的子用户的身份验证用户名"],
      ["Proxy_ Pass", "Yes", "String", "代理用户密码，子用户使用代理认证密码。"],
      ["Status", "Yes", "String", "子用户账号的默认状态为:1:正常，0:禁用"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Code", "如果成功则返回0，否则返回错误码"],
      ["Msg", "错误消息"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.3 update_sub_user",
    id: "update_sub_user",
    content: [
      {
        span: "描述",
        p: "更新子用户的部分信息，包括用户名、代理认证用户名、代理认证密码和状态。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/update_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&password=usub1&cust_name=subuser1&proxy_user=prxuxx&proxy_pass=123456&status=1",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      ["Cust_ Name", "Yes", "String", "子帐户用户的新名称"],
      ["Password", "Yes", "String", "子用户帐号的新登录密码"],
      ["Proxy_ User", "Yes", "String", "Subuser新的代理认证用户名"],
      ["Proxy_ Pass", "Yes", "String", "子用户的新代理的身份验证密码。"],
      ["Status", "Yes", "String", "设置子用户帐户的状态，1:正常，0:禁用"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.4 enable_sub_user",
    id: "enable_sub_user",
    content: [
      {
        span: "描述",
        p: "设置子帐户状态是否可用。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/enable_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&&Status=1",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      ["Status", "Yes", "String", "设置子用户帐户的状态，1:正常，0:禁用"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.5 charge_user",
    id: "charge_user",
    content: [
      {
        span: "描述",
        p: "若要为子账号充值，需要在主账号购买流量包后再执行该操作。充值子账户时，将同时扣除主账户内购买流量的余额。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/charge_user?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&packsize=1024",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      ["Cust_ Code", "Yes", "String", "子账号用户编号"],
      ["Packsize", "Yes", "String", "充流量包的大小，单位MB"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.6 get_user_info",
    id: "get_user_info",
    content: [
      {
        span: "描述",
        p: "获取该帐户的用户信息。如果cust_如果代码为空，将获得主帐户的信息;否则会获取子账号的信息",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/get_user_info?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'ok',
      Data: {
        Cust_id: 3,
        Cust_code: 'subuser1',
        Password: 'dfdfsxx',
        Cust_name: 'xxx',
        Proxy_user: 'dfdf',
        Proxy_pass: 'dfsdf',
        Parent_cust_code: '78834',
        Pack_value: 8797762,
        Status: 1,
        Create_time: '2019-01-09 13:19:122'
      }
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      ["Cust_ Code", "No", "String", "子帐户用户号码。如果为空，则返回主帐户信息。"],
    ],
  },
  {
    type: "table",
    titleType: "h4",
    title: "返回数据参数:",
    thead: ["名称", "描述"],
    tbody: [
      ["Cust_ Code", "用户没有"],
      ["Password", "用户密码。如果是主帐户，则此信息为加密密码"],
      ["Cust_ Name", "用户名"],
      ["Proxy_ User", "代理认证用户名"],
      ["Proxy_ Pass", "代理认证用户密码"],
      ["Parent_ Cust_ Code", "如果返回信息为子帐号信息，则此字段为当前子帐号的父帐号的用户号。"],
      ["Pack_ Value", "账户流量的剩余值，单位MB"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.7 data_report",
    id: "data_report",
    content: [
      {
        span: "描述",
        p: "每日流量消耗报告。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/data_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      [
        "Cust_ Code",
        "Yes",
        "String",
        "子帐号的用户号码。可选参数。如果传入该参数，则返回子账号的流量报表。如果它为空，则返回由令牌表示的主帐户下的所有子帐户的数据的每日摘要",
      ],
      ["Begin_ Day", "Yes", "String", "开始日期"],
      ["End_ Day", "Yes", "String", "结束日期"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.8 detail_report",
    id: "detail_report",
    content: [
      {
        span: "描述",
        p: "流量消耗日报表(含子报表)。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/detail_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      [
        "Cust_ Code",
        "Yes",
        "String",
        "子帐户用户号码。可选参数。如果传入该参数，则返回子账号的流量报表。如果为空，则将返回该令牌所表示的主帐户下所有子帐户数据的每日消费详细信息",
      ],
      ["Begin_ Day", "Yes", "String", "开始日期"],
      ["End_ Day", "Yes", "String", "结束日期"],
    ],
  },
  {
    type: "request",
    titleType: "h3",
    title: "2.9 balance_report",
    id: "balance_report",
    content: [
      {
        span: "描述",
        p: "查询该账号下的日报表，包括充值和消费日志。",
      },
      {
        span: "方法",
        p: "GET",
      },
      {
        span: "返回格式",
        p: "JSON",
      },
      {
        span: "请求示例",
        p: "http://service.ipstar.io/v1/xxxx/xxxx/balance_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31",
      },
    ],
  },
  {
    type: "codeBlock",
    titleType: "h4",
    title: "返回示例",
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`,
  },
  {
    type: "table",
    titleType: "h4",
    title: "参数描述",
    thead: ["名称", "要求", "类型", "描述"],
    tbody: [
      ["Token", "Yes", "String", "登录后获得的凭证"],
      [
        "Cust_ Code",
        "Yes",
        "String",
        "子帐户用户号码。可选参数。如果传入该参数，则返回子账号的流量报表。如果为空，则将返回该令牌所表示的主帐户下所有子帐户数据的每日消费详细信息",
      ],
      ["Ischarge", "Yes", "Int", "0:返还消费记录，1:返还充值记录"],
      ["Begin_ Day", "Yes", "String", "开始日期"],
      ["End_ Day", "Yes", "String", "结束日期"],
    ],
  },
]
