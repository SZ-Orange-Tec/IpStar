import { createWebHistory, createRouter } from "vue-router"
import { loadLocaleMessages } from "../language"

const routes = [
  { path: "/", redirect: "/front" },

  // 前台板块
  {
    path: "/front",
    name: "首页",
    component: () => import("@/views/front/front.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/front/home/home.vue"),
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
    component: () => import(/* webpackPrefetch:true */ "@/views/back/layout.vue"),
    children: [
      {
        path: "/",
        redirect: "/overview",
      },
      {
        path: "/overview",
        name: "概述",
        meta: { index: 11, keepAlive: false },
        component: () => import("@/views/back/overview/overview.vue"),
      },
      {
        path: "/products",
        name: "产品",
        meta: { index: 12, keepAlive: false },
        component: () => import("@/views/back/products/products.vue"),
      },
      {
        path: "/billings",
        name: "订单",
        meta: { index: 13, keepAlive: false },
        component: () => import("@/views/back/billings/billings.vue"),
      },
      {
        path: "/obtain_proxy",
        name: "代理",
        meta: { index: 15, keepAlive: false },
        component: () => import("@/views/back/proxy/proxy.vue"),
      },
      {
        path: "/api",
        name: "API",
        meta: { index: 14, keepAlive: false },
        component: () => import("@/views/back/API/api.vue"),
      },
      // {
      //   path: "/settings",
      //   name: "设置",
      //   meta: { index: 14, keepAlive: false },
      //   component: () => import("@/views/layout/settings/settings.vue"),
      // },

      // {
      //   path: '/configure',
      //   name: '设置',
      //   meta: { index: 16, keepAlive: false },
      //   component: () => import('@/views/layout/api_config/api_config.vue')
      // }
    ],
  },
  // {
  //   path: "/help_document",
  //   name: "帮助文档",
  //   meta: { index: 5, keepAlive: false },
  //   component: () => import("@/views/help_document/help_document.vue"),
  // },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.name) {
    await loadLocaleMessages(to.name)
  }
  next()
})

export default router
