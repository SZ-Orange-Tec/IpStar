<template>
  <div class="login_password column space-y-6">
    <div class="w-full form space-y-6">
      <div class="w-full space-y-5">
        <p class="text-sm">{{ t("login_spec.label2") }}</p>
        <label class="v_center input_box space-x-2 px-3 transition-color">
          <Lock :size="18" class="flex-shrink-0 icon" />
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="pwd"
            class="flex-1 text-sm"
            ref="passwordRef"
            :placeholder="t('Password')"
          />
          <ip-button type="ghost" class="w-8 h-8 vh_center" @click="showPassword = !showPassword">
            <Eye v-if="!showPassword" :size="18" />
            <EyeOff v-else :size="18" />
          </ip-button>
        </label>
      </div>

      <div class="w-full space-y-2">
        <div class="w-full flex space-x-3">
          <label class="flex-1 v_center input_box space-x-2 px-3 transition-color">
            <ShieldCheck :size="18" class="flex-shrink-0 icon" />
            <input type="text" v-model.trim="code" class="flex-1 text-sm" :placeholder="t('Verification_code')" />
          </label>
          <div class="image flex-shink-0" style="height: 44px">
            <img :src="image" class="image" height="44" alt="graphic code" @click="emit('updateCaptcha')" />
          </div>
        </div>
        <IpButton type="link" class="resend text-sm" @click="emit('forget')"> {{ t("Forgot_password") }} ?</IpButton>
      </div>
    </div>

    <IpButton class="btn pointer vh_center space-x-2" @click="submit" :class="{ disabled: btnLoading || !password || code.length < 5 }">
      <span class="ip-loading" v-if="btnLoading"></span>
      <span>{{ t("Next") }}</span>
    </IpButton>

    <div class="back v_center space-x-2 pointer transition-colors px-5" @click="emit('back')">
      <img src="@/assets/images/login/back.png" alt="back" width="18" height="18" />
      <span>{{ t("Back") }}</span>
    </div>
  </div>
</template>

<script setup>
import IpInput from "@/components/input/input.vue"
import IpButton from "@/components/button/button.vue"
import Message from "@/components/message/message"
import settingsStore from "@/store/setting"
import { computed, onMounted, ref, toRefs } from "vue"
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const { en } = settingsStore()

const props = defineProps({
  password: String,
  input: String,
  captchaId: String,
  image: String,
})
const { password, input, captchaId, image } = toRefs(props)
const emit = defineEmits(["next", "updateCaptcha", "update:password", "update:input", "back", "forget"])

const showPassword = ref(false)

const pwd = computed({
  get() {
    return password.value
  },
  set(val) {
    emit("update:password", val)
  },
})
const code = computed({
  get() {
    return input.value
  },
  set(val) {
    emit("update:input", val)
  },
})

// 提交验证
const passwordRef = ref(null)
const btnLoading = ref(false)
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
  if (!code.value) {
    Message({
      type: "warning",
      message: en ? "Please enter the verification code" : "请输入验证码",
    })
    return
  }

  btnLoading.value = true
  emit("next", () => {
    btnLoading.value = false
  })
}

onMounted(() => {
  passwordRef.value.focus()
})
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
