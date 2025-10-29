<template>
  <div class="count w-full">
    <div class="process w-full" ref="process" @mousedown="clickCount">
      <div class="percent" :style="{ width: percentWidth + '%' }">
        <!-- <el-tooltip :content="count+''" placement="top" :open-delay="200"> -->
        <div class="bar" @mousedown.stop="moveStart"></div>
        <div class="tip">{{ count }}</div>
        <!-- </el-tooltip> -->
      </div>
    </div>
    <p class="between">
      <span>{{ min }}</span>
      <span>{{ mid_count }}</span>
      <span>{{ max }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue"

const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 500,
  },
})

const { min, max } = toRefs(props)

const count = defineModel()

const mid_count = computed(() => max.value / 2)
const percentWidth = computed(() => Math.round((count.value / max.value) * 100))
function moveStart(e) {
  const total = e.target.closest(".process").clientWidth
  const unit = total / max.value
  const startCount = count.value
  const startX = e.clientX
  const fun = (e) => {
    const nowX = e.clientX
    const trans = nowX - startX
    if (min.value < count.value && count.value < max.value) {
      const percent = Math.round(((unit * startCount + trans) / total) * 100)
      count.value = Math.round((percent / 100) * max.value)
    } else if ((min.value === count.value && trans > 0) || (count.value === max.value && trans < 0)) {
      const percent = Math.round(((unit * startCount + trans) / total) * 100)
      count.value = Math.round((percent / 100) * max.value)
    }
  }
  const remove = () => {
    document.body.removeEventListener("mousemove", fun)
    document.body.removeEventListener("mouseup", remove)
  }
  document.body.addEventListener("mousemove", fun, { passive: false })
  document.body.addEventListener("mouseup", remove)
  e.preventDefault()
}
function clickCount(e) {
  const findTarget = (dom) => {
    if (dom.className === "process") return dom
    return findTarget(dom.parentNode)
  }
  const target = findTarget(e.target)
  const total = target.clientWidth
  const offsetX = e.offsetX
  const percent = Math.round((offsetX / total) * 100)
  count.value = Math.round((percent / 100) * max.value)
}
</script>

<style lang="less" scoped>
.count {
  flex: 1;
  margin-right: 60px;
  min-width: 0;
  .process {
    margin: 20px 0 10px;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: #e7e7e7;
    .percent {
      width: 5%;
      position: relative;
      height: 100%;
      background-color: hsl(var(--primary));
      border-radius: 3px;
      .bar {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 4px solid hsl(var(--primary));
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
        cursor: pointer;
        &:hover {
          & ~ .tip {
            z-index: 5;
          }
        }
      }
      .tip {
        user-select: none;
        padding: 4px 10px;
        position: absolute;
        z-index: -1;
        background: rgba(0, 0, 0, 0.8);
        line-height: 16px;
        font-size: 14px;
        top: -15px;
        right: 0;
        color: #fff;
        border-radius: 5px;
        transform: translate(50%, -100%);
        &::before {
          content: "";
          display: block;
          color: transparent;
          border: 5px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.8);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 100%);
        }
      }
    }
  }
  .between {
    user-select: none;
    span {
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
