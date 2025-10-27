<template>
  <div class="tab-item" :class="{ active: isActive }" @click="handleClick" ref="tabElement">
    <!-- 默认插槽，用于自定义tab内容 -->
    <slot>
      <!-- 默认显示label文本 -->
      <span class="tab-text">{{ label }}</span>
    </slot>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from "vue"

// Props定义
const props = defineProps({
  // tab的唯一标识
  value: {
    type: [String, Number],
    required: true,
  },
  // tab的默认文本标签（当没有自定义内容时显示）
  label: {
    type: String,
    default: "",
  },
  // 额外数据，在点击事件中传递
  data: {
    type: Object,
    default: () => ({}),
  },
})

// 注入父组件提供的context
const tabbarContext = inject("tabbarContext", null)
const { activeTextColor } = tabbarContext || "#ffffff"

// 响应式数据
const tabElement = ref(null)

// 计算是否为激活状态
const isActive = computed(() => {
  return tabbarContext?.activeKey.value === props.value
})

// 处理点击事件
const handleClick = () => {
  if (tabbarContext?.handleTabClick) {
    tabbarContext.handleTabClick(props.value, props.data)
  }
}

// 组件挂载时注册到父组件
onMounted(() => {
  if (tabbarContext?.registerTab && tabElement.value) {
    tabbarContext.registerTab(props.value, tabElement.value)
  }
})

// 组件卸载时从父组件注销
onUnmounted(() => {
  if (tabbarContext?.unregisterTab) {
    tabbarContext.unregisterTab(props.value)
  }
})
</script>

<style scoped>
.tab-item {
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: color 0.3s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.tab-item.active {
  color: v-bind(activeTextColor);
}
</style>
