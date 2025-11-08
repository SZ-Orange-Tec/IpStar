<template>
  <div class="number box-border w-full h-8 between px-2 rounded">
    <span class="grey-60">{{ t("Number") }}</span>

    <div class="action v_center">
      <IpButton type="normal" class="btn" :disabled="count <= 1" @click="reduce">
        <Minus :size="14"></Minus>
      </IpButton>
      <IpInput class="flex-1 min-w-0 text-center black" :border="false" v-model="count" @input="handleInput" />
      <IpButton type="normal" class="btn" :disabled="count >= max" @click="increase">
        <Plus :size="14"></Plus>
      </IpButton>
    </div>
  </div>
</template>

<script setup>
import DropDown from "@/components/dropdown/dropdown.vue"
import { useI18n } from "vue-i18n"
import { Plus, Minus } from "lucide-vue-next"
import { computed, inject, onMounted, ref, nextTick } from "vue"
import settingStore from "../../../../../store/setting"
import IpInput from "@/components/input/input.vue"
import IpButton from "@/components/button/button.vue"
import Message from "@/components/message/message"

const { t } = useI18n()
const { en } = settingStore()
const emit = defineEmits(["change"])

const count = defineModel()
const max = 50
function reduce() {
  if (count.value > 1) {
    count.value--
    nextTick(() => {
      emit("change", count.value)
    })
  }
}
function increase() {
  if (count.value < max) {
    count.value++
    nextTick(() => {
      emit("change", count.value)
    })
  } else {
    Message({
      message: en.value ? "Max number is 50" : "最大数量为50",
      type: "warning",
    })
  }
}
function handleInput(num) {
  num = +num.replace(/[^.\d]/g, "")
  if (num <= 0) {
    num = 1
  }
  count.value = num

  emit("change", num)
}
</script>

<style lang="less" scoped>
.number {
  background-color: hsl(var(--primary) / 3%);
  font-size: 13px;
  .action {
    width: 80px;
  }
  .btn {
    color: hsl(var(--foreground) / 60%);
    &:hover:not(:disabled) {
      color: hsl(var(--foreground));
    }
  }
}
</style>
