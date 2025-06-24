<template>
  <div class="relation">
    <div class="box contact_us">
      <div class="container column_center lg:between gap-5">
        <div class="email space-y-6 column">
          <i18n-t keypath="relation_spec.title" tag="p" scope="global" class="text-lg sm:text-2xl lg:text-3xl title">
            <template #info>
              <span class="primary_text">{{ t("relation_spec.title_slot") }}</span>
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
              <textarea class="w-full transition-color text-sm" v-model.trim="content" :placeholder="t('relation_spec.help')"></textarea>
            </div>
          </div>

          <IpButton type="primary" class="px-5 h-10" @click="leave_word">
            <div class="v_center space-x-2">
              <p>{{ t("Send_message") }}</p>
              <ArrowRight :size="16" v-if="!loading" />
              <span class="ip-loading" v-else></span>
            </div>
          </IpButton>
        </div>

        <div class="column concat">
          <div class="top flex space-x-2" style="align-items: flex-start">
            <img class="flex-shrink-0" src="@/assets/images/relation/icon.png" width="30" height="30" alt="" />
            <div class="column space-y-2">
              <p class="title text-base">{{ t("relation_spec.serve") }}</p>
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

            <div class="way flex-1 vh_center pointer whitespace-nowrap" @click="toEmail">support@ipstar.io</div>

            <div class="way flex-1 vh_center space-x-2">
              <span>{{ t("Follow_us_on") }}</span>
              <!-- <IpButton type="ghost" circle class="w-8 h-8" @click="toTwitter">
                <Twitter :size="20" color="hsl(var(--primary))" :stroke-width="2" />
              </IpButton> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="background">
      <StarPlay />
      <!-- <img src="@/assets/images/relation/background.png" @load="bgLoaded" alt="" class="w-full h-full" style="object-fit: cover" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Message from "@/components/message/message"
import Confirm from "@/components/confirm/confirm"
import { platCustomerLeaveMessage } from "@/api/home"
import settingStore from "@/store/setting"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { Twitter, ArrowRight, MessageCircleMore } from "lucide-vue-next"
import { ElMessageBox } from "element-plus"
import "element-plus/es/components/message-box/style/css"
import StarPlay from "@/views/front/components/starPlay/gptstar.vue"

const { t } = useI18n()
const { en } = settingStore()

// 响应式数据
const fullName = ref("")
const email = ref("")
const content = ref("")

// 客户留言
const loading = ref(false) // loading
const leave_word = () => {
  if (fullName.value && email.value && content.value) {
    loading.value = true

    platCustomerLeaveMessage({
      fullname: fullName.value,
      email: email.value,
      content: content.value,
    })
      .then(() => {
        const title = en.value ? "warm prompt" : "温馨提示"
        const message = en.value
          ? "We have received your messages, and we will contact you as soon as possible."
          : "我们已经收到您的消息，我们将尽快与您联系。"
        const confirmText = en.value ? "OK" : "确定"

        ElMessageBox.confirm(message, title, {
          confirmButtonText: confirmText,
          callback: (action) => {
            if (action === "confirm") {
              fullName.value = ""
              email.value = ""
              content.value = ""
            }
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
// twitter
function toTwitter() {
  window.open("https://twitter.com/Ipflare913")
}

// // what
// const whatsapp = () => {
//   window.open("https://web.whatsapp.com/send?phone=85253457877")
// }

// // 访问 facebook
// const facebook = () => {
//   window.open("https://www.facebook.com/profile.php?id=100087652609159")
// }

// srisp 即时聊天
function toCrisp() {
  window.$crisp.push(["do", "chat:open"])
}

// 邮箱跳转
function toEmail() {
  window.open("mailto:support@ipstar.io")
}
</script>

<style lang="less" scoped>
@import url("./relation.less");
</style>
