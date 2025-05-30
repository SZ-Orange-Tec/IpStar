<template>
  <div class="pc-login_password">
    <div class="form space-y-2">
      <p>{{ $t('PCSignIn.password.span') }}</p>
      <el-input v-model.trim="password" type="password" ref="password" show-password></el-input>
    </div>

    <div class="btn pointer vh_center space-x-2" @click="submit" :class="{disabled:btnLoading}">
      <span v-if="btnLoading" class="chat-loading"></span>
      <strong>{{$t('PCForgotPassword.btnTxt')}}</strong>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PCLogin',
  props: {
    value: String
  },
  data () {
    return {
      btnLoading: false
    }
  },
  computed: {
    password: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    submit () {
      if (!this.password) {
        this.$message.error(this.$t('PCRegister.password.message[0]'))
        return
      } else if (this.password.length < 6 || this.password.length > 20) {
        this.$message.error(this.$t('PCRegister.password.message[1]'))
        return
      }
      this.btnLoading = true
      this.$emit('next', () => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    this.$refs.password.focus()
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
