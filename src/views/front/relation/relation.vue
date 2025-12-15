<template>
  <div class="relation">
    <div class="box contact_us">
      <div class="container column_center lg:between gap-5">
        <div class="email space-y-6 column">
          <i18n-t keypath="relation_spec.title" tag="p" scope="global" class="text-lg sm:text-2xl lg:text-3xl title">
            <template #info>
              <span>{{ t("relation_spec.title_slot") }}</span>
            </template>
          </i18n-t>

          <div class="space-y-5 w-full">
            <div class="space-y-2">
              <p class="label text-sm">{{ t("relation_spec.full_name") }}</p>
              <input class="w-full transition-color text-sm" v-model.trim="fullName" :placeholder="t('relation_spec.full_name')" />
            </div>
            <div class="space-y-2">
              <p class="label text-sm">{{ t("Email") }}</p>
              <input class="w-full transition-color text-sm" v-model.trim="email" :placeholder="t('Email')" />
            </div>
            <div class="space-y-2">
              <p class="label text-sm">{{ t("relation_spec.help") }}</p>
              <textarea class="w-full transition-color text-sm" v-model.trim="content" :placeholder="t('relation_spec.help1')"></textarea>
            </div>
          </div>

          <IpButton type="primary" class="px-5 h-10" @click="sendInfo">
            <div class="v_center space-x-2">
              <p>{{ t("Send_message") }}</p>
              <ArrowRight :size="16" v-if="!loading" />
              <span class="ip-loading" v-else></span>
            </div>
          </IpButton>
        </div>

        <div class="column concat">
          <div class="header w-full flex-1 vh_center">
            <img src="@/assets/images/relation/background.png" class="h-full" alt="" />
          </div>
          <div class="bottom">
            <div class="top flex space-x-2" style="align-items: flex-start">
              <img class="flex-shrink-0" src="@/assets/images/relation/icon.png" width="30" height="30" alt="" />
              <div class="column space-y-2">
                <p class="title text-base success">{{ t("relation_spec.serve") }}</p>
                <p class="description text-sm">{{ t("relation_spec.serve_des") }}</p>
              </div>
            </div>

            <div class="bottom flex w-full">
              <div class="way flex-1 vh_center space-x-2">
                <span>{{ t("relation_spec.start_chat") }}</span>
                <IpButton @click="toCrisp" type="ghost" circle class="w-8 h-8">
                  <MessageCircleMore :size="20" color="hsl(var(--success))" :stroke-width="2" />
                </IpButton>
              </div>

              <div class="way flex-1 hidden sm:vh_center pointer whitespace-nowrap" @click="toEmail">support@ipstar.io</div>

              <div class="way flex-1 vh_center space-x-1">
                <span>{{ t("Follow_us_on") }}:</span>
                <div class="relative">
                  <span class="success pointer hover:opacity-70" @click="openGT">{{ t("TG_channel") }}</span>
                  <div class="new rounded-full px-1 text-xs font-medium white shrink-0">New</div>
                </div>

                <!-- <el-tooltip class="item" placement="top">
                  <template #content>
                    <div>
                      <img src="@/assets/images/relation/tg.png" alt="" />
                    </div>
                  </template>
                  <span class="success pointer hover:opacity-70">TG 频道</span>
                </el-tooltip> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <IpDialog v-model="isQRcode" class="mask">
      <div class="mask_content space-y-5 column_center">
        <div class="image_box">
          <img src="@/assets/images/relation/tg.webp" alt="" />
        </div>
        <p class="font-semibold text-lg text-[#53845F] tracking-wider">@GLOBAL_IP_PROXT</p>
        <div class="close vh_center pointer transition-color black" @click="isQRcode = false">
          <CloseIcon :size="16" />
        </div>
      </div>
    </IpDialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import Message from "@/components/message/message"
import { platCustomerLeaveMessage } from "@/api/home"
import settingStore from "@/store/setting"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import position from "@/components/dialog/position"
import IpDialog from "@/components/dialog/index.vue"
import { Twitter, ArrowRight, MessageCircleMore, X as CloseIcon } from "lucide-vue-next"

import "element-plus/es/components/message-box/style/css"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import Confirm from "@/components/confirm/confirm"
import { isMobile } from "../../../utils/tools"

const { t } = useI18n()
const { en } = settingStore()

// 响应式数据
const fullName = ref("")
const email = ref("")
const content = ref("")

// 客户留言
const loading = ref(false) // loading
function sendInfo(e) {
  if (fullName.value && email.value && content.value) {
    loading.value = true

    platCustomerLeaveMessage({
      fullname: fullName.value,
      email: email.value,
      content: content.value,
    })
      .then(() => {
        const title = en.value ? "Prompt" : "温馨提示"
        const message = en.value
          ? "We have received your messages, and we will contact you as soon as possible."
          : "我们已经收到您的消息，我们将尽快与您联系。"
        const confirmText = en.value ? "OK" : "确定"

        position.set({ x: e.clientX, y: e.clientY })
        Confirm({
          title,
          message,
          showCancel: false,
          confirmText: confirmText,
          success: () => {
            fullName.value = ""
            email.value = ""
            content.value = ""
          },
        })
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    Message({
      type: "warning",
      message: en ? "Please complete!" : "请完成!",
    })
  }
}

function bgLoaded(e) {
  e.target.parentNode.style.opacity = 1
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

// srisp 即时聊天
function toCrisp() {
  window.$crisp.push(["do", "chat:open"])
}

// 邮箱跳转
function toEmail() {
  window.open("mailto:support@ipstar.io")
}

onMounted(() => {
  import("@/assets/images/relation/tg.webp")
})
</script>

<style lang="less" scoped>
@import url("./relation.less");
</style>
