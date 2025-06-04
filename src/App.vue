<template>
  <div class="relative">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue';

// function captureError(e){
//   console.log('enter')
//   console.log('error',e)
// }
// onMounted(()=>{
//   console.log('mounted')
//   window.addEventListener('error',captureError)
//   window.addEventListener('unhandledrejection', captureError);
// })
</script>

<style scoped></style>
