<template>
  <div class="tabbar-container">
    <div class="tabbar-wrapper relative flex w-full">
      <!-- 活动背景指示器 -->
      <div class="w-full h-full absolute overflow-x-hidden">
        <div class="active-bg" :style="activeBgStyle"></div>
      </div>

      <!-- 插槽，用于放置tab-item子组件 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, watch, nextTick, onMounted, onUnmounted } from "vue"

// Props定义
const props = defineProps({
  // 当前激活的key
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  activeTextColor: {
    type: String,
    default: "hsl(var(--foreground))",
  },
  activeStyle: {
    type: Object,
    default: () => ({}),
  },
})

const defaultActiveStyle = {
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  ...props.activeStyle,
}

// Emits定义
const emit = defineEmits(["update:modelValue", "change"])

// 响应式数据
const activeKey = ref(props.modelValue)
const activeBgStyle = ref({})
const tabItems = ref([])
const activeTabElement = ref(null)

// 提供给子组件的方法和属性
provide("tabbarContext", {
  activeTextColor: props.activeTextColor,
  activeKey,
  registerTab,
  unregisterTab,
  handleTabClick,
})

// 注册tab项
function registerTab(key, element) {
  // 如果没有指定activeKey且是第一个tab，则设置为默认选中
  if (activeKey.value === undefined && tabItems.value.length === 0) {
    activeKey.value = key
    if (element) {
      activeTabElement.value = element
    }
  }
  if (activeKey.value === key && element) {
    activeTabElement.value = element
  }

  // 检查是否已存在相同的key
  const existingIndex = tabItems.value.findIndex((item) => item.key === key)
  if (existingIndex === -1) {
    tabItems.value.push({ key, element })
  } else {
    tabItems.value[existingIndex].element = element
  }
}

// 注销tab项
function unregisterTab(key) {
  const index = tabItems.value.findIndex((item) => item.key === key)
  if (index !== -1) {
    const isActiveTab = tabItems.value[index].key === activeKey.value
    tabItems.value.splice(index, 1)

    // 如果移除的是当前激活的tab，则选择第一个可用的tab
    if (isActiveTab && tabItems.value.length > 0) {
      activeKey.value = tabItems.value[0].key
      activeTabElement.value = tabItems.value[0].element
      emit("update:modelValue", activeKey.value)
      emit("change", activeKey.value)
    }

    nextTick(() => {
      updateActiveBgStyle()
    })
  }
}

// 处理tab点击事件
function handleTabClick(key, tabData = {}) {
  if (activeKey.value !== key) {
    activeKey.value = key
    emit("update:modelValue", key)
    emit("change", key, tabData)

    // 更新活动tab元素引用
    const activeTab = tabItems.value.find((item) => item.key === key)
    if (activeTab) {
      activeTabElement.value = activeTab.element
    }

    nextTick(() => {
      updateActiveBgStyle()
    })
  }
}

// 更新活动背景样式
function updateActiveBgStyle() {
  nextTick(() => {
    if (activeTabElement.value) {
      const { left, width } = activeTabElement.value.getBoundingClientRect()
      const wrapper = activeTabElement.value.parentElement
      const wrapperLeft = wrapper.getBoundingClientRect().left

      activeBgStyle.value = {
        ...defaultActiveStyle,
        left: `${left - wrapperLeft}px`,
        width: `${width}px`,
      }
    }
  })
}

// 组件挂载后初始化背景位置
onMounted(() => {
  updateActiveBgStyle()

  // 监听窗口大小变化，更新背景位置
  window.addEventListener("resize", updateActiveBgStyle)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  window.removeEventListener("resize", updateActiveBgStyle)
})

// 暴露方法供父组件调用
defineExpose({
  updateActiveBgStyle,
  handleTabClick,
  tabItems,
})
</script>

<style>
.active-bg {
  position: absolute;
  z-index: 0;
}
</style>
