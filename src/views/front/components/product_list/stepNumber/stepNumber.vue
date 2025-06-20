<template>
  <div class="pc-stepNumber between px-2">
    <IpButton @click="reduce" type="ghost" circle class="border-btn transition-color" :class="{ opacity50: select <= 0 }">
      <Minus :size="12" :stroke-width="3" />
    </IpButton>

    <strong class="text-sm">{{ days }} {{ $t("Day") }}</strong>

    <IpButton @click="add" type="ghost" circle class="border-btn transition-color" :class="{ opacity50: select >= list.length - 1 }">
      <Plus :size="12" :stroke-width="3" />
    </IpButton>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { Plus, Minus } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"

const props = defineProps({
  select: Number,
  list: {
    type: Array,
    default() {
      return []
    },
  },
})

const emit = defineEmits(["update:select"])

const days = computed(() => {
  return props.list.length ? props.list[props.select].days : "30"
})

function add() {
  const max = props.list.length - 1
  if (max < props.select + 1) return
  emit("update:select", props.select + 1)
}

function reduce() {
  if (props.select - 1 < 0) return
  emit("update:select", props.select - 1)
}
</script>

<style lang="less" scoped>
@import "./stepNumber.less";
</style>
