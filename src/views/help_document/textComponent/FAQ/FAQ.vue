<template>
  <div class="pc-FAQ">
    <div class="document_FAQ_text">
      <h3>{{$t('PCFaq.h3[0]')}}</h3>
      <h4>{{$t('PCFaq.h4[0]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.one[0]')}}</p>
        <p>{{$t('PCFaq.pBox.one[1]')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[1]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.two')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[2]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.three')}}</p>
      </div>
      <h3 style="margin-top: 31px;">{{$t('PCFaq.h3[1]')}}</h3>
      <h4>{{$t('PCFaq.h4[3]')}}</h4>
      <div class="p_box">
        <p>
          {{$t('PCFaq.pBox.four[0]')}} <a href="https://www.ipflare.com/#/products">{{$t('PCFaq.pBox.four[1]')}}</a>,<br />
          {{$t('PCFaq.pBox.four[2]')}} <a href="https://www.ipflare.com/#/pricing">{{$t('PCFaq.pBox.four[3]')}}</a>
        </p>
      </div>
      <h4>{{$t('PCFaq.h4[4]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.five[0]')}}</p>
        <p>{{$t('PCFaq.pBox.five[1]')}} <a href="https://www.ipflare.com/#/help_document">{{$t('PCFaq.pBox.five[2]')}}</a></p>
      </div>
      <h4>{{$t('PCFaq.h4[5]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.six')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[6]')}}</h4>
      <div class="p_box">
        <p v-for="item,index in $t('PCFaq.pBox.seven')" :key="index">{{item}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[7]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.eight')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[8]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.nine')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[9]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.ten')}}</p>
        <p class="dot">{{$t('PCFaq.pBox.ten2')}}</p>
      </div>
      <h4>{{$t('PCFaq.h4[10]')}}</h4>
      <div class="p_box">
        <p>{{$t('PCFaq.pBox.eleven')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCFAQ'
}
</script>

<style lang="less" scoped>
@import url('./FAQ.less');
</style>
