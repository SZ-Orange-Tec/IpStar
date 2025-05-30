<template>
  <div class="pc-Bitbrowse_access">
    <div class="Bitbrowse_access_text">
      <h3>{{$t('PCBitbrowseAccess.h3')}}</h3>
      <h4>{{$t('PCBitbrowseAccess.h4')}}</h4>
      <div class="p_box">
        <p>{{$t('PCBitbrowseAccess.p[0]')}}<a href="javascript:;" @click="open">{{$t('PCBitbrowseAccess.p[1]')}}</a></p>
      </div>
      <ul class="step_box">
        <li v-for="item,index in list" :key="index">
          <h4>{{item.h4}}</h4>
          <div class="p_box">
            <p>{{item.p}}</p>
          </div>
          <img :src="item.img" alt="IOS Access one">
          <div class="p_box" v-if="item.pTwo">
            <p>{{item.pTwo}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCBitbrowseAccess',
  data () {
    return {
      list: this.$t('PCBitbrowseAccess.list')
    }
  },
  methods: {
    open () {
      window.open(' https://www.bitbrowser.cn/')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./Bitbrowse_access.less');
</style>
