<template>
  <div class="pc-son-account column space-y-4">
    <div class="w-full between">
      <div class="v_center space-x-2 input">
        <el-input clearable v-model="searchForm.account" @input="searchDebounce" :placeholder="$t('account_spec.sub_account')"></el-input>
        <el-select v-model="searchForm.status" @change="search" :placeholder="$t('account_spec.status')">
          <el-option :label="$t('account_spec.all')" value="all"></el-option>
          <el-option :label="$t('account_spec.normal')" value="1"></el-option>
          <el-option :label="$t('account_spec.disabled')" value="0"></el-option>
        </el-select>
      </div>
      <IpButton type="primary" class="h-8 text-sm px-3" @click="openAddDialog">
        <div class="v_center space-x-1">
          <Plus :size="16" />
          <span>{{ $t("account_spec.new_sub_account") }}</span>
        </div>
      </IpButton>
    </div>

    <div class="w-full tablebox">
      <el-table v-loading="loading" :data="accountList" :max-height="500">
        <el-table-column :label="$t('account_spec.account')" min-width="180px">
          <template #default="scope">
            <div class="v_center space-x-2">
              <p>{{ scope.row.cuscode }}</p>
              <el-tooltip class="item" effect="dark" :content="$t('account_spec.reset_info_title')" placement="top">
                <div class="shrink-0">
                  <SquarePen :size="14" class="pointer icon" @click="openResetDialog(scope.row)" />
                </div>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="cuscode" :label="$t('account_spec.account')" min-width="160px" /> -->
        <el-table-column prop="proxyuser" :label="$t('account_spec.proxy_account')" min-width="140px" />
        <el-table-column prop="proxypass" :label="$t('account_spec.proxy_password')" min-width="140px" />
        <el-table-column min-width="160px">
          <template #header>
            <div class="v_center space-x-1">
              <div>{{ $t("account_spec.remain_traffic") + "(GB)" }}</div>
              <el-tooltip effect="light" placement="top">
                <template #content>
                  <div v-if="en">Prioritise the consumption of data allowances nearing <br />expiry based on their validity period.</div>
                  <div v-else>按照流量有效期，优先<br />消耗即将过期的流量。</div>
                </template>
                <i class="el-icon-info pointer" style="color: #fdb713"></i>
              </el-tooltip>
            </div>
          </template>
          <template #default="scope">
            <div class="v_center space-x-2">
              <p v-if="!scope.row.sharetf">{{ scope.row.packremain }}</p>
              <p v-else>{{ $t("account_spec.share_traffic") }}</p>
              <el-tooltip v-if="!scope.row.sharetf" class="item" effect="dark" :content="$t('account_spec.assign_traffic_title')" placement="top">
                <div class="shrink-0">
                  <Shuffle :size="14" class="pointer icon" @click="openTrafficDialog(scope.row)" />
                </div>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="packconsume" :label="$t('account_spec.total_traffic') + '(GB)'" min-width="160px"></el-table-column>
        <el-table-column prop="remark" :label="$t('account_spec.remark')" min-width="100px"></el-table-column>
        <el-table-column :label="$t('account_spec.status')" min-width="100px">
          <template #default="scope">
            <el-switch @click="updateStatus(scope.$index)" :value="scope.row.status" active-color="#13CE66" inactive-color="#788B9D"></el-switch>
            <!-- <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '正常' : '禁用' }}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column :label="$t('account_spec.operation')" min-width="240px">
          <template #default="scope">
            <div class="flex gap-2">
              <span class="primary whitespace-nowrap" @click="$router.push('/obtain_proxy?account=' + scope.row.cuscode)">
                {{ $t("account_spec.obtain_proxy") }}
              </span>
              <span class="primary whitespace-nowrap" @click="downloadTxt(scope.row)">
                {{ $t("account_spec.generate_doc") }}
              </span>
              <span class="primary whitespace-nowrap" @click="openViewDialog(scope.row)">
                {{ $t("account_spec.reset_proxy") }}
              </span>
            </div>
          </template>
        </el-table-column>

        <template #empty>
          <div style="line-height: 1.5">
            <i18n-t
              v-if="!searchForm.account && searchForm.status === 'all' && noTraffic"
              keypath="account_spec.no_traffic"
              tag="p"
              scope="global"
              class="title text-xl lg:text-3xl font-semibold"
            >
              <template #buy>
                <span class="pointer red" @click="toProduct">{{ $t("account_spec.to_buy") }}</span>
              </template>
            </i18n-t>
            <p v-else>{{ $t("account_spec.empty") }}</p>
          </div>
        </template>
      </el-table>
    </div>
    <div class="w-full flex justify-end mt-3">
      <el-pagination
        layout="total,prev, pager, next, sizes "
        :total="page.total"
        :current-page="page.index"
        size="default"
        :page-size="page.size"
        :page-sizes="[10, 20, 30, 40]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <!-- 新建子账号 -->
    <el-dialog :title="$t('account_spec.new_sub_account')" v-model="isAddDialog" width="600px">
      <div>
        <el-form :model="accountForm" ref="formRef" label-width="120px">
          <el-form-item :label="$t('account_spec.account')">
            <el-input type="text" v-model="accountForm.account" :disabled="accountdisabled" @blur="accountdisabled = true">
              <template #prepend>
                <div class="prepend-btn v_center">{{ subPrefix }}</div>
              </template>
              <template #append>
                <div class="append-btn vh_center pointer" @click="starAccountEdit">
                  {{ $t("account_spec.edit") }}
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.password')">
            <el-input type="text" v-model="accountForm.password" :disabled="passworddisabled" @blur="passworddisabled = true">
              <template #append>
                <div class="append-btn vh_center pointer" @click="starPasswordEdit">
                  {{ $t("account_spec.edit") }}
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.proxy_account')">
            <el-input type="text" v-model="accountForm.proxyuser" :placeholder="$t('account_spec.proxy_account')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.proxy_password')">
            <el-input type="text" v-model="accountForm.proxypass" :placeholder="$t('account_spec.proxy_password')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.share_traffic')">
            <el-radio v-model="accountForm.is_share" :label="1">{{ $t("account_spec.yes") }}</el-radio>
            <el-radio v-model="accountForm.is_share" :label="0">{{ $t("account_spec.no") }}</el-radio>
            <el-tooltip effect="dark" placement="top">
              <template #content>
                <div style="width: 200px">{{ $t("account_spec.share_traffic_des") }}</div>
              </template>
              <i class="el-icon-info pointer" style="color: #fdb713"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item :label="$t('account_spec.remark')">
            <el-input v-model="accountForm.remark" type="textarea" :placeholder="$t('account_spec.remark')" :rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div>
          <el-button @click="isAddDialog = false">{{ $t("account_spec.cancel") }}</el-button>
          <el-button :loading="loading" id="primary-button" type="primary" @click="confirmAdd">{{ $t("account_spec.confirm") }}</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 分配流量 -->
    <el-dialog :title="$t('account_spec.assign_traffic_title')" v-model="isTrafficDialog" width="600px">
      <div>
        <el-form :model="trafficForm" ref="formRef" label-width="120px">
          <el-form-item :label="$t('account_spec.account')">
            <el-input v-model="trafficForm.account" disabled readonly></el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.remark')">
            <el-input v-model="trafficForm.remark" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.remain_traffic')">
            <el-input v-model="trafficForm.has_traffic" disabled>
              <template #append>GB</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.allocable')">
            <div class="v_center space-x-2">
              <el-select v-model="trafficForm.pack_id" placeholder="请选择套餐" class="flex-1" @change="changePack">
                <el-option v-for="item in packList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>

              <div class="hastraffic v_center">
                {{ $t("account_spec.allocable_traffic") }}
                {{ trafficForm.max_traffic }}
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('account_spec.assign_traffic')">
            <el-input
              :value="trafficForm.add_traffic"
              @input="(val) => (trafficForm.add_traffic = val.replace(/[^0-9-]/g, ''))"
              :placeholder="$t('account_spec.assign_traffic_placeholder')"
            >
              <template #append>GB</template>
              <!-- <el-select slot="append" v-model="trafficForm.unit" placeholder="" style="width:80px">
                <el-option label="KB" value="KB"></el-option>
                <el-option label="MB" value="MB"></el-option>
                <el-option label="GB" value="GB"></el-option>
              </el-select> -->
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="isTrafficDialog = false">{{ $t("account_spec.cancel") }}</el-button>
        <el-button :loading="loading" id="primary-button" type="primary" @click="confirmTraffic">{{ $t("account_spec.confirm") }}</el-button>
      </template>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog :title="$t('account_spec.reset_info_title')" v-model="isResetDialog" width="500px">
      <div>
        <el-form :model="accountForm" label-width="100px">
          <el-form-item :label="$t('account_spec.account')">
            <el-input type="text" v-model="accountForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.password')">
            <el-input type="text" v-model="accountForm.password" :disabled="passworddisabled" @blur="passworddisabled = true">
              <template #append>
                <div class="append-btn vh_center pointer" @click="starPasswordEdit">
                  {{ $t("account_spec.edit") }}
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.share_traffic')">
            <el-radio v-model="accountForm.is_share" :label="1">{{ $t("account_spec.yes") }}</el-radio>
            <el-radio v-model="accountForm.is_share" :label="0">{{ $t("account_spec.no") }}</el-radio>
            <el-tooltip effect="dark" placement="top">
              <template #content>
                <div style="width: 200px">{{ $t("account_spec.share_traffic_des") }}</div>
              </template>
              <i class="el-icon-info pointer" style="color: #fdb713"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item :label="$t('account_spec.remark')">
            <el-input v-model="accountForm.remark" type="textarea" :placeholder="$t('account_spec.remark')" :rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button :loading="loading" id="primary-button" type="primary" @click="confirmReset">{{ $t("account_spec.confirm") }}</el-button>
      </template>
    </el-dialog>
    <!-- 查看账密 -->
    <el-dialog :title="$t('account_spec.reset_proxy_title')" v-model="isViewDialog" width="500px">
      <div>
        <el-form :model="accountForm" label-width="120px">
          <el-form-item :label="$t('account_spec.proxy_account')">
            <el-input type="text" v-model="accountForm.proxyuser" :disabled="accountdisabled" @blur="accountdisabled = true">
              <template #append>
                <div class="append-btn vh_center pointer" @click="starAccountEdit">
                  {{ $t("account_spec.edit") }}
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('account_spec.proxy_password')">
            <el-input type="text" v-model="accountForm.proxypass" :disabled="passworddisabled" @blur="passworddisabled = true">
              <template #append>
                <div class="append-btn vh_center pointer" @click="starPasswordEdit">
                  {{ $t("account_spec.edit") }}
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="confirmResetProxy" :disabled="loading">{{ $t("account_spec.reset") }}</el-button>
        <el-button type="primary" id="primary-button" @click="confirmUpdateProxy" :disabled="loading">{{ $t("account_spec.confirm") }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  platAccountAdd,
  platAccountAssignPack,
  platAccountList,
  platAccountPack,
  platAccountResetProxyPwd,
  platAccountUpdate,
  platAccountUpdateStatus,
} from "@/api/account"
import { platCustomer } from "@/api/login"
import { debounce, formatSizeUnits } from "@/utils/tools"
import { Shuffle, SquarePen, Plus } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
export default {
  name: "SonAccount",
  components: {
    Shuffle,
    SquarePen,
    Plus,
    IpButton,
  },
  data() {
    return {
      loading: false,
      accountdisabled: true,
      passworddisabled: true,
      searchForm: {
        account: "",
        status: "all",
      },
      // 新增编辑共用一个form
      accountForm: {
        account: "",
        password: "",
        remark: "",
        proxyuser: "",
        proxypass: "",
        is_share: 1,
      },
      trafficForm: {
        id: "",
        account: "",
        remark: "",
        pack_id: "",
        add_traffic: "",
        max_traffic: "",
        has_traffic: "",
        unit: "GB",
      },
      page: {
        index: 1,
        size: 10,
        total: 0,
      },
      accountList: [],
      packList: [],
      isAddDialog: false,
      isResetDialog: false,
      isTrafficDialog: false,
      isViewDialog: false,
    }
  },
  computed: {
    en() {
      return this.$store.state.lang === "en"
    },
    subPrefix() {
      return this.$store.state.user_info.sub_prefix
    },
    noTraffic() {
      return this.packList.every((i) => i.remain === 0)
    },
  },
  methods: {
    openAddDialog() {
      const isPurchase = this.$store.state.user_info.is_purchase ?? false
      if (!isPurchase) {
        this.$confirm("您当前没有可用的IP池", "提示", {
          confirmButtonText: "购买流量",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$router.push({ path: "/products" })
        })
        return
      }
      const generatePassword = (len) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let password = ""
        for (let i = 0; i < len; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length)
          password += chars[randomIndex] ?? ""
        }
        return password
      }
      this.accountForm = {
        account: generatePassword(4),
        password: generatePassword(8),
        remark: "",
        proxyuser: "",
        proxypass: "",
        is_share: 1,
      }
      this.isAddDialog = true
    },
    async confirmAdd() {
      const { account, password, remark, proxyuser, proxypass, is_share: sharetf } = this.accountForm
      if (!account) {
        this.$message.error(this.en ? "Please enter an account" : "请输入账号")
        return
      }
      if (!password) {
        this.$message.error(this.en ? "Please enter a password" : "请输入密码")
        return
      }
      if (!proxyuser) {
        this.$message.error(this.en ? "Please enter a proxy user" : "请输入代理用户名")
        return
      }
      if (!proxypass) {
        this.$message.error(this.en ? "Please enter a proxy password" : "请输入代理密码")
        return
      }
      if (proxyuser && !/^[a-zA-Z0-9]+$/.test(proxyuser)) {
        this.$message.error(this.en ? "Proxy accounts may only contain letters and numbers." : "代理用户名只能包含字母和数字")
        return
      }
      try {
        this.loading = true
        await platAccountAdd({
          account: account,
          password,
          remark,
          proxyuser,
          proxypass,
          sharetf,
        })
        this.$message.success(this.en ? "Add success" : "添加成功")
        this.isAddDialog = false
        this.search()
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    openResetDialog(row) {
      this.accountForm = {
        id: row.id,
        account: row.cuscode,
        password: row.password,
        remark: row.remark,
        is_share: row.sharetf,
      }
      this.isResetDialog = true
    },
    async confirmReset() {
      try {
        this.loading = true
        const { id, account, password, remark, is_share: sharetf } = this.accountForm
        await platAccountUpdate({
          id,
          account,
          password,
          remark,
          sharetf,
        })
        this.getList()

        this.$message.success(this.en ? "Reset success" : "重置成功")
        this.isResetDialog = false
      } catch (error) {
        console.log(error.message)
        this.loading = false
      }
    },
    openTrafficDialog(row) {
      const { id, remaineUnit } = this.packList[0]
      this.trafficForm = {
        id: row.id,
        account: row.cuscode,
        remark: row.remark,
        pack_id: id,
        max_traffic: remaineUnit,
        has_traffic: row.packremain,
        add_traffic: "",
        unit: "GB",
      }
      this.isTrafficDialog = true
    },
    async confirmTraffic() {
      try {
        this.loading = true
        const { id, add_traffic: add, pack_id: packId, has_traffic: has } = this.trafficForm
        if (!add.length || +add === 0) {
          this.$message.error(this.en ? "Please fill in the allocated traffic." : "请填写分配流量")
          return
        }

        // 转换为KB
        // const units = ['KB', 'MB', 'GB']
        // const index = units.findIndex(i => i === unit)
        // const packKb = add * Math.pow(1024, index)
        const packKb = +add * Math.pow(1024, 2)
        const hasKb = +has * Math.pow(1024, 2)

        // 判断是否超过套餐流量
        const pack = this.packList.find((i) => i.id === packId)
        if (pack && packKb > 0 && packKb > pack.remain) {
          this.$message.error(this.en ? "Assign traffic cannot exceed package traffic" : "可分配流量不足")
          return
        } else if (pack && packKb < 0 && Math.abs(packKb) > hasKb) {
          this.$message.error(this.en ? "Assign traffic cannot exceed package traffic" : "可回退流量不足")
          return
        }

        await platAccountAssignPack({
          sub_id: id,
          pack_id: packId,
          amount: +add,
        })

        this.$message.success(this.en ? "Assign traffic success" : "分配流量成功")

        this.isTrafficDialog = false

        this.getList()
        this.getPackList()
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    openViewDialog(row) {
      this.accountForm = {
        id: row.id,
        account: row.cuscode,
        password: row.password,
        remark: row.remark,
        proxyuser: row.proxyuser,
        proxypass: row.proxypass,
        is_share: row.sharetf,
      }
      this.isViewDialog = true
    },
    async confirmResetProxy() {
      try {
        this.loading = true
        const { id } = this.accountForm
        const { data } = await platAccountResetProxyPwd({ id })

        const index = this.accountList.findIndex((item) => item.id === id)
        if (index !== -1) {
          this.accountList[index].proxyuser = data.proxy_user
          this.accountList[index].proxypass = data.proxy_pass
        }

        this.$message.success(this.en ? "Reset success" : "重置成功")

        this.isViewDialog = false
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async confirmUpdateProxy() {
      try {
        const { id, proxypass, proxyuser } = this.accountForm

        const old = this.accountList.find((item) => item.id === id)

        if (old && old.proxyuser === proxyuser && old.proxypass === proxypass) {
          return
        }

        if (!proxyuser) {
          this.$message.error(this.en ? "Please enter a proxy user" : "请输入代理用户名")
          return
        }
        if (!proxypass) {
          this.$message.error(this.en ? "Please enter a proxy password" : "请输入代理密码")
          return
        }
        if (proxyuser && !/^[a-zA-Z0-9]+$/.test(proxyuser)) {
          this.$message.error(this.en ? "Proxy accounts may only contain letters and numbers." : "代理用户名只能包含字母和数字")
          return
        }

        this.loading = true

        const { data } = await platAccountResetProxyPwd({
          id,
          proxyuser,
          proxypass,
        })

        const index = this.accountList.findIndex((item) => item.id === id)
        if (index !== -1) {
          this.accountList[index].proxyuser = data.proxy_user
          this.accountList[index].proxypass = data.proxy_pass
        }

        this.$message.success(this.en ? "Reset success" : "重置成功")

        this.isViewDialog = false
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    starAccountEdit(e) {
      this.accountdisabled = false
      this.$nextTick(() => {
        let input = e.currentTarget.parentNode.parentNode.firstElementChild
        input = input.tagName === "INPUT" ? input : e.currentTarget.parentNode.parentNode.childNodes[1]
        input && input.focus()
      })
    },
    starPasswordEdit(e) {
      this.passworddisabled = false
      this.$nextTick(() => {
        const input = e.currentTarget.parentNode.parentNode.firstElementChild
        input && input.focus()
      })
    },
    async updateStatus(index) {
      try {
        const { id, status } = this.accountList[index]
        await platAccountUpdateStatus({
          id,
          status: Number(!status),
        })
        this.accountList[index].status = !status
      } catch (error) {
        console.log(error.message)
      }
    },
    search() {
      this.page.index = 1
      this.getList()
    },
    async getList() {
      try {
        this.loading = true
        const { account, status } = this.searchForm
        const { data } = await platAccountList({
          account,
          status: status !== "all" ? status : "",
          page_index: this.page.index,
          page_size: this.page.size,
        })
        this.accountList = data.list.map((item) => {
          item.status = Boolean(item.status)
          return item
        })
        this.page.total = data.count
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    handleCurrentChange(val) {
      this.page.index = val
      this.getList()
    },
    handleSizeChange(val) {
      this.page.size = val
      this.getList()
    },
    async getPackList() {
      try {
        const list = []
        const { data } = await platAccountPack()

        // 余额
        const { data: user } = await platCustomer()
        const remain = Math.floor(user.pack_remain * 1024)
        const remaineUnit = formatSizeUnits(remain)
        list.push({
          id: 0,
          name: `${this.en ? "Balance" : "余额"} ${remaineUnit}`,
          total: user.pack_remain,
          remaineUnit,
          remain, // kb
        })

        const pack = data.map((item) => {
          const pack = formatSizeUnits(item.packsize)
          return {
            id: item.id,
            name: `${pack} ${item.days}${this.en ? "days" : "天"}`,
            total: item.packsize,
            remain: item.remain_size,
            remaineUnit: formatSizeUnits(item.remain_size),
          }
        })
        this.packList = list.concat(pack)
      } catch (error) {
        console.log(error.message)
      }
    },
    changePack(id) {
      const index = this.packList.findIndex((item) => item.id === id)
      if (index < 0) return

      const { remaineUnit } = this.packList[index]
      this.trafficForm.max_traffic = remaineUnit
    },
    // 生成接入文档
    async downloadTxt(row) {
      try {
        this.loading = true

        const { proxyuser, proxypass, apikey } = row

        const { default: generateDoc } = await import("./doc")

        const template = generateDoc(this.en ? "en" : "zh", proxyuser, proxypass, apikey)

        // 导出图片
        const blob = new Blob([template], { type: "text/txt" })
        const filename = (this.en ? "Access Documentation" : "接入文档") + ".txt"
        const {
          default: { saveAs },
        } = await import(/* webpackChunkName: 'file-saver' */ "file-saver")

        saveAs(blob, filename)
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    toProduct() {
      this.$store.commit("layout/setIsProduc", true)
      this.$router.push("/products")
    },
  },
  created() {
    this.searchDebounce = debounce(this.search.bind(this), 500)
  },
  mounted() {
    this.getList()
    this.getPackList()
  },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
