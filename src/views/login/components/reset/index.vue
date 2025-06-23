<template>
  <div class="pc-login_password column space-y-6">
    <div class="form w-full">
      <div class="w-full space-y-2">
        <p class="text-sm">{{ t("login_spec.label4") }}</p>
        <div class="v_center input_box space-x-2 px-3 transition-color">
          <Lock :size="18" class="flex-shrink-0 icon" />
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="password"
            class="flex-1 text-sm"
            ref="passwordRef"
            :placeholder="t('Password')"
          />
          <ip-button type="ghost" class="w-8 h-8 vh_center" @click="showPassword = !showPassword">
            <Eye v-if="!showPassword" :size="18" />
            <EyeOff v-else :size="18" />
          </ip-button>
        </div>
      </div>
    </div>

    <div class="btn pointer vh_center space-x-2" @click="submit" :class="{ disabled: btnLoading }">{{ t("Next") }}</div>

    <div class="back v_center space-x-2 pointer px-5" @click="emit('back')">
      <img src="@/assets/images/login/back.png" alt="back" width="18" height="18" />
      <span>{{ t("Back") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRefs } from "vue"
import Message from "@/components/message/message"
import settingsStore from "@/store/setting"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { Lock, Eye, EyeOff } from "lucide-vue-next"

const { t } = useI18n()

const { en } = settingsStore()

const props = defineProps({
  modelValue: String,
})
const { modelValue } = toRefs(props)

const emit = defineEmits(["update:modelValue", "next", "back"])

const btnLoading = ref(false)
const passwordRef = ref(null)
const showPassword = ref(false)

const password = computed({
  get: () => modelValue.value,
  set: (val) => emit("update:modelValue", val),
})

onMounted(() => {
  passwordRef.value?.focus()
})

function submit() {
  if (!password.value) {
    Message({
      type: "warning",
      message: en ? "Please enter your password" : "请输入密码",
    })
    return
  } else if (password.value.length < 6 || password.value.length > 20) {
    Message({
      type: "warning",
      message: en ? "Password must be between 6 and 20 characters" : "密码必须为6到20个字符",
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
