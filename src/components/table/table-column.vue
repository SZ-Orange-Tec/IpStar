<template>
  <div v-if="false"></div>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, defineComponent, h, markRaw } from "vue"

const props = defineProps({
  // 列标题
  label: {
    type: String,
    required: true,
  },
  // 列属性名
  prop: {
    type: String,
    required: true,
  },
  // 列宽度
  width: {
    type: String,
    default: "auto",
  },
})

const table = inject("table")

// 创建渲染组件
const renderComponent = markRaw(
  defineComponent({
    props: ["row", "index", "column"],
    setup(props, { slots }) {
      return () => {
        if (slots.default) {
          return slots.default(props)
        }
        return h("span", props.row[props.column.prop])
      }
    },
  })
)

onMounted(() => {
  table.registerColumn({
    label: props.label,
    prop: props.prop,
    width: props.width,
    component: renderComponent,
  })
})

onBeforeUnmount(() => {
  table.unregisterColumn(props.prop)
})
</script>
