<template>
  <div class="pc-settings">
    <!-- tabs -->
    <div class="my_tabs">
      <div class="tab_pane" :class="{ pitchon: index === idx }" v-for="(item, index) in tabs" :key="index" @click="cikTabs(index)">
        {{ item }}
      </div>
    </div>
    <!-- content -->
    <div class="tab_content space-y-5" v-show="!idx">
      <!-- 头像 -->
      <div class="headPortrait">
        <div class="img_head">
          <img src="../../../assets/pc_img/layout_img/head portrait.png" alt="head portrait" />
        </div>
        <span @click="setPassword">{{ $t("PCSettings.tabContent.headPortrait") }}</span>
      </div>
      <!-- 用户信息 -->
      <div class="column space-y-5">
        <div class="v_center space-x-10">
          <div class="column space-y-2">
            <p>User ID</p>
            <ip-input v-model="userInfo.cuscode" readonly placeholder="Name" />
          </div>
          <div class="column space-y-2">
            <p>Name</p>
            <ip-input v-model="userInfo.username" readonly placeholder="E-mail" />
          </div>
        </div>
        <div class="column space-y-5">
          <div class="column space-y-2">
            <p>E-mail</p>
            <div class="column space-y-2">
              <ip-input v-model="userInfo.email" readonly placeholder="E-mail" style="width: 468px" />
            </div>
          </div>
          <div class="column space-y-2">
            <p>API Key</p>
            <div class="v_center space-x-5">
              <ip-input v-model="userInfo.api_key" readonly placeholder="API Key" style="width: 468px" />
              <ip-button @click="copyKey" class="px-3 h-10" type="primary">{{ $t("PCSettings.tabContent.btnCopy") }}</ip-button>
              <ip-button @click="apiKeyUpdate" class="px-3 h-10" type="neutral">{{ $t("PCSettings.tabContent.btnText") }}</ip-button>
              <!-- <ip-popover placement="top" width="300" :offset="100" trigger="hover">
                <div>
                  <p>{{ $t("PCSettings.tabContent.popover") }}</p>
                </div>
                <img slot="reference" src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
              </ip-popover> -->
            </div>
          </div>
          <div class="column space-y-2">
            <p>Proxy User</p>
            <div class="v_center space-x-5">
              <ip-input v-model="userInfo.proxy_user" readonly placeholder="Proxy User" style="width: 468px" />
              <ip-button @click="userUpdate" class="px-3 h-10" type="neutral">{{ $t("PCSettings.tabContent.btnText") }}</ip-button>
            </div>
          </div>
          <div class="column">
            <p>Proxy Password</p>
            <div class="v_center space-x-5">
              <ip-input v-model="userInfo.proxy_pass" readonly placeholder="Proxy Password" style="width: 468px" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_content space-y-5" v-show="idx">
      <!-- 新增按钮 -->
      <ip-button @click="addNew" type="primary" class="px-3 h-10">{{ $t("PCSettings.tabContentTwo.btnText") }}</ip-button>
      <!-- 白名单表格 -->
      <ip-table :data="tableData" height="378px">
        <ip-table-column prop="ip" :label="$t('PCSettings.tabContentTwo.labels[0]')"> </ip-table-column>
        <ip-table-column prop="note" :label="$t('PCSettings.tabContentTwo.labels[1]')"> </ip-table-column>
        <ip-table-column prop="date" :label="$t('PCSettings.tabContentTwo.labels[2]')"> </ip-table-column>
        <ip-table-column :label="$t('PCSettings.tabContentTwo.labels[3]')">
          <template #default="scope">
            <ip-button @click="deleteItem(scope)" class="px-3 h-10">{{ $t("PCSettings.tabContentTwo.labelBtn") }}</ip-button>
            <!-- <ip-popconfirm :title="$t('PCSettings.tabContentTwo.popconfirm')" @confirm="deleteItem(scope)">
            </ip-popconfirm> -->
          </template>
        </ip-table-column>
        <template #append>
          <div class="message" v-if="bottomLoding">loading&nbsp;<i class="ip-icon-loading"></i></div>
          <div class="message" v-else>{{ $t("PCSettings.tabContentTwo.AtTheEnd") }}</div>
        </template>
      </ip-table>
      <!-- <ip-popover placement="bottom" width="400" :offset="50" trigger="hover">
        <div>
          <p>{{ $t("PCSettings.tabContentTwo.popover.pOne") }}</p>
          <p>{{ $t("PCSettings.tabContentTwo.popover.pTwo") }}</p>
        </div>
        <img slot="reference" src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
      </ip-popover> -->
    </div>
    <!-- 弹出层 -->
    <ip-dialog class="min_dialog" v-model="isShow" v-if="isShow" @close="handleClose">
      <template #default="{ close }">
        <div class="container relative space-y-10">
          <div class="title">
            <p>{{ isForm ? "修改密码" : "添加白名单" }}</p>
          </div>

          <div class="space-y-5" v-if="isForm">
            <div class="space-y-2">
              <p class="text-sm">Old Password</p>
              <ip-input class="w-full" type="password" v-model="formData.oldPassword" :placeholder="$t('PCSettings.form.passwordForm.labels[0]')" />
            </div>

            <div class="space-y-2">
              <p class="text-sm">New Password</p>
              <ip-input class="w-full" type="password" v-model="formData.newPassword" :placeholder="$t('PCSettings.form.passwordForm.labels[1]')" />
            </div>

            <div class="space-y-2">
              <p class="text-sm">Repeat New Password</p>
              <ip-input
                class="w-full"
                type="password"
                v-model="formData.repeatNewPassword"
                :placeholder="$t('PCSettings.form.passwordForm.labels[2]')"
              />
            </div>
          </div>

          <div v-else class="space-y-5">
            <div class="space-y-2">
              <p class="text-sm">{{ $t("PCSettings.form.addForm.placeholder[0]") }}</p>
              <ip-input class="w-full" v-model="AddFormData.IP" :placeholder="$t('PCSettings.form.addForm.placeholder[0]')" autofocus></ip-input>
            </div>

            <div class="space-y-2">
              <p class="text-sm">{{ $t("PCSettings.form.addForm.placeholder[1]") }}</p>
              <ip-input class="w-full" v-model="AddFormData.notes" :placeholder="$t('PCSettings.form.addForm.placeholder[1]')" autofocus></ip-input>
            </div>
          </div>

          <div class="between">
            <ip-button class="px-3 h-10" @click="confirm" :loading="btnloading">{{ $t("PCSettings.btnSum.confirm") }}</ip-button>
            <ip-button class="px-3 h-10" type="neutral" @click="isShow = false">{{ $t("PCSettings.btnSum.cancel") }}</ip-button>
          </div>

          <div class="close vh_center pointer transition-color" @click="close">
            <CloseIcon :size="16" />
          </div>
        </div>
      </template>
    </ip-dialog>
    <!-- 验证密码弹出层 -->
    <ip-dialog :title="$t('PCSettings.passwordDialog.title')" v-model="isDialog" v-if="isDialog" :before-close="closeIsDialog" class="min_dialog">
      <template #default="{ close }">
        <div class="container">
          <div class="space-y-2">
            <p class="text-sm">{{ $t("PCSettings.passwordDialog.label") }}</p>
            <ip-input type="password" v-model="passwordFrom.password"></ip-input>
          </div>

          <div class="between">
            <ip-button type="primary" size="small" @click="submit">{{ $t("PCSettings.passwordDialog.btnSum[0]") }}</ip-button>
            <ip-button type="neutral" @click="isDialog = false" size="small">{{ $t("PCSettings.passwordDialog.btnSum[1]") }}</ip-button>
          </div>

          <div class="close vh_center pointer transition-color" @click="close">
            <CloseIcon :size="16" />
          </div>
        </div>
      </template>
    </ip-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue"
import userStore from "@/store/user"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import {
  PlatCustomerResetApiKey,
  platCustomerResetProxy,
  platCustomerWhitelist,
  platCustomerUpdatePass,
  AddplatCustomerWhitelist,
  delPlatCustomerWhitelist,
} from "@/api/layout"
import Message from "@/components/message/message"
import settingsStore from "@/store/setting"
import IpButton from "@/components/button/button.vue"
import IpInput from "@/components/input/input.vue"
import IpTable from "@/components/table/table.vue"
import IpTableColumn from "@/components/table/table-column.vue"
import IpDialog from "@/components/dialog/index.vue"
import { X as CloseIcon } from "lucide-vue-next"
import position from "../../../components/dialog/position"

const { userInfo } = userStore()
const { en } = settingsStore()
const router = useRouter()
const { t } = useI18n()

const tabs = [t("Settings"), t("whitelist")]
const idx = ref(0)
const tableData = ref([])
const isShow = ref(false)
const isDialog = ref(false)
const bottomLoding = ref(false)
const btnloading = ref(false)
const count = ref(0)
const isForm = ref(true)
const passwordType = ref(null)

// 用户信息

// 修改密码表单
const formData = reactive({
  oldPassword: null,
  newPassword: null,
  repeatNewPassword: null,
})

// 新增白名单表单
const AddFormData = reactive({
  IP: null,
  notes: null,
})

// 密码验证表单
const passwordFrom = reactive({
  password: null,
})

// 表单验证规则
const rules = reactive({
  oldPassword: [
    {
      required: true,
      min: 6,
      max: 20,
      message: t("PCSettings.form.passwordForm.rules[0]"),
      trigger: "change",
    },
  ],
  newPassword: [
    {
      required: true,
      min: 6,
      max: 20,
      message: t("PCSettings.form.passwordForm.rules[0]"),
      trigger: "change",
    },
  ],
  repeatNewPassword: [
    {
      required: true,
      min: 6,
      max: 20,
      message: t("PCSettings.form.passwordForm.rules[0]"),
      trigger: "change",
    },
    {
      required: true,
      validator: (rule, val, callback) => {
        if (formData.newPassword === val) {
          callback()
        } else {
          callback(new Error(t("PCSettings.form.passwordForm.rules[1]")))
        }
      },
      trigger: "change",
    },
  ],
})

// 新增白名单验证规则
const AddRules = reactive({
  IP: [
    { required: true, message: t("PCSettings.form.addForm.rules[0]"), trigger: "change" },
    {
      required: true,
      validator: (rule, val, callback) => {
        const reg = /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/
        if (reg.test(val)) {
          callback()
        } else {
          callback(new Error(t("PCSettings.form.addForm.rules[1]")))
        }
      },
      trigger: "change",
    },
  ],
  notes: [{ required: true, message: t("PCSettings.form.addForm.rules[2]"), trigger: "change" }],
})

// 密码验证规则
const passwordRules = reactive({
  password: [
    {
      required: true,
      validator: (rule, val, callback) => {
        const reg = /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()/""/']{6,20}$/
        if (reg.test(val)) {
          callback()
        } else {
          callback(new Error(t("PCSettings.passwordDialog.passwordRules")))
        }
      },
      trigger: "change",
    },
  ],
})

// 复制key
function copyKey() {
  const text = userInfo.value.api_key
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // 成功提示信息
        Message({
          type: "success",
          message: en.value ? "Copy success" : "复制成功",
        })
      })
      .catch(() => {
        ElMessage.error("Copy failed")
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
}

// tabs 切换
function cikTabs(val) {
  if (val) {
    isForm.value = false
  } else {
    isForm.value = true
  }
  idx.value = val
}

// 点击删除白名单
async function deleteItem({ row }) {
  await delPlatCustomerWhitelist(row.id)
  const index = tableData.value.findIndex((item) => item.id === row.id)
  tableData.value.splice(index, 1)
  Message({
    type: "success",
    message: en.value ? "successfully delete" : "删除成功",
  })
}

// 关闭弹层触发
function handleClose() {
  formData.oldPassword = null
  formData.newPassword = null
  formData.repeatNewPassword = null

  AddFormData.IP = null
  AddFormData.notes = null

  // 重置表单验证
  if (isForm.value) {
    ElForm.value.resetFields()
  } else {
    AddElform.value.resetFields()
  }
}

// 确认提交
function confirm() {
  btnloading.value = true
  if (isForm.value) {
    Elform.value.validate(async (valid) => {
      if (!valid) {
        btnloading.value = false
        return
      }
      try {
        // 修改用户密码
        await platCustomerUpdatePass({
          password: formData.oldPassword,
          new_password: formData.newPassword,
        })
        btnloading.value = false
        isShow.value = false
        handleClose()
        store.commit("dropOut")
        Message({
          type: "success",
          message: en.value ? "If the password is successfully changed, you need to log in again" : "如果密码修改成功，需要重新登录",
        })
        router.push("/login")
      } catch (err) {
        console.log(err)
        btnloading.value = false
      }
    })
  } else {
    AddElform.value.validate(async (valid) => {
      if (!valid) {
        btnloading.value = false
        return
      }
      try {
        await AddplatCustomerWhitelist({
          ip: AddFormData.IP,
          remark: AddFormData.notes,
        })
        btnloading.value = false
        Message({
          type: "success",
          message: en.value ? "successfully added" : "添加成功",
        })
        isShow.value = false
        handleClose()
        getWhiteList()
      } catch (err) {
        console.log(err)
        btnloading.value = false
      }
    })
  }
}

// 打开修改密码弹窗
function setPassword(e) {
  position.set({ x: e.clientX, y: e.clientY })
  isShow.value = true
}

// 打开新增白名单弹窗
function addNew(e) {
  position.set({ x: e.clientX, y: e.clientY })
  isShow.value = true
}

// 更新api_key
function apiKeyUpdate() {
  isDialog.value = true
  passwordType.value = "apiKey"
}

// 更新代理账号
function userUpdate() {
  isDialog.value = true
  passwordType.value = "user"
}

// 获取IP白名单列表
async function getWhiteList(page = 1, size = 10) {
  const {
    data: { count: totalCount, list },
  } = await platCustomerWhitelist({
    page_index: page,
    page_size: size,
  })
  count.value = totalCount
  tableData.value = list.map((item) => {
    return {
      ip: item.ip,
      note: item.remark,
      date: item.create_time,
      id: item.id,
    }
  })
}

// 触底加载更多
function load() {
  // document.querySelector(".ip-table__body-wrapper").onscroll = (val) => {
  //   const clientHeight = val.target.clientHeight
  //   const scrollTop = val.target.scrollTop
  //   const scrollHeight = val.target.scrollHeight
  //   let size = 10
  //   if (clientHeight + scrollTop === scrollHeight) {
  //     bottomLoding.value = true
  //     if (tableData.value.length === count.value) {
  //       bottomLoding.value = false
  //     } else {
  //       getWhiteList(1, (size += 10))
  //     }
  //   }
  // }
}

// 验证密码提示框关闭
function closeIsDialog() {
  passwordFrom.password = null
  isDialog.value = false
  passwordForm.value.resetFields()
}

// 确认更新
async function submit() {
  const info = userInfo.value
  if (passwordType.value === "apiKey") {
    // 更新api_key
    const { data } = await PlatCustomerResetApiKey({
      password: passwordFrom.password,
    })
    localStorage.setItem("userInfo", JSON.stringify({ ...info, ...data }))
    info.api_key = data.api_key
    Message({
      type: "success",
      message: en.value ? "API Key is changed succesfully!" : "API Key 修改成功",
    })
    closeIsDialog()
  } else if (passwordType.value === "user") {
    // 更新代理账号
    const { data } = await platCustomerResetProxy({
      password: passwordFrom.password,
    })
    localStorage.setItem("userInfo", JSON.stringify({ ...info, ...data }))
    info.proxy_pass = data.proxy_pass
    info.proxy_user = data.proxy_user
    Message({
      type: "success",
      message: en.value ? "Proxy User & Proxy Password are changed succesfully!" : "代理账号和密码修改成功",
    })
    closeIsDialog()
  }
  userInfo.value = info
}

// 生命周期钩子
onBeforeMount(() => {
  // 获取ip白名单列表
  getWhiteList()
})

onMounted(() => {
  // 下拉加载更多ip白名单
  load()
})

// 模板引用
const Elform = ref(null)
const AddElform = ref(null)
const passwordForm = ref(null)
</script>

<style lang="less" scoped>
@import url("./settings.less");
</style>
