import { createWebHistory, createRouter } from "vue-router"
import { loadLocaleMessages } from "../language"
import Front from "@/views/front/front.vue"
import Home from "@/views/front/home/home.vue"
import loginStore from "../store/login"

const routes = [
  { path: "/", redirect: "/home" },

  // 前台板块
  {
    name: "front",
    component: Front,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/home/:name",
        name: "introduce",
        component: () => import("@/views/front/introduce/introduce.vue"),
      },
      {
        path: "/pricing",
        name: "pricing",
        component: () => import("@/views/front/pricing/pricing.vue"),
      },
      {
        path: "/relation",
        name: "relation",
        component: () => import("@/views/front/relation/relation.vue"),
      },
      {
        path: "/help",
        name: "help",
        component: () => import("@/views/front/help/help.vue"),
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
    meta: { index: 4, keepAlive: true },
    component: () => import("@/views/back/layout.vue"),
    children: [
      {
        path: "/overview",
        name: "overview",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/overview/overview.vue"),
      },
      {
        path: "/purchase",
        name: "purchase",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/purchase/purchase.vue"),
      },
      {
        path: "/residential",
        name: "residential",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/residential/residential.vue"),
      },
      {
        path: "/unlimited",
        name: "unlimited",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/unlimited/unlimited.vue"),
      },
      {
        path: "/products",
        name: "products",
        meta: { index: 12, keepAlive: false },
        component: () => import("@/views/back/products/products.vue"),
      },
      {
        path: "/billings",
        name: "billings",
        meta: { index: 13, keepAlive: false },
        component: () => import("@/views/back/billings/billings.vue"),
      },
      {
        path: "/proxy",
        name: "proxy",
        meta: { index: 15, keepAlive: false },
        component: () => import("@/views/back/proxy/proxy.vue"),
      },
      {
        path: "/generate_api",
        name: "api",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/API/api.vue"),
      },
      {
        path: "/settings",
        name: "settings",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/settings/settings.vue"),
      },
      {
        path: "/whitelist",
        name: "whitelist",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/whitelist/whitelist.vue"),
      },
      {
        path: "/account",
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

router.beforeEach(async (to, from, next) => {
  const { isLogin } = loginStore()

  if (to.name) {
    await loadLocaleMessages(to.name)
  }

  if (!isLogin.value && loginPath.test(to.path)) {
    next("/login")
  } else if (isLogin.value && to.path === "/login") {
    next("/home")
  }

  next()
})

export default router
