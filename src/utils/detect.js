// 第三方监测
export default {
  // 用户浏览
  active () {
    googleActive()
  },
  // 注册
  register () {
    googleRegister()
  },
  // 领取礼包
  gift () {
    googleGift()
  },
  // 下单
  createOrder () {
    googleOrder()
  },
  // 支付
  payment (params) {
    googlePayment()

    twitterPayment(params)
  }
}

// 谷歌
function googleActive () { // 浏览
  const host = location.hostname
  if (/tomato-proxy.com/.test(host)) {
    window.gtag && window.gtag('event', 'conversion', {
      send_to: 'AW-16700955677/YSeNCPvQlbUaEJ240Zs-'
    })
  }
  return false
}
function googleRegister (url) { // 注册
  const host = location.hostname
  if (/tomato-proxy.com/.test(host)) {
    window.gtag && window.gtag('event', 'conversion', {
      send_to: 'AW-16700955677/jSRHCIfmlbUaEJ240Zs-'
    })
  }
  return false
}
function googleOrder (url) { // 下单
  // const host = location.hostname
  // if (/tomato-proxy.com/.test(host)) {
  //   window.gtag && window.gtag('event', 'conversion', {
  //     send_to: 'AW-16700955677/mOxICLOjoZsZEOyqibc9'
  //   })
  // }
}
function googleGift () {
  // const host = location.hostname
  // if (/tomato-proxy.com/.test(host)) {
  //   window.gtag && window.gtag('event', 'conversion', {
  //     send_to: 'AW-16700955677/hpvqCLyjoZsZEOyqibc9'
  //   })
  // }
}
function googlePayment (url) { // 支付完成
  const host = location.hostname
  if (/tomato-proxy.com/.test(host)) {
    window.gtag && window.gtag('event', 'conversion', {
      send_to: 'AW-16700955677/MYPZCJbDiLUaEJ240Zs-',
      transaction_id: ''
    })
  }
  return false
}

function twitterPayment ({ price = null, currency = null, order = null }) {
  const host = location.hostname
  if (/ipflare.com/.test(host)) {
    window.twq && window.twq('event', 'tw-pgwvj-pgwvk', {
      value: price,
      currency: currency,
      conversion_id: order
    })
  }
}
