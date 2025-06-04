<template>
  <div class="relation">
    <div class="box contact_us">
      <div class="container flex" style="justify-content: space-between">
        <div class="space-y-10">
          <div class="column space-y-5">
            <p class="text-3xl">{{ t("relation_spec.title") }}</p>
            <p class="text-base" v-html="t('relation_spec.desc')"></p>
          </div>

          <ul class="way column space-y-3">
            <li class="v_center space-x-5">
              <img @click="toCrisp" src="../../../assets/pc_img/contact_img/phone call.png" alt="phone call" />
              <div @click="toCrisp" class="space-y-1">
                <p>{{ t("Contact_us") }}</p>
                <p>{{ t("relation_spec.Start_chat") }}</p>
              </div>
            </li>
            <li class="v_center space-x-5">
              <img @click="toEmail" src="../../../assets/pc_img/contact_img/mailbox.png" alt="mailbox" />
              <div @click="toEmail" class="space-y-1">
                <p>{{ t("Support") }}</p>
                <p>support@ipflare.com</p>
              </div>
            </li>
            <li class="v_center space-x-5">
              <img src="../../../assets/pc_img/contact_img/shield.png" alt="shield" />
              <div class="space-y-1">
                <p>{{ t("Follow_us_on") }}</p>
                <IpButton type="ghost" circle class="w-10 h-10" @click="toTwitter">
                  <Twitter :size="16" color="hsl(var(--primary))" />
                </IpButton>
              </div>
            </li>
          </ul>
        </div>

        <div class="email space-y-5">
          <p class="text-2xl">{{ t("PCRelation.emailContact.h4") }}</p>
          <div class="space-y-5 w-full">
            <div class="space-y-2">
              <p class="text-sm font-semibold">{{ t("PCRelation.emailContact.inputHr.pOne") }}</p>
              <input
                class="w-full transition-color text-sm"
                v-model.trim="fullName"
                :placeholder="t('PCRelation.emailContact.inputHr.placeholderOne')"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-semibold">{{ t("PCRelation.emailContact.inputHr.pTwo") }}</p>
              <input
                class="w-full transition-color text-sm"
                v-model.trim="email"
                :placeholder="t('PCRelation.emailContact.inputHr.placeholderTwo')"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-semibold">{{ t("PCRelation.emailContact.inputHr.pThree") }}</p>
              <textarea class="w-full transition-color text-sm" v-model.trim="content"></textarea>
            </div>
          </div>

          <IpButton type="primary" class="w-full h-10" @click="leave_word">
            {{ t("PCRelation.emailContact.btnText") }}
          </IpButton>
        </div>
      </div>
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
import { Twitter } from "lucide-vue-next"

const { t } = useI18n()
const { en } = settingStore()

// meta信息
// defineOptions({
//   name: "RelaTion",
//   metaInfo: {
//     meta: [
//       {
//         name: "keyWords",
//         content: "relation",
//       },
//       {
//         name: "description",
//         content: "This is the relation page",
//       },
//     ],
//   },
// })

// 响应式数据
const fullName = ref("")
const email = ref("")
const content = ref("")

// 客户留言
const leave_word = () => {
  if (fullName.value && email.value && content.value) {
    platCustomerLeaveMessage({
      fullname: fullName.value,
      email: email.value,
      content: content.value,
    }).then(() => {
      Confirm({
        title: en ? "warm prompt" : "温馨提示",
        message: en ? "We have received your messages, and we will contact you as soon as possible." : "我们已经收到您的消息，我们将尽快与您联系。",
        confirm_text: en ? "OK" : "确定",
        showClose: false,
        success: () => {
          fullName.value = ""
          email.value = ""
          content.value = ""
        },
      })
    })
  } else {
    Message({
      type: "warning",
      message: en ? "Please complete!" : "请完成!",
    })
  }
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
  window.open("mailto:support@ipflare.com")
}
</script>

<style lang="less" scoped>
@import url("./relation.less");
</style>
