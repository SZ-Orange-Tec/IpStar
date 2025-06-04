<template>
  <div class="pagination">
    <button :disabled="currentPage <= 1" @click="handlePageChange(currentPage - 1)" class="pagination-btn">上一页</button>

    <div class="page-numbers">
      <template v-for="page in displayPages" :key="page">
        <span v-if="page === '...'" class="ellipsis">
          {{ page }}
        </span>
        <button v-else :class="['page-number', { active: page === currentPage }]" @click="handlePageChange(page)">
          {{ page }}
        </button>
      </template>
    </div>

    <button :disabled="currentPage >= totalPages" @click="handlePageChange(currentPage + 1)" class="pagination-btn">下一页</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Props {
  pageSize: number
  total: number
  currentPage: number
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  total: 0,
  currentPage: 1,
})

const emit = defineEmits(["current-change"])

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 计算要显示的页码
const displayPages = computed(() => {
  const result = []
  const current = props.currentPage
  const total = totalPages.value

  // 当总页数小于等于7时，显示所有页码
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      result.push(i)
    }
    return result
  }

  // 当总页数大于7时，使用省略号
  result.push(1)
  if (current - 3 > 1) {
    result.push("...")
  }

  for (let i = Math.max(2, current - 2); i <= Math.min(current + 2, total - 1); i++) {
    result.push(i)
  }

  if (current + 3 < total) {
    result.push("...")
  }
  result.push(total)

  return result
})

// 处理页码改变
const handlePageChange = (page: number) => {
  if (page !== props.currentPage) {
    emit("current-change", page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.pagination-btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  color: #d9d9d9;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-number {
  min-width: 32px;
  height: 32px;
  padding: 0 4px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover:not(.active) {
  color: #1890ff;
  border-color: #1890ff;
}

.page-number.active {
  color: white;
  background: #1890ff;
  border-color: #1890ff;
}

.ellipsis {
  color: #999;
}
</style>
