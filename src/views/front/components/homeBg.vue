<template>
  <div class="home_bg relative" :style="{ height: height + 'px' }">
    <div class="bg1 w-full h-full relative">
      <div class="bg1-child bg1-child1"></div>
      <div class="bg1-child bg1-child2"></div>
      <div class="bg1-child bg1-child3"></div>
    </div>
    <div class="bg2 w-full h-full">
      <canvas class="w-full h-full" ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const props = defineProps({
  height: {
    type: Number,
    default: 0,
  },
})

// 网格参数
const gridSize = 60 // 网格大小
const lineWidth = 1 // 线宽
const gridColor = "rgba(100, 150, 255, 0.2)" // 网格线颜色

// 穿梭效果参数
let activeLines = [] // 存储具有穿梭效果的线
let activeLineCount = 4 // 初始穿梭线数量

let canvas, ctx
const canvasRef = ref(null)
function initCanvas() {
  canvas = canvasRef.value
  ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = props.height
}

// 初始化穿梭线
function initActiveLines() {
  // 随机选择水平线
  const horizontalLines = Math.floor(canvas.height / gridSize)
  const verticalLines = Math.floor(canvas.width / gridSize)

  // 确保至少有一条水平线和一条垂直线
  const hIndex = Math.floor(Math.random() * horizontalLines)
  const vIndex = Math.floor(Math.random() * verticalLines)

  if (activeLines.length === 0) {
    activeLines.push({
      type: "horizontal",
      index: hIndex,
      position: hIndex * gridSize,
      progress: 0,
      speed: Math.ceil(55 + Math.random() * 45) / 100,
      color: `hsla(${Math.random() * 60 + 200}, 100%, 70%,0.2)`,
    })
    activeLines.push({
      type: "vertical",
      index: vIndex,
      position: vIndex * gridSize,
      progress: 0,
      speed: Math.ceil(55 + Math.random() * 45) / 100,
      color: `hsla(${Math.random() * 60 + 200}, 100%, 70%,0.25)`,
    })
  }

  const lineCount = activeLineCount - activeLines.length

  // 添加剩余的随机线
  for (let i = 0; i < lineCount; i++) {
    const type = Math.random() > 0.5 ? "horizontal" : "vertical"
    // const type = "vertical"
    const index = type === "horizontal" ? Math.floor(Math.random() * horizontalLines) : Math.floor(Math.random() * verticalLines)

    activeLines.push({
      type: type,
      index: index,
      position: index * gridSize,
      progress: 0,
      speed: Math.ceil(55 + Math.random() * 45) / 100,
      color: `hsla(${Math.random() * 60 + 200}, 100%, 70%,0.25)`,
    })
  }
}

// 绘制静态网格
function drawStaticGrid() {
  ctx.strokeStyle = gridColor
  ctx.lineWidth = lineWidth

  // 绘制水平线
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }

  // 绘制垂直线
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
}

// 绘制穿梭效果
function drawFlowEffect() {
  activeLines.forEach((line) => {
    // 更新进度
    line.progress += line.speed
    if (line.progress > 150) {
      return
    }

    // 绘制穿梭线
    ctx.strokeStyle = line.color
    ctx.lineWidth = 2

    if (line.type === "horizontal") {
      // 绘制穿梭光点
      const posX = (line.progress / 100) * canvas.width
      ctx.beginPath()
      ctx.arc(posX, line.position, 4, 0, Math.PI * 2)
      ctx.fillStyle = line.color
      ctx.fill()

      // 绘制光晕
      const gradient = ctx.createRadialGradient(posX, line.position, 0, posX, line.position, 20)
      gradient.addColorStop(0, line.color)
      gradient.addColorStop(1, "rgba(100, 150, 255, 0)")
      ctx.beginPath()
      ctx.arc(posX, line.position, 6, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // 水平穿梭线
      const lineGradient = ctx.createLinearGradient(posX - canvas.width / 2, line.position, posX, line.position)
      lineGradient.addColorStop(0, "transparent")
      lineGradient.addColorStop(1, line.color)
      ctx.strokeStyle = lineGradient
      ctx.beginPath()
      ctx.moveTo(Math.max(posX - canvas.width / 2, 0), line.position)
      ctx.lineTo(posX, line.position)
      ctx.stroke()
    } else {
      // // 绘制穿梭光点
      const posY = (line.progress / 100) * canvas.height
      ctx.beginPath()
      ctx.arc(line.position, posY, 4, 0, Math.PI * 2)
      ctx.fillStyle = line.color
      ctx.fill()

      // 绘制光晕
      const gradient = ctx.createRadialGradient(line.position, posY, 0, line.position, posY, 20)
      gradient.addColorStop(0, line.color)
      gradient.addColorStop(1, "rgba(100, 150, 255, 0)")
      ctx.beginPath()
      ctx.arc(line.position, posY, 6, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // 垂直穿梭线
      const lineGradient = ctx.createLinearGradient(line.position, posY - canvas.height / 2, line.position, posY)
      lineGradient.addColorStop(0, "transparent")
      lineGradient.addColorStop(0.5, line.color)
      lineGradient.addColorStop(1, line.color)
      ctx.strokeStyle = lineGradient
      ctx.beginPath()
      ctx.moveTo(line.position, Math.max(0, posY - canvas.height / 2))
      ctx.lineTo(line.position, posY)
      ctx.stroke()
    }
  })

  activeLines = activeLines.filter((line) => line.progress <= 150)
  if (activeLines.length < activeLineCount) {
    initActiveLines()
  }
}

// 绘制函数
function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制静态网格
  drawStaticGrid()

  // 绘制穿梭效果
  drawFlowEffect()
}

// 动画循环
function animate() {
  draw()
  requestAnimationFrame(animate)
}

onMounted(() => {
  initCanvas()
  initActiveLines()
  animate()
})
</script>

<style lang="less" scoped>
.home_bg {
  mask-image: radial-gradient(circle at center, #fff 0%, #fff 45%, transparent 90%);
  mask-size: cover;
  .bg1,
  .bg2 {
    position: absolute;
    top: 0;
    left: 0;
  }
  .bg1-child {
    position: absolute;
    width: 900px;
    height: 900px;
    top: 150px;
    // background-color: rgb(211 251 231 /1);
    // background-color: hsl(var(--primary) / 0.1);
    filter: blur(150px);
  }
  .bg1-child1 {
    left: 0;
  }
  .bg1-child2 {
    left: 50%;
  }
  .bg1-child3 {
    right: 0;
  }
}
</style>
