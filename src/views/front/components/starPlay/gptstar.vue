<template>
  <div class="w-full h-full">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const canvasRef = ref(null)

function play() {
  const canvas = canvasRef.value
  const ctx = canvas.getContext("2d")

  let w = canvas.clientWidth
  let h = canvas.clientHeight
  canvas.width = w
  canvas.height = h

  // 星空参数
  let STAR_NUM = 600
  let STAR_DEPTH = 1500
  let STARS = []

  // 星云参数
  let NEBULA_NUM = 3
  let NEBULAE = []

  // 流星参数
  let meteors = []
  let meteorTimer = 0

  // 初始化星星
  for (let i = 0; i < STAR_NUM; i++) {
    let theta = Math.random() * 2 * Math.PI
    let phi = Math.acos(2 * Math.random() - 1)
    let radius = Math.random() * w * 0.5 + w * 0.2
    let x = Math.sin(phi) * Math.cos(theta) * radius
    let y = Math.sin(phi) * Math.sin(theta) * radius
    let z = Math.random() * STAR_DEPTH
    let size = Math.random() * 1.5 + 0.5
    STARS.push({ x, y, z, size, baseSize: size, flicker: Math.random() * Math.PI * 2 })
  }

  // 初始化星云
  for (let i = 0; i < NEBULA_NUM; i++) {
    let x = Math.random() * w * 0.6 + w * 0.2
    let y = Math.random() * h * 0.4 + h * 0.1
    let r = Math.random() * 180 + 120
    let color = `rgba(${180 + Math.random() * 60},${100 + Math.random() * 100},${200 + Math.random() * 55},0.3)`
    NEBULAE.push({ x, y, r, color })
  }

  function drawNebulae() {
    for (let nebula of NEBULAE) {
      let grad = ctx.createRadialGradient(nebula.x, nebula.y, nebula.r * 0.2, nebula.x, nebula.y, nebula.r)
      grad.addColorStop(0, nebula.color)
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.beginPath()
      ctx.arc(nebula.x, nebula.y, nebula.r, 0, 2 * Math.PI)
      ctx.fillStyle = grad
      ctx.globalAlpha = 0.7
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  function drawStars(time) {
    for (let star of STARS) {
      // 立体投影
      let perspective = 500 / (star.z + 1)
      let sx = w / 2 + star.x * perspective
      let sy = h / 2 + star.y * perspective
      let alpha = Math.max(0.2, 1 - star.z / STAR_DEPTH)

      // 星星闪烁
      let flicker = Math.sin(time / 400 + star.flicker) * 0.3 + 0.8
      let size = star.baseSize * flicker * perspective * 0.7 + 0.2

      ctx.beginPath()
      ctx.arc(sx, sy, size, 0, 2 * Math.PI)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.shadowBlur = size * 3
      ctx.shadowColor = "#fff"
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  function spawnMeteor() {
    // 随机生成流星
    let angle = (Math.random() * Math.PI) / 3 + Math.PI / 6
    let speed = Math.random() * 6 + 8
    let length = Math.random() * 120 + 80
    let x = Math.random() * w * 0.7 + w * 0.15
    let y = Math.random() * h * 0.2 + h * 0.1
    meteors.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length,
      alpha: 1,
    })
  }

  function drawMeteors() {
    for (let i = meteors.length - 1; i >= 0; i--) {
      let m = meteors[i]
      ctx.save()
      ctx.globalAlpha = m.alpha
      ctx.strokeStyle = "white"
      ctx.shadowColor = "#fff"
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(m.x, m.y)
      ctx.lineTo(m.x - m.dx * m.length, m.y - m.dy * m.length)
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      m.x += m.dx
      m.y += m.dy
      m.alpha -= 0.012
      if (m.alpha <= 0) meteors.splice(i, 1)
    }
  }

  let animateId
  function animate(time) {
    ctx.clearRect(0, 0, w, h)

    // 星云
    drawNebulae()

    // 星星
    drawStars(time)

    // 流星
    // drawMeteors()

    // 星星缓慢移动
    for (let star of STARS) {
      star.z -= 0.5
      if (star.z < 1) star.z = STAR_DEPTH
    }

    // 偶尔生成流星
    meteorTimer--
    if (meteorTimer <= 0) {
      if (Math.random() < 0.7) spawnMeteor()
      meteorTimer = Math.random() * 180 + 120
    }

    animateId = requestAnimationFrame(animate)
  }

  // 销毁
  function destory() {
    cancelAnimationFrame(animateId)
    STAR_NUM = null
    STAR_DEPTH = null
    STARS = null
    NEBULA_NUM = null
    NEBULAE = null
    meteors = null
    meteorTimer = null
  }

  animate(0)

  return destory
}
// function resize() {
//   const canvas = canvasRef.value
//   let w = canvas.clientWidth
//   let h = canvas.clientHeight
//   canvas.width = w
//   canvas.height = h
// }

let destory
onMounted(() => {
  destory = play()
  // window.addEventListener("resize", resize)
})

onBeforeUnmount(() => {
  destory()
  // window.removeEventListener("resize", resize)
})
</script>

<style lang="less" scoped></style>
