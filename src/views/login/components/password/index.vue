<template>
  <div class="pc-login_password">
    <div class="form space-y-4">
      <div class="password column space-y-2">
        <p>{{ $t("PCSignIn.password.span") }}</p>
        <ip-input v-model="pwd" type="password" ref="passwordRef"></ip-input>
      </div>

      <div class="column space-y-2">
        <p>{{ $t("PCSignIn.verificationCode.span") }}</p>
        <div class="flex space-x-5 code">
          <!-- <el-input v-model.trim="code" @keyup.enter.native="submit" class="flex-1"></el-input> -->
          <ip-input v-model="code" @keyup.enter="submit"></ip-input>
          <img
            :src="image"
            class="image shink-0"
            alt="graphic code"
            @click="emit('updateCaptcha')"
          />
        </div>
      </div>
    </div>

    <div
      class="btn pointer vh_center space-x-2"
      @click="submit"
      :class="{ disabled: btnLoading }"
    >
      <span v-if="btnLoading" class="chat-loading"></span>
      <strong>{{ $t("PCSignIn.btnTxt") }}</strong>
    </div>
  </div>
</template>

<script setup>
import IpInput from "@/components/input/input.vue"
import Message from "@/components/message/message"
import { options } from "less"
import { computed, onMounted, ref, toRefs } from "vue"

const props = defineProps({
  password: String,
  input: String,
  captchaId: String,
  image: String,
})
const { password, input, captchaId, image } = toRefs(props)
const emit = defineEmits([
  "next",
  "updateCaptcha",
  "update:password",
  "update:input",
])

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
      message: $t("PCSignIn.password.message[0]"),
    })
    return
  } else if (password.value.length < 6 || password.value.length > 20) {
    Message({
      type: "warning",
      message: $t("PCSignIn.password.message[1]"),
    })
    return
  }
  if (!code.value) {
    Message({
      type: "warning",
      message: $t("PCSignIn.verificationCode.message"),
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
