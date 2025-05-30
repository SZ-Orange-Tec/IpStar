<template>
  <div class="pc-help_document_text">
     <div class="help_document_text">
      <h3>{{$t('PCGettingStarted.h3')}}</h3>
      <div class="p_box">
        <p>{{$t('PCGettingStarted.pBox.pOne[0]')}} <i>{{$t('PCGettingStarted.pBox.pOne[1]')}}</i> {{$t('PCGettingStarted.pBox.pOne[2]')}} <i>{{$t('PCGettingStarted.pBox.pOne[1]')}}</i> {{$t('PCGettingStarted.pBox.pOne[3]')}}</p>
        <p>{{$t('PCGettingStarted.pBox.pTwo')}}</p>
      </div>
      <div class="help_document_text_content">
        <h3>{{$t('PCGettingStarted.content.h3[0]')}}</h3>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.one[0]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.one[1]')}}</p>
        </div>
        <h3>{{$t('PCGettingStarted.content.h3[1]')}}</h3>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.two[0]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.two[1]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.two[2]')}}</p>
        </div>
        <h3>{{$t('PCGettingStarted.content.h3[2]')}}</h3>
        <h4>{{$t('PCGettingStarted.content.h4[0]')}}</h4>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.three[0]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.three[1]')}}</p>
        </div>
        <h4>{{$t('PCGettingStarted.content.h4[1]')}}</h4>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.four[0]')}}</p>
          <p class="note">{{$t('PCGettingStarted.content.pBox.four[1]')}}</p>
        </div>
        <h4>{{$t('PCGettingStarted.content.h4[2]')}}</h4>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.five[0]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.five[1]')}}</p>
        </div>
        <h3>{{$t('PCGettingStarted.content.h3[3]')}}</h3>
        <div class="p_box">
          <p>{{$t('PCGettingStarted.content.pBox.six[0]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.six[1]')}}</p>
          <p>{{$t('PCGettingStarted.content.pBox.six[2]')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCHelpDocumentText'
}
</script>

<style lang="less" scoped>
@import url('./getting_started.less');
</style>
