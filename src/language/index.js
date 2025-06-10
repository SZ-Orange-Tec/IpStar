// 使用插件
import { createI18n } from "vue-i18n"
import zh from "./language/local_zh"
import en from "./language/local_en"
// import HomeMessage from "./home/index"
import setting from "@/store/setting"
import { nextTick } from "vue"

const language = navigator.language
const langMap = {
  "zh-CN": "zh",
  "en-US": "en",
  "ru-RU": "ru",
}
const locale = localStorage.getItem("lang") || langMap[language]

const i18n = createI18n({
  locale: locale, // 语言标识,第一次登录默认是中文
  messages: {
    zh: { ...zh },
    en: { ...en },
  },
  warnHtmlMessage: true,
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
    const { default: messages } = await import(/* webpackChunkName: "locale-[request]" */ `./${path}/${locale}.js`)
    // console.log(messages)

    i18n.global.mergeLocaleMessage(locale, messages)
  } catch (error) {
    console.log(error.messages)
  }

  return nextTick()
}

export default i18n
