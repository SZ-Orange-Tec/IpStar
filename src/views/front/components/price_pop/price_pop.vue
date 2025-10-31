<template>
  <div v-if="show">
    <div class="product_pop" ref="container" :style="{ width: width }">
      <div class="main black">
        <div class="grey-40 font-medium">{{ t("Agent_Price") }}</div>
        <div class="split w-full"></div>
        <div class="w-full">
          <ul class="grid grid-cols-2 gap-5">
            <li class="v_center space-x-3 pointer rounded">
              <div class="iconbox rounded-lg vh_center shrink-0">
                <ResidentialProxyIcon class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="column space-y-2">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Residential_Proxies") }}</strong>
                  <ip-tag type="major" class="rounded-full font-normal">{{ t("Popular") }}</ip-tag>
                </div>
              </div>
              <div class="right column_center">
                <span class="text-xs grey-60">{{ t("Starting_from") }}</span>
                <div class="text-sm">
                  <span class="text-xl font-medium">${{ lowestPrice.residential }}</span> /GB
                </div>
              </div>
            </li>
            <li class="v_center space-x-3 pointer rounded">
              <div class="iconbox rounded-lg vh_center shrink-0">
                <PhoneProxyIcon class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="column space-y-2">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Phone_Proxies") }}</strong>
                  <ip-tag type="success" class="rounded-full font-normal">{{ t("header_spac.native") }}</ip-tag>
                </div>
              </div>
              <div class="right column_center">
                <span class="text-xs grey-60">{{ t("Starting_from") }}</span>
                <div class="text-sm">
                  <span class="text-xl font-medium">${{ lowestPrice.phone }}</span> /GB
                </div>
              </div>
            </li>
            <li class="v_center space-x-3 pointer rounded">
              <div class="iconbox rounded-lg vh_center shrink-0">
                <UnlimitedProxyIcon class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="column space-y-2">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Unlimited_Residential_Proxies") }}</strong>
                  <ip-tag type="success" class="rounded-full font-normal">{{ t("header_spac.unlimited") }}</ip-tag>
                </div>
              </div>
              <div class="right column_center">
                <span class="text-xs grey-60">{{ t("Starting_from") }}</span>
                <div class="text-sm">
                  <span class="text-xl font-medium">${{ lowestPrice.unlimited }}</span> /GB
                </div>
              </div>
            </li>
            <li class="v_center space-x-3 pointer rounded">
              <div class="iconbox rounded-lg vh_center shrink-0">
                <DataProxyIcon class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="column space-y-2">
                  <strong class="font-medium slider_bck slider_bck_left">{{ t("Data_Center_Proxies") }}</strong>
                  <ip-tag type="success" class="rounded-full font-normal">{{ t("header_spac.performance") }}</ip-tag>
                </div>
              </div>
              <div class="right column_center">
                <span class="text-xs grey-60">{{ t("Starting_from") }}</span>
                <div class="text-sm">
                  <span class="text-xl font-medium">${{ lowestPrice.data_center }}</span> /GB
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import {
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
  ChevronLeft,
} from "lucide-vue-next"
import IpTag from "@/components/tag/tag.vue"
import anime from "animejs/lib/anime.es.js"
import { roundToDecimal } from "@/utils/tools"
import { nextTick, onMounted, ref, toRefs, watch } from "vue"
import { platProductLowestPrices } from "@/api/product"

const { t } = useI18n()

const show = ref(false)

const props = defineProps({
  modelValue: Boolean,
})
const { modelValue } = toRefs(props)
const emit = defineEmits(["update:modelValue"])

watch(
  modelValue,
  (val) => {
    if (val) {
      show.value = val
      computeWidth()
      nextTick(() => {
        open()
      })
    } else {
      close()
    }
  }
  // { immediate: true }
)

// 开启 关闭动画
const container = ref(null)
const width = ref(0)
function computeWidth() {
  const app = document.getElementById("app")
  width.value = app.clientWidth + "px"
}

function close() {
  const target = container.value

  target.parentNode.style.backgroundColor = "hsl(var(--dialog-wrap) / 0%)"

  return new Promise((resolve) => {
    anime({
      targets: target,
      opacity: {
        value: [1, 0],
        easing: "easeInQuart",
      }, // 明确指定起始和结束值
      // width: {
      //   value: [window.innerWidth, 0],
      //   easing: "easeInQuart",
      // },
      duration: 150,
      complete: () => {
        show.value = false
        emit("update:modelValue", false)
        resolve()
      },
    })
  })
}
function open() {
  const target = container.value

  target.parentNode.style.backgroundColor = "hsl(var(--dialog-wrap) / 90%)"

  anime({
    targets: target,
    opacity: {
      value: [0, 1],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    // width: {
    //   value: [0, window.innerWidth],
    //   easing: "easeOutQuad",
    // },
    duration: 300,
  })
}

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
  if (modelValue.value) {
    show.value = true
    computeWidth()
    nextTick(() => {
      open()
    })
  }
})
</script>

<style lang="less" scoped>
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
.product_pop {
  box-sizing: border-box;
  padding: 20px 40px 60px;
  // width: 100vw;
  position: absolute;
  // top: 100%;
  left: 0;
  top: 100%;
  box-shadow: 0 2px 8px 0 rgba(48, 39, 73, 0.08);
  transform-origin: center center;
  background-color: hsl(var(--background));
  border-bottom: 1px solid hsl(var(--border));
  .main {
    max-width: 1200px;
    margin: 0 auto;
    .split {
      margin: 10px 0 30px;
      height: 1px;
      background-color: hsl(var(--border));
    }
    .grid {
      margin: 0 -12px;
      row-gap: 24px;
      column-gap: 36px;
      & > li {
        width: 100%;
        height: 100%;
        padding: 16px 12px;
        transition: background-color 0.3s;
        // p {
        //   height: 40px;
        //   display: -webkit-box;
        //   -webkit-line-clamp: 2;
        //   -webkit-box-orient: vertical;
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        // }
        .right {
          padding-left: 20px;
          border-left: 1px solid hsl(var(--border));
        }
        &:hover {
          background-color: hsl(var(--primary) / 8%);
          .iconbox {
            background-color: #ffffff;
          }
          .slider_bck {
            color: hsl(var(--primary));
            &::after {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

.slider_bck {
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 0%;
    height: 1px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;

    background-color: hsl(var(--primary) / 80%);
    transition: all 0.3s;
  }
}
.slider_bck_left {
  &::after {
    left: 0;
    transform-origin: left center;
  }
}
</style>
