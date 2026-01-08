<template>
  <div class="help-center">
    <div class="box_wrap bg-[#f1f3ff]">
      <div class="container between">
        <div class="">
          <h1 class="text-3xl lg:text-4xl font-medium leading-none">{{ t("help_spec.title") }}</h1>
        </div>
        <div class="">
          <img src="@/assets/images/help/banner.png" width="318" height="258" alt="" />
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white menu" :style="{ top: top }">
      <div class="w-full vh_center">
        <ul class="v_center h-16 text-lg gap-20">
          <li :class="{ active: active === 0 }" @click="changeActive(0)" class="pointer h-full v_center menu_item text-gray-600 font-medium">
            {{ t("Quick_Start_Guide") }}
          </li>
          <li :class="{ active: active === 1 }" @click="changeActive(1)" class="pointer h-full v_center menu_item text-gray-600 font-medium">
            {{ t("Frequently_Asked_Questions") }}
          </li>
          <li :class="{ active: active === 2 }" @click="changeActive(2)" class="pointer h-full v_center menu_item text-gray-600 font-medium">
            {{ t("User_Guide") }}
          </li>
          <li :class="{ active: active === 3 }" @click="changeActive(3)" class="pointer h-full v_center menu_item text-gray-600 font-medium">
            {{ t("Contact_Us") }}
          </li>
        </ul>
      </div>
    </div>

    <div class="box_wrap bg-white quick_start" id="quick_start">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-4xl font-medium leading-none">{{ t("Quick_Start_Guide") }}</h1>
        <p class="text-base lg:text-lg grey-80 mt-5">{{ t("help_spec.quick_desc") }}</p>

        <div class="content w-full">
          <h5 class="text-lg font-medium">{{ t("help_spec.quick_title") }}</h5>
          <p class="text-sm mt-3">{{ t("help_spec.quick_desc") }}</p>
          <div class="w-full my-6">
            <ul class="flex items-start flex-wrap gap-6">
              <li class="flex-1">
                <div class="v_center space-x-6">
                  <img src="@/assets/images/help/guide1.png" class="himg h-[60px]" alt="" />
                  <div class="flex-1 split"></div>
                </div>
                <p class="text-slate-500 text-sm mt-3">{{ t("help_spec.quick_step1") }}</p>
              </li>
              <li class="flex-1">
                <div class="v_center space-x-5">
                  <img src="@/assets/images/help/guide2.png" class="himg h-[60px]" alt="" />
                  <div class="flex-1 split"></div>
                </div>
                <p class="text-slate-500 text-sm mt-3">{{ t("help_spec.quick_step2") }}</p>
              </li>
              <li class="flex-1">
                <div class="v_center space-x-5">
                  <img src="@/assets/images/help/guide3.png" class="himg h-[60px]" alt="" />
                  <div class="flex-1 split"></div>
                </div>
                <i18n-t keypath="help_spec.quick_step3" tag="p" class="text-slate-500 text-sm mt-3" scope="global">
                  <template #pwd_auth>
                    <RouterLink @click="beforeLink" class="primary font-medium underline pointer" to="/proxy">{{ t("User_Pass_Auth") }}</RouterLink>
                  </template>
                  <template #api_auth>
                    <RouterLink @click="beforeLink" class="primary font-medium underline pointer" to="/proxy?active=1">{{
                      t("API_Auth")
                    }}</RouterLink>
                  </template>
                </i18n-t>
              </li>
              <li class="flex-1">
                <div class="v_center space-x-5">
                  <img src="@/assets/images/help/guide4.png" class="himg h-[60px]" alt="" />
                  <div class="flex-1 split"></div>
                </div>
                <p class="text-slate-500 text-sm mt-3">{{ t("help_spec.quick_step4") }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white question" id="question">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-4xl font-medium leading-none">{{ t("help_spec.ques_title") }}</h1>
        <p class="text-base lg:text-lg grey-80 mt-5">{{ t("help_spec.ques_desc") }}</p>
        <div class="content w-full grid grid-cols-2 gap-x-4 gap-y-4 items-start">
          <Question class="w-full h-auto">
            <template #header> {{ t("help_spec.ques1_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques1_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques2_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques2_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques3_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques3_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques4_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques4_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques5_ask") }} </template>
            <template #content>
              <i18n-t keypath="help_spec.ques5_answer" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #product_link>
                  <RouterLink to="/product/residential">https://www.ipstar.io/product/residential</RouterLink>
                </template>
                <template #pricing_link>
                  <RouterLink to="/pricing/residential">https://www.ipstar.io/pricing/residential</RouterLink>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques6_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques6_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques7_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques7_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques8_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques8_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques9_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques9_answer") }}</p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.ques10_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("help_spec.ques10_answer") }}</p>
            </template>
          </Question>
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white question" id="user_guide">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-4xl font-medium leading-none">{{ t("User_Guide") }}</h1>
        <p class="text-base lg:text-lg grey-80 mt-5">{{ t("help_spec.guide_des") }}</p>

        <div class="content w-full grid grid-cols-2 gap-x-4 gap-y-4 items-start">
          <Question class="w-full">
            <template #header> {{ t("help_spec.guide1_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">
                {{ t("help_spec.guide1_answer") }}
                <RouterLink to="/doc" class="primary">...>></RouterLink>
              </p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.guide2_ask") }} </template>
            <template #content>
              <i18n-t keypath="help_spec.guide2_answer" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #link>
                  <a href="https://www.proxifier.com">https://www.proxifier.com</a>
                </template>
                <template #more>
                  <RouterLink to="/doc" class="primary">...>></RouterLink>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.guide3_ask") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">
                {{ t("help_spec.guide3_answer") }}
                <RouterLink to="/doc" class="primary">...>></RouterLink>
              </p>
            </template>
          </Question>
          <Question class="w-full">
            <template #header> {{ t("help_spec.guide4_ask") }} </template>
            <template #content>
              <div class="grid grid-cols-2 gap-4 py-1">
                <a href="https://ipstar.io/download/python.rar" class="!no-underline" @click.stop="beforeLink">
                  <IpButton class="w-full h-10 roundedsm v_center" type="border">Python</IpButton>
                </a>
                <a href="https://ipstar.io/download/php.rar" class="!no-underline" @click.stop="beforeLink">
                  <IpButton class="w-full h-10 roundedsm v_center" type="border">PHP</IpButton>
                </a>
                <a href="https://ipstar.io/download/java.rar" class="!no-underline" @click.stop="beforeLink">
                  <IpButton class="w-full h-10 roundedsm v_center" type="border">Java</IpButton>
                </a>
                <a href="javascript:;" @click.stop="gotoDocum" class="!no-underline">
                  <IpButton class="w-full h-10 roundedsm v_center" type="border">More</IpButton>
                </a>
              </div>
            </template>
          </Question>
        </div>

        <div class="column_center mt-8">
          <IpButton type="link" @click="gotoDocum">
            <div class="v_center space-x-3 font-medium">
              <span>{{ t("Learn_More") }}</span>
              <MoveRight :size="14" />
            </div>
          </IpButton>
        </div>
      </div>
    </div>

    <div class="box_wrap contact" id="contact_us">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-4xl font-medium leading-none white">{{ t("help_spec.contact_title") }}</h1>
        <div class="content w-full column_center">
          <ul class="between w-full max-w-4xl">
            <li class="v_center space-x-5" @click="toEmail">
              <img class="pointer" src="@/assets/images/help/contact1.png" width="60" height="60" alt="" />
              <div class="column space-y-1">
                <p class="text-sm opacity-80">{{ t("help_spec.contact1_title") }}</p>
                <strong class="font-medium pointer">{{ t("help_spec.contact1_answer") }}</strong>
              </div>
            </li>
            <li class="v_center space-x-5" @click="openGT">
              <img class="rounded-lg pointer" src="@/assets/images/help/contact2.png" width="60" height="60" alt="" />
              <div class="column space-y-1">
                <p class="text-sm opacity-80">{{ t("help_spec.contact2_title") }}</p>
                <strong class="font-medium pointer">{{ t("help_spec.contact2_answer") }}</strong>
              </div>
            </li>
            <li class="v_center space-x-5" @click="toCrisp">
              <img class="pointer" src="@/assets/images/help/contact3.png" width="60" height="60" alt="" />
              <div class="column space-y-1">
                <p class="text-sm opacity-80">{{ t("help_spec.contact3_title") }}</p>
                <div class="v_center space-x-2 pointer">
                  <strong class="font-medium">{{ t("help_spec.contact3_answer") }}</strong>
                  <IpButton type="ghost" class="px-1">
                    <MoveRight :size="14" class="white" />
                  </IpButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <IpDialog v-model="isQRcode" class="mask">
      <div class="mask_content space-y-5 column_center">
        <div class="image_box">
          <img src="@/assets/images/relation/tg.webp" alt="" />
        </div>
        <p class="font-semibold text-lg text-[#53845F] tracking-wider">@GLOBAL_IP_PROXY</p>
        <div class="close vh_center pointer transition-color black" @click="isQRcode = false">
          <CloseIcon :size="16" />
        </div>
      </div>
    </IpDialog>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { RouterLink, useRouter } from "vue-router"
import Question from "../components/question/question.vue"
import IpButton from "@/components/button/button.vue"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import Message from "@/components/message/message"
import { MoveRight, X as CloseIcon } from "lucide-vue-next"
import IpDialog from "@/components/dialog/index.vue"
import { isMobile } from "@/utils/tools"
import position from "@/components/dialog/position"

const { t } = useI18n()
const router = useRouter()
const { token } = loginStore()
const { isDocument, documentIdx, en } = settingStore()

const active = ref(0)
function changeActive(val) {
  const target = ["quick_start", "question", "user_guide", "contact_us"]
  const dom = document.getElementById(target[val])
  if (!dom) return
  window.scroll({
    top: dom.offsetTop - HeaderHeight.value - 60,
    behavior: "smooth",
  })

  active.value = val
  // dom.scrollIntoView({ behavior: "smooth" })
}

// Menu定位
const HeaderHeight = inject("HeaderHeight")
const top = computed(() => HeaderHeight.value + "px")

// a标签跳转之前验证是否登录
function beforeLink(e) {
  if (!token.value) {
    Message({
      type: "warning",
      message: en.value ? "Please login first" : "请先登录",
    })
    router.push("/login")
    e.preventDefault()
  }
}

// GT 二维码
const isQRcode = ref(false)
function openGT(e) {
  if (isMobile()) {
    window.open("https://t.me/global_ip_proxy")
  } else {
    position.set({ x: e.clientX, y: e.clientY })
    isQRcode.value = true
  }
}
// 邮箱跳转
function toEmail() {
  window.open("mailto:support@ipstar.io")
}
// srisp 即时聊天
function toCrisp() {
  window.$crisp.push(["do", "chat:show"])
  window.$crisp.push(["do", "chat:open"])
}

// 跳转代码
function gotoDocum() {
  if (!token.value) {
    Message({
      type: "warning",
      message: en.value ? "Please login first" : "请先登录",
    })
    router.push("/login")
    return
  }
  isDocument.value = "Help"
  documentIdx.value = "1-3-0"
  router.push("/doc")
}

onMounted(() => {
  // 预获取
  import("@/assets/images/login/bg-logo-new.webp")
  import("@/views/login/login.vue")
})
</script>

<style lang="less" scoped>
@import url("./help-center.less");
</style>
