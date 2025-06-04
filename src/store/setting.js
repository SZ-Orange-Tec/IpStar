import { computed, reactive, toRefs } from "vue"

const state = reactive({
  lang: localStorage.getItem("lang") || "",
  gift: "",
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
