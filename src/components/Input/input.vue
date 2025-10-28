<template>
  <input
    v-model="input"
    :type="type"
    :readonly="readonly"
    class="input transition-color"
    spellcheck="false"
    :placeholder="placeholder"
    :maxlength="maxlength"
    @focus="focus"
    @blur="blur"
    @input="change"
    :style="{ 'border-width': border ? '1px' : '0px' }"
  />
</template>

<script setup>
import { ref, toRefs, defineModel } from "vue"

const input = defineModel({ type: String })

const props = defineProps({
  type: {
    type: String,
    default: "text",
  }, // text password
  maxlength: {
    type: Number,
    default: 50,
  },
  placeholder: {
    type: String,
    default: "",
  },
  password: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
})

const { maxlength, placeholder, type } = toRefs(props)

const emit = defineEmits(["input"])
// 只读
const readonly = ref(true)
function focus() {
  readonly.value = false
}
function blur() {
  readonly.value = true
}
function change(e) {
  emit("input", e.target.value)
}

defineExpose({
  focus,
})
</script>

<style scoped>
@import url("./input.css");
</style>
