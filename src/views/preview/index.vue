<template>
  <div class="p-5 column space-y-3">
    <!-- 按钮 -->
    <div class="v_center space-x-3">
      <IpButton type="primary">Primary</IpButton>
      <IpButton type="ghost">Primary</IpButton>
      <IpButton type="primary" >
        <div class="v_center space-x-2">
          <span class="ip-loading"></span>
          <span>Loading</span>
        </div>
      </IpButton>
      <IpButton type="ghost" :disabled="true">Disabled</IpButton>

      <IpButton type="primary" circle>
        <Search :size="16"/>
      </IpButton>
      <IpButton type="ghost" icon>
        <Plus :size="16"/>
      </IpButton>
    </div>

    <!-- 输入框 -->
    <div class="v_center space-x-3">
      <IpInput placeholder="Input"/> 
      <IpInput type="password" placeholder="Password"/> 
      
    </div>
  </div>
</template>

<script setup>
import IpButton from '@/components/button/button.vue';
import IpInput from '@/components/input/input.vue';
import { Plus,Search } from 'lucide-vue-next';

// myUndefinedFunction();
</script>

<style lang="scss" scoped>

</style>