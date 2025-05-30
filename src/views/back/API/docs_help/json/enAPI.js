export default [
  {
    type: 'bigParagraph',
    titleType: 'h3',
    title: '1. Basic API',
    id: 'basic_api',
    a: ['http://service.ipflare.com/v1/'],
    aIdx: 0,
    text: ['Request address:']
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '1.1 obtain_proxy_endpoints',
    id: 'obtain_proxy_endpoints',
    content: [
      {
        span: 'Description',
        p: 'Get the network proxy access point information (get the ip proxy channel)'
      },
      {
        span: 'Method',
        p: 'POST/GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of request',
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
    }`
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
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
    }`
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return, When Resptype=1',
    codeText: `{
      Code: 0,
      Msg: '',
      Data: [
        'ups1. tomato end. co: 58429: _652_YlLVi4daYc_90_DE_N: ur7e8h',
        'ups1. tomato end. co: 43521, u652_UONoViBR5l_90_DE_N: ur7e8h'
      ]
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      [
        'Apikey',
        'Yes',
        'String',
        'Request the authorization key of the API. After registration, you can find it in the account setting information of the platform.'
      ],
      [
        'Session',
        'No',
        'String',
        'If multiple threads of the same user call the API at the same time, you can use the session parameter to specify a session name (a string that does not repeat each other) to ensure that the channels obtained by each thread are not repeated'
      ],
      ['Protocol', 'Yes', 'Int', 'Proxy Agreement. 0: socks5, 1: http/https'],
      [
        'Count',
        'Yes',
        'Int',
        'Get the number of proxy channels at one time, the maximum value is 5000'
      ],
      [
        'Keeptime',
        'No',
        'Int',
        'The time that the IP remains unchanged. 0 means no limit'
      ],
      [
        'Autoswitch',
        'No',
        'Int',
        'When the value is 1, the IP will be automatically changed after the keeptime'
      ],
      [
        'Region',
        'No',
        'String',
        'For the region code, please refer to the region code table. If this value is blank, it means that it is randomly obtained worldwide.'
      ],
      [
        'Restype',
        'No',
        'Int',
        'Specifies the format of the returned data. When the value of this variable is 0, json data is returned; otherwise, data in brief format is returned.'
      ],
      ['Sign', 'Yes', 'String', 'Sign=md5 (apiky+protocol+count+region)']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned successfully, otherwise an error code is returned'],
      ['Msg', 'error message'], ['Data', 'Returns an array containing all proxy access points'],
      ['Server', 'Network proxy access point server'],
      ['Port', 'Access point port'],
      ['User', 'user name'],
      ['Pass', 'password']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '1.2 whitelist/getlist',
    id: 'whitelist_getlist',
    content: [
      {
        span: 'Description',
        p: 'Get the whitelist list.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/whitelist/getlist?apikey=598f6bb74621d373c5de76832627bade'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
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
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Request parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [['Apikey', 'Yes', 'String', 'Apikey for your account']]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned successfully, otherwise an error code is returned'],
      ['Msg', 'error message'],
      ['Data', 'Returns an array containing all whitelist IPs'],
      ['Ip', 'whitelist IP address'],
      ['Notes', 'Remarks on the IP address']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '1.3 whitelist/add',
    id: 'whitelist_add',
    content: [
      {
        span: 'Description',
        p: 'Add an IP address to the whitelist'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/whitelist/add?apikey=598f6bb74621d373c5de76832627bade&ip=26.34.124.33&notes=remark1'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Request parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Apikey', 'Yes', 'String', 'Apikey for your account'],
      ['Ip', 'Yes', 'String', 'IP to be added to the whitelist'],
      ['Notes', 'No', 'String', 'Remarks']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned on success, otherwise an error code is returned'],
      ['Msg', 'error message']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '1.4 whitelist/remove',
    id: 'whitelist_remove',
    content: [
      {
        span: 'Description',
        p: 'Delete an IP address from the whitelist'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/ whitelist/remove?apikey=598f6bb74621d373c5de76832627bade&ip=26.34.124.33'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Apikey', 'Yes', 'String', 'Apikey for your account'],
      ['Ip', 'Yes', 'String', 'IP removed from white list']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned on success, otherwise an error code is returned'],
      ['Msg', 'error message']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '1.5 whitelist/clear',
    id: 'whitelist_clear',
    content: [
      {
        span: 'Description',
        p: 'Clear the blank list'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/ whitelist/clear?apikey=598f6bb74621d373c5de76832627bade'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Request parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [['Apikey', 'Yes', 'String', 'Apikey for your account']]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [['Code', '0 is returned on success, otherwise an error code is returned'], ['Msg', 'error message']]
  },
  // 2.partner API
  {
    type: 'bigParagraph',
    titleType: 'h3',
    title: '2. Partner API',
    id: 'partner_api',
    a: ['', '', 'http://service.ipflare.com/v1/xxxx/xxxx/'],
    aIdx: 2,
    pIdx: 3,
    text: [
      'This is a set of advanced APIs for customers with deep cooperation. To use this set of APIs, you must become our sales agent. The functions provided by this set of APIs allow users to maintain their own sub users on the platform, such as adding their own downstream customers, including modification, deletion, recharge and other functions, so that you can easily sell our services to your own customers',
      'If you need to be our sales agent, please contact us.',
      'Request address:',
      'Please contact us for the actual request URL of this group of APIs.'
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.1 login',
    id: 'login',
    content: [
      {
        span: 'Description',
        p: 'Main account login'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/ login? user=6189&password=123456'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: {
        Usercode: '6189',
        Username: 'customer test',
        Token: '7c65949698ad5cae50ab2b8e052733f3'
      }
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['User', 'Yes', 'String', 'Your account code or e-mail'],
      ['Password', 'Yes', 'String', 'Your account password for login']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned on success, otherwise an error code is returned'],
      ['Msg', 'error message'],
      ['Token', 'The user\'s login credentials on the server will be used by all the following apis']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.2 add_sub_user',
    id: 'add_sub_user',
    content: [
      {
        span: 'Description',
        p: 'Add a sub user attached to your main account and managed by you.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/add_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=user180&password=usub1&cust_name=subuser1&proxy_user=prxuxx&proxy_pass=123456&status=1'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'Yes', 'String', 'Sub user number, which cannot be repeated, or it will fail to add'],
      ['Password', 'Yes', 'String', 'Sub user account password'],
      ['Proxy_ User', 'Yes', 'String', 'The proxy user name, and the sub user\'s authentication user name using the proxy'],
      ['Proxy_ Pass', 'Yes', 'String', 'Proxy user password, and sub users use the proxy authentication password.'],
      ['Status', 'Yes', 'String', 'The default status of the sub user\'s account: 1: normal, 0: disabled']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Code', '0 is returned on success, otherwise an error code is returned'],
      ['Msg', 'error message']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.3 update_sub_user',
    id: 'update_sub_user',
    content: [
      {
        span: 'Description',
        p: 'Update some information of a sub user, including name, proxy authentication user name, proxy authentication password, and status.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/update_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&password=usub1&cust_name=subuser1&proxy_user=prxuxx&proxy_pass=123456&status=1'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Name', 'Yes', 'String', 'New name of the sub account user'],
      ['Password', 'Yes', 'String', 'New login password of sub user account'],
      ['Proxy_ User', 'Yes', 'String', 'Subuser new proxy authentication user name'],
      ['Proxy_ Pass', 'Yes', 'String', 'The authentication password of the new agent for the child user.'],
      ['Status', 'Yes', 'String', 'Set the status of the sub user\'s account, 1: normal, 0: disabled']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.4 enable_sub_user',
    id: 'enable_sub_user',
    content: [
      {
        span: 'Description',
        p: 'Set whether the sub account status is available.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/enable_sub_user?token=7c65949698ad5cae50ab2b8e052733f3&&Status=1'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Status', 'Yes', 'String', 'Set the status of the sub user\'s account, 1: normal, 0: disabled']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.5 charge_user',
    id: 'charge_user',
    content: [
      {
        span: 'Description',
        p: 'To recharge the sub account, you need to purchase a traffic package from the main account before performing this operation. When you recharge the sub account, the balance of the traffic purchased in your main account will be deducted at the same time.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/charge_user?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&packsize=1024'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success'
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'Yes', 'String', 'Sub account user No'],
      ['Packsize', 'Yes', 'String', 'The size of the recharged flow packet, in Mb']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.6 get_user_info',
    id: 'get_user_info',
    content: [
      {
        span: 'Description',
        p: 'Get the user information of the account. If cust_ If the code is empty, the information of the primary account will be obtained; otherwise, the information of the sub account will be obtained'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/get_user_info?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
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
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'No', 'String', 'The sub account user number. If it is empty, the main account information will be returned.']
    ]
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters of return data:',
    thead: ['Name', 'Description'],
    tbody: [
      ['Cust_ Code', 'User No'],
      ['Password', 'User password. If it is a primary account, this information is the encrypted password'],
      ['Cust_ Name', 'User name'],
      ['Proxy_ User', 'Proxy Authentication User Name'],
      ['Proxy_ Pass', 'Proxy Authentication User Password'],
      ['Parent_ Cust_ Code', 'If the returned information is sub account information, this field is the user number of the parent account of the current sub account.'],
      ['Pack_ Value', 'Remaining value of account flow, in Mb']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.7 data_report',
    id: 'data_report',
    content: [
      {
        span: 'Description',
        p: 'Daily flow consumption report.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/data_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'Yes', 'String', 'The user number of the sub account. This parameter is optional. If this parameter is passed in, the traffic report of the sub account is returned. If it is empty, the daily summary of the data of all sub accounts under the main account represented by the token is returned'],
      ['Begin_ Day', 'Yes', 'String', 'Start Date'],
      ['End_ Day', 'Yes', 'String', 'End Date']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.8 detail_report',
    id: 'detail_report',
    content: [
      {
        span: 'Description',
        p: 'Daily report of traffic consumption (including sub report).'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/detail_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'Yes', 'String', 'The sub account user number. This parameter is optional. If this parameter is passed in, the traffic report of the sub account will be returned. If it is empty, the daily consumption details of the data of all sub accounts under the main account represented by the token will be returned'],
      ['Begin_ Day', 'Yes', 'String', 'Start Date'],
      ['End_ Day', 'Yes', 'String', 'End Date']
    ]
  },
  {
    type: 'request',
    titleType: 'h3',
    title: '2.9 balance_report',
    id: 'balance_report',
    content: [
      {
        span: 'Description',
        p: 'Query the daily report under the account, including recharge and consumption logs.'
      },
      {
        span: 'Method',
        p: 'GET'
      },
      {
        span: 'Return Format',
        p: 'JSON'
      },
      {
        span: 'Example of request',
        p: 'http://service.ipflare.com/v1/xxxx/xxxx/balance_report?token=7c65949698ad5cae50ab2b8e052733f3&cust_code=subuser1&begin_day=2019-02-01&end_day=2019-03-31'
      }
    ]
  },
  {
    type: 'codeBlock',
    titleType: 'h4',
    title: 'Example of return',
    codeText: `{
      Code: 0,
      Msg: 'success',
      Data: ''
    }`
  },
  {
    type: 'table',
    titleType: 'h4',
    title: 'Parameters description',
    thead: ['Name', 'Required', 'Type', 'Description'],
    tbody: [
      ['Token', 'Yes', 'String', 'Credentials acquired after login'],
      ['Cust_ Code', 'Yes', 'String', 'The sub account user number. This parameter is optional. If this parameter is passed in, the traffic report of the sub account will be returned. If it is empty, the daily consumption details of the data of all sub accounts under the main account represented by the token will be returned'],
      ['Ischarge', 'Yes', 'Int', '0: return consumption record, 1: return recharge record'],
      ['Begin_ Day', 'Yes', 'String', 'Start Date'],
      ['End_ Day', 'Yes', 'String', 'End Date']
    ]
  }
]
