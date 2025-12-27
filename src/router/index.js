import { createWebHistory, createRouter } from "vue-router"
import { loadLocaleMessages, setI18nLanguage } from "../language"
import Front from "@/views/front/front.vue"
import Home from "@/views/front/home/home.vue"
import loginStore from "../store/login"

const routes = [
  { path: "/", redirect: "/home" },

  // 前台板块
  {
    name: "front",
    path: "/:locale?",
    component: Front,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "home/:name",
        name: "introduce",
        component: () => import("@/views/front/introduce/introduce.vue"),
      },
      {
        path: "product/:name",
        name: "product",
        component: () => import("@/views/front/product/residential/index.vue"),
      },
      {
        path: "unlimited-residential-proxy",
        name: "unlimited-proxy",
        component: () => import("@/views/front/product/unlimited/index.vue"),
      },
      {
        path: "mobile-proxy",
        name: "mobile-proxy",
        component: () => import("@/views/front/product/mobile/index.vue"),
      },
      {
        path: "pricing/:name",
        name: "pricing",
        component: () => import("@/views/front/pricing/pricing.vue"),
      },
      {
        path: "relation",
        name: "relation",
        component: () => import("@/views/front/relation/relation.vue"),
      },
      {
        path: "help",
        name: "help",
        component: () => import("@/views/front/help/help.vue"),
      },
      {
        path: "country",
        name: "country",
        component: () => import("@/views/front/country/index.vue"),
      },
      {
        path: "country/:code",
        name: "country_detail",
        component: () => import("@/views/front/country/detail.vue"),
      },
      {
        path: "ipaddress",
        name: "ipaddress",
        component: () => import("@/views/front/ipaddress/index.vue"),
      },
    ],
  },
  // 登录板块
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  // 后台板块
  {
    name: "back",
    path: "/:locale?",
    meta: { index: 4, keepAlive: true },
    component: () => import("@/views/back/layout.vue"),
    children: [
      {
        path: "overview",
        name: "overview",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/overview/overview.vue"),
      },
      {
        path: "proxy",
        name: "proxy",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/proxy/proxy.vue"),
      },
      {
        path: "purchase",
        name: "purchase",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/purchase/purchase.vue"),
      },
      {
        path: "residential",
        name: "residential",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/residential/residential.vue"),
      },
      {
        path: "unlimited",
        name: "unlimited",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/unlimited/unlimited.vue"),
      },
      {
        path: "mobile",
        name: "mobile",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/mobile/mobile.vue"),
      },
      {
        path: "data_center",
        name: "data_center",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/data_center/data_center.vue"),
      },
      {
        path: "settings",
        name: "settings",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/settings/settings.vue"),
      },
      {
        path: "whitelist",
        name: "whitelist",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/whitelist/whitelist.vue"),
      },
      {
        path: "sub_account",
        name: "account",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/account/index.vue"),
      },

      // {
      //   path: '/configure',
      //   name: '设置',
      //   meta: { index: 16, keepAlive: false },
      //   component: () => import('@/views/layout/api_config/api_config.vue')
      // }
    ],
  },
  {
    path: "/doc",
    // name: "doc",
    meta: { index: 5, keepAlive: false },
    component: () => import("@/views/doc/doc.vue"),
  },
  {
    path: "/commitment",
    name: "commitment",
    meta: { keepAlive: false },
    component: () => import("@/views/front/commitment/commitment.vue"),
  },
  {
    path: "/payment_success",
    name: "payment_success",
    meta: { keepAlive: false },
    component: () => import("@/views/payment_success/payment_success.vue"),
  },
  // 404 放最后
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

const loginPath = /\/overview|\/products|\/billings|\/proxy|\/api|\/settings/
function checkLogin(path) {
  const { isLogin } = loginStore()
  const token = localStorage.getItem("token")
  return isLogin.value || Boolean(token)
}
router.beforeEach(async (to, from, next) => {
  const isLogin = checkLogin()

  if (to.params?.locale && to.params.locale === "zh") {
    setI18nLanguage("zh")
  }

  if (to.name) {
    await loadLocaleMessages(to.name)
  }

  if (!isLogin && loginPath.test(to.path)) {
    next("/login")
  } else if (isLogin && to.path === "/login") {
    next("/home")
  }

  next()
})

export default router
