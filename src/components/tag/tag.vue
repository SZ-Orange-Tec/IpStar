<template>
  <div class="v_center rounded" :class="[type, size]">
    <slot></slot>
  </div>
</template>

<script setup>
import { toRefs } from "vue"

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "small",
  },
})

const { type, size } = toRefs(props)
</script>

<style lang="less" scoped>
.small {
  @apply px-2 h-6 text-xs;
}
.medium {
  @apply px-2 h-7 text-xs;
}
.large {
  @apply px-3 h-8 text-sm;
}
.primary {
  background-color: hsl(var(--primary) / 10%);
  color: hsl(var(--primary));
}
.success {
  background-color: hsl(var(--success) / 10%);
  color: hsl(var(--success));
}
.warn {
  background-color: hsl(var(--warn) / 10%);
  color: hsl(var(--warn));
}
.netural {
  background-color: hsl(var(--foreground) / 5%);
  color: hsl(var(--foreground) / 80%);
}
.plain {
  background-color: transparent;
  border: 1px solid hsl(var(--border));
}
</style>
