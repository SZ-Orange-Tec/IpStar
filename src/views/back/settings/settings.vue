<template>
  <div class="pc-settings column h-full">
    <NavBar>
      <template #default>
        <div class="my_tabs v_center space-x-5">
          <span class="pointer" :class="{ active: index === idx }" v-for="(item, index) in tabs" :key="index" @click="cikTabs(index)">
            {{ item }}
          </span>
        </div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 px-3 md:px-5">
      <div class="tab_content space-y-5" v-show="!idx">
        <!-- 头像 -->
        <div class="headPortrait space-x-5">
          <div class="img_head">
            <img src="../../../assets/pc_img/layout_img/head portrait.png" alt="head portrait" />
          </div>
          <ip-button class="px-5 h-8 text-sm" type="neutral" @click="setPassword">
            {{ $t("Password") }}
          </ip-button>
        </div>
        <!-- 用户信息 -->
        <div class="form space-y-5">
          <div class="fix flex gap-5">
            <div class="space-y-2">
              <p>User ID</p>
              <el-input placeholder="Name" readonly v-model="userInfo.cuscode"></el-input>
            </div>
            <div class="space-y-2">
              <p>Name</p>
              <el-input placeholder="E-mail" readonly v-model="userInfo.username"></el-input>
            </div>
          </div>
          <div class="fix space-y-2">
            <p>E-mail</p>
            <el-input readonly v-model="userInfo.email" />
          </div>
          <div class="space-y-2">
            <p>API Key</p>
            <div class="column md:flex gap-2">
              <div class="fix">
                <el-input readonly v-model="userInfo.api_key" />
              </div>
              <div class="flex space-x-2">
                <el-button class="color" @click="copyKey">{{ $t("Copy") }}</el-button>
                <el-button type="primary" @click="apiKeyUpdate">{{ $t("Regenerate") }}</el-button>
                <el-popover placement="top" width="300" :offset="100" trigger="hover">
                  <div>
                    <p>{{ $t("settings_spec.popover") }}</p>
                  </div>
                  <template #reference>
                    <img src="../../../assets/pc_img/layout_img/question mark.png" style="height: 20px !important" />
                  </template>
                </el-popover>
              </div>
            </div>
            <div class="flex w-full space-x-3"></div>
          </div>
          <div class="space-y-2">
            <p>Proxy User</p>
            <div class="column md:flex gap-2">
              <div class="fix">
                <el-input readonly v-model="userInfo.proxy_user" />
              </div>
              <el-button class="color" @click="userUpdate">{{ $t("Regenerate") }}</el-button>
            </div>
          </div>
          <div class="space-y-2">
            <p>Proxy Password</p>
            <div class="fix">
              <el-input readonly v-model="userInfo.proxy_pass" />
            </div>
          </div>
        </div>
      </div>

      <div class="tab_content" v-show="idx">
        <!-- 新增按钮 -->
        <el-button @click="addNew">{{ $t("Add") }}</el-button>
        <!-- 白名单表格 -->
        <div class="table_box">
          <el-table :data="tableData" height="378" border style="width: 753px; border-radius: 10px 10px 0px 0px">
            <el-table-column prop="ip" label="IP"> </el-table-column>
            <el-table-column prop="note" :label="$t('Notes')"> </el-table-column>
            <el-table-column prop="date" :label="$t('Date')"> </el-table-column>
            <el-table-column :label="$t('Manage')">
              <template #default="scope">
                <el-popconfirm :title="$t('settings_spec.confirm_delete')" @confirm="deleteItem(scope)">
                  <template #reference>
                    <el-button>{{ $t("Delete") }}</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
            <template #append>
              <div class="message" v-if="bottomLoding">loading&nbsp;<i class="el-icon-loading"></i></div>
              <div class="message" v-else>{{ $t("At_the_end") }}</div>
            </template>
          </el-table>
        </div>
        <el-popover placement="bottom" width="400" :offset="50" trigger="hover">
          <div>
            <p>{{ $t("settings_spec.white_tip1") }}</p>
            <p>{{ $t("settings_spec.white_tip2") }}</p>
          </div>
          <template #reference>
            <img src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
          </template>
        </el-popover>
      </div>
    </div>
    <!-- tabs -->

    <!-- content -->
    <!-- 弹出层 -->
    <el-dialog class="min_dialog" v-model="isShow" width="350px" @close="handleClose">
      <div class="content_password">
        <!-- 表单验证 -->
        <!-- 修改密码 -->
        <el-form :model="formData" :rules="rules" ref="Elform" v-show="isForm">
          <el-form-item prop="oldPassword" :label="$t('Old_password')">
            <el-input type="number" v-model="formData.oldPassword" show-password autofocus></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" :label="$t('New_password')">
            <el-input type="number" v-model="formData.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item prop="repeatNewPassword" :label="$t('Repeat_new_password')">
            <el-input type="number" v-model="formData.repeatNewPassword" show-password></el-input>
          </el-form-item>
        </el-form>
        <!-- 新增白名单 -->
        <el-form :model="AddFormData" :rules="AddRules" ref="AddElform" v-show="!isForm">
          <el-form-item prop="IP" :label="$t('Add_to')">
            <el-input v-model="AddFormData.IP" placeholder="IP" autofocus></el-input>
          </el-form-item>
          <el-form-item prop="notes">
            <el-input v-model="AddFormData.notes" :placeholder="$t('Notes')"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirm" :loading="btnloading">{{ $t("OK") }}</el-button>
          <el-button type="primary" @click="isShow = false">{{ $t("Cancel") }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 验证密码弹出层 -->
    <el-dialog :title="$t('Prompts')" v-model="isDialog" width="350px" :before-close="closeIsDialog" class="passwordDialog">
      <el-form label-position="top" :model="passwordFrom" :rules="passwordRules" ref="passwordForm">
        <el-form-item :label="$t('settings_spec.verify')">
          <el-input show-password v-model="passwordFrom.password" :placeholder="$t('settings_spec.input_password')"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" size="small" @click="submit">{{ $t("OK") }}</el-button>
          <el-button @click="isDialog = false" size="small">{{ $t("Cancel") }}</el-button>
        </span>
      </template>
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
  delPlatCustomerWhitelist,
} from "@/api/layout"
import userStore from "@/store/user"
import loginStore from "@/store/login"
import NavBar from "../components/navbar/navbar.vue"
import IpButton from "@/components/button/button.vue"
import Message from "@/components/message/message"

export default {
  name: "SettIngs",
  components: {
    NavBar,
    IpButton,
  },
  data() {
    return {
      tabs: [this.$t("Settings"), this.$t("whitelist")],
      idx: 0,
      tableData: [],
      isShow: false,
      // 修改密码
      formData: {
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null,
      },
      // 新增白名单
      AddFormData: {
        IP: null,
        notes: null,
      },
      // 修改密码
      rules: {
        oldPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.en ? "Password must be 6 to 20 digits." : "密码格式为6 ~ 20位数字",
            trigger: "change",
          },
        ],
        newPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.en ? "Password must be 6 to 20 digits." : "密码格式为6 ~ 20位数字",
            trigger: "change",
          },
        ],
        repeatNewPassword: [
          {
            required: true,
            min: 6,
            max: 20,
            message: this.en ? "Password must be 6 to 20 digits." : "密码格式为6 ~ 20位数字",
            trigger: "change",
          },
          {
            required: true,
            validator: (rule, val, callback) => {
              if (this.formData.newPassword === val) {
                callback()
              } else {
                callback(new Error(this.en ? "The two passwords do not match." : "两个密码输入不一致"))
              }
            },
            trigger: "change",
          },
        ],
      },
      // 新增白名单
      AddRules: {
        IP: [
          { required: true, message: this.en ? "Please enter an IP." : "请填写IP", trigger: "change" },
          {
            required: true,
            validator: (rule, val, callback) => {
              const reg = /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/
              if (reg.test(val)) {
                callback()
              } else {
                callback(new Error(this.en ? "IP format is incorrect." : "IP格式错误。"))
              }
            },
            trigger: "change",
          },
        ],
        notes: [{ required: true, message: this.en ? "Please fill in these notes." : "请填写这些备注", trigger: "change" }],
      },
      // 修改密码form&&新增白名单form
      isForm: true,
      // 白名单数量
      count: 0,
      // 加载状态
      bottomLoding: false,
      btnloading: false,
      // 验证密码提示框
      isDialog: false,
      // 密码验证
      passwordFrom: {
        password: null,
      },
      passwordRules: {
        password: [
          {
            required: true,
            validator: (rule, val, callback) => {
              const reg = /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()/""/']{6,20}$/
              if (reg.test(val)) {
                callback()
              } else {
                callback(new Error(this.$t("settings_spec.verify")))
              }
            },
            trigger: "change",
          },
        ],
      },
      passwordType: null,
    }
  },
  created() {
    // 获取ip白名单列表
    this.getWhiteList()
  },
  mounted() {
    // 下拉加载更多ip白名单
    this.load()
  },
  methods: {
    // 复制key
    copyKey() {
      const text = this.userInfo.api_key
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then((res) => {
            // 成功提示信息
            Message({
              type: "success",
              message: this.en ? "Copy success" : "复制成功",
            })
          })
          .catch(() => {
            Message({
              type: "warning",
              message: this.en ? "Copy failed" : "复制失败",
            })
          })
      } else {
        const input = document.createElement("input")
        document.body.appendChild(input)
        input.setAttribute("value", text)
        input.select()
        if (document.execCommand("copy")) {
          document.execCommand("copy")
        }
        // 删除这个节点
        document.body.removeChild(input)
      }
    },
    // tabs 切换
    cikTabs(val) {
      if (val) {
        this.isForm = false
      } else {
        this.isForm = true
      }
      this.idx = val
    },
    // 点击删除白名单
    async deleteItem({ row }) {
      // console.log(row)
      await delPlatCustomerWhitelist(row.id)
      const idx = this.tableData.findIndex((item) => item.id === row.id)
      this.tableData.splice(idx, 1)
      Message({
        type: "success",
        message: this.en ? "successfully delete" : "删除成功",
      })
    },
    // 关闭弹层触发
    handleClose() {
      this.formData = {
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null,
      }
      this.AddFormData = {
        IP: null,
        notes: null,
      }
      // 重置表单验证
      if (this.isForm) {
        this.$refs.Elform.resetFields()
      } else {
        this.$refs.AddElform.resetFields()
      }
    },
    // 确认 提交
    confirm() {
      this.btnloading = true
      if (this.isForm) {
        this.$refs.Elform.validate(async (valid) => {
          if (!valid) {
            this.btnloading = false
            return
          }
          try {
            // 修改用户密码
            await platCustomerUpdatePass({
              password: this.formData.oldPassword,
              new_password: this.formData.newPassword,
            })
            this.btnloading = false
            this.isShow = false
            this.handleClose()
            this.OutLogin()
            Message({
              type: "success",
              message: this.en ? "Password change successful, you need to log in again" : "密码更改成功，您需要重新登录",
            })
            this.$router.push("/login")
          } catch (err) {
            console.log(err)
            this.btnloading = false
          }
        })
      } else {
        this.$refs.AddElform.validate(async (valid) => {
          if (!valid) {
            this.btnloading = false
            return
          }
          try {
            await AddplatCustomerWhitelist({
              ip: this.AddFormData.IP,
              remark: this.AddFormData.notes,
            })
            this.btnloading = false
            Message({
              type: "success",
              message: this.en ? "successfully added" : "添加成功",
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
    setPassword() {
      this.isShow = true
    },
    // 打开新增白名单弹窗
    addNew() {
      this.isShow = true
    },
    // 更新api_key
    apiKeyUpdate() {
      this.isDialog = true
      this.passwordType = "apiKey"
    },
    // 更新代理账号
    userUpdate() {
      this.isDialog = true
      this.passwordType = "user"
    },
    // 获取IP白名单列表
    async getWhiteList(page = 1, size = 10) {
      const {
        data: { count, list },
      } = await platCustomerWhitelist({
        page_index: page,
        page_size: size,
      })
      this.count = count
      this.tableData = list.map((item) => {
        return {
          ip: item.ip,
          note: item.remark,
          date: item.create_time,
          id: item.id,
        }
      })
    },
    // 触底加载更多
    load() {
      const dom = document.querySelector(".el-table__body-wrapper")
      if (!dom) return
      dom.onscroll = (val) => {
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
    closeIsDialog() {
      this.passwordFrom = {
        password: null,
      }
      this.isDialog = false
      this.$refs.passwordForm.resetFields()
    },
    // 确认 更新
    async submit() {
      if (this.passwordType === "apiKey") {
        // 更新api_key
        const { data } = await PlatCustomerResetApiKey({
          password: this.passwordFrom.password,
        })
        const info = {
          ...this.userInfo,
          api_key: data.api_key,
        }
        this.updateUserInfo(info)
        Message({
          type: "success",
          message: this.en ? "API Key is changed succesfully!" : "API 密钥已成功更改！",
        })
        this.closeIsDialog()
      } else if (this.passwordType === "user") {
        // 更新代理账号
        const { data } = await platCustomerResetProxy({
          password: this.passwordFrom.password,
        })
        const info = {
          ...this.userInfo,
          proxy_pass: data.proxy_pass,
          proxy_user: data.proxy_user,
        }
        this.updateUserInfo(info)
        Message({
          type: "success",
          message: this.en ? "Proxy User & Proxy Password are changed succesfully!" : "代理用户和代理密码已成功更改！",
        })
        this.closeIsDialog()
      }
    },
  },
  setup() {
    const { userInfo, updateUserInfo } = userStore()
    const { OutLogin } = loginStore()
    return {
      userInfo,
      updateUserInfo,
      OutLogin,
    }
  },
}
</script>

<style lang="less" scoped>
@import url("./settings.less");
</style>
