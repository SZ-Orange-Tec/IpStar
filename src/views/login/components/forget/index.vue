<template>
  <div class="login_account column space-y-5">
    <div class="form w-full space-y-5">
      <p class="text-sm">{{ t("login_spec.label5") }}</p>
      <div class="v_center space-x-2 input_box transition-color">
        <MailIcon :size="18" class="flex-shrink-0 icon" />
        <input type="text" v-model.trim="email" ref="inputRef" class="flex-1 text-sm" :disabled="disabled" :placeholder="t('Email')" />
        <span class="edit pointer text-sm" v-if="disabled" @click="openEdit">编辑</span>
      </div>
    </div>

    <IpButton type="primary" class="btn pointer vh_center space-x-2 transition-color" @click="submit" :class="{ disabled: btnLoading }">
      <span class="ip-loading" v-if="btnLoading"></span>
      <span>{{ t("Confirm") }}</span>
    </IpButton>

    <div class="back v_center space-x-2 pointer px-5" @click="emit('back')">
      <img src="@/assets/images/login/back.png" alt="back" width="18" height="18" />
      <span>{{ t("Back") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue"
import settingStore from "@/store/setting"
import Message from "@/components/message/message"
import IpButton from "@/components/button/button.vue"
import { Mail as MailIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const { lang } = settingStore()

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(["update:modelValue", "next", "back"])

// 邮箱
const email = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})
const disabled = ref(true) // 是否禁用
const inputRef = ref(null)
function openEdit() {
  disabled.value = false
  nextTick(() => {
    inputRef.value.focus()
  })
}

const btnLoading = ref(false)
function submit() {
  if (!email.value) {
    const en = lang === "en"
    Message({
      type: "warning",
      message: en ? "Please enter your email address" : "请输入您的电子邮件",
    })
    return
  }
  btnLoading.value = true
  emit("next", () => {
    btnLoading.value = false
  })
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
