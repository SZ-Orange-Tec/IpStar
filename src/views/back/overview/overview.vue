<template>
  <div class="h-full column">
    <NavBar>
      <template #default="{ title }">
        <div v-if="isBalance" class="v_center space-x-1">
          <IpButton type="ghost" class="h-8 w-8 vh_center" @click="isBalance = false">
            <ChevronLeft />
          </IpButton>
          <span>{{ t("Consumption_Details") }}</span>
        </div>
        <div v-else-if="isOnlineIp" class="v_center space-x-1">
          <IpButton type="ghost" class="h-8 w-8 vh_center" @click="isOnlineIp = false">
            <ChevronLeft />
          </IpButton>
          <span>{{ t("Online_IP") }}</span>
        </div>
        <div v-else>{{ title }}</div>
      </template>
    </NavBar>

    <div v-if="isBalance" class="box-border flex-1 min-h-0 w-full p-6">
      <Balance />
    </div>

    <div v-else-if="isOnlineIp" class="box-border flex-1 min-h-0 overflow-y-auto w-full p-6">
      <OnlineIP />
    </div>

    <div v-else class="main flex-1 min-h-0 overflow-y-auto w-full flex p-6 gap-5">
      <div class="flex-1 min-w-0 space-y-5">
        <div class="board px-2 py-5 rounded">
          <keep-alive>
            <Tab class="tab" v-model="active" :active-style="activeStyle">
              <TabItem :value="0" class="flex-1 tab-item">
                <div :class="{ focus: active === 0 }" class="pointer flex-1 column p-5 rounded-md" data-active="0">
                  <div class="iconbox rounded-lg vh_center mb-2">
                    <ResidentialProxyIcon :size="24" />
                  </div>
                  <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.residential_proxy") }}</strong>
                  <span class="grey-80 text-xs">{{ $t("Starting_from") }} ${{ lowestPrice.residential }}/GB </span>
                </div>
              </TabItem>
              <TabItem :value="1" class="flex-1 tab-item">
                <div :class="{ focus: active === 1 }" class="pointer flex-1 column p-5 rounded-md" data-active="1">
                  <div class="iconbox rounded-lg vh_center mb-2">
                    <UnlimitedProxyIcon :size="24" />
                  </div>
                  <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.unlimited_proxy") }}</strong>
                  <span class="grey-80 text-xs">{{ $t("Starting_from") }} ${{ lowestPrice.unlimited }}/{{ t("Day") }} </span>
                </div>
              </TabItem>
              <TabItem :value="2" class="flex-1 tab-item">
                <div :class="{ focus: active === 2 }" class="pointer flex-1 column p-5 rounded-md" data-active="2">
                  <div class="iconbox rounded-lg vh_center mb-2">
                    <PhoneProxyIcon :size="24" />
                  </div>
                  <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.phone_proxy") }}</strong>
                  <span class="grey-80 text-xs">{{ $t("Starting_from") }} ${{ lowestPrice.phone }}/GB </span>
                </div>
              </TabItem>
              <TabItem :value="3" class="flex-1 tab-item">
                <div :class="{ focus: active === 3 }" class="pointer flex-1 column p-5 rounded-md" data-active="3">
                  <div class="iconbox rounded-lg vh_center mb-2">
                    <DataProxyIcon :size="24" />
                  </div>
                  <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.data_proxy") }}</strong>
                  <span class="grey-80 text-xs">{{ $t("Starting_from") }} ${{ lowestPrice.data_center }}/IP </span>
                </div>
              </TabItem>
            </Tab>
          </keep-alive>
        </div>

        <div>
          <keep-alive>
            <component :is="activeComponent" />
          </keep-alive>
        </div>
      </div>

      <div class="rightSide hidden xl:block">
        <RightSide />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import NavBar from "../components/navbar/navbar.vue"
import { computed, onMounted, provide, reactive, ref } from "vue"
import ResidentialProxy from "./residential_proxy/index.vue"
import UnlimitedProxy from "./unlimited_proxy/index.vue"
import PhoneProxy from "./phone_proxy/index.vue"
import DataProxy from "./data_proxy/index.vue"
import RightSide from "./rightSide.vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import Balance from "./balance/index.vue"
import OnlineIP from "./onlineIP/index.vue"
import IpButton from "@/components/button/button.vue"
import {
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
  ChevronLeft,
} from "lucide-vue-next"
import { platProductLowestPrices } from "@/api/product"

const { t } = useI18n()

// tabbar
const active = ref(0) // 0:residential_proxy 1:unlimited_proxy 2:phone_proxy 3:data_proxy
const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  top: 0,
  bottom: 0,
}
function selectActive(e) {
  if (e.target.tagName === "UL") return

  function findLi(dom) {
    if (dom.tagName === "LI") return dom
    return findLi(dom.parentElement)
  }

  const li = findLi(e.target)
  const value = +li.dataset.active
  if (typeof value !== "number") return

  active.value = value
}
const activeComponent = computed(() => {
  switch (active.value) {
    case 0:
      return ResidentialProxy
    case 1:
      return UnlimitedProxy
    case 2:
      return PhoneProxy
    case 3:
      return DataProxy
    default:
      return ResidentialProxy
  }
})

// 切换余额详情
const isBalance = ref(false)
provide("isBalance", isBalance)

const isOnlineIp = ref(false)
provide("isOnlineIp", isOnlineIp)

// 最低价格
const lowestPrice = ref({
  residential: "0.00",
  unlimited: "0.00",
  phone: "0.00",
  data_center: "0.00",
})
async function getLowestPrice() {
  try {
    const { data } = await platProductLowestPrices()
    const keys = ["residential", "unlimited", "phone", "data_center"]
    const target = {}
    data.forEach(({ prd_type, unit_price }) => {
      const key = keys[prd_type]
      target[key] = unit_price / 100
    })
    lowestPrice.value = target
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(() => {
  getLowestPrice()
})
</script>

<style lang="less" scoped>
.tab {
  @media screen and (max-width: 1024px) {
    overflow-x: auto;
  }
  .tab-item {
    min-width: 200px;
  }
  .focus {
    .iconbox {
      background-color: #ffffff;
    }
  }
}

.iconbox {
  width: 40px;
  height: 40px;
  background-color: hsl(var(--primary) / 8%);
  background-color: #eff6ff;
  position: relative;
  transition: background-color 0.3s ease-in-out;
  &::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-color: hsl(var(--primary) / 20%);
    border-radius: 50%;
  }
}
.rightSide {
  width: 380px;
  @media screen and (max-width: 1620px) {
    width: 340px;
  }
  @media screen and (max-width: 1536px) {
    width: 320px;
  }
  @media screen and (max-width: 1280px) {
    width: 280px;
  }
}
</style>
