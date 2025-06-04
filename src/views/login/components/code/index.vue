<template>
  <div class="pc-login_code column space-y-5">
    <div class="form space-y-2 w-full column">
      <p class="text-sm">{{ t("login_spec.label3", { email: account }) }}</p>

      <div class="input_group w-full">
        <label for="code">
          <ul class="flex space-x-3" ref="inputGroup">
            <li v-for="(item, index) in code" :key="index" :class="{ focus: index === point }" class="flex-1 transition-color vh_center">
              <div class="tick" v-if="index === point"></div>
              <div class="num vh_center">{{ item }}</div>
            </li>
          </ul>
        </label>
        <input ref="input" id="code" type="text" maxlength="6" @focus="focusInput" @blur="point = -1" @keyup="inputNumber" @paste="pasteCode" />
      </div>
      <IpButton type="ghost" class="px-3 resend text-sm" :class="{ disabled: btnLoading, notResend: !isReSend }">
        {{ t("Re_send") }} {{ isReSend ? "" : "(" + second + ")" }}
      </IpButton>
    </div>

    <!-- <div @click="reSend" :class="{ disabled: btnLoading, notResend: !isReSend }" style="justify-content: flex-end">
      <span v-if="btnLoading" class="chat-loading"></span>
      <span class="pointer"></span>
    </div> -->

    <div class="btn pointer vh_center space-x-6" @click="submit" :class="{ disabled: btnLoading }">
      <p>{{ t("Next") }}</p>
    </div>

    <div class="back v_center space-x-2 pointer px-5" @click="emit('back')">
      <img src="@/assets/images/login/back.png" alt="back" width="18" height="18" />
      <span>{{ t("Back") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, toRefs } from "vue"
import { platCustomerVerifycode } from "@/api/login"
import settingsStore from "@/store/setting"
import Message from "@/components/message/message"
import IpButton from "@/components/button/button.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const props = defineProps({
  modelValue: String,
  account: String,
})
const { modelValue, account } = toRefs(props)

const emit = defineEmits(["update:modelValue", "next"])

const btnLoading = ref(false)
const point = ref(-1)
const second = ref(60)
const input = ref(null)
const inputGroup = ref(null)

const { en } = settingsStore()

const code = computed({
  get() {
    return [...new Array(6)].map((item, index) => {
      const num = modelValue.value?.charAt(index)
      return num || ""
    })
  },
  set(val) {
    emit("update:modelValue", val)
  },
})

const password = computed({
  get() {
    return modelValue.value
  },
  set(val) {
    emit("update:modelValue", val)
  },
})

const isReSend = computed(() => {
  return second.value <= 0
})

function submit() {
  if (!code.value.length > 5) {
    Message({
      type: "warning",
      message: en.value ? "Please enter the 6-digit verification code" : "请输入6位数字的验证码",
    })
    return
  }
  btnLoading.value = true
  emit("next", () => {
    btnLoading.value = false
  })
}

function focusInput() {
  // const dom = inputGroup.value
  const length = modelValue.value.length
  const index = Math.max(length - 1, 0)
  point.value = index

  // nextTick(() => {
  //   dom.childNodes[index]?.focus()
  // })
}

function inputNumber(e) {
  const { key, keyCode } = e
  console.log(key, keyCode)
  if (!/^[0-9]$|Backspace/.test(key)) return
  const length = modelValue.value.length

  if (key === "Backspace" || keyCode === 8) {
    if (point.value <= -1) return
    point.value = length >= 6 && point.value >= 5 ? 5 : point.value - 1
    code.value = modelValue.value.slice(0, length - 1)
  } else {
    if (length < 6) {
      code.value = modelValue.value + key
    }
    point.value += 1

    if (point.value >= 6) {
      input.value.blur()
      submit()
    }
  }
}

async function pasteCode(e) {
  const text = await navigator.clipboard.readText()
  if (/^\d{6}$/.test(text)) {
    code.value = text
    point.value = 5
    setTimeout(() => {
      submit()
    }, 500)
  } else {
    Message({
      type: "warning",
      message: en.value ? "Please paste the 6-digit verification code" : "请粘贴6位数字的验证码",
    })
  }
}

function reduce() {
  second.value--
  if (second.value <= 0) return

  setTimeout(() => {
    reduce()
  }, 1000)
}

async function reSend() {
  try {
    if (!isReSend.value) return

    Message({
      type: "success",
      message: en.value ? "Verification Code has been sent to your email, please check your inbox" : "验证码已发送至您的邮箱，请检查您的邮箱",
    })
    second.value = 60
    reduce()
    await platCustomerVerifycode({
      email: account.value,
      type: 1,
    })
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  reduce()
  input.value.focus()
})
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
