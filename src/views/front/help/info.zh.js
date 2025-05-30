export default {
  dom: [
      {
        h1: '入门',
        p: 'Ipflare 为您提供高质量的代理 IP 服务。'
      },
      {
        h1: '如何使用 Ipflare 代理',
        p: '您可以单击以查看可用的集成方法。'
      },
      {
        h1: '常见问题解答',
        p: '您可以通过查看常见问题解答来解决问题。'
      }
    ],
    Getting: [
      [
        {
          title: '如何注册？',
          id: 1,
          p: [
            {
              txt: '您需要准备一封有效的电子邮件，然后转到管理控制台进行注册。'
            },
            {
              txt: '帐户激活后，您可以登录管理控制台以购买服务。'
            }
          ]
        },
        {
          title: '如何通过 IPflare API 获取 IP？',
          id: 3,
          p: [
            {
              txt: '购买产品后，您可以在控制台中的"获得代理"菜单中按需要提取 IP，IPflare 同时提供了用于获取 IP 代理通道的 API，这些 API 对于不同的编程语言非常方便。购买产品后，API 引用将显示在管理控制台的“API 引用”菜单项中。获得代理 IP 后，您现在可以将其集成到程序中。'
            }
          ]
        }
      ],
      [
        {
          title: '如何购买？',
          id: 2,
          p: [
            {
              txt: '登录管理控制台后，您可以单击左侧导航【产品】菜单项，进入代理凭据和产品包管理页面.'
            },
            {
              txt: '在【购买】选项页面中，有许多可选套餐。您可以根据业务需要选择合适的包装和数量。单击“购买”为您生成采购订单。'
            },
            {
              txt: '付款订单完成后，您可以看到“获取代理”和“获取代理API”菜单。根据API描述，您可以轻松访问我们的服务。'
            }
          ]
        },
        {
          title: '什么是 IP 白名单？',
          id: 4,
          p: [
            {
              txt: 'Ipflare 提供白名单选项。应用白名单策略可以增强您的业务安全性并降低服务风险。您可以在管理控制台的帐户设置中找到白名单管理菜单。'
            }
          ]
        }
      ]
    ],
    Integration: [
      [
        {
          title: '安卓',
          id: 1,
          p: [
            {
              txt: 'IPflare 支持 Android 中几乎所有的代理应用程序，如 Postern 和 v2rayNG。这里我们以 v2rayNG 为例，学习如何在 android APP 中设置设置和集成代理',
              type: 'followUp',
              idx: '1-0'
            }
          ]
        },
        {
          title: 'Windows',
          id: 3,
          p: [
            {
              txt: '谷歌搜索“proxifer”进行下载，官方网站的下载地址（付费）：'
            },
            {
              txt: 'https://www.proxifier.com/',
              type: 'a',
              url: 'https://www.proxifier.com/'
            },
            {
              txt: '我们包括了免费的中文破解版',
              type: 'followUp',
              idx: '1-2'
            }
          ]
        }
      ],
      [
        {
          title: 'IOS',
          id: 2,
          p: [
            {
              txt: '使用美国苹果 ID 登录应用商店，搜索“shadow locker”（俗称小火箭）进行下载和安装',
              type: 'followUp',
              idx: '1-1'
            }
          ]
        },
        {
          title: '源代码示例',
          id: 4,
          type: 'download'
        }
      ]
    ],
    FAQ: [
      [
        {
          title: '如何购买代理服务？',
          id: 1,
          p: [
            {
              txt: '如果您已经注册，请登录我们的网站，进入控制台，找到产品菜单，或直接单击以下链接：'
            },
            {
              txt: 'https://www.ipflare.com/#/products',
              type: 'a',
              url: 'https://www.ipflare.com/#/products'
            },
            {
              txt: '或者您可以单击以下链接并重定向到定价页面以查看我们的产品：'
            },
            {
              txt: 'https://www.ipflare.com/#/pricing',
              type: 'a',
              url: 'https://www.ipflare.com/#/pricing'
            }
          ]
        },
        {
          title: '付款后多久才能收到代理余额或激活我的新帐户？',
          id: 3,
          p: [
            {
              txt: '你应该在付款后立即拿到。当您完成付款后，返回程序并刷新您的 IP 余额，然后它将显示。'
            }
          ]
        },
        {
          title: '如果提取的 IP 地址无法使用怎么办？',
          id: 5,
          p: [
            {
              txt: '我们保证大部分的IP可用。如果发生这种情况，请更换另一个 IP 通道。Ipflare 只收取有效 IP 的费用，这意味着无效 IP 不会产生费用。'
            }
          ]
        }
      ],
      [
        {
          title: '使用您的网站在线支付安全吗？',
          id: 2,
          p: [
            {
              txt: '我们知道这对您的重要性，实际上，我们委托权威的第三方支付平台处理支付交易。这些平台包括Stripe、Payal和Coingate，这些平台是世界知名、安全性高且值得信赖的。我们只与第三方支付平台互动，不直接处理您的付款。当您准备付款时，您在网页上看到的要求您填写付款信息（如信用卡号）的界面是由权威第三方支付平台提供的界面集成组件，包括我们在内的任何人都无法收集您的信息，因此您的付款行为是绝对安全的。'
            }
          ]
        },
        {
          title: '如何切换到另一个 IP？',
          id: 4,
          p: [
            {
              txt: '您可以通过三种方式切换 IP 地址：'
            },
            {
              txt: '(1) 在获得的代理列表中重新选择 IP 地址通道。'
            },
            {
              txt: '(2) 调用用于切换 IP 的特殊 API。有关详细信息，请参阅 API 文档。'
            },
            {
              txt: '(3) 自定义代理用户名。'
            },
            {
              txt: 'IPflare 的代理用户格式通常为“user-ipstr-0-county-N”，这是一个实际示例：“u20247cwjfp-6Kv3RsAYBc-0-BR-N”，您可以将“ipstr”的第二段更改为另一个随机字符串以更改 IP 地址。同时，您可以将“country”的第四段更改为另一个国家代码来切换国家，并且在切换国家时，必须同时修改“ipstr”，否则修改将无效。'
            }
          ]
        },
        {
          title: 'Ipflare 的 IP 池有多大？',
          id: 6,
          p: [
            {
              txt: 'Ipflare 拥有5000多万个住宅 IP 地址，并定期更新以提供最干净的 IP 池。'
            }
          ]
        }
      ]
    ]
}