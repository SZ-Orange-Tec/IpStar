<template>
  <div class="pc-settings column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 px-3 md:px-5 my-5">
      <div class="main_container board px-5">
        <div class="tab_content space-y-5">
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
                <div class="v_center space-x-2">
                  <el-button class="color" @click="copyText(userInfo.api_key)">{{ $t("Copy") }}</el-button>
                  <el-button type="primary" @click="apiKeyUpdate">{{ $t("Regenerate") }}</el-button>
                  <el-popover placement="top" width="300" trigger="hover">
                    <div>
                      <p>{{ $t("settings_spec.popover") }}</p>
                    </div>
                    <template #reference>
                      <HelpCircle :size="16" color="hsl(var(--primary))" class="pointer" />
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
                <div class="flex space-x-2">
                  <el-button class="color" @click="copyText(userInfo.proxy_user)">{{ $t("Copy") }}</el-button>
                  <el-button type="primary" class="color" @click="userUpdate">{{ $t("Regenerate") }}</el-button>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <p>Proxy Password</p>
              <div class="column md:flex gap-2">
                <div class="fix">
                  <el-input readonly v-model="userInfo.proxy_pass" />
                </div>
                <el-button class="color" @click="copyText(userInfo.proxy_pass)">{{ $t("Copy") }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- tabs -->

    <!-- content -->
    <!-- 弹出层 -->
    <el-dialog class="min_dialog" v-model="isShow" width="350px" @close="handleClose">
      <div class="content_password">
        <!-- 表单验证 -->
        <!-- 修改密码 -->
        <el-form :model="formData" :rules="rules" ref="Elform">
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
      </div>
      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">{{ $t("Cancel") }}</el-button>
          <el-button type="primary" @click="confirm" :loading="btnloading">{{ $t("OK") }}</el-button>
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
import { HelpCircle } from "lucide-vue-next"

export default {
  name: "SettIngs",
  components: {
    NavBar,
    IpButton,
    HelpCircle,
  },
  data() {
    return {
      isShow: false,
      // 修改密码
      formData: {
        oldPassword: null,
        newPassword: null,
        repeatNewPassword: null,
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
  methods: {
    // 复制key
    copyText(str) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(str)
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
        input.setAttribute("value", str)
        input.select()
        if (document.execCommand("copy")) {
          document.execCommand("copy")
        }
        // 删除这个节点
        document.body.removeChild(input)
      }
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
      this.$refs.Elform.resetFields()
    },
    // 确认 提交
    confirm() {
      this.btnloading = true
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
    },
    // 打开修改密码弹窗
    setPassword() {
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
