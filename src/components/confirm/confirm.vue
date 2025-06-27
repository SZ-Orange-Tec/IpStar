<template>
  <IpDialog v-model="show" class="confirm_pop">
    <template #default="{ close }">
      <div class="container" :style="{ 'max-width': width }">
        <div class="confirm space-y-3">
          <div class="confirm-header v_center space-x-2">
            <template v-if="type === 'warn'">
              <TriangleAlert class="warn-icon" :size="18" />
            </template>
            <p class="font-semibold">{{ title }}</p>
          </div>

          <div class="space-y-2">
            <p class="font-normal">{{ message }}</p>
            <IpInput class="w-full" v-if="showInput" v-model="input" :placeholder="placeholder"></IpInput>
          </div>

          <div class="space-x-3 v_center" style="justify-content: flex-end; margin-top: 1.25rem">
            <IpButton v-if="showCancel" type="border" class="px-3 h-8 text-xs md:text-sm grey" @click="cancel({ close })">
              {{ cancelText }}
            </IpButton>
            <IpButton type="primary" class="px-3 h-8 text-xs md:text-sm" @click="() => success({ close, input })">
              {{ confirmText }}
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
import { TriangleAlert, X as CloseIcon } from "lucide-vue-next"
import { ref, defineModel } from "vue"

const show = defineModel({ type: String })

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
// const { title, icon, message, showInput, placeholder, showCancel, confirmText, cancelText } = props

const input = ref("")
</script>

<style lang="less" scoped>
@import "./confirm.less";
</style>
