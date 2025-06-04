<template>
  <div class="pc-android_access">
    <div class="android_access_text">
      <h3>{{$t('PCAndroidAcess.h3')}}</h3>
      <div class="p_box">
        <p>{{$t('PCAndroidAcess.pBox.one')}}</p>
      </div>
      <h4>{{$t('PCAndroidAcess.h4')}}</h4>
      <div class="p_box">
        <p>
          {{$t('PCAndroidAcess.pBox.two[0]')}}
          <a href="javascript:;" @click="open('https://docs.zohopublic.com/file/s3zpw4560b795f76a4501b6d49edbd85cf715')">
            {{$t('PCAndroidAcess.pBox.two[1]')}}
          </a>
          {{$t('PCAndroidAcess.pBox.two[2]')}}
          <a href="javascript:;" @click="open('https://github.com/2dust/v2rayNG/releases')">
           {{$t('PCAndroidAcess.pBox.two[3]')}}
          </a>
        </p>
      </div>
      <ul class="step_box">
        <li v-for="item, index in list" :key="index">
          <h4>{{item.h4}}</h4>
          <div class="p_box" style="width:416px;">
            <p>{{item.p}}</p>
          </div>
          <img :src="item.img" alt="Access In Android one">
        </li>
      </ul>
      <div class="p_box" style="margin-top:33px;">
        <p class="note">{{$t('PCAndroidAcess.pBox.three')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCAndroidAccess',
  data () {
    return {
      list: this.$t('PCAndroidAcess.list')
    }
  },
  methods: {
    open (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./android_access.less');
</style>
