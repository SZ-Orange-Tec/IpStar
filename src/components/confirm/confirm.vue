<template>
  <IpDialog v-model="show" class="confirm_pop">
    <template #default="{ close }">
      <div class="container" :style="{ 'max-width': width }">
        <div class="confirm space-y-3">
          <div class="confirm-header v_center space-x-2">
            <template v-if="type === 'warn'">
              <TriangleAlert class="warn-icon" :size="18" />
            </template>
            <template v-if="type === 'info'">
              <Info class="text-amber-500" :size="18" />
            </template>
            <p class="font-medium">{{ title }}</p>
          </div>

          <div class="space-y-2 text-sm">
            <p class="font-normal">{{ message }}</p>
            <IpInput class="w-full" v-if="showInput" v-model="input" :placeholder="placeholder"></IpInput>
          </div>

          <div class="space-x-3 v_center" style="justify-content: flex-end; margin-top: 1.25rem">
            <IpButton v-if="showCancel" type="border" class="px-5 h-8 text-sm" @click="cancel({ close })">
              {{ cancelText }}
            </IpButton>
            <IpButton type="primary" :disabled="loading" class="px-5 h-8 text-xs md:text-sm" @click="toSuccess(close)">
              <div class="vh_center space-x-2">
                <span class="ip-loading" v-if="loading"></span>
                <span>{{ confirmText }}</span>
              </div>
            </IpButton>
          </div>
        </div>

        <div class="close vh_center pointer transition-color" @click="cancel({ close })">
          <CloseIcon :size="16" />
        </div>
      </div>
    </template>
  </IpDialog>
</template>

<script setup>
import IpDialog from "@/components/dialog/index.vue"
import IpButton from "@/components/button/button.vue"
import IpInput from "@/components/Input/Input.vue"
import { TriangleAlert, X as CloseIcon, Info } from "lucide-vue-next"
import { ref, defineModel } from "vue"

const show = defineModel({ type: Boolean })

const props = defineProps({
  title: String,
  type: String,
  message: String,
  showInput: Boolean,
  placeholder: String,
  showCancel: Boolean,
  confirmText: String,
  cancelText: String,
  cancel: Function,
  success: Function,
  width: String,
})
const { title, type, message, showInput, placeholder, showCancel, confirmText, cancelText, cancel, success, width } = props

const input = ref("")
const loading = ref(false)
function toSuccess(close) {
  success({ close, input, loading })
}
</script>

<style lang="less" scoped>
@import "./confirm.less";
</style>
