<template>
  <div class="star w-full h-full" ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const container = ref(null)

function play() {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // Create stars with depth
  const starGeometry = new THREE.BufferGeometry()
  const starCount = 10000
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)
  const sizes = new Float32Array(starCount)

  for (let i = 0; i < starCount; i++) {
    // Distribute stars in 3D space
    positions[i * 3] = (Math.random() - 0.5) * 2000 // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000 // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000 // z
    // Star colors (white to bluish)
    colors[i * 3] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 2] = 1.0
    sizes[i] = Math.random() * 2 + 0.5 // Vary star size for depth
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

  const starMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  // Create nebula (simplified as glowing planes)
  const nebulaGeometry = new THREE.PlaneGeometry(500, 500)
  const nebulaMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a1a4d,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  })
  const nebulaCount = 5
  for (let i = 0; i < nebulaCount; i++) {
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial)
    nebula.position.set((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, -500 - Math.random() * 500)
    nebula.rotation.z = Math.random() * Math.PI
    scene.add(nebula)
  }

  // Create meteors
  const meteors = []
  class Meteor {
    constructor() {
      this.geometry = new THREE.BufferGeometry()
      const positions = new Float32Array([0, 0, 0])
      this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      this.material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 3,
        transparent: true,
        opacity: 1,
      })
      this.particle = new THREE.Points(this.geometry, this.material)
      this.reset()
      scene.add(this.particle)
    }

    reset() {
      this.particle.position.set((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, 0)
      this.velocity = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, -Math.random() * 5)
      this.lifetime = Math.random() * 100 + 50
      this.age = 0
      this.material.opacity = 1
    }

    update() {
      this.particle.position.add(this.velocity)
      this.age++
      this.material.opacity = 1 - this.age / this.lifetime
      if (this.age > this.lifetime) {
        this.reset()
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    meteors.push(new Meteor())
  }

  // Position camera
  camera.position.z = 100

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Move stars and nebulae slowly for parallax effect
    stars.position.z += 0.1
    if (stars.position.z > 1000) stars.position.z -= 2000

    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child !== stars) {
        child.position.z += 0.05
        if (child.position.z > 100) child.position.z -= 600
      }
    })

    // Update meteors
    meteors.forEach((meteor) => meteor.update())

    // Twinkle stars by adjusting sizes
    const sizes = starGeometry.attributes.size.array
    for (let i = 0; i < starCount; i++) {
      sizes[i] = Math.random() * 2 + 0.5
    }
    starGeometry.attributes.size.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener("resize", resize)
}

function loadScripe() {
  // 引入外部 JavaScript 文件示例，可根据实际需求修改 src 属性值
  const script = document.createElement("script")
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" // 替换为实际的脚本文件地址
  script.type = "text/javascript"
  script.id = "three"
  document.head.appendChild(script)

  script.onload = () => {
    play()
  }
}

onMounted(() => {
  loadScripe()
})
</script>

<style lang="less" scoped>
// body {
//   margin: 0;
//   overflow: hidden;
//   background: #000;
// }
canvas {
  display: block;
}
</style>
