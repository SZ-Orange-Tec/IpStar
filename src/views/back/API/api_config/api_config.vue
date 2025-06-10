<template>
  <div class="api_config column">
    <!-- 计数 -->
    <h4>{{ $t("PCConfigure.count") }}</h4>
    <div class="countbox">
      <div class="count">
        <div class="process" ref="process" @mousedown="clickCount">
          <div class="percent" :style="{ width: percentWidth + '%' }">
            <!-- <el-tooltip :content="count+''" placement="top" :open-delay="200"> -->
            <div class="bar" @mousedown.stop="moveStart"></div>
            <div class="tip">{{ count }}</div>
            <!-- </el-tooltip> -->
          </div>
        </div>
        <p class="between">
          <span>{{ min_count }}</span>
          <span>{{ mid_count }}</span>
          <span>{{ max_count }}</span>
        </p>
      </div>
      <el-input-number class="number h-10" v-model="count" :min="min_count" :max="max_count"></el-input-number>
    </div>

    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" label-position="top" class="formInline w-full">
      <el-form-item :label="$t('PCConfigure.country')">
        <el-select filterable v-model="formInline.country" :filter-method="dataFilter" @visible-change="changeCountry" placeholder="国家">
          <el-option v-for="item in countryData" :key="item.value" :value="item.value" :label="item.label">
            <div>
              <span :class="['flag-icon', 'flag-icon-' + item.value.toLowerCase()]"></span>
              {{ item.label }}
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('PCConfigure.protocol')">
        <el-select v-model="formInline.protocol" placeholder="协议">
          <el-option label="SOCKS5" value="0"></el-option>
          <el-option label="HTTP/HTTPS" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('PCConfigure.ip_duration')">
        <el-select v-model="formInline.IPtime" placeholder="IP 轮换时间">
          <el-option v-for="item in IPtimeOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('PCConfigure.format')">
        <el-select v-model="formInline.format" placeholder="格式">
          <el-option v-for="item in formatList" :key="item.label" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button id="primary-button" type="primary" @click="generateURL">{{ $t("PCConfigure.generate_Link") }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 网址 -->
    <h4>{{ $t("PCConfigure.url_tip") }}</h4>
    <div class="website v_center w-full space-x-5">
      <div class="v_center flex-1">
        <el-input class="flex-1" v-model="url" :placeholder="$t('PCConfigure.input_tip')" style="height: 40px"></el-input>
        <el-button id="primary-button" class="copy" type="primary" @click="copyUrl">{{ $t("PCConfigure.copy_link") }}</el-button>
      </div>
      <el-button id="primary-border" @click="openUrl" style="height: 40px">{{ $t("PCConfigure.open_link") }}</el-button>
    </div>
    <div class="tip">
      <div class="flex-shrink-0">{{ $t("PCConfigure.url_note.tag") }}</div>
      <ol>
        <li>{{ $t("PCConfigure.url_note.first") }}</li>
        <li>{{ $t("PCConfigure.url_note.second") }}</li>
      </ol>
    </div>

    <!-- 参数声明 -->
    <h4>{{ $t("PCConfigure.parameter") }}</h4>
    <div class="params w-full">
      <ul>
        <li class="v_center"><span>count</span> COUNT</li>
        <li class="v_center"><span>resptype</span> FORMAT:TXT JSON</li>
        <li class="v_center"><span>regions</span> COUNTRY</li>
        <li class="v_center"><span>protocol</span> PROTOCOL</li>
      </ul>
    </div>

    <h4>{{ $t("PCConfigure.Example") }}</h4>
    <div class="example w-full">
      <template v-if="formInline.format === '0'">
        {"code":0,"msg":"","data":[{"server":"***.com","port":9000,"user":"username","pass":"password","ptype":"http"}]}
      </template>
      <template v-else-if="formInline.format === '1'"> {"code":0,"msg":"","data":["serve : port : username : password"]} </template>
      <template v-else-if="formInline.format === '2'">
        serve : port : username : password <br />
        ***.com : 8080 : u2084sjtsait-V4PKcdfWCe-0-AG-N : n856naue
      </template>
    </div>

    <h4>{{ $t("PCConfigure.result_comment") }}</h4>
    <div class="params w-full">
      <ul v-if="formInline.format === '2'">
        <li><span>serve</span>SERVE</li>
        <li><span>port</span>PORT</li>
        <li><span>username</span>USERNAME</li>
        <li><span>password</span>PASSWORD</li>
      </ul>
      <ul v-else>
        <li><span>code</span> Status Code</li>
        <li><span>Msg</span> Messages</li>
        <li><span>data</span> IP-list</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/tools"
import enOptions from "../../proxy/json/cascader.json"
import cnOptions from "../../proxy/json/cncascader.json"

import settingStore from "@/store/setting"
// 国家国旗

import userStore from "@/store/user"
import layoutStore from "@/store/layout"
import { ElMessageBox } from "element-plus"
import "element-plus/es/components/message-box/style/css"
import Message from "@/components/message/message"
// import { PrismEditor } from 'vue-prism-editor'

let allCountry = []
export default {
  name: "PCApiConfig",
  // components: {
  //   PrismEditor
  // },
  data() {
    this.min_count = 1
    this.max_count = 500
    this.IPtimeOption = [
      {
        label: this.$t("PCObtainProxy.IPtimeOption[0]"),
        value: "0",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[1]"),
        value: "5",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[2]"),
        value: "10",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[3]"),
        value: "30",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[4]"),
        value: "60",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[5]"),
        value: "120",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[6]"),
        value: "180",
      },
      {
        label: this.$t("PCObtainProxy.IPtimeOption[7]"),
        value: "360",
      },
    ]
    this.formatList = [
      { value: "0", label: this.$t("PCConfigure.formatList[0]") },
      { value: "1", label: this.$t("PCConfigure.formatList[1]") },
      { value: "2", label: this.$t("PCConfigure.formatList[2]") },
    ]
    return {
      count: 50,
      formInline: {
        country: "",
        protocol: "1",
        format: "0",
        IPtime: "0",
      },
      countryData: [],
      url: "",
    }
  },
  computed: {
    mid_count() {
      return this.max_count / 2
    },
    percentWidth() {
      return Math.round((this.count / this.max_count) * 100)
    },
  },
  watch: {
    lang: {
      handler(val) {
        if (val === "zh") {
          const cn = JSON.parse(JSON.stringify(cnOptions))
          this.sortOptions(cn)
          this.countryData = Object.freeze(cn)
          this.formInline.country = cn[0].value
          allCountry = cn
        } else {
          const en = JSON.parse(JSON.stringify(enOptions))
          this.sortOptions(en)
          this.countryData = Object.freeze(en)
          this.formInline.country = en[0].value
          allCountry = en
        }
      },
      immediate: true,
    },
    formInline: {
      handler() {
        this.url = ""
      },
      deep: true,
    },
  },
  methods: {
    moveStart(e) {
      const total = this.$refs.process.clientWidth
      const unit = total / this.max_count
      const startCount = this.count
      const startX = e.clientX
      const fun = (e) => {
        const nowX = e.clientX
        const trans = nowX - startX
        if (this.min_count < this.count && this.count < this.max_count) {
          const percent = Math.round(((unit * startCount + trans) / total) * 100)
          this.count = Math.round((percent / 100) * this.max_count)
        } else if ((this.min_count === this.count && trans > 0) || (this.count === this.max_count && trans < 0)) {
          const percent = Math.round(((unit * startCount + trans) / total) * 100)
          this.count = Math.round((percent / 100) * this.max_count)
        }
      }
      const remove = () => {
        document.body.removeEventListener("mousemove", fun)
        document.body.removeEventListener("mouseup", remove)
      }
      document.body.addEventListener("mousemove", fun, { passive: false })
      document.body.addEventListener("mouseup", remove)
      // e.stopPropagation()
      e.preventDefault()
    },
    clickCount(e) {
      const findTarget = (dom) => {
        if (dom.className === "process") return dom
        return findTarget(dom.parentNode)
      }
      const target = findTarget(e.target)
      const total = target.clientWidth
      const offsetX = e.offsetX
      const percent = Math.round((offsetX / total) * 100)
      this.count = Math.round((percent / 100) * this.max_count)
    },
    // 搜索规则
    dataFilter: debounce(function (val) {
      const reg = new RegExp(val.toUpperCase())
      if (val) {
        const arr = allCountry.filter((item) => reg.test(item.label.toUpperCase()))
        this.countryData = Object.freeze(arr)
      } else {
        this.countryData = Object.freeze(allCountry)
      }
    }, 300),
    changeCountry(status) {
      if (status) {
        this.countryData = Object.freeze(allCountry)
      }
    },
    // 遍历国家排序
    sortOptions(arr) {
      const first = arr.splice(0, 1)[0]
      let temp
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          const a = arr[j].value
          const b = arr[j + 1].value
          if (a > b) {
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      arr.splice(0, 0, first)
    },
    // 生成url
    async generateURL() {
      if (!this.isPurchase) {
        ElMessageBox.confirm(this.$t("PCConfigure.messagebox.message"), this.$t("PCConfigure.messagebox.title"), {
          confirmButtonText: this.$t("PCConfigure.messagebox.confirm"),
          cancelButtonText: this.$t("PCConfigure.messagebox.cancel"),
          type: "warning",
        }).then(() => {
          this.$store.commit("layout/setIsProduc", true)
          this.$router.push("/products?buy=1")
        })
        return
      }
      const baseUrl = "https://service.ipflare.com/v1/obtain_proxy_endpoints"
      const apiKey = this.apiKey
      const count = this.count
      const protocol = this.formInline.protocol
      const region = this.formInline.country === "ALL" ? "" : this.formInline.country
      const resptype = this.formInline.format
      const keepTime = this.formInline.IPtime
      // console.log(key)
      const { default: md5 } = await import(/*webpackChunkName:'js-md5'*/ "js-md5")
      const sign = md5(apiKey + protocol + count + region)
      const params = `?apikey=${apiKey}&count=${count}&protocol=${protocol}&region=${region}&resptype=${resptype}&sign=${sign}&keeptime=${keepTime}&rd=${Date.now()}`

      // if (keepTime !== '0') {
      //   params += '&autoswitch=' + 1
      // }

      this.url = baseUrl + params
    },
    // 复制链接
    copyUrl() {
      if (!this.url) return
      if ("clipboard" in navigator && window.isSecureContext) {
        const text = this.url
        navigator.clipboard
          .writeText(text)
          .then(() => {
            Message({
              type: "success",
              message: "Copy Success",
            })
          })
          .catch((err) => {
            Message({
              type: "warning",
              message: "Copy failed\n" + err.message,
            })
          })
      } else {
        const text = this.url
        const input = document.createElement("textarea")
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand("Copy")
        this.$message.success("Copy Success")

        input.remove() // 删除动态创建的节点
      }
    },
    // 打开链接
    openUrl() {
      if (!this.url) return
      window.open(this.url)
    },
  },
  setup() {
    const { lang } = settingStore()
    const { isProduc } = layoutStore()
    const { apiKey, is_purchase: isPurchase } = userStore()
    console.log(apiKey)

    return {
      lang,
      apiKey,
      isProduc,
      isPurchase,
    }
  },
  mounted() {
    import("flag-icon-css/css/flag-icons.css")
  },
}
</script>

<style lang="less" scoped>
@import "./api_config.less";
</style>
