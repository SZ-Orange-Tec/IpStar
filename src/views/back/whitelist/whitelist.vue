<template>
  <div class="pc-settings column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 px-3 md:px-5 my-5">
      <div class="main_container board p-5">
        <div class="tab_content space-y-5">
          <!-- 新增按钮 -->
          <ip-button type="primary" class="h-8 px-5 text-sm" @click="addNew">{{ $t("whitelist_spec.add_whitelist") }}</ip-button>
          <!-- 白名单表格 -->
          <div class="table_box">
            <el-table :data="tableData">
              <el-table-column prop="ip" label="IP"> </el-table-column>
              <el-table-column prop="note" :label="$t('Notes')"> </el-table-column>
              <el-table-column prop="date" :label="$t('Date')"> </el-table-column>
              <el-table-column :label="$t('Manage')">
                <template #default="scope">
                  <span class="warn pointer" @click="deleteItem(scope.row)">{{ $t("Delete") }}</span>
                </template>
              </el-table-column>
              <!-- <template #append>
                <div class="message" v-if="bottomLoding">loading&nbsp;<i class="el-icon-loading"></i></div>
                <div class="message" v-else>{{ $t("At_the_end") }}</div>
              </template> -->
            </el-table>
          </div>
          <div class="text-sm space-y-2">
            <p>{{ $t("whitelist_spec.white_tip1") }}</p>
            <p class="grey-60">{{ $t("Note") }}: {{ $t("whitelist_spec.white_tip2") }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
    <!-- 弹出层 -->
    <el-dialog center class="my_dialog" v-model="isShow" width="450px" @close="handleClose">
      <template #header>
        <div class="font-medium">{{ $t("whitelist_spec.add_whitelist") }}</div>
      </template>
      <div class="content_password">
        <!-- 新增白名单 -->
        <el-form :model="AddFormData" :rules="AddRules" label-position="top" ref="AddElform">
          <el-form-item prop="IP" label="IP">
            <el-input v-model="AddFormData.IP" :placeholder="$t('whitelist_spec.ip_tip')" autofocus class="h-10"></el-input>
          </el-form-item>
          <el-form-item prop="notes" :label="$t('whitelist_spec.notes')">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7 }"
              v-model="AddFormData.notes"
              :placeholder="$t('whitelist_spec.notes_tip')"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <template #footer>
        <div class="vh_center space-x-6">
          <ip-button class="h-9 px-5 text-sm min-w-[140px]" type="border" @click="isShow = false">{{ $t("Cancel") }}</ip-button>
          <ip-button class="h-9 px-5 text-sm min-w-[140px]" type="primary" :disabled="btnloading" @click="confirm" :loading="btnloading">
            <div class="vh_center space-x-2">
              <span v-if="btnloading" class="ip-loading"></span>
              <span>{{ $t("OK") }}</span>
            </div>
          </ip-button>
        </div>
      </template>
    </el-dialog>
    <!-- 验证密码弹出层 -->
    <el-dialog :title="$t('Prompts')" v-model="isDialog" width="350px" :before-close="closeIsDialog" class="passwordDialog">
      <el-form label-position="top" :model="passwordFrom" :rules="passwordRules" ref="passwordForm">
        <el-form-item :label="$t('whitelist_spec.verify')">
          <el-input show-password v-model="passwordFrom.password" :placeholder="$t('whitelist_spec.input_password')"></el-input>
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
import Confirm from "@/components/confirm/confirm.js"
import { toRefs } from "vue"

export default {
  name: "SettIngs",
  components: {
    NavBar,
    IpButton,
    HelpCircle,
  },
  data() {
    return {
      tableData: [],
      isShow: false,
      // 新增白名单
      AddFormData: {
        IP: null,
        notes: null,
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
      },
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
                callback(new Error(this.$t("whitelist_spec.verify")))
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
    // 点击删除白名单
    async deleteItem(row) {
      // console.log(row)
      Confirm({
        title: this.en ? "Delete whitelist IP" : "删除白名单IP",
        message: this.en ? "Once deleted, it cannot be recovered. Please confirm before deleting." : "删除白名单后无法恢复。请确认后再删除。",
        confirmText: this.en ? "Delete" : "删除",
        cancelText: this.en ? "Cancel" : "取消",
        width: "450px",
        success: async (res) => {
          const { loading } = toRefs(res)
          loading.value = true
          try {
            await delPlatCustomerWhitelist(row.id)
            const idx = this.tableData.findIndex((item) => item.id === row.id)
            this.tableData.splice(idx, 1)
            Message({
              type: "success",
              message: this.en ? "successfully delete" : "删除成功",
            })
          } catch (error) {
            Message({
              type: "warning",
              message: this.en ? "delete failed" : "删除失败",
            })
          } finally {
            loading.value = false
          }
        },
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
      this.$refs.AddElform.resetFields()
    },
    // 确认 提交
    confirm() {
      this.btnloading = true
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
    },
    // 打开新增白名单弹窗
    addNew() {
      this.isShow = true
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
@import url("./whitelist.less");
</style>
