<template>
  <div class="pc-windows_access">
    <div class="windows_access_text">
      <h3>{{$t('PCWindowsAccess.h3')}}</h3>
      <h4>{{$t('PCWindowsAccess.h4')}}</h4>
      <div class="p_box">
        <p>{{$t('PCWindowsAccess.pBox.one[0]')}} <a href="javascript:;" @click="open">{{$t('PCWindowsAccess.pBox.one[1]')}}</a></p>
      </div>
      <ul class="step_box">
        <li v-for="item,index in list" :key="index">
          <h4>{{item.h4}}</h4>
          <div class="p_box">
            <p>{{item.p}}</p>
          </div>
          <img :src="item.img" alt="IOS Access one">
        </li>
      </ul>
      <div class="p_box">
        <p class="note">{{$t('PCWindowsAccess.pBox.two')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCWindowsAccess',
  data () {
    return {
      list: this.$t('PCWindowsAccess.list')
    }
  },
  methods: {
    open () {
      window.open('https://docs.zohopublic.com/file/s3zpwf820118cb4aa437cb0a81ee9b5d39466')
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('./windows_access.less');
</style>
