<template>
  <div class="pc-login_code space-y-5">

    <p>{{$t('PCRegister.mail.tip')}} {{account}} {{ $t('PCRegister.mail.tip2') }}</p>

    <div class="input_group">
      <label for="code">
        <ul class="flex space-x-3" ref="inputGroup">
          <li v-for="(item,index) in code" :key="index" :class="{focus:index===point}" class="flex-1 transition-color vh_center">
            <div class="tick" v-if="index===point"></div>
            <div class="num vh_center">{{ item }}</div>
          </li>
        </ul>
      </label>
      <input ref="input" id="code" type="text" maxlength="6" @focus="focusInput" @blur="point=-1" @keyup="inputNumber" @paste="pasteCode" />
    </div>

    <div class=" pointer vh_center space-x-2 btn" @click="reSend" :class="{disabled:btnLoading,notResend:!isReSend}">
      <span v-if="btnLoading" class="chat-loading"></span>
      <strong>{{ $t('PCRegister.verificationCode.reSend') }} {{ isReSend ? '' : '('+second+')' }}</strong>
    </div>

  </div>
</template>

<script>
import { platCustomerVerifycode } from '@/api/login'

export default {
  name: 'PCLogin',
  props: {
    value: String,
    account: String
  },
  data () {
    return {
      btnLoading: false,
      point: -1,
      second: 60
    }
  },
  computed: {
    code: {
      get () {
        return [...new Array(6)].map((item, index) => {
          const num = this.value?.charAt(index)
          return num || ''
        })
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    password: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    isReSend () {
      return this.second <= 0
    }
  },
  methods: {
    submit () {
      if (!this.code.length > 5) {
        this.$message.error(this.$t('PCRegister.verificationCode.message'))
        return
      }
      this.btnLoading = true
      this.$emit('next', () => {
        this.btnLoading = false
      })
    },
    focusInput () {
      const dom = this.$refs.inputGroup
      const length = this.value.length
      const index = Math.max(length - 1, 0)
      this.point = index

      this.$nextTick(() => {
        dom.childNodes[index]?.focus()
      })
    },
    inputNumber (e) {
      const { key, keyCode } = e
      console.log(key, keyCode)
      if (!/^[0-9]$|Backspace/.test(key)) return

      if (key === 'Backspace' || keyCode === 8) {
        if (this.point <= -1) return
        this.point -= 1
        this.code = this.value.slice(0, this.value.length - 1)
      } else {
        // if (this.point >= 6) return
        if (this.value.length < 6) {
          this.code = this.value + key
        }
        this.point += 1

        if (this.point >= 6) {
          this.$refs.input.blur()
          this.submit()
        }
      }
    },
    // 粘贴code
    async pasteCode (e) {
      const text = await navigator.clipboard.readText()
      if (/^\d{6}$/.test(text)) {
        this.code = text
        this.point = 5
        setTimeout(() => {
          this.submit()
        }, 500)
      } else {
        const en = this.$store.state.lang === 'en'
        this.$message.warning(en
          ? 'Please paste the 6-digit verification code'
          : '请粘贴6位数字的验证码')
      }
    },
    // 减少时间
    reduce () {
      this.second--
      if (this.second <= 0) return

      setTimeout(() => {
        this.reduce()
      }, 1000)
    },
    // 重新发送
    async reSend () {
      try {
        if (!this.isReSend) return

        this.$notify({
          title: 'Hint',
          message: 'Verification Code has been sent to your email, please check your inbox',
          type: 'success'
        })
        this.second = 60
        this.reduce()
        await platCustomerVerifycode({
          email: this.account,
          type: 1
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  mounted () {
    this.reduce()

    this.$refs.input.focus()
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
