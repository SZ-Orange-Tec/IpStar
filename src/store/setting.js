import { computed, reactive, toRefs } from "vue"

const state = reactive({
  lang: localStorage.getItem("lang") || "",

  isDocument: "Getting", // Getting FAQ Help
  // 文档索引
  documentIdx: "0-0",
})
const getters = {
  en: computed(() => state.lang === "en"),
}

export default function settingStore() {
  return {
    ...toRefs(state),
    ...getters,
  }
}
