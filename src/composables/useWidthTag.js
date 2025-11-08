import { onBeforeUnmount, onMounted, ref } from "vue"

export default function () {
  const tag = ref("")

  function getTag() {
    tag.value = "xs"
    if (window.innerWidth >= 1536) {
      tag.value = "2xl"
    } else if (window.innerWidth >= 1280) {
      tag.value = "xl"
    } else if (window.innerWidth >= 1024) {
      tag.value = "lg"
    } else if (window.innerWidth >= 768) {
      tag.value = "md"
    } else if (window.innerWidth >= 640) {
      tag.value = "sm"
    } else {
      tag.value = "xs"
    }
  }

  onMounted(() => {
    getTag()
    window.addEventListener("resize", getTag)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", getTag)
  })

  return {
    tag,
  }
}
