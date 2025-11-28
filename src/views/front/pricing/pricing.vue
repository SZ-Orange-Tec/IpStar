<template>
  <div class="pricing">
    <!-- pricing_content -->

    <div class="box price relative">
      <div class="container">
        <div class="column_center">
          <div class="header column_center">
            <div class="column_center space-y-3">
              <p class="text-xl sm:text-2xl lg:text-4xl title md:whitespace-pre-wrap font-semibold">
                {{ t(`pricing_spec.${secondName}.title`) }}
              </p>
              <p class="text-lg">{{ t(`pricing_spec.${secondName}.des`) }}</p>
            </div>

            <Tabbar v-if="type === 0 || type === 4" @select="changeActive" class="tabbar text-base"></Tabbar>
          </div>

          <div class="product w-full relative">
            <ProductList :type="type" :tabbar="false" :pack="pack" ref="product"></ProductList>
          </div>
        </div>
      </div>

      <!-- <div class="background"></div> -->
    </div>

    <!-- <div class="column_center pay space-y-5">
      <div class="imgs w-full between space-x-5">
        <img v-lazy src="@/assets/images/pricing/pay1.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay2.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay3.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay4.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay5.png" height="48" alt="" />
      </div>
      <p class="primary">{{ t("pricing_spec.payment") }}</p>
    </div> -->

    <div class="box plan">
      <div class="container between">
        <div class="text column space-y-10">
          <div class="space-y-5">
            <h3 class="text-xl font-bold">{{ t("pricing_spec.plan_title") }}</h3>
            <p>{{ t("pricing_spec.plan_desc") }}</p>
          </div>

          <ul class="space-y-3">
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.plan_tag1") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.plan_tag2") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.plan_tag3") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.plan_tag4") }}</p>
            </li>
          </ul>
        </div>

        <div class="img_box hidden sm:block">
          <img src="@/assets/images/pricing/product_plan.png" alt="" />
        </div>
      </div>
    </div>

    <div class="box plan">
      <div class="container between">
        <div class="img_box hidden sm:block">
          <img src="@/assets/images/pricing/bighow.png" alt="" />
        </div>

        <div class="text column space-y-10">
          <div class="space-y-5">
            <h3 class="text-xl font-bold">{{ t("pricing_spec.resource_title") }}</h3>
            <p>{{ t("pricing_spec.resource_desc") }}</p>
          </div>

          <ul class="space-y-3">
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.resource_tag1") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.resource_tag2") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.resource_tag3") }}</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>{{ t("pricing_spec.resource_tag4") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box code">
      <div class="container space-y-10">
        <div class="space-y-5">
          <h3 class="text-lg sm:text-2xl lg:text-3xl font-bold text-center">{{ t("pricing_spec.code_title") }}</h3>
          <p class="text-center">{{ t("pricing_spec.code_desc") }}</p>
        </div>

        <div class="code_content column md:flex !items-stretch">
          <div class="left flex md:column">
            <div class="pointer vh_center" :class="{ active: active === 'go' }" @click="active = 'go'">Go</div>
            <div class="pointer vh_center" :class="{ active: active === 'java' }" @click="active = 'java'">Java</div>
            <div class="pointer vh_center" :class="{ active: active === 'php' }" @click="active = 'php'">PHP</div>
            <div class="pointer vh_center" :class="{ active: active === 'python' }" @click="active = 'python'">Python</div>
          </div>
          <div class="right flex-1">
            <CodeText v-if="active == 'go'" :code="GolangCode" />
            <CodeText v-if="active == 'java'" :code="JavaCode" />
            <CodeText v-if="active == 'php'" :code="PHPCode" />
            <CodeText v-if="active == 'python'" :code="PythonCode" />
          </div>
        </div>
      </div>
    </div>

    <div class="box question">
      <div class="container space-y-10">
        <div class="title">
          <h3 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">{{ t("FAQ") }}</h3>
        </div>

        <div class="content space-y-5">
          <Question>
            <template #header> {{ t("question_spec.title1") }} </template>
            <template #content>
              <i18n-t keypath="question_spec.desc1" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #product>
                  <a href="https://www.ipstar.io/product/residential" target="_blank">https://www.ipstar.io/product/residential</a>
                </template>
                <template #pricing>
                  <a href="https://www.ipstar.io/pricing/residential" target="_blank">https://www.ipstar.io/pricing/residential</a>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title2") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc2") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title3") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc3") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title4") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc4") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title5") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("question_spec.desc5") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title6") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc6") }}</p>
            </template>
          </Question>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { platDataIndex } from "@/api/home"
import { computed, defineAsyncComponent, nextTick, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import loginStore from "@/store/login"
import ProductList from "../components/product_list/product_list.vue"
import Message from "@/components/message/message"
import settingStore from "@/store/setting"
import { roundToDecimal } from "@/utils/tools"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import Tabbar from "../components/product_list/tabbar/tabbar.vue"
import Question from "../components/question/question.vue"
import { CircleCheck } from "lucide-vue-next"
import layoutStore from "../../../store/layout"

// 路由参数
const route = useRoute()
const nameReg = /residential|unlimited|mobile|data_center|rotation/
const secondName = computed(() => (nameReg.test(route.params.name) ? route.params.name : "residential"))
const type = computed(() => {
  switch (secondName.value) {
    case "residential":
      return 0
    case "unlimited":
      return 1
    case "mobile":
      return 2
    case "data_center":
      return 3
    case "rotation":
      return 4
    default:
      return 0
  }
})

// 代码
const active = ref("go")
const CodeText = defineAsyncComponent(() => import("@/views/doc/components/code_block/code_block.vue"))
const GolangCode = ref()
const JavaCode = ref()
const PHPCode = ref()
const PythonCode = ref()
async function getCode() {
  const { go, java, php, python } = await import("@/views/doc/code.js")
  GolangCode.value = go
  JavaCode.value = java
  PHPCode.value = php
  PythonCode.value = python
}
getCode()

const { t } = useI18n()

const router = useRouter()
const { token, isLogin } = loginStore()
const { en } = settingStore()
const { registerAward } = layoutStore()

// 地图数据
const mapData = ref([])
const ipsCount = ref(null)
const countryCount = ref(null)
async function IpMap() {
  const { data } = await platDataIndex()

  ipsCount.value = 0
  countryCount.value = 0

  // 逐渐递增动画
  nextTick(() => {
    const ipobj = { charged: 0 }
    anime({
      targets: ipobj,
      charged: 50, // data.ips_count,
      round: 1,
      easing: "linear",
      update: function () {
        ipsCount.value = ipobj.charged
      },
    })
    const countryObj = { charged: 0 }
    anime({
      targets: countryObj,
      charged: data.country_count,
      round: 1,
      easing: "linear",
      update: function () {
        countryCount.value = countryObj.charged
      },
    })
  })

  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })

  mapData.value = data.countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/home/country/${country}.png`
    return {
      name: country,
      value: (item.ip_count / 10000).toFixed(2),
      icon: countryImg[key].default,
    }
  })
}

//
const product = ref(null)
function changeActive(index) {
  product.value.changeActive(index)
}

// 展示套餐数量
const pack = computed(() => {
  return !isLogin.value && registerAward.value ? 5 : 4
})

const showImg = ref(false)
function bgLoaded(e) {
  console.log("load")
  showImg.value = true
}

// 获取最低价格
const lowestPrice = ref(0.25)
async function getIndexData() {
  try {
    const { data } = await platDataIndex()
    lowestPrice.value = data.lowest_price ? data.lowest_price / 100 : 0.25
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  getIndexData()
})
</script>

<style lang="less" scoped>
@import url("./pricing.less");
</style>
