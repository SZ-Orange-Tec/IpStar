<template>
  <div class="pc-settings">
    <!-- tabs -->
    <div class="my_tabs">
      <div class="tab_pane" :class="{ pitchon: index === idx }" v-for="(item, index) in tabs" :key="index" @click="cikTabs(index)">
        {{ item }}
      </div>
    </div>
    <!-- content -->
    <div class="tab_content" v-show="!idx">
      <!-- 头像 -->
      <div class="headPortrait">
        <div class="img_head">
          <img src="../../../assets/pc_img/layout_img/head portrait.png" alt="head portrait" />
        </div>
        <span @click="setPassword">{{$t('PCSettings.tabContent.headPortrait')}}</span>
      </div>
      <!-- 用户信息 -->
      <div class="user_info">
        <div class="name_email">
          <div class="name">
            <p>User ID</p>
            <el-input placeholder="Name" readonly v-model="userInfo.cuscode"></el-input>
          </div>
          <div class="email">
            <p>Name</p>
            <el-input placeholder="E-mail" readonly v-model="userInfo.username"></el-input>
          </div>
        </div>
        <div class="api_key">
          <div class="column">
            <p>E-mail</p>
            <div class="input">
              <el-input readonly v-model="userInfo.email" />
            </div>
          </div>
          <div class="column">
            <p>API Key</p>
            <div class="input">
              <el-input readonly v-model="userInfo.api_key" />
              <el-button class="color" @click="copyKey">{{$t('PCSettings.tabContent.btnCopy')}}</el-button>
              <el-button @click="apiKeyUpdate">{{$t('PCSettings.tabContent.btnText')}}</el-button>
              <el-popover placement="top" width="300" :offset="100" trigger="hover">
                <div>
                  <p>{{$t('PCSettings.tabContent.popover')}}</p>
                </div>
                <img slot="reference" src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
              </el-popover>
            </div>
          </div>
          <div class="column">
            <p>Proxy User</p>
            <div class="input">
              <el-input readonly v-model="userInfo.proxy_user" />
              <el-button class="color" @click="userUpdate">{{$t('PCSettings.tabContent.btnText')}}</el-button>
            </div>
          </div>
          <div class="column">
            <p>Proxy Password</p>
            <div class="input">
              <el-input readonly v-model="userInfo.proxy_pass" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_content" v-show="idx">
      <!-- 新增按钮 -->
      <el-button @click="addNew">{{$t('PCSettings.tabContentTwo.btnText')}}</el-button>
      <!-- 白名单表格 -->
      <el-table :data="tableData" height="378" border style="width: 753px; border-radius: 10px 10px 0px 0px">
        <el-table-column prop="ip" :label="$t('PCSettings.tabContentTwo.labels[0]')"> </el-table-column>
        <el-table-column prop="note" :label="$t('PCSettings.tabContentTwo.labels[1]')"> </el-table-column>
        <el-table-column prop="date" :label="$t('PCSettings.tabContentTwo.labels[2]')"> </el-table-column>
        <el-table-column :label="$t('PCSettings.tabContentTwo.labels[3]')">
          <template slot-scope="scope">
            <el-popconfirm :title="$t('PCSettings.tabContentTwo.popconfirm')" @confirm="deleteItem(scope)">
              <el-button slot="reference">{{$t('PCSettings.tabContentTwo.labelBtn')}}</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template slot="append">
          <div class="message" v-if="bottomLoding">
            loading&nbsp;<i class="el-icon-loading"></i>
          </div>
          <div class="message" v-else>{{$t('PCSettings.tabContentTwo.AtTheEnd')}}</div>
        </template>
      </el-table>
      <el-popover placement="bottom" width="400" :offset="50" trigger="hover">
        <div>
          <p>{{$t('PCSettings.tabContentTwo.popover.pOne')}}</p>
          <p>{{$t('PCSettings.tabContentTwo.popover.pTwo')}}</p>
        </div>
        <img slot="reference" src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
      </el-popover>
    </div>
    <!-- 弹出层 -->
    <el-dialog class="min_dialog" :visible.sync="isShow" width="30%" @close="handleClose">
      <div class="content_password">
        <!-- 表单验证 -->
        <!-- 修改密码 -->
        <el-form :model="formData" :rules="rules" ref="Elform" v-show="isForm">
          <el-form-item prop="oldPassword" :label="$t('PCSettings.form.passwordForm.labels[0]')">
            <el-input type="number" v-model="formData.oldPassword" show-password autofocus></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" :label="$t('PCSettings.form.passwordForm.labels[1]')">
            <el-input type="number" v-model="formData.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item prop="repeatNewPassword" :label="$t('PCSettings.form.passwordForm.labels[2]')">
            <el-input type="number" v-model="formData.repeatNewPassword" show-password></el-input>
          </el-form-item>
        </el-form>
        <!-- 新增白名单 -->
        <el-form :model="AddFormData" :rules="AddRules" ref="AddElform" v-show="!isForm">
          <el-form-item prop="IP" :label="$t('PCSettings.form.addForm.label')">
            <el-input v-model="AddFormData.IP" :placeholder="$t('PCSettings.form.addForm.placeholder[0]')" autofocus></el-input>
          </el-form-item>
          <el-form-item prop="notes">
            <el-input v-model="AddFormData.notes" :placeholder="$t('PCSettings.form.addForm.placeholder[1]')"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirm" :loading="btnloading">{{$t('PCSettings.btnSum.confirm')}}</el-button>
        <el-button type="primary" @click="isShow = false">{{$t('PCSettings.btnSum.cancel')}}</el-button>
      </span>
    </el-dialog>
    <!-- 验证密码弹出层 -->
    <el-dialog :title="$t('PCSettings.passwordDialog.title')" :visible.sync="isDialog" width="22%" :before-close="closeIsDialog" class="passwordDialog">
      <el-form label-position="top" :model="passwordFrom" :rules="passwordRules" ref="passwordForm">
        <el-form-item :label="$t('PCSettings.passwordDialog.label')">
          <el-input show-password v-model="passwordFrom.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submit">{{$t('PCSettings.passwordDialog.btnSum[0]')}}</el-button>
        <el-button @click="isDialog = false" size="small">{{$t('PCSettings.passwordDialog.btnSum[1]')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  PlatCustomerResetApiKey,
  platCustomerResetProxy,
  platCustomerWhitelist,
  platCustomerUpdatePass,
  AddplatCustomerWhitelist,
  delPlatCustomerWhitelist
} from '@/api/layout'
export default {
  name: 'SettIngs',

  data () {
    return {
      tabs: this.$t('PCSettings.tabs'),
      idx: 0,
      tableData: [],
      isShow: false,
      // 修改密码
      formData: {
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null
      },
      // 新增白名单
      AddFormData: {
        IP: null,
        notes: null
      },
      // 修改密码
      rules: {
        oldPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.$t('PCSettings.form.passwordForm.rules[0]'),
            trigger: 'change'
          }
        ],
        newPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.$t('PCSettings.form.passwordForm.rules[0]'),
            trigger: 'change'
          }
        ],
        repeatNewPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.$t('PCSettings.form.passwordForm.rules[0]'),
            trigger: 'change'
          },
          {
            required: true,
            validator: (rule, val, callback) => {
              if (this.formData.newPassword === val) {
                callback()
              } else {
                callback(
                  new Error(this.$t('PCSettings.form.passwordForm.rules[1]'))
                )
              }
            },
            trigger: 'change'
          }
        ]
      },
      // 新增白名单
      AddRules: {
        IP: [
          { required: true, message: this.$t('PCSettings.form.addForm.rules[0]'), trigger: 'change' },
          {
            required: true,
            validator: (rule, val, callback) => {
              const reg =
                /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/
              if (reg.test(val)) {
                callback()
              } else {
                callback(new Error(this.$t('PCSettings.form.addForm.rules[1]')))
              }
            },
            trigger: 'change'
          }
        ],
        notes: [{ required: true, message: this.$t('PCSettings.form.addForm.rules[2]'), trigger: 'change' }]
      },
      // 修改密码form&&新增白名单form
      isForm: true,
      // 用户信息
      userInfo: this.$store.state.user_info,
      // 白名单数量
      count: 0,
      // 加载状态
      bottomLoding: false,
      btnloading: false,
      // 验证密码提示框
      isDialog: false,
      // 密码验证
      passwordFrom: {
        password: null
      },
      passwordRules: {
        password: [{
          required: true,
          validator: (rule, val, callback) => {
            const reg = /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()/""/']{6,20}$/
            if (reg.test(val)) {
              callback()
            } else {
              callback(new Error(this.$t('PCSettings.passwordDialog.passwordRules')))
            }
          },
          trigger: 'change'
        }]
      },
      passwordType: null
    }
  },
  created () {
    // 获取ip白名单列表
    this.getWhiteList()
  },
  mounted () {
    // 下拉加载更多ip白名单
    this.load()
  },
  methods: {
    // 复制key
    copyKey () {
      const text = this.userInfo.api_key
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(res => {
          // 成功提示信息
          this.$message({
            message: 'Copy success',
            type: 'success'
          })
        }).catch(() => {
          this.$message.error('Copy failed')
        })
      } else {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', text)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        // 删除这个节点
        document.body.removeChild(input)
      }
    },
    // tabs 切换
    cikTabs (val) {
      if (val) {
        this.isForm = false
      } else {
        this.isForm = true
      }
      this.idx = val
    },
    // 点击删除白名单
    async deleteItem ({ row }) {
      // console.log(row)
      const { msg } = await delPlatCustomerWhitelist(row.id)
      const idx = this.tableData.findIndex(item => item.id === row.id)
      this.tableData.splice(idx, 1)
      this.$message({
        message: 'successfully delete',
        type: msg
      })
    },
    // 关闭弹层触发
    handleClose () {
      this.formData = {
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null
      }
      this.AddFormData = {
        IP: null,
        notes: null
      }
      // 重置表单验证
      if (this.isForm) {
        this.$refs.Elform.resetFields()
      } else {
        this.$refs.AddElform.resetFields()
      }
    },
    // 确认 提交
    confirm () {
      this.btnloading = true
      if (this.isForm) {
        this.$refs.Elform.validate(async valid => {
          if (!valid) {
            this.btnloading = false
            return
          }
          try {
            // 修改用户密码
            const { msg } = await platCustomerUpdatePass({
              password: this.formData.oldPassword,
              new_password: this.formData.newPassword
            })
            this.btnloading = false
            this.isShow = false
            this.handleClose()
            this.$store.commit('dropOut')
            this.$message({
              message:
                'If the password is successfully changed, you need to log in again',
              type: msg
            })
            this.$router.push('/login')
          } catch (err) {
            console.log(err)
            this.btnloading = false
          }
        })
      } else {
        this.$refs.AddElform.validate(async valid => {
          if (!valid) {
            this.btnloading = false
            return
          }
          try {
            const { msg } = await AddplatCustomerWhitelist({
              ip: this.AddFormData.IP,
              remark: this.AddFormData.notes
            })
            this.btnloading = false
            this.$message({
              message: 'successfully added',
              type: msg
            })
            this.isShow = false
            this.handleClose()
            this.getWhiteList()
          } catch (err) {
            console.log(err)
            this.btnloading = false
          }
        })
      }
    },
    // 打开修改密码弹窗
    setPassword () {
      this.isShow = true
    },
    // 打开新增白名单弹窗
    addNew () {
      this.isShow = true
    },
    // 更新api_key
    apiKeyUpdate () {
      this.isDialog = true
      this.passwordType = 'apiKey'
    },
    // 更新代理账号
    userUpdate () {
      this.isDialog = true
      this.passwordType = 'user'
    },
    // 获取IP白名单列表
    async getWhiteList (page = 1, size = 10) {
      const {
        data: { count, list }
      } = await platCustomerWhitelist({
        page_index: page,
        page_size: size
      })
      this.count = count
      this.tableData = list.map(item => {
        return {
          ip: item.ip,
          note: item.remark,
          date: item.create_time,
          id: item.id
        }
      })
    },
    // 触底加载更多
    load () {
      document.querySelector('.el-table__body-wrapper').onscroll = val => {
        const clientHeight = val.target.clientHeight
        const scrollTop = val.target.scrollTop
        const scrollHeight = val.target.scrollHeight
        let size = 10
        if (clientHeight + scrollTop === scrollHeight) {
          this.bottomLoding = true
          if (this.tableData.length === this.count) {
            this.bottomLoding = false
          } else {
            this.getWhiteList(1, (size += 10))
          }
        }
      }
    },
    // 验证密码提示框关闭
    closeIsDialog () {
      this.passwordFrom = {
        password: null
      }
      this.isDialog = false
      this.$refs.passwordForm.resetFields()
    },
    // 确认 更新
    async submit () {
      if (this.passwordType === 'apiKey') {
        // 更新api_key
        const { data } = await PlatCustomerResetApiKey({
          password: this.passwordFrom.password
        })
        localStorage.setItem(
          'user_info',
          JSON.stringify({ ...this.userInfo, ...data })
        )
        this.userInfo.api_key = data.api_key
        this.$message({
          type: 'success',
          message: 'API Key is changed succesfully!'
        })
        this.closeIsDialog()
      } else if (this.passwordType === 'user') {
        // 更新代理账号
        const { data } = await platCustomerResetProxy({
          password: this.passwordFrom.password
        })
        localStorage.setItem(
          'user_info',
          JSON.stringify({ ...this.userInfo, ...data })
        )
        this.userInfo.proxy_pass = data.proxy_pass
        this.userInfo.proxy_user = data.proxy_user
        this.$message({
          type: 'success',
          message: 'Proxy User & Proxy Password are changed succesfully!'
        })
        this.closeIsDialog()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./settings.less');
</style>
