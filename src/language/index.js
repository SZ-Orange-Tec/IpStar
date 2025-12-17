// 使用插件
import { createI18n } from "vue-i18n"
import zh from "./home/zh"
import en from "./home/en"
// import HomeMessage from "./home/index"
import setting from "@/store/setting"
import { nextTick } from "vue"

const language = navigator.language.toLowerCase()
const langMap = {
  "zh-cn": "zh",
  "en-us": "en",
}
let locale = localStorage.getItem("lang")
if (locale !== "en" && locale !== "zh") {
  locale = langMap[language] ?? "en"
}

const i18n = createI18n({
  // legacy: false,
  locale: locale, // 语言标识,第一次登录默认是中文
  messages: {
    zh: {
      ...zh,
      site: {
        title: "Ipstar.io 专业全球 IP 代理服务商",
        description:
          "提供 HTTP/SOCKS5 动态住宅、静态及移动 IP 代理。支持 Windows/Mac/Android 全平台无限并发连接，大数据采集与匿名浏览的高速稳定首选方案。",
        keywords:
          "IpStar,代理服务,安全浏览,快速上网,匿名冲浪,绕过地域限制,隐私保护,高速代理,多设备支持,在线安全,大型模型,数据收集,免费试用,VPN替代方案,网络自由",
      },
    },
    en: {
      ...en,
      site: {
        title: "Ipstar.io: Professional Global IP Proxy Service.",
        description: "Access Rotating Residential, Static & Mobile IPs via HTTP/SOCKS5. Unlimited concurrency for scraping on Windows, Mac & Mobile.",
        keywords:
          "IpStar,Proxy Service,Secure Browsing,Fast Internet Access,Anonymous Surfing,Bypass Geo-Restrictions,Privacy Protection,High-Speed Proxy,Multi-Device Support,Online Security,Large Model,Data Collection,Free Trial,VPN Alternative,Internet Freedom",
      },
    },
  },
  warnHtmlInMessage: false,
  warnHtmlMessage: false,
})
localStorage.setItem("lang", locale)

// 设置语言
export function setI18nLanguage(locale) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  // 记录语言
  const { lang } = setting()
  lang.value = locale
  localStorage.setItem("lang", locale)
}

// 按路由加载语言
export async function loadLocaleMessages(path, locale = i18n.global.locale) {
  try {
    if (locale !== "en" && locale !== "zh") {
      locale = "en"
      setI18nLanguage(locale)
    }
    const { default: messages } = await import(/* webpackChunkName: "locale-[request]" */ `./${path}/${locale}.js`)
    // console.log(messages)

    i18n.global.mergeLocaleMessage(locale, messages)
  } catch (error) {
    console.log(error.messages)
  }

  return nextTick()
}

export default i18n
