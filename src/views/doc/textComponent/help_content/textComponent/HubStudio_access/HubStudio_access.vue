<template>
  <div class="pc-HubStudio_access">
    <div class="HubStudio_access_text">
      <h3>{{$t('PCHubStudioAccess.h3')}}</h3>
      <h4>{{$t('PCHubStudioAccess.h4')}}</h4>
      <div class="p_box">
        <p>{{$t('PCHubStudioAccess.p[0]')}} <a href="javascript:;" @click="open">{{$t('PCHubStudioAccess.p[1]')}}</a></p>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCHubStudioAccess',
  data () {
    return {
      list: this.$t('PCHubStudioAccess.list')
    }
  },
  methods: {
    open () {
      window.open('https://www.hubstudio.cn/?hub=rola')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./HubStudio_access.less');
</style>
