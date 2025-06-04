<template>
  <label class="label-input transition-color" :class="{ focus: focused, readonly: readonly }">
    <!-- label -->
    <div class="label column" :class="{ inputed: inputValue || focused }">{{ label }}</div>
    <!-- input -->
    <div class="input_box v_center space-x-2">
      <input
        ref="input"
        type="text"
        spellcheck="false"
        class="input flex-1"
        maxlength="30"
        :readonly="readonly"
        v-model="inputValue"
        @focus="focused = true"
        @blur="onBlur"
        @keydown.enter="$emit('onEnter')"
      />

      <div class="edit pointer" v-if="readonly" @click="$emit('onEdit')">编辑</div>
    </div>
  </label>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["input", "onEdit", "onEnter"])

const focused = ref(false)
const input = ref(null)

const inputValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
})

function onBlur() {
  focused.value = false
}

function focus() {
  input.value.focus()
}
</script>

<style lang="less" scoped>
@import "./labelInput.less";
</style>
