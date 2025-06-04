<template>
  <div class="pc-VMLogin_access">
    <div class="VMLogin_access_text">
      <h3>{{$t('PCVmloginAccess.h3')}}</h3>
      <ul class="step_box">
        <li v-for="item,index in list" :key="index">
          <h4>{{item.h4}}</h4>
          <div class="p_box">
            <p>{{item.p}}</p>
          </div>
          <img :src="item.img" alt="IOS Access one">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCVMLoginAccess',
  data () {
    return {
      list: this.$t('PCVmloginAccess.list')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./VMLogin_access.less');
</style>
