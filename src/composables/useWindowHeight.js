import { onBeforeUnmount, onMounted, ref } from "vue"

export default function () {
  const height = ref(0)

  function getHeight() {
    height.value = window.innerHeight + "px"
  }

  onMounted(() => {
    getHeight()
    window.addEventListener("resize", getHeight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", getHeight)
  })

  return {
    height,
  }
}
