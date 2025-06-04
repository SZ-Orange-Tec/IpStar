<template>
  <div class="pc-login_password space-y-6">
    <div class="form">
      <div class="w-full space-y-2">
        <p class="text-sm">{{ t("login_spec.label4") }}</p>
        <div class="v_center input_box space-x-2 px-3 transition-color">
          <Lock :size="18" class="flex-shrink-0 icon" />
          <input type="text" v-model.trim="password" class="flex-1 text-sm" ref="passwordRef" :placeholder="t('Password')" />
        </div>
      </div>
    </div>

    <div class="btn pointer vh_center space-x-2" @click="submit" :class="{ disabled: btnLoading }">{{ t("Next") }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRefs } from "vue"
import Message from "@/components/message/message"
import settingsStore from "@/store/setting"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const { en } = settingsStore()

const props = defineProps({
  modelValue: String,
})
const { modelValue } = toRefs(props)

const emit = defineEmits(["update:modelValue", "next"])

const btnLoading = ref(false)
const passwordRef = ref(null)

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
