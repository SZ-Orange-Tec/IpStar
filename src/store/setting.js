import { reactive, toRefs } from "vue"

const state = reactive({
  lang: localStorage.getItem("lang") || "",
  gift: "",
})

export default function settingStore() {
  return {
    ...toRefs(state),
  }
}
