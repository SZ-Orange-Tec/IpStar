<template>
  <button class="button vh_center pointer transition-colors" :class="[type,{
    disabled:disabled,
    circle:circle,
    icon:icon
  }]">
    <slot></slot>
  </button>
</template>

<script setup>
import { toRefs } from 'vue';

const props=defineProps({
  type:{
    type:String,
    default:'primary' // primary ghost icon
  }, 
  size:{
    type:String,
    default:'small' // mini small medium
  },
  icon:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
  },
  circle:{
    type:Boolean,
    default:false
  }
})
const {type,disabled,icon,cirlce}=toRefs(props)

</script>

<style scoped>
@import url("./button.css");
</style>