<template>
  <div class="table-container" :style="{ height: height }">
    <table class="custom-table" :class="{ 'table-bordered': border }">
      <thead>
        <tr>
          <th v-for="column in tableColumns" :key="column.prop" :style="{ width: column.width }">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="column in tableColumns" :key="column.prop" :style="{ width: column.width }">
            <component :is="column.component" :row="row" :index="rowIndex" :column="column" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 用于收集table-column组件 -->
    <div style="display: none">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue"

const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },
  // 表格容器高度
  height: {
    type: String,
    default: "400px",
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: false,
  },
})

const tableColumns = ref([])

// 提供注册列的方法给table-column组件使用
const registerColumn = (column) => {
  tableColumns.value.push(column)
}

const unregisterColumn = (prop) => {
  const index = tableColumns.value.findIndex((col) => col.prop === prop)
  if (index !== -1) {
    tableColumns.value.splice(index, 1)
  }
}

provide("table", {
  registerColumn,
  unregisterColumn,
})
</script>

<style scoped lang="less">
@import "./table.less";
</style>
